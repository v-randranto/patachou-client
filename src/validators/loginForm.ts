import { ILoginForm } from '../models/forms'
import { ERRORS } from '../constants/formRules'
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validate = (values: any) => {
    const { pseudo, password } = values
    const errors: ILoginForm | any = {}

    if (!pseudo) {
        errors.pseudo = ERRORS.required('mon pseudo')
    } 
    if (!password) {
        errors.password = ERRORS.required(`mon mot de passe`)
    } 
    return errors;
}