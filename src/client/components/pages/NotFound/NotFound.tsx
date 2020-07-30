/**
 * @file Error 404 page.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';

// UI Imports
import { Error404 } from '../../404/Error404';
import { Page } from '../../layout/Page';

/**
 * Default Error 404 page.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const NotFound: FC = () => (
    <Page title="Page Not Found">
        <Error404 />
    </Page>
);
