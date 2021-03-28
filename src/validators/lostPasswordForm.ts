import { ILoginForm } from '../models/forms'
import { FORMAT_RULES, ERRORS } from '../constants/formRules'
/* eslint-disable @typescript-eslint/no-explicit-any */
const { emailPattern, emailMax} = FORMAT_RULES
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validate = (values: any) => {
    let { email } = values
    const errors: ILoginForm | any = {}
    email = email.trim()
    if (!email) {
        errors.email = ERRORS.required(`mon adresse email`)
    } else if (!(emailPattern.test(email))) {
        errors.email = ERRORS.format(`mon adresse email`)
    } else if (email.length > emailMax) {
        errors.email = ERRORS.size(`mon adresse email`, emailMax)
    }
    return errors;
}