import * as yup from "yup"
const productSchema = yup.object({
    name: yup.string().required("required").min(5),
    avatar: yup.string().url("Img must be Url").required("Requred"),
    description: yup.string().required("Required")
})

export default productSchema