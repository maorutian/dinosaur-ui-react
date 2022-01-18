import React, {createContext, useState} from 'react';
import classNames from 'classnames';
import {MenuItemProps} from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: number) => void;

export interface MenuProps {
    className?: string;
    defaultIndex?: number;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
}

interface IMenuContext {
    index: number;
    onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({index: 0});

const Menu: React.FC<MenuProps> = (props) => {
    const {children, className, defaultIndex, mode, style, onSelect} = props;
    const classes = classNames('dinosaur-menu', className, {
        'menu-vertical': mode === 'vertical'
    });

    //highlight active/selected menu item
    const [currentActive, setActive] = useState(defaultIndex);
    const handleClick = (index: number) => {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleClick,
    }

    //check: children of Menu must be MenuItem
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const {displayName} = childElement.type;
            if (displayName === 'MenuItem') {
                //add index to each child
                return React.cloneElement(childElement, {index});
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    );
}

Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal'
}

export default Menu;

