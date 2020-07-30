/**
 * @file Link component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import classNames from 'classnames';
import React, { AnchorHTMLAttributes, forwardRef } from 'react';
import { NavLink } from 'react-router-dom';

// CSS Imports
import styles from './Link.module.scss';

/**
 * Check if the URL is absolute.
 *
 * @param url The URL to check.
 * @returns `true` if the passed URL is absolute; `false` otherwise.
 */
export function isExternal(url: string) {
    return /^https?:\/\//.test(url);
}

/**
 * Props for the Link component.
 */
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Target URL. */
    href: string;
    /** Appearance theme. */
    theme?: 'default' | 'alt';
}

/**
 * Link component with predefined styles.
 *
 * If the specified href is an internal URL, renders a React Router's NavLink;
 * otherwise renders an ordinary HTML anchor.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>((
    {
        children,
        className,
        href,
        theme = 'default',
        ...restProps
    },
    forwardedRef,
) => {
    const linkClass = classNames(
        styles.link,
        styles[`link_theme_${theme}`],
        className,
    );

    return isExternal(href) ? (
        <a
            className={className}
            href={href}
            ref={forwardedRef}
            {...restProps}
        >
            {children}
        </a>
    ) : (
        <NavLink
            className={linkClass}
            innerRef={forwardedRef}
            to={href}
            {...restProps}
        >
            {children}
        </NavLink>
    );
});
