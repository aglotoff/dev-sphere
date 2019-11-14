import classnames from 'classnames';
import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

import styles from './Link.module.scss';

interface ILinkProps extends LinkProps {
    theme?: 'default' | 'alt';
}

const Link = (props: ILinkProps) => {
    const { children, className, theme = 'default', ...restProps } = props;

    const linkClass = classnames(
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

export default Link;
