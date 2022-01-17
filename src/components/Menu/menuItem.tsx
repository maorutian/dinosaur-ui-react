import React, {useContext} from 'react';
import classNames from 'classnames';
import {MenuContext} from './menu';

export interface MenuItemProps {
    className?: string,
    index: number,
    disabled?: boolean,
    style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {children, className, index, disabled, style} = props;
    const context = useContext(MenuContext);
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    const handleClick = () => {
        if (context.onSelect && !disabled) {
            context.onSelect(index);
        }
    };
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    );
}

export default MenuItem;