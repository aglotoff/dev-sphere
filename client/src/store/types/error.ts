/**
 * @file Application error state types, action constants and shapes.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { Action } from 'redux';

export const SET_ERROR = '@error/SET_ERROR';
export const CLEAR_ERROR = '@errori/CLEAR_ERROR';

/**
 * Shape of an error action.
 *
 * All actions representing errors have the error property set to true and the
 * error object itself passed as payload. This allows all application errors
 * be handled by one reducer.
 */
export type ErrorAction<T = any> = Action<T> & {
    payload: Error;
    error: true;
};

/**
 * Shape of a set error action.
 */
export interface ISetErrorAction extends Action <
    typeof SET_ERROR
> {
    payload: Error;
}

/**
 * Shape of a clear error action.
 */
export interface IClearErrorAction extends Action <
    typeof CLEAR_ERROR
> {
}

/**
 * All possible error actions.
 */
export type ErrorActionTypes =
    | ISetErrorAction
    | IClearErrorAction
;

/**
 * Check whether this is an error action.
 *
 * @param action The action object.
 * @return True if this an error action; false otherwise.
 */
export function isErrorAction(action: Action): action is ErrorAction {
    return (action as Action & { error: any }).error === true;
}
