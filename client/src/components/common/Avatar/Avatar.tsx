import classNames from 'classnames';
import React, { FC } from 'react';

import placeholder from '../../../assets/images/user-placeholder-small.png';

import styles from './Avatar.module.scss';

export interface IAvatarProps {
    /** Additional class name. */
    className?: string;
    /** Profile picture. */
    picture?: string;
    /** Picture size */
    size?: 'sm' | 'md';
}

export const Avatar: FC<IAvatarProps> = ({
    className,
    picture = placeholder,
    size = 'md',
}) => {
    const pictureClass = classNames(
        className,
        styles.image,
        styles['image_size_' + size],
    );

    return (
        <img
            src={picture}
            alt=""
            className={pictureClass}
        />
    );
};
