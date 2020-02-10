import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
    FC,
    MouseEventHandler,
    PropsWithChildren,
    useState,
} from 'react';

import styles from './Alert.module.scss';

export interface IAlertProps {
    /** Handle alert dismiss event */
    onDismiss: () => void;
}

export const Alert: FC<PropsWithChildren<IAlertProps>> = ({
    children,
    onDismiss,
}) => {
    const [ visible, setVisible ] = useState(true);

    if (!visible) {
        return null;
    }

    const handleClose: MouseEventHandler = (e) => {
        e.preventDefault();
        setVisible(false);
        onDismiss();
    };

    return (
        <div className={styles.alert}>
            {children}
            <button className={styles.close} onClick={handleClose}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>
    );
};
