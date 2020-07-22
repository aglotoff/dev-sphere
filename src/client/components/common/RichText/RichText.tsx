/**
 * @file Rich Text component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import cn from 'classnames';
import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';

// CSS Imports
import styles from './RichText.module.scss';

/**
 * Props for the Rich Text component.
 */
export interface IRichTextProps {
    /** Defines which types of nodes should be allowed (default: all). */
    allowedTypes?: ReactMarkdown.NodeType[];
    /** Additional class name. */
    className?: string;
    /** Defines which types of nodes should be disallowed (default: none). */
    disallowedTypes?: ReactMarkdown.NodeType[];
}

/**
 * Container for rich formatted text with markdown language support.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const RichText: FC<IRichTextProps> = ({
    allowedTypes,
    children,
    className,
    disallowedTypes,
}) => (
    <ReactMarkdown
        allowedTypes={allowedTypes}
        className={cn(styles.container, className)}
        disallowedTypes={disallowedTypes}
    >
        {children}
    </ReactMarkdown>
);
