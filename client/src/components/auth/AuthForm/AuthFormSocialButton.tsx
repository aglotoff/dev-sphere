import React, { PropsWithChildren } from 'react';

import Button, { IButtonProps } from '../../common/Button/Button';

import styles from './AuthForm.module.scss';

const AuthFormSocialButton = (props: PropsWithChildren<IButtonProps>) => (
    <Button {...props} className={styles.socialButton} size={'lg'} />
);

export default AuthFormSocialButton;
