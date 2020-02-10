/**
 * @file The authentication form component.
 * @author Andrey Glotov
 */

import classNames from 'classnames';
import React, {
    FC,
    FormEvent,
    PropsWithChildren,
} from 'react';

import { AuthFormCallout } from './AuthFormCallout';
import { AuthFormCheckbox } from './AuthFormCheckbox';
import { AuthFormField } from './AuthFormField';
import { AuthFormOr } from './AuthFormOr';
import { AuthFormSocialButton } from './AuthFormSocialButton';
import { AuthFormSubmit } from './AuthFormSubmit';
import { AuthFormTitle } from './AuthFormTitle';

import styles from './AuthForm.module.scss';

/**
 * Props for the Authentication form component.
 */
export interface IAuthFormProps {
    /** Additional class name. */
    className?: string;
    /** Handle a submit form event. */
    onSubmit?: (e?: FormEvent<HTMLFormElement>) => void;
}

export type IAuthForm = FC<PropsWithChildren<IAuthFormProps>> & {
    Callout: typeof AuthFormCallout;
    Checkbox: typeof AuthFormCheckbox;
    Field: typeof AuthFormField;
    Or: typeof AuthFormOr;
    SocialButton: typeof AuthFormSocialButton;
    Submit: typeof AuthFormSubmit;
    Title: typeof AuthFormTitle;
};

/**
 * The authentication form component.
 *
 * This component is the base for the LoginForm and the RegisterForm
 * components.
 *
 * @param props The component props.
 */
export const AuthForm: IAuthForm = ({
    children,
    className,
    onSubmit,
}) => {
    const formClass = classNames(
        styles.form,
        className,
    );

    return (
        <form className={formClass} onSubmit={onSubmit}>
            <div className={styles.formInner}>
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
