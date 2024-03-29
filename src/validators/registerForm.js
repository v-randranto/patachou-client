import { FORMAT_RULES, ERRORS } from '../constants/formRules'

const { pseudoPattern, pseudoMax, emailPattern, emailMax, passwordMax, presentationMax, fileLimit } = FORMAT_RULES
const acceptFileExtensions = FORMAT_RULES.fileExtensions.join(',')

export const validate = (values) => {
   let { pseudo, email } = values
   const { presentation, photo, password, confirmPassword } = values
   const errors = {}
   pseudo = pseudo.trim()
   email = email.trim()
   if (!pseudo) {
      errors.pseudo = ERRORS.required('mon pseudo')
   } else if (!pseudoPattern.test(pseudo)) {
      errors.pseudo = ERRORS.format('mon pseudo')
   } else if (pseudo.length > pseudoMax) {
      errors.pseudo = ERRORS.size('mon pseudo', pseudoMax)
   }

   if (photo) {
      const fileExtension = photo.name.split('.').pop().toLowerCase()
      if (!acceptFileExtensions.includes(fileExtension)) {
         errors.photo = ERRORS.fileType(fileExtension)
      } else if (photo.size > FORMAT_RULES.fileLimit) {
         errors.photo = ERRORS.fileSize(fileLimit)
      }
   }

   if (presentation.length > presentationMax) {
      errors.presentation = ERRORS.size('mon pitch', pseudoMax)
   }

   if (!email) {
      errors.email = ERRORS.required(`mon adresse email`)
   } else if (!emailPattern.test(email)) {
      errors.email = ERRORS.format(`mon adresse email`)
   } else if (email.length > emailMax) {
      errors.email = ERRORS.size(`mon adresse email`, emailMax)
   }

   if (!password) {
      errors.password = ERRORS.required(`mon mot de passe`)
   } else if (password.length > passwordMax) {
      errors.password = ERRORS.size(`mon mot de passe`, passwordMax)
   }

   if (!confirmPassword) {
      errors.confirmPassword = ERRORS.required(`la confirmation`)
   } else if (confirmPassword !== password) {
      errors.confirmPassword = ERRORS.mismatch(`Les mots de passe`)
   }
   return errors
}
