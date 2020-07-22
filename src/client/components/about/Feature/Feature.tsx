/**
 * @file Feature component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

// UI Imports
import { RichText } from '../../common/RichText';
import { Title } from '../../common/Title';

// CSS Imports
import styles from './Feature.module.scss';

/**
 * Props for the Feature component.
 */
export interface IFeatureProps {
    /** Feature description. */
    desc: string;
    /** Feature icon. */
    icon: IconDefinition;
    /** Feature title. */
    title: string;
}

/**
 * Feature block from the About page.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const Feature: FC<IFeatureProps> = ({
    desc,
    icon,
    title,
}) => (
    <div className={styles.container}>
        <span aria-hidden className={styles.icon}>
            <FontAwesomeIcon icon={icon} />
        </span>

        <Title centered className={styles.title} tag="h2">
            {title}
        </Title>

        <RichText className={styles.desc}>
            {desc}
        </RichText>
    </div>
);
