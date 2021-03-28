import { IResetPasswordForm } from '../models/forms';
import { FORMAT_RULES, ERRORS } from '../constants/formRules';
/* eslint-disable @typescript-eslint/no-explicit-any */
const { passwordMax } = FORMAT_RULES;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validate = (values: any) => {
    const { password, confirmPassword } = values;
    const errors: IResetPasswordForm | any = {};

    if (!password) {
        errors.password = ERRORS.required(`mon mot de passe`);
    } else if (password.length > passwordMax) {
        errors.password = ERRORS.size(`mon mot de passe`, passwordMax);
    }
    if (!confirmPassword) {
        errors.confirmPassword = ERRORS.required(`la confirmation`);
    } else if (confirmPassword !== password) {
        errors.confirmPassword = ERRORS.mismatch(`Les mots de passe`);
    }
    if (!password) {
        errors.password = ERRORS.required(`mon mot de passe`);
    } else if (password.length > passwordMax) {
        errors.password = ERRORS.size(`mon mot de passe`, passwordMax);
    }
    if (!confirmPassword) {
        errors.confirmPassword = ERRORS.required(`la confirmation`);
    } else if (confirmPassword !== password) {
        errors.confirmPassword = ERRORS.mismatch(`Les mots de passe`);
    }
    if (!password) {
        errors.password = ERRORS.required(`mon mot de passe`);
    } else if (password.length > passwordMax) {
        errors.password = ERRORS.size(`mon mot de passe`, passwordMax);
    }
    if (!confirmPassword) {
        errors.confirmPassword = ERRORS.required(`la confirmation`);
    } else if (confirmPassword !== password) {
        errors.confirmPassword = ERRORS.mismatch(`Les mots de passe`);
    }
    if (!password) {
        errors.password = ERRORS.required(`mon mot de passe`);
    } else if (password.length > passwordMax) {
        errors.password = ERRORS.size(`mon mot de passe`, passwordMax);
    }
    if (!confirmPassword) {
        errors.confirmPassword = ERRORS.required(`la confirmation`);
    } else if (confirmPassword !== password) {
        errors.confirmPassword = ERRORS.mismatch(`Les mots de passe`);
    }
    if (!password) {
        errors.password = ERRORS.required(`mon mot de passe`);
    } else if (password.length > passwordMax) {
        errors.password = ERRORS.size(`mon mot de passe`, passwordMax);
    }
    if (!confirmPassword) {
        errors.confirmPassword = ERRORS.required(`la confirmation`);
    } else if (confirmPassword !== password) {
        errors.confirmPassword = ERRORS.mismatch(`Les mots de passe`);
    }
    if (!password) {
        errors.password = ERRORS.required(`mon mot de passe`);
    } else if (password.length > passwordMax) {
        errors.password = ERRORS.size(`mon mot de passe`, passwordMax);
    }
    if (!confirmPassword) {
        errors.confirmPassword = ERRORS.required(`la confirmation`);
    } else if (confirmPassword !== password) {
        errors.confirmPassword = ERRORS.mismatch(`Les mots de passe`);
    }
    return errors;
};
