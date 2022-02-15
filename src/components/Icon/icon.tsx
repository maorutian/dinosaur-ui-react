import React from 'react';
import classNames from 'classnames';
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';

//css Contextual colors
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps,
}

const Icon: React.FC<IconProps> = (props) => {
    // icon-primary
    const {className, theme, ...restProps} = props;
    const classes = classNames('dinosaur-icon', className, {
        [`icon-${theme}`]: theme,
    });
    return (
        <FontAwesomeIcon className={classes} data-testid="test-icon" {...restProps} />
    )
}
export default Icon;