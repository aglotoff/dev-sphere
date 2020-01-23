import React, {
    EventHandler,
    FC,
    PropsWithChildren,
    SyntheticEvent,
} from 'react';

import Button from '../Button/Button';

import styles from './NotificationPopup.module.scss';

const NotificationPopupHeader: FC<PropsWithChildren<{}>> = ({ children }) => (
    <div className={styles.header}>
        {children}
    </div>
);

export interface INotificationPopupActionProps {
    href?: string;
    onClick?: EventHandler<SyntheticEvent>;
}

const NotificationPopupAction: FC<
    PropsWithChildren<INotificationPopupActionProps>
> = ({
    children,
    href,
    onClick,
}) => {
    if (href) {
        return (
            <a className={styles.action} href={href}>
                {children}
            </a>
        );
    } else {
        return (
            <button type="button" onClick={onClick} className={styles.action}>
                {children}
            </button>
        );
    }
};

export interface INotificationPopupViewAllProps {
    href: string;
}

const NotificationPopupViewAll: FC<
    PropsWithChildren<INotificationPopupViewAllProps>
> = ({
    children,
    href,
}) => (
    <Button href={href} className={styles.viewAll} sharp={true}>
        {children}
    </Button>
);

export type INotificationPopup = FC<PropsWithChildren<{}>> & {
    Header: typeof NotificationPopupHeader;
    Action: typeof NotificationPopupAction;
    ViewAll: typeof NotificationPopupViewAll;
};

const NotificationPopup: INotificationPopup = ({ children }) => (
    <div className={styles.popup}>
        {children}
    </div>
);
NotificationPopup.Header = NotificationPopupHeader;
NotificationPopup.Action = NotificationPopupAction;
NotificationPopup.ViewAll = NotificationPopupViewAll;

export {
    NotificationPopup as default,
    NotificationPopupHeader,
    NotificationPopupAction,
    NotificationPopupViewAll,
};
