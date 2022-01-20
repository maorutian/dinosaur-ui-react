import React, {useContext, FunctionComponentElement, useState} from 'react';
import classNames from 'classnames';
import {MenuContext} from './menu';
import {MenuItemProps} from './menuItem';

export interface SubMenuProps {
    className?: string;
    index?: number;
    title: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const [menuOpen, setOpen] = useState(false);
    const {children, className, index, title} = props;
    const context = useContext(MenuContext);
    const classes = classNames('menu-item submenu-item', className, {
        //highlight submenu
        'is-active': context.index === index
    });
    const subMenuClasses = classNames('dinosaur-submenu', {
        //open/close subMenu div
        'menu-opened': menuOpen
    })
    //open/close subMenu when mouse click for vertical mode
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    const clickEvents = context.mode === 'vertical' ? {onClick: handleClick} : {};

    //open/close subMenu when mouse hover for horizontal mode
    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setOpen(toggle);
        }, 300)
    };
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
        onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false)
    } : {};

    //check: children of SubMenu must be MenuItem
    const renderChildren = () => {
        const childrenComponent = React.Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return childElement;
            } else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }
        });
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    };

    return (
        <li key={index} className={classes} {...clickEvents} {...hoverEvents}>
            <div className="submenu-title">
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;