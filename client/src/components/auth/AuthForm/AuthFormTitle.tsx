import React, { FC, PropsWithChildren } from 'react';

import styles from './AuthForm.module.scss';

export const AuthFormTitle: FC<PropsWithChildren<{}>> = ({ children }) => (
    <h2 className={styles.title}>
        {children}
    </h2>
);
