import { FORMAT_RULES, ERRORS } from '../constants/formRules';

const { passwordMax } = FORMAT_RULES;

export const validate = (values) => {
    const { password, confirmPassword } = values;
    const errors = {};

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
