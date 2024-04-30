import * as Yup from 'yup';

const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Must be 6 or more characters ').required('Required')
})

export default loginSchema;