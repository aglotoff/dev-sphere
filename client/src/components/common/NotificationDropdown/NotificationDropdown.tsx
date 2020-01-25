import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { FC, PropsWithChildren } from 'react';

import { Dropdown } from '../Dropdown/Dropdown';

import styles from './NotificationDropdown.module.scss';

export interface INotificationDropdownToggleProps {
    icon: IconDefinition;
    title: string;
    active?: boolean;
    showIndicator: boolean;
}

export const NotificationDropdownToggle: FC<
    INotificationDropdownToggleProps
> = ({
    active = false,
    icon,
    showIndicator = false,
    title,
}) => {
    const toggleClass = classnames(
        styles.toggle,
        active && styles.toggle_active,
        showIndicator && styles.toggle_indicated,
    );

    return (
        <span className={toggleClass}>
            <i className={styles.toggleIcon}>
                <FontAwesomeIcon icon={icon} title={title} />
            </i>
        </span>
    );
};

export interface INotificationDropdownProps {
    icon: IconDefinition;
    title: string;
    showIndicator: boolean;
}

export const NotificationDropdown: FC<
    PropsWithChildren<INotificationDropdownProps>
> = ({ children, ...restProps }) => (
    <Dropdown renderToggle={({ expanded }) => (
        <NotificationDropdownToggle
            {...restProps}
            active={expanded}
        />
    )}>
        {children}
    </Dropdown>
);
