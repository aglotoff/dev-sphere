/**
 * @file Notifier component.
 * @author Andrey Glotov
 */

// Imports
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { FC, PropsWithChildren } from 'react';
import Media from 'react-media';
import { NavLink } from 'react-router-dom';

// UI Imports
import { Button } from '../../common/Button';
import { Dropdown } from '../../common/Dropdown';

// CSS Imports
import styles from './Notifier.module.scss';

/**
 * Props for the Notifier Icon component.
 */
export interface INotifierIconProps {
    /** Apply the highlighted class (used when the dropdown is expanded). */
    highlighted?: boolean;
    /** The Font Awesome icon. */
    icon: IconDefinition;
    /** Show an indicator in the corner of the box. */
    showIndicator?: boolean;
    /** Optional title to make the icon accessible. */
    title?: string;
}

/**
 * Icon component to display inside the notifier with an optional round
 * indicator in the top right corner.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const NotifierIcon: FC<INotifierIconProps> = ({
    highlighted,
    icon,
    showIndicator,
    title,
}) => {
    const iconBoxClass = classNames(
        styles.iconBox,
        highlighted && styles.iconBox_highlighted,
        showIndicator && styles.iconBox_showIndicator,
    );

    return (
        <i className={iconBoxClass}>
            <FontAwesomeIcon
                className={styles.icon}
                icon={icon}
                title={title}
            />
        </i>
    );
};

/**
 * Props for the Top Notifier component.
 */
export interface INotifierProps {
    /** Additional class name. */
    className?: string;
    /** Text to display if there are no notifications. */
    emptyText?: string;
    /** Notifier icon. */
    icon: IconDefinition;
    /** Handle clicking on the "Clear All" button. */
    onClearAll?: () => void;
    /** Text for the "Settings" link. */
    settingsText?: string;
    /** URL for the "Settings" link. */
    settingsUrl: string;
    /** Notifier title (for accessibility purposes). */
    title: string;
    /** Text for the "View All" link. */
    viewAllText?: string;
    /** URL for the "View All" link. */
    viewAllUrl: string;
}

/**
 * Mobile view of the Notifer component.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const NotifierMobile: FC<PropsWithChildren<INotifierProps>> = ({
    children,
    icon,
    title,
    viewAllUrl,
}) => (
    <NavLink className={styles.link} to={viewAllUrl}>
        <NotifierIcon
            icon={icon}
            showIndicator={React.Children.count(children) > 0}
            title={title}
        />
    </NavLink>
);

/**
 * Desktop view of the Notifier component.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const NotifierDesktop: FC<PropsWithChildren<INotifierProps>> = ({
    children,
    emptyText = 'You have no unread notifications',
    icon,
    onClearAll,
    settingsText = 'Settings',
    settingsUrl,
    title,
    viewAllText = 'View All Notifications',
    viewAllUrl,
}) => {
    const hasChildren = React.Children.count(children) > 0;

    return (
        <Dropdown renderButton={({ buttonRef, expanded }) => (
            <button className={styles.button} ref={buttonRef}>
                <NotifierIcon
                    highlighted={expanded}
                    icon={icon}
                    showIndicator={hasChildren}
                    title={title}
                />
            </button>
        )}>
            <div className={styles.panel}>
                <div className={styles.header}>
                    <NavLink className={styles.action} to={settingsUrl}>
                        {settingsText}
                    </NavLink>

                    {hasChildren && (
                        <button className={styles.action} onClick={onClearAll}>
                            Clear All
                        </button>
                    )}
                </div>

                {hasChildren ? (
                    children
                ) : (
                    <div className={styles.empty}>
                        {emptyText}
                    </div>
                )}

                {hasChildren && (
                    <Button
                        className={styles.viewAll}
                        href={viewAllUrl}
                        sharp
                    >
                        {viewAllText}
                    </Button>
                )}
            </div>
        </Dropdown>
    );
};

/**
 * Notifier component displayed in the top bar.
 *
 * On desktop has a dropdown containing the notifications. On mobile this is
 * just a link.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const Notifier: FC<PropsWithChildren<INotifierProps>> = (props) => (
    <Media query="(min-width: 60em)">
        {(matches) => matches ? (
            <NotifierDesktop {...props} />
        ) : (
            <NotifierMobile {...props} />
        )}
    </Media>
);
