import * as yup from "yup"

const categorySchema = yup.object({
    name: yup.string().required('Required'),
    avatar: yup.string().url('img must be Url').required(),
})

export default categorySchema