import React, { FC } from 'react';

import { Button, IButtonProps } from '../../common/Button';

import styles from './AuthForm.module.scss';

export type IAuthFormSubmitProps = Omit<
    IButtonProps,
    'className' | 'size' | 'type'
>;

export const AuthFormSubmit: FC<IAuthFormSubmitProps> = (props) => (
    <Button {...props} type="submit" className={styles.submit} size={'lg'} />
);
