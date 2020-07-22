/**
 * @file The About page.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';
import imported from 'react-imported-component';

// UI Imports
import { Page, PageLoader } from '../../layout/Page';

const AboutContent = imported(
    () => import(/* webpackChunkName: "AboutPage" */ './AboutContent'),
    {
        LoadingComponent: PageLoader,
    },
);

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
