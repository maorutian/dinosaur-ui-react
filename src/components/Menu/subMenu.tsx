import React, {useContext, FunctionComponentElement, useState} from 'react';
import classNames from 'classnames';
import {CSSTransition} from 'react-transition-group';
import {MenuContext} from './menu';
import {MenuItemProps} from './menuItem';
import Icon from '../Icon/icon';

export interface SubMenuProps {
    className?: string;
    index?: string;
    title: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const {children, className, index, title} = props;
    const context = useContext(MenuContext);

    //open subMenu when defaultOpenSubMenus is passed (vertical mode)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
    const isOpen = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    const [menuOpen, setOpen] = useState(isOpen);

    //highlight submenu
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });

    //open/close subMenu div
    const subMenuClasses = classNames('dinosaur-submenu', {
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
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                //add index to each menuItem in SubMenu "0-0","0-1","0-2"
                return React.cloneElement(childElement, {index: `${index}-${i}`});
            } else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }
        });
        return (
            <CSSTransition
                in={menuOpen}
                timeout={300}
                classNames="zoom-in-top"
                appear
                unmountOnExit
            >
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </CSSTransition>
        )
    };

    return (
        <li key={index} className={classes}  {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon"/>
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;