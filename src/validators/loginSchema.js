import * as yup from 'yup'

const loginSchema = yup.object().shape({
   pseudo: yup.string().required('Pseudo à saisir'),
   password: yup.string().required('Mot de passe à saisir'),
})

export default loginSchema
