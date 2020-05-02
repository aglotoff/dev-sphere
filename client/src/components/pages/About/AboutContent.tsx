/**
 * @file Contents of the About page.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';

// UI Imports
import { Breadcrumbs } from '../../layout/Breadcrumbs';

/**
 * Content of the About page.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const AboutContent: FC = () => (
    <>
        <Breadcrumbs items={[{
            label: 'Home',
            url: '/',
        }, {
            label: 'About',
            url: '/about',
        }]} />
    </>
);

export default AboutContent;
