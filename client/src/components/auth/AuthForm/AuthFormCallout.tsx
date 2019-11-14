import React, { PropsWithChildren } from 'react';

import styles from './AuthForm.module.scss';

const AuthFormCallout = (props: PropsWithChildren<{}>) => {
    return (
        <div className={styles.callout}>
            {props.children}
        </div>
    );
};

export default AuthFormCallout;
