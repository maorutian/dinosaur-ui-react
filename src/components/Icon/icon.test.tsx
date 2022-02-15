import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import Icon from './icon';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';


describe('test Icon component', () => {
    beforeEach(() => {
        library.add(fas);
    })

    it('should render default icon', () => {
        const wrapper = render(<Icon icon='coffee' className='custom'/>);
        const testNode = wrapper.getByTestId('test-icon');
        expect(testNode).toBeInTheDocument();
        expect(testNode).toHaveClass('dinosaur-icon custom');
    })

    it('should render icon with theme', () => {
        const wrapper = render(<Icon icon='dove' theme='primary'/>);
        const testNode = wrapper.getByTestId('test-icon');
        expect(testNode).toBeInTheDocument();
        expect(testNode).toHaveClass('dinosaur-icon icon-primary');
    })
})

