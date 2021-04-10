import * as yup from 'yup'

const registrationSchema = yup.object().shape({
   pseudo: yup.string().required('Pseudo à saisir').max(20),
   presentation: yup.string().max(240),
   email: yup.string().email('Email invalide').required('Email à saisir').max(50),
   password: yup.string().required('Mot de passe à saisir').min(4, 'Saisir au moins 4 caractères'),
   confirmPassword: yup.string().required('Confirmation à saisir').oneOf([yup.ref('password'), null],
     'confirmation différente',
   ),
})

export default registrationSchema
