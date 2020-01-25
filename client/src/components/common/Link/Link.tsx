import classNames from 'classnames';
import React, { FC } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

import styles from './Link.module.scss';

export interface ILinkProps extends LinkProps {
    theme?: 'default' | 'alt';
}

export const Link: FC<ILinkProps> = ({
    children,
    className,
    theme = 'default',
    ...restProps
}) => {
    const linkClass = classNames(
        styles.link,
        styles['link_theme_' + theme],
        className,
    );

    return (
        <RouterLink className={linkClass} {...restProps}>
            {children}
        </RouterLink>
    );
};
