/**
 * @file API reducers
 * @author Andrey Glotov
 */

import {
    ApiActionTypes,
    CLEAR_ACCESS_TOKEN,
    CLEAR_API_ERROR,
    IApiState,
    SET_ACCESS_TOKEN,
    SET_API_ERROR,
} from './types';

const initialState: IApiState = {
    accessToken: null,
    error: null,
};

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
        case SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload.token,
            };
        case CLEAR_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: null,
            };
        default:
            return state;
    }
};
