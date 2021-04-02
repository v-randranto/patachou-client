import { ERRORS } from '../constants/formRules'

export const validate = (values) => {
   let { pseudo } = values
   const { password } = values
   const errors = {}

   pseudo = pseudo.trim()
   if (!pseudo) {
      errors.pseudo = ERRORS.required('mon pseudo')
   }
   if (!password) {
      errors.password = ERRORS.required(`mon mot de passe`)
   }
   return errors
}
