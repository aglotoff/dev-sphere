import React, { PropsWithChildren } from 'react';

import styles from './AuthForm.module.scss';

const AuthFormTitle = (props: PropsWithChildren<any>) => (
    <h2 className={styles.title}>{props.children}</h2>
);

export default AuthFormTitle;
