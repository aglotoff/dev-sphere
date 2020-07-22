/**
 * @file Thumbnail component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import classNames from 'classnames';
import React, { FC } from 'react';

// CSS Imports
import styles from './Thumbnail.module.scss';

// Assets Imports
import placeholder from '../../../assets/images/user-placeholder-small.png';

/**
 * Props for the Thumbnail Component.
 */
export interface IThumbnailProps {
    /** Alternative text description for the image. */
    alt?: string;
    /** Additional class name. */
    className?: string;
    /** Image URL (if not specified, a placeholder image will be used). */
    src?: string;
    /** Thumbnail size (default is "md"). */
    size?: 'xs' | 'sm' | 'md';
}

/**
 * Thumbnail for user avatars and other images.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const Thumbnail: FC<IThumbnailProps> = ({
    alt,
    className,
    src = placeholder,
    size = 'md',
}) => {
    const pictureClass = classNames(
        className,
        styles.image,
        styles[`image_size_${size}`],
    );

    return (
        <img
            alt={alt}
            className={pictureClass}
            src={src}
        />
    );
};
