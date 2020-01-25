/**
 * @file Application logo component.
 * @author Andrey Glotov
 */

import classnames from 'classnames';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

import logoImage from '../../../assets/images/logo.svg';

/**
 * Props for the Logo component.
 */
export interface IMainMenuProps {
    /** Additional class name. */
    className?: string;
}

/**
 * Application logo. Acts as a link to the home page.
 */
export const Logo: FC<IMainMenuProps> = ({ className }) => {
    const logoClass = classnames(
        styles.logo,
        className,
    );

    return (
        <Link to="/" className={logoClass}>
            <img src={logoImage} alt="" className={styles.img} />
            <span className={styles.text}>DevSphere</span>
        </Link>
    );
};
