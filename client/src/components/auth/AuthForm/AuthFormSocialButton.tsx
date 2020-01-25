import React, { FC } from 'react';

import { Button, IButtonProps } from '../../common/Button';

import styles from './AuthForm.module.scss';

export type IAuthFormSocialButtonProps = Omit<
    IButtonProps,
    'className' | 'size'
>;

export const AuthFormSocialButton: FC<IAuthFormSocialButtonProps> = (props) => (
    <Button {...props} className={styles.socialButton} size={'lg'} />
);
