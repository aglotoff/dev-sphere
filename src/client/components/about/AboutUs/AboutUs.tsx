/**
 * @file About Us component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import {
    faCalendarPlus,
    faCheckSquare,
    faCreditCard,
    faSmile,
} from '@fortawesome/free-regular-svg-icons';
import React, { FC } from 'react';

// UI Imports
import { Button } from '../../common/Button';
import { RichText } from '../../common/RichText';
import { Title } from '../../common/Title';
import { Feature } from '../Feature';

// CSS Imports
import styles from './AboutUs.module.scss';

const text = `
Vivamus tortor nisl, lobortis in, faucibus et, tempus at, dui. Nunc risus.
Proin scelerisque augue. Nam ullamcorper. Phasellus id massa. Pellentesque
nisl. Pellentesque habitant tuni morbi tristique senectus et netus et malesuada
fames ac turpis egestas. Nunc augue. Aenean sed justo non leo vehicula laoreet.
Praesent ipsum libero, auctor ac, tempus nec, casion tempor nec, justo cretusi
sino zumbua iloseum musumfu lilokuta nabase uchihaitachi suctung from munual
pracetamol curom ose testio soel lorem isutm pausm mintest osrit ucii.

Maecenas ullamcorper, odio vel tempus egestas, dui orci faucibus orci, sit amet
aliquet lectus dolor et quam. Pellentesque consequat luctus purus. Nunc et
risus. Etiam a nibh tunil Phasellus dignissim metus eget nisi. Vestibulum
sapien dolor, aliquet nec, porta ac, malesuada a, libero. Praesent feugiat
purus eget est. Nulla facilisi. Vestibulum tincidunt sapiens eu velit. Mauris
purus. Maecenas eget mauris eu orci accumsan feugiat. Pellentesque eget velit.
Nunc tincidunt.
`;

const features = [{
    icon: faCalendarPlus,
    title: 'Create Event',
    desc: 'Praesent rhoncus urna nec justo suscipit, id congue justo dictum.',
}, {
    icon: faCheckSquare,
    title: 'Book Seats',
    desc: 'Praesent rhoncus urna nec justo suscipit, id congue justo dictum.',
}, {
    icon: faCreditCard,
    title: 'Buy Tickets',
    desc: 'Praesent rhoncus urna nec justo suscipit, id congue justo dictum.',
}, {
    icon: faSmile,
    title: 'Enjoy',
    desc: 'Praesent rhoncus urna nec justo suscipit, id congue justo dictum.',
}];

/**
 * About Us section of the About page.
 *
 * @return The element to render.
 */
export const AboutUs: FC = () => (
    <section className={styles.container}>
        <div className={styles.inner}>
            <Title centered large>
                About Us
            </Title>

            <RichText className={styles.text}>
                {text}
            </RichText>

            <ul className={styles.featureList}>
                {features.map(({ desc, icon, title }, i) => (
                    <li className={styles.feature} key={String(i)}>
                        <Feature
                            desc={desc}
                            icon={icon}
                            title={title}
                        />
                    </li>
                ))}
            </ul>

            <div className={styles.bottom}>
                <Button className={styles.link} href="/" size="lg">
                    Post an Event
                </Button>
            </div>
        </div>
    </section>
);
