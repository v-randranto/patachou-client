import { IRecipeForm } from '../models/forms'
import { ERRORS } from '../constants/formRules'

/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validate = (values: any) => {
    let {title} = values
    const { nbOfPeople} = values
    const errors: IRecipeForm | any = {}
    title = title.trim()
    if (!title) {
        errors.title = ERRORS.required('le titre')
    }
    if (!nbOfPeople) {
        errors.title = ERRORS.required('le nb de personnes')
    }

    return errors;
}