import classNames from 'classnames';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Link } from '../Link';

import logoImage from '../../../assets/images/logo.svg';

import styles from './Footer.module.scss';

export interface IFooterProps {
    className?: string;
    transparent?: boolean;
}

export const Footer: FC<IFooterProps> = ({
    className,
    transparent,
}) => {
    const creationYear = 2020;
    const currentYear = new Date().getFullYear();
    let copyYears;
    if (currentYear > creationYear) {
        copyYears = `${creationYear} - ${currentYear}`;
    } else {
        copyYears = String(creationYear);
    }

    const footerClass = classNames(
        styles.footer,
        transparent && styles.footer_transparent,
        className,
    );

    return (
        <footer className={footerClass}>
            <div className={styles.inner}>
                <div className={styles.copy}>
                    <img
                        src={logoImage}
                        alt=""
                        className={styles.logo}
                    />

                    <span className={styles.copyText}>
                        &copy;
                        {` ${copyYears} `}
                        DevSphere by
                        {' '}
                        <Link to="/">
                            Andreas
                        </Link>
                        . All Rights Reserved.
                    </span>
                </div>

                <nav className={styles.menu}>
                    <ul className={styles.menuList}>
                        <li className={styles.menuItem}>
                            <NavLink to="/privacy" className={styles.menuLink}>
                                Privacy
                            </NavLink>
                        </li>
                        <li className={styles.menuItem}>
                            <NavLink
                                to="/privacy"
                                className={styles.menuLink}
                            >
                                Privacy
                            </NavLink>
                        </li>
                        <li className={styles.menuItem}>
                            <NavLink
                                to="/terms-and-conditions"
                                className={styles.menuLink}
                            >
                                Terms and Conditions
                            </NavLink>
                        </li>
                        <li className={styles.menuItem}>
                            <NavLink
                                to="/about"
                                className={styles.menuLink}
                            >
                                About
                            </NavLink>
                        </li>
                        <li className={styles.menuItem}>
                            <NavLink
                                to="/contact-us"
                                className={styles.menuLink}
                            >
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};
