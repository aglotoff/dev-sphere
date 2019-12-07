import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

import logo from '../../../images/logo.svg';

const Logo = () => {
    return (
        <Link to="/" className={styles.logo}>
            <img src={logo} alt="" className={styles.img} />
            <span className={styles.text}>DevSphere</span>
        </Link>
    );
};

export default Logo;
