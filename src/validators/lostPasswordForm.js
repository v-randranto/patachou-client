import { FORMAT_RULES, ERRORS } from '../constants/formRules';

const { emailPattern, emailMax } = FORMAT_RULES;

export const validate = (values) => {
    let { email } = values;
    const errors = {};
    email = email.trim();
    if (!email) {
        errors.email = ERRORS.required(`mon adresse email`);
    } else if (!emailPattern.test(email)) {
        errors.email = ERRORS.format(`mon adresse email`);
    } else if (email.length > emailMax) {
        errors.email = ERRORS.size(`mon adresse email`, emailMax);
    }
    return errors;
};
