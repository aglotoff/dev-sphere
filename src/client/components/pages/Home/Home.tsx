/**
 * @file The Home page.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';

// UI Imports
import { Page } from '../../layout/Page';

/**
 * The Application Home page.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const Home: FC = () => (
    <Page title="DevSphere - Social Network for Developers">
        Hello
    </Page>
);
