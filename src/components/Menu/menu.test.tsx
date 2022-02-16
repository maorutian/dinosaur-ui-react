import React from 'react';
import {render, RenderResult, fireEvent, wait} from '@testing-library/react';
import Menu, {MenuProps} from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';

// in the real world, the CSSTransition component would take some time
// before finishing the animation which would actually hide the message.
// So we've mocked it out for our tests to make it happen instantly
jest.mock('react-transition-group', () => {
    return {
        CSSTransition: (props: any) => {
            return props.children
        }
    }
})

//test default (horizontal mode)
const testProps: MenuProps = {
    defaultIndex: "0",
    onSelect: jest.fn(),
    className: 'custom'
};

//test horizontal mode
const testVerProps: MenuProps = {
    defaultIndex: "0",
    mode: 'vertical',
    defaultOpenSubMenus: ['4']
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
            <SubMenu title="dropdown">
                <MenuItem>
                    drop1
                </MenuItem>
            </SubMenu>
            <SubMenu title="opened">
                <MenuItem>
                    opened1
                </MenuItem>
            </SubMenu>
        </Menu>
    )
};

//create css style for open menu
const createStyleFile = () => {
    const cssFile: string = `
    .dinosaur-submenu {
      display: none;
    }
    .dinosaur-submenu.menu-opened {
      display:block;
    }
  `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssFile;
    return style;
}

let wrapper: RenderResult,
    menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement;

describe('test Menu, SubMenu and MenuItem component (horizontal model)', () => {
    beforeEach(() => {
        library.add(fas);
        wrapper = render(generateMenu(testProps));
        //add css
        wrapper.container.append(createStyleFile());
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');
    })

    it('should render correct Menu, subMenu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('dinosaur-menu custom');
        //menu item's li (3) + submenu's li (2) + menu items in the submenu's li (2)
        expect(menuElement.getElementsByTagName('li').length).toEqual(7);
        //menu item's li (3) + submenu's li (2)
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
        expect(activeElement).toHaveClass('menu-item is-active');
        expect(disabledElement).toHaveClass('menu-item is-disabled');
    })

    it('click items should change to is-active and call the right callback', () => {
        //click normal item, it should change to active
        const thirdItem = wrapper.getByText('item');
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('is-active');
        //old active item is not active after clicked another one
        expect(activeElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).toHaveBeenCalledWith('2');
        //disabled item wouldn't be active
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
    })

    it('should show dropdown items when hover on subMenu and call the right callback', async () => {
        const dropdownElement = wrapper.getByText('dropdown');
        const menuItemInSubmenu = wrapper.getByText('drop1');
        //subMenu is close
        expect(menuItemInSubmenu).not.toBeVisible();
        //show dropdown items when hover on subMenu
        fireEvent.mouseEnter(dropdownElement);
        await wait(() => {
            expect(menuItemInSubmenu).toBeVisible();
        })
        //menuitem in submenu is active and call the right callback
        fireEvent.click(menuItemInSubmenu);
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
        expect(menuItemInSubmenu).toHaveClass('is-active');
        //hide dropdown when mouse leave
        fireEvent.mouseLeave(dropdownElement);
        await wait(() => {
            expect(wrapper.getByText('drop1')).not.toBeVisible();
        })
    })
})

describe('test Menu, SubMenu and MenuItem component (vertical model)', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testVerProps));
        //add css
        wrapper.container.append(createStyleFile());
    })

    it('should render vertical mode when mode is set to vertical', () => {
        const menuElement = wrapper.getByTestId('test-menu');
        expect(menuElement).toHaveClass('menu-vertical');
    })

    it('should show dropdown items when click on subMenu and call the right callback for vertical mode', () => {
        const dropdownElement = wrapper.getByText('dropdown');
        const menuItemInSubmenu = wrapper.getByText('drop1');
        //subMenu is close
        expect(menuItemInSubmenu).not.toBeVisible();
        //show dropdown items when click on subMenu
        fireEvent.click(dropdownElement);
        expect(menuItemInSubmenu).toBeVisible();
        //menuitem in submenu is active and call the right callback
        fireEvent.click(menuItemInSubmenu);
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
        expect(menuItemInSubmenu).toHaveClass('is-active');
    })
})