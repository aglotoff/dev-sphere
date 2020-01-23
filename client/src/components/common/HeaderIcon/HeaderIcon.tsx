import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { FC } from 'react';

import styles from './HeaderIcon.module.scss';

export interface IHeaderIconProps {
    icon: IconDefinition;
    title: string;
    highlighted?: boolean;
    showIndicator?: boolean;
}

const HeaderIcon: FC<IHeaderIconProps> = ({
    icon,
    title,
    highlighted = false,
    showIndicator = false,
}) => {
    const iconClass = classNames(
        styles.icon,
        highlighted && styles.icon_highlighted,
        showIndicator && styles.icon_showIndicator,
    );

    return (
        <i className={iconClass}>
            <FontAwesomeIcon icon={icon} title={title} />
        </i>
    );
};

export default HeaderIcon;
