import React, {useContext, FunctionComponentElement} from 'react';
import classNames from 'classnames';
import {MenuContext} from './menu';
import {MenuItemProps} from './menuItem';

export interface SubMenuProps {
    className?: string;
    index?: number;
    title: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const {children, className, index, title} = props;
    const context = useContext(MenuContext);
    const classes = classNames('menu-item submenu-item', className, {
        //highlight submenu
        'is-active': context.index === index
    });
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
            <ul className='dinosaur-submenu'>
                {childrenComponent}
            </ul>
        )
    };

    return (
        <li key={index} className={classes}>
            <div className="submenu-title">
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;