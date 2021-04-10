import * as yup from 'yup'

const resetPasswordSchema = yup.object().shape({
   password: yup.string().required('Mot de passe à saisir').min(4, 'Saisir au moins 4 caractères'),
   confirmPassword: yup.string().required('Confirmation à saisir').oneOf([yup.ref('password'), null],
     'confirmation différente',
   ),
})

export default resetPasswordSchema
