import React, {
    EventHandler,
    FC,
    PropsWithChildren,
    SyntheticEvent,
} from 'react';

import { Button } from '../Button/Button';

import styles from './DropdownPanel.module.scss';

export const DropdownPanelHeader: FC<PropsWithChildren<{}>> = ({
    children,
}) => (
    <div className={styles.header}>
        {children}
    </div>
);

export interface IDropdownPanelActionProps {
    href?: string;
    onClick?: EventHandler<SyntheticEvent>;
}

export const DropdownPanelAction: FC<
    PropsWithChildren<IDropdownPanelActionProps>
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

export interface IDropdownPanelViewAllProps {
    href: string;
}

export const DropdownPanelViewAll: FC<
    PropsWithChildren<IDropdownPanelViewAllProps>
> = ({
    children,
    href,
}) => (
    <Button href={href} className={styles.viewAll} sharp={true}>
        {children}
    </Button>
);

export const DropdownPanelPlaceholder: FC<PropsWithChildren<{}>> = ({
    children,
}) => (
    <div className={styles.placeholder}>
        {children}
    </div>
);

export type IDropdownPanel = FC<PropsWithChildren<{}>> & {
    Header: typeof DropdownPanelHeader;
    Action: typeof DropdownPanelAction;
    Placeholder: typeof DropdownPanelPlaceholder;
    ViewAll: typeof DropdownPanelViewAll;
};

export const DropdownPanel: IDropdownPanel = ({ children }) => (
    <div className={styles.panel}>
        {children}
    </div>
);
DropdownPanel.Header = DropdownPanelHeader;
DropdownPanel.Action = DropdownPanelAction;
DropdownPanel.ViewAll = DropdownPanelViewAll;
DropdownPanel.Placeholder = DropdownPanelPlaceholder;
