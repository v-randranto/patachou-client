import * as yup from 'yup'

const lostPasswordSchema = yup.object().shape({
   email: yup.string().email('Email invalide').required('Email à saisir').max(50),
})

export default lostPasswordSchema
