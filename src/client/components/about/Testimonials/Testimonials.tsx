/**
 * @file Testimonials component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';

// UI Imports
import { Title } from '../../common/Title';

// CSS Imports
import '../../../assets/styles/test.css';
import '../../../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';

import styles from './Testimonials.module.scss';

const testimonials = [{
    title: 'This is a best plateform for event sharing in the world.',
    text: 'Quisque at arcu ipsum. Proin sit amet diam auctor lectus imperdiet hendrerit. Quisque laoreet tristique scelerisque. Suspendisse augue nunc, consequat quis fermentum id, dignissim at mi. Nullam eu lorem fermentum nisl imperdiet rutrum non ac sapien.',
    authorName: 'Rock William',
    authorCountry: 'Australia',
}, {
    title: 'This is a best plateform for event sharing in the world.',
    text: 'Quisque at arcu ipsum. Proin sit amet diam auctor lectus imperdiet hendrerit. Quisque laoreet tristique scelerisque. Suspendisse augue nunc, consequat quis fermentum id, dignissim at mi. Nullam eu lorem fermentum nisl imperdiet rutrum non ac sapien.',
    authorName: 'Jessica Smith',
    authorCountry: 'USA',
}, {
    title: 'This is a best plateform for event sharing in the world.',
    text: 'Quisque at arcu ipsum. Proin sit amet diam auctor lectus imperdiet hendrerit. Quisque laoreet tristique scelerisque. Suspendisse augue nunc, consequat quis fermentum id, dignissim at mi. Nullam eu lorem fermentum nisl imperdiet rutrum non ac sapien.',
    authorName: 'John Doe',
    authorCountry: 'Canada',
}];

/**
 * Testimonials section from the About page.
 *
 * @returns The element to render.
 */
export const Testimonials: FC = () => (
    <section className={styles.container}>
        <div className={styles.inner}>
            <Title centered large tag="h2">
                Testimonials
            </Title>

            <Carousel
                autoPlay
                className={styles.carousel}
                infiniteLoop
                interval={7500}
                showArrows={false}
                showStatus={false}
                showThumbs={false}
            >
                {testimonials.map((item, i) => (
                    <blockquote className={styles.item} key={String(i)}>
                        <h3 className={styles.itemTitle}>
                            {item.title}
                        </h3>

                        <p className={styles.itemText}>
                            {item.text}
                        </p>

                        <footer className={styles.author}>
                            <cite>
                                <Title tag="span">
                                    {item.authorName}
                                </Title>
                                <span className={styles.authorCountry}>
                                    {item.authorCountry}
                                </span>
                            </cite>
                        </footer>
                    </blockquote>
                ))}
            </Carousel>
        </div>
    </section>
);
