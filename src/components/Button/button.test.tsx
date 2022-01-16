import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Button, {ButtonProps, ButtonSize, ButtonType} from './button'

//test default
//<Button>Button</Button>
const defaultProps = {
    onClick: jest.fn()
}

//test type/size/custom classname
//<Button btnType={ButtonType.Primary} size={ButtonSize.Large} className={custom}>Button</Button>
const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'custom'
}

//test link button
//<Button btnType={ButtonType.Link} href="https://www.google.com">Link</Button>
const linkProps = {
    btnType: ButtonType.Link,
    href: "https://google.com"
}

//test disabled
//<Button disabled>Button</Button>
const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn(),
}

describe('test Button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>Button</Button>);
        const element = wrapper.getByText('Button') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        expect(element.disabled).toBeFalsy();
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    })

    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>Button</Button>);
        const element = wrapper.getByText('Button');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn-primary btn-lg custom');
    })

    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(<Button {...linkProps}>Link</Button>);
        const element = wrapper.getByText('Link');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link');
    })

    it('should render disabled button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>Button</Button>);
        const element = wrapper.getByText('Button') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    })
})