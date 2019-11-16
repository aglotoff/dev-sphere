/**
 * @file API reducers
 * @author Andrey Glotov
 */

import {
    ApiActionTypes,
    CLEAR_API_ERROR,
    IApiState,
    SET_API_ERROR,
} from './types';

const initialState: IApiState = {
    error: null,
};

/**
 * The API reducer
 *
 * @param state The current state
 * @param action The dispatched action
 */
export const apiReducer = (
    state: IApiState = initialState,
    action: ApiActionTypes,
) => {
    switch (action.type) {
        case SET_API_ERROR:
            return {
                ...state,
                error: action.payload.error,
            };
        case CLEAR_API_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
