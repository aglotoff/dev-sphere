/**
 * @file Team component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import {
    faFacebookF,
    faInstagram,
    faLinkedinIn,
    faTwitter,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import React, { FC } from 'react';

// UI Imports
import { Title } from '../../common/Title';
import { TeamMember } from '../TeamMember';

// CSS Imports
import styles from './Team.module.scss';

// Image Imports
import pic2 from '../../../assets/images/avatars/XzA0ODEzMzAuanBn.jpg';
import pic3 from '../../../assets/images/avatars/XzA5MTU0MzMuanBn.jpg';
import pic1 from '../../../assets/images/avatars/XzAyMzg5NzUuanBn.jpg';

const members = [{
    name: 'John Doe',
    title: 'SEO & Founder',
    picture: pic1,
    socialLinks: [{
        icon: faFacebookF,
        label: 'Facebook',
        url: '/',
    }, {
        icon: faTwitter,
        label: 'Twitter',
        url: '/',
    }, {
        icon: faInstagram,
        label: 'Instagram',
        url: '/',
    }, {
        icon: faLinkedinIn,
        label: 'LinkedIn',
        url: '/',
    }, {
        icon: faYoutube,
        label: 'YouTube',
        url: '/',
    }],
}, {
    name: 'Jessica William',
    title: 'Art Director',
    picture: pic2,
    socialLinks: [{
        icon: faFacebookF,
        label: 'Facebook',
        url: '/',
    }, {
        icon: faTwitter,
        label: 'Twitter',
        url: '/',
    }, {
        icon: faInstagram,
        label: 'Instagram',
        url: '/',
    }, {
        icon: faLinkedinIn,
        label: 'LinkedIn',
        url: '/',
    }],
}, {
    name: 'Rock Smith',
    title: 'Developer',
    picture: pic3,
    socialLinks: [{
        icon: faFacebookF,
        label: 'Facebook',
        url: '/',
    }, {
        icon: faLinkedinIn,
        label: 'LinkedIn',
        url: '/',
    }, {
        icon: faYoutube,
        label: 'YouTube',
        url: '/',
    }],
}];

/**
 * Team section from the About page.
 *
 * @returns The element to render.
 */
export const Team: FC = () => (
    <section className={styles.container}>
        <div className={styles.inner}>
            <Title centered large tag="h2">
                Expert Team
            </Title>

            <div className={styles.memberList}>
                {members.map((member, i) => (
                    <div className={styles.member} key={String(i)}>
                        <TeamMember
                            name={member.name}
                            picture={member.picture}
                            socialLinks={member.socialLinks}
                            title={member.title}
                        />
                    </div>
                ))}
            </div>
        </div>
    </section>
);
