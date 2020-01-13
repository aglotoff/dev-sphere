/**
 * @file Authentication page header.
 * @author Andrey Glotov
 */

import classnames from 'classnames';
import React from 'react';

import Logo from '../../common/Logo/Logo';

import loginImage from '../../../images/login.svg';

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
const AuthHeader = (props: IAuthHeaderProps) => {
    const { title, text, className } = props;

    const headerClass = classnames(
        styles.header,
        className,
    );

    return (
        <header className={headerClass}>
            <Logo />
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.text}>{text}</p>
            <img src={loginImage} alt="" className={styles.image} />
        </header>
    );
};

export default AuthHeader;
