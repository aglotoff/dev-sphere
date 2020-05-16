/**
 * @file Team Member component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

// UI Imports
import { Title } from '../../common/Title';

// CSS Imports
import styles from './TeamMember.module.scss';

/**
 * Props for the Team Member component.
 */
export interface ITeamMemberProps {
    /** Name of the person. */
    name: string;
    /** Picture of the person. */
    picture: string;
    /** Soical media links. */
    socialLinks: Array<{
        /** Social media icon. */
        icon: IconDefinition;
        /** Social Media Name. */
        label: string;
        /** Profile URL. */
        url: string;
    }>;
    /** Job Title. */
    title: string;
}

/**
 * Team member block from the About page.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const TeamMember: FC<ITeamMemberProps> = ({
    name,
    picture,
    socialLinks,
    title,
}) => (
    <div className={styles.container} tabIndex={0}>
        <div className={styles.inner}>
            <img className={styles.img} src={picture} alt="" />

            <div className={styles.overlay}>
                <div className={styles.overlayContent}>
                    <Title centered className={styles.name} inverse tag="h3">
                        {name}
                    </Title>

                    <div className={styles.title}>
                        {title}
                    </div>

                    <ul className={styles.social}>
                        {socialLinks.map(({ icon, label, url }, i) => (
                            <li className={styles.socialItem} key={i}>
                                <a className={styles.socialLink} href={url}>
                                    <FontAwesomeIcon
                                        icon={icon}
                                        title={label}
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
);
