/**
 * @file The About page.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import loadable from '@loadable/component';
import React, { FC } from 'react';

// UI Imports
import { Page, PageLoader } from '../../layout/Page';

const AboutContent = loadable(() => import('./AboutContent'), {
    fallback: <PageLoader />,
});

/**
 * The Application About page.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const About: FC = () => (
    <Page title="About - DevSphere">
        <AboutContent />
    </Page>
);
