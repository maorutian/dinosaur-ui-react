import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import {Input, InputProps} from './input';

const defaultProps: InputProps = {
    onChange: jest.fn(),
    placeholder: 'test-input'
};

describe('test Input component', () => {
    it('should render the correct default Input', () => {
        const wrapper = render(<Input {...defaultProps}/>);
        const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement;
        expect(testNode).toBeInTheDocument();
        expect(testNode).toHaveClass('dinosaur-input-inner');
        fireEvent.change(testNode, {target: {value: '1'}});
        expect(defaultProps.onChange).toHaveBeenCalled();
        expect(testNode.value).toEqual('1');
    })

    it('should render the disabled Input on disabled property', () => {
        const wrapper = render(<Input disabled placeholder="disabled"/>);
        const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement;
        expect(testNode.disabled).toBeTruthy();
    })

    it('should render different input sizes on size property', () => {
        const wrapper = render(<Input placeholder="sizes" size="lg"/>);
        const testContainer = wrapper.container.querySelector('.dinosaur-input-wrapper');
        expect(testContainer).toHaveClass('input-size-lg');
    })

    it('should render prepend and append element on prepend/append property', () => {
        const {queryByText, container} = render(<Input placeholder="pend" prepend="https://" append=".com"/>);
        const testContainer = container.querySelector('.dinosaur-input-wrapper');
        expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend');
        expect(queryByText('https://')).toBeInTheDocument();
        expect(queryByText('.com')).toBeInTheDocument();
    })
})