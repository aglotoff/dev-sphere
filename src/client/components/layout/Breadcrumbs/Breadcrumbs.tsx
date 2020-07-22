/**
 * @file Breadcrumbs component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

// CSS Imports
import styles from './Breadcrumbs.module.scss';

/**
 * Shape of a breadcrumb item.
 */
export interface IBreadcrumbsItem {
    /** Link label. */
    label: string;
    /** Link URL. */
    url: string;
}

/**
 * Props for the Breadcrumbs component.
 */
export interface IBreadcrumbsProps {
    /** The set of links to display. */
    items: IBreadcrumbsItem[];
}

/**
 * Breadcrumb trail displayed on the top of application pages.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const Breadcrumbs: FC<IBreadcrumbsProps> = ({ items }) => (
    <nav aria-label="Breadcrumb" className={styles.container}>
        <ol
            className={styles.list}
            itemScope
            itemType="http://schema.org/BreadcrumbList"
        >
            {items.map(({ label, url }, i) => (
                <li
                    className={styles.item}
                    itemProp="itemListElement"
                    itemScope
                    itemType="http://schema.org/ListItem"
                    key={url}
                >
                    <NavLink
                        aria-current={(i === (items.length - 1)) ? 'page' : undefined}
                        className={styles.link}
                        itemID={url}
                        itemProp="item"
                        itemScope
                        itemType="http://schema.org/Thing"
                        to={url}
                    >
                        <span itemProp="name">{label}</span>
                    </NavLink>

                    <meta content={String(i + 1)} itemProp="position" />
                </li>
            ))}
        </ol>
    </nav>
);
