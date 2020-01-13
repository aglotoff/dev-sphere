import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, PropsWithChildren, useState } from 'react';

import styles from './Alert.module.scss';

interface IAlertProps {
    /** Handle alert dismiss event */
    onDismiss: () => void;
}

const Alert = (props: PropsWithChildren<IAlertProps>) => {
    const { children, onDismiss } = props;

    const [ visible, setVisible ] = useState(true);

    if (!visible) {
        return null;
    }

    const handleClose = (e: MouseEvent) => {
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

export default Alert;
