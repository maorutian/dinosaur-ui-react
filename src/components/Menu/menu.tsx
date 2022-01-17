import React from 'react';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical';

interface MenuProps {
    className?: string;
    defaultIndex?: number;
    mode?: MenuMode;
    style?: React.CSSProperties;
}

const Menu: React.FC<MenuProps> = (props) => {
    const {children, className, defaultIndex, mode, style} = props;
    const classes = classNames('dinosaur-menu', className, {
        'menu-vertical': mode === 'vertical'
    });

    return (
        <ul className={classes} style={style}>
            {children}</ul>
    );
}

Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal'
}

export default Menu;

