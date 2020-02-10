import React, { FC, PropsWithChildren } from 'react';

import styles from './AuthForm.module.scss';

export const AuthFormCallout: FC<PropsWithChildren<{}>> = ({ children }) => (
    <div className={styles.callout}>
        {children}
    </div>
);
