import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { FC, PropsWithChildren } from 'react';

import { Dropdown } from '../Dropdown/Dropdown';

import styles from './HeaderDropdown.module.scss';

export interface IHeaderDropdownToggleProps {
    icon: IconDefinition;
    title: string;
    active?: boolean;
    showIndicator: boolean;
}

export const HeaderDropdownToggle: FC<IHeaderDropdownToggleProps> = ({
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

export interface IHeaderDropdownProps {
    icon: IconDefinition;
    title: string;
    showIndicator: boolean;
}

export const HeaderDropdown: FC<PropsWithChildren<IHeaderDropdownProps>> = ({
    children,
    ...restProps
}) => (
    <Dropdown renderToggle={({ expanded }) => (
        <HeaderDropdownToggle
            {...restProps}
            active={expanded}
        />
    )}>
        {children}
    </Dropdown>
);
