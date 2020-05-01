/**
 * @file The About page.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';

// UI Imports
import { Breadcrumbs } from '../../layout/Breadcrumbs';
import { Page } from '../../layout/Page';

/**
 * The Application About page.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const About: FC = () => (
    <Page title="About - DevSphere">
        <Breadcrumbs items={[{
            label: 'Home',
            url: '/',
        }, {
            label: 'About',
            url: '/about',
        }]} />
    </Page>
);
