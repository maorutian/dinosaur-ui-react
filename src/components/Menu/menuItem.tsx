import React from 'react';
import classNames from 'classnames';

interface MenuItemProps {
    className?: string,
    index?: number,
    disabled?: boolean,
    style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {children, className, index, disabled, style} = props;
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
    });
    return (
        <li className={classes} style={style}>
            {children}
        </li>
    );
}

export default MenuItem;