/**
 * @file Validation functions for authentication routes
 * @author Andrey Glotov
 */

import Joi from 'joi';

const loginSchema = {
    email: Joi.string()
        .min(6)
        .max(320)
        .required()
        .email(),
    password: Joi.string()
        .regex(/^[a-zA-Z0-9]{6,16}$/)
        .min(6)
        .required(),
};

const registerSchema = {
    fullName: Joi.string()
        .trim()
        .required(),
    email: Joi.string()
        .min(6)
        .max(320)
        .required()
        .email(),
    password: Joi.string()
        .regex(/^[a-zA-Z0-9]{6,16}$/)
        .min(6)
        .required(),
};

/**
 * Validate the body of a login request.
 *
 * @param value The value to be validated
 *
 * @returns An object representing the validation results
 */
export function validateLogin(value: any) {
    return Joi.validate(value, loginSchema);
}

/**
 * Validate the body of a register request.
 *
 * @param value The value to be validated
 *
 * @returns An object representing the validation results
 */
export function validateRegister(value: any) {
    return Joi.validate(value, registerSchema);
}
