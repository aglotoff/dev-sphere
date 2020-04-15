/**
 * @file Logo component.
 * @author Andrey Glotov
 */

// Imports
import classnames from 'classnames';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

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
    /** Hide title on mobile screens. */
    responsive?: boolean;
    /** Show the title next to the image. */
    showTitle?: boolean;
}

/**
 * Application logo, also acts as a link to the home page.
 */
export const Logo: FC<ILogoProps> = ({
    className,
    responsive,
    showTitle,
}) => {
    const logoClass = classnames(
        styles.logo,
        responsive && styles.logo_responsive,
        className,
    );

    return (
        <NavLink to="/" className={logoClass}>
            <img src={logoImage} alt="" className={styles.img} />
            {showTitle && <span className={styles.title}>DevSphere</span>}
        </NavLink>
    );
};
