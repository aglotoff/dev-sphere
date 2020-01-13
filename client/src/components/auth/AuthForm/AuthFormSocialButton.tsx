import React, { PropsWithChildren } from 'react';

import Button, { IButtonProps } from '../../common/Button/Button';

import styles from './AuthForm.module.scss';

const AuthFormSocialButton = (props: PropsWithChildren<IButtonProps>) => (
    <Button className={styles.socialButton} {...props} />
);

export default AuthFormSocialButton;
