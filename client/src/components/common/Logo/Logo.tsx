/**
 * @file Logo component.
 * @author Andrey Glotov
 */

// Imports
import classnames from 'classnames';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

// CSS Imports
import styles from './Logo.module.scss';

// Assets Imports
import logoImage from '../../../assets/images/logo.svg';

/**
 * Props for the Logo component.
 */
export interface ILogoProps {
    /** Additional class name. */
    className?: string;
    /** Hide text and show only image on mobile screens. */
    hideTextOnMobile?: boolean;
}

/**
 * Application logo, also acts as a link to the home page.
 */
export const Logo: FC<ILogoProps> = ({
    className,
    hideTextOnMobile,
}) => {
    const logoClass = classnames(
        styles.logo,
        hideTextOnMobile && styles.logo_hideTextMobile,
        className,
    );

    return (
        <Link to="/" className={logoClass}>
            <img src={logoImage} alt="" className={styles.img} />
            <span className={styles.text}>DevSphere</span>
        </Link>
    );
};
