import React, { PropsWithChildren } from 'react';

import Button, { IButtonProps } from '../../common/Button/Button';

import styles from './AuthForm.module.scss';

const AuthFormSubmit = (props: PropsWithChildren<IButtonProps>) => (
    <Button {...props} type="submit" className={styles.submit} />
);

export default AuthFormSubmit;
