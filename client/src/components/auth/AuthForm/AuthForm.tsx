/**
 * @file The authentication form component.
 * @author Andrey Glotov
 */

import classnames from 'classnames';
import React, { PropsWithChildren } from 'react';

import AuthFormCallout from './AuthFormCallout';
import AuthFormCheckbox from './AuthFormCheckbox';
import AuthFormField from './AuthFormField';
import AuthFormOr from './AuthFormOr';
import AuthFormSocialButton from './AuthFormSocialButton';
import AuthFormSubmit from './AuthFormSubmit';
import AuthFormTitle from './AuthFormTitle';

import styles from './AuthForm.module.scss';

/**
 * Props for the authentication form component.
 */
export interface IAuthFormProps {
    /** Additional class name */
    className?: string;

    /**
     * Handle a submit form event.
     *
     * @param e The event object
     */
    onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * The authentication form component.
 *
 * This component is the base for the <LoginForm /> and the <RegisterForm />
 * components.
 *
 * @param props The component props.
 */
const AuthForm = (props: PropsWithChildren<IAuthFormProps>) => {
    const { children, className, onSubmit } = props;

    const formClass = classnames(
        styles.form,
        className,
    );

    return (
        <form className={formClass} onSubmit={onSubmit}>
            <div className={styles.inner}>
                {children}
            </div>
        </form>
    );
};

AuthForm.Callout = AuthFormCallout;
AuthForm.Checkbox = AuthFormCheckbox;
AuthForm.Field = AuthFormField;
AuthForm.Or = AuthFormOr;
AuthForm.SocialButton = AuthFormSocialButton;
AuthForm.Submit = AuthFormSubmit;
AuthForm.Title = AuthFormTitle;

export default AuthForm;

export {
    AuthFormCallout,
    AuthFormCheckbox,
    AuthFormField,
    AuthFormOr,
    AuthFormSocialButton,
    AuthFormSubmit,
    AuthFormTitle,
};
