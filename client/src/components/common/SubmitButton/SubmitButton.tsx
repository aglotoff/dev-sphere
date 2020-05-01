/**
 * @file Submit Button component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { FC, PropsWithChildren } from 'react';

// UI Imports
import { Button } from '../Button';

/**
 * Props for the SUbmit Button component.
 */
export interface ISubmitButtonProps {
    /** Additional class name. */
    className?: string;
    /** Is the form being currently submitted? */
    isSubmitting?: boolean;
}

/**
 * Form submit button with a loading spinner.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const SubmitButton: FC<PropsWithChildren<ISubmitButtonProps>> = ({
    children,
    className,
    isSubmitting,
}) => (
    <Button
        animateSpinner={isSubmitting}
        className={className}
        disabled={isSubmitting}
        icon={isSubmitting ? faSpinner : undefined}
        size="lg"
        type="submit"
    >
        {children}
    </Button>
);
