/**
 * @file Authentication page header.
 * @author Andrey Glotov
 */

import classNames from 'classnames';
import React, { FC } from 'react';

import { Logo } from '../../common/Logo';

import loginImage from '../../../assets/images/login.svg';

import styles from './AuthHeader.module.scss';

/**
 * Props for the authentication page component
 */
export interface IAuthHeaderProps {
    /** Page title */
    title: string;
    /** Lead paragraph */
    text: string;
    /** Additional class name */
    className: string;
}

/**
 * The authentication page header component
 *
 * @param props The component props
 */
export const AuthHeader: FC<IAuthHeaderProps> = ({
    title,
    text,
    className,
}) => {
    const headerClass = classNames(
        styles.header,
        className,
    );

    return (
        <header className={headerClass}>
            <Logo showTitle />
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.text}>{text}</p>
            <img src={loginImage} alt="" className={styles.image} />
        </header>
    );
};
