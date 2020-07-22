/**
 * @file Footer Menu component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import classNames from 'classnames';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

// CSS Imports
import styles from './FooterMenu.module.scss';

const items = [{
    href: '/privacy',
    title: 'Privacy',
    key: 'Privacy',
}, {
    href: '/terms-and-conditions',
    title: 'Terms and Conditions',
    key: 'Terms and Conditions',
}, {
    href: '/about',
    title: 'About',
    key: 'About',
}, {
    href: '/contact-us',
    title: 'Contact Us',
    key: 'Contacts Us',
}];

/**
 * Props for the Footer Menu component.
 */
export interface IFooterMenuProps {
    /** Additional class name. */
    className?: string;
}

/**
 * Menu displayed in the application Footer.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const FooterMenu: FC<IFooterMenuProps> = ({ className }) => {
    const footerClass = classNames(
        styles.menu,
        className,
    );

    return (
        <nav aria-label="Footer Menu" className={footerClass}>
            <ul className={styles.list}>
                {items.map(({ href, key, title }) => (
                    <li className={styles.item} key={key}>
                        <NavLink className={styles.link} to={href}>
                            {title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
