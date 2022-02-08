import React, {FC, ReactElement, InputHTMLAttributes, ChangeEvent} from 'react';
import classNames from 'classnames';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProp;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = (props) => {
    const {
        className,
        disabled,
        size,
        icon,
        prepend,
        append,
        style,
        ...restProps
    } = props;

    const classes = classNames('dinosaur-input-wrapper', className, {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
    })

    if ('value' in props) {
        //if input contains value and defaultValue, delete defaultValue, input must be either controlled or uncontrolled
        delete restProps.defaultValue;
        //if input contains value, it cannot be undefined or null, must be initialized
        restProps.value = (typeof restProps.value === 'undefined' || restProps.value === null) ? '' : restProps.value;
    }

    return (
        <div className={classes} style={style}>
            {prepend && <div className="dinosaur-input-group-prepend">{prepend}</div>}
            {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
            <input
                className="dinosaur-input-inner"
                disabled={disabled}
                {...restProps}
            />
            {append && <div className="dinosaur-input-group-append">{append}</div>}
        </div>
    )
}

export default Input;