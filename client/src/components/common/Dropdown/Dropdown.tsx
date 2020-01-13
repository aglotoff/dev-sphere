import classnames from 'classnames';
import React, {
    KeyboardEventHandler,
    MouseEventHandler,
    PropsWithChildren,
    useEffect,
    useRef,
    useState,
} from 'react';

import styles from './Dropdown.module.scss';

export interface IInjectedDropdownToggleProps {
    expanded: boolean;
}

export interface IDropdownProps {
    className?: string;
    id?: string;
    renderToggle: (props: IInjectedDropdownToggleProps) => any;
}

const Dropdown = (props: PropsWithChildren<IDropdownProps>) => {
    const { children, className, id, renderToggle } = props;

    const [ expanded, setExpanded ] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (expanded) {
            const handleOutsideClick = (e: Event) => {
                const target = e.target;

                if (
                    (target !== document) &&
                    (target instanceof HTMLElement) &&
                    !dropdownRef.current!.contains(target)
                ) {
                    setExpanded(false);
                }
            };

            document.addEventListener('click', handleOutsideClick);
            document.addEventListener('focusin', handleOutsideClick);

            dropdownRef.current!.focus();

            return () => {
                document.removeEventListener('click', handleOutsideClick);
                document.removeEventListener('focusin', handleOutsideClick);
            };
        }
    }, [ expanded ]);

    const handleClick: MouseEventHandler = (e) => {
        e.preventDefault();
        setExpanded(!expanded);
    };

    const handleKeyDown: KeyboardEventHandler = (e) => {
        if (e.key === 'Escape') {
            setExpanded(false);
            toggleRef.current!.focus();
        }
    };

    const dropdownClass = classnames(
        styles.dropdown,
        className,
    );

    const drawerClass = classnames(
        styles.drawer,
        expanded && styles.drawer_expanded,
    );

    return (
        <div
            className={dropdownClass}
            onClick={handleClick}
            ref={dropdownRef}
        >
            <button
                className={styles.toggle}
                aria-haspopup="true"
                aria-expanded={expanded}
                aria-controls={id}
                ref={toggleRef}
            >
                {renderToggle({ expanded })}
            </button>

            <div
                className={drawerClass}
                id={id}
                onKeyDown={handleKeyDown}
            >
                {children}
            </div>
        </div>
    );
};

export default Dropdown;
