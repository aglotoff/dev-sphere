/**
 * @file Title component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import cn from 'classnames';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

// CSS Imports
import styles from './Title.module.scss';

/**
 * Props for the Title component.
 */
export interface ITitleProps {
    /** Center the title horizontally. */
    centered?: boolean;
    /** Additional class name. */
    className?: string;
    /** Apply inverse color? */
    inverse?: boolean;
    /** Apply large styles? */
    large?: boolean;
    /** HTML tag to use for the title element (h1 by default). */
    tag?: keyof JSX.IntrinsicElements;
    /** Target URL of an optional link. */
    url?: string;
}

/**
 * Title component with predefined appearance and an optional link.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const Title: FC<ITitleProps> = ({
    centered,
    children,
    className,
    inverse,
    large,
    tag = 'h1',
    url,
}) => {
    const titleClass = cn(
        styles.title,
        centered && styles.title_centered,
        inverse && styles.title_inverse,
        large && styles.title_large,
        className,
    );

    const Tag = tag;

    return (
        <Tag className={titleClass}>
            {url ? (
                <NavLink className={styles.link} to={url}>
                    {children}
                </NavLink>
            ) : children}
        </Tag>
    );
};
