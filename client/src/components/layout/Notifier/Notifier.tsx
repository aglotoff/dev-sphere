/**
 * @file Notifier component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import React, { FC, PropsWithChildren } from 'react';
import Media from 'react-media';
import { NavLink } from 'react-router-dom';

// UI Imports
import { Button } from '../../common/Button';
import { Dropdown } from '../../common/Dropdown';
import { HeaderButton } from '../HeaderButton';

// CSS Imports
import styles from './Notifier.module.scss';

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
    /** ID attribute for the dropdown popup. */
    popupId?: string;
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
    icon,
    title,
    viewAllUrl,
}) => (
    <HeaderButton
        href={viewAllUrl}
        icon={icon}
        showIndicator
        title={title}
    />
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
    popupId,
    settingsText = 'Settings',
    settingsUrl,
    title,
    viewAllText = 'View All Notifications',
    viewAllUrl,
}) => {
    const hasChildren = React.Children.count(children) > 0;

    return (
        <Dropdown
            popupId={popupId}
            renderButton={({ buttonRef, expanded }) => (
                <HeaderButton
                    aria-controls={popupId}
                    aria-expanded={expanded}
                    aria-haspopup="true"
                    highlighted={expanded}
                    icon={icon}
                    ref={buttonRef}
                    showIndicator={hasChildren}
                    title={title}
                />
            )}
        >
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
                        sharpTop
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
