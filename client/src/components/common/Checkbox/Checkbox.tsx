import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent } from 'react';

import styles from './Checkbox.module.scss';

interface ICheckboxProps {
    checked: boolean;

    id: string;

    name: string;

    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: ICheckboxProps) => {
    const { checked, id, name, onChange } = props;

    return (
        <label className={styles.checkbox}>
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                className={styles.input}
                onChange={onChange}
            />
            <span className={styles.square}>
                <FontAwesomeIcon icon={faSquare} />
                <span className={styles.check}>
                    <FontAwesomeIcon icon={faCheckSquare} />
                </span>
            </span>
        </label>
    );
};

export default Checkbox;
