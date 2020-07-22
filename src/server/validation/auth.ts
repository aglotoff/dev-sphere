/**
 * @file Validation functions for API authentication routes.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import Joi from '@hapi/joi';

const loginSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(320)
        .required()
        .email(),
    password: Joi.string()
        .regex(/^[a-zA-Z0-9]{6,16}$/)
        .min(6)
        .required(),
});

/**
 * Validate the body of a login request.
 *
 * @param value The value to be validated
 *
 * @returns An object representing the validation results.
 */
export function validateLogin(value: any) {
    return loginSchema.validate(value);
}

const registerSchema = Joi.object({
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
});

/**
 * Validate the body of a register request.
 *
 * @param value The value to be validated
 *
 * @returns An object representing the validation results.
 */
export function validateRegister(value: any) {
    return registerSchema.validate(value);
}
