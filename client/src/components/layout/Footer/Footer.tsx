/**
 * @file Footer component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import classNames from 'classnames';
import React, { FC } from 'react';

// UI Imports
import { Link } from '../../common/Link';
import { Logo } from '../../common/Logo';
import { FooterMenu } from '../FooterMenu';

// CSS Imports
import styles from './Footer.module.scss';

/**
 * Build dynamic copyright notice.
 *
 * @returns The date to be used inside the copyright notice.
 */
export function copyYears(startYear: number) {
    const currentYear = new Date().getFullYear();

    if (currentYear > startYear) {
        return `${startYear} - ${currentYear}`;
    } else {
        return String(startYear);
    }
}

const START_YEAR = 2020;
const APP_NAME = 'DevSphere';
const CREATOR_NAME = 'Andreas';
const CREATOR_URL = '#';

/**
 * Props for the Footer component.
 */
export interface IFooterProps {
    /** Additional class name. */
    className?: string;
    /** Use transparent background? */
    transparent?: boolean;
}

/**
 * Application footer.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const Footer: FC<IFooterProps> = ({
    className,
    transparent,
}) => {
    const footerClass = classNames(
        styles.footer,
        transparent && styles.footer_transparent,
        className,
    );

    return (
        <footer className={footerClass}>
            <div className={styles.inner}>
                <div className={styles.copy}>
                    <Logo className={styles.logo} />

                    <span className={styles.copyText}>
                        &copy;
                        {` ${copyYears(START_YEAR)} ${APP_NAME} by `}
                        <Link href={CREATOR_URL}>{CREATOR_NAME}</Link>.
                        All Rights Reserved.
                    </span>
                </div>

                <FooterMenu className={styles.menu} />
            </div>
        </footer>
    );
};
