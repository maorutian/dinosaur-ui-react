import React from 'react';
import {render, RenderResult, fireEvent, cleanup} from '@testing-library/react';
import Menu, {MenuProps} from './menu';
import MenuItem from './menuItem';

//test default
const testProps: MenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'custom'
};

//test mode
const testVerProps: MenuProps = {
    defaultIndex: 0,
    mode: 'vertical'
};

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <MenuItem>
                item
            </MenuItem>
        </Menu>
    )
};

let wrapper: RenderResult,
    menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement;

describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps));
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');
    })

    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('dinosaur-menu custom');
        expect(menuElement.getElementsByTagName('li').length).toEqual(3);
        expect(activeElement).toHaveClass('menu-item is-active');
        expect(disabledElement).toHaveClass('menu-item is-disabled');
    })

    it('click items should change to is-active and call the right callback', () => {
        const thirdItem = wrapper.getByText('item');
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('is-active');
        expect(activeElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).toHaveBeenCalledWith(2);
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
    })

    it('should render vertical mode when mode is set to vertical', () => {
        //remove wrapper = render(generateMenu(testProps))
        cleanup();
        const wrapper = render(generateMenu(testVerProps));
        const menuElement = wrapper.getByTestId('test-menu');
        expect(menuElement).toHaveClass('menu-vertical');
    })
})
