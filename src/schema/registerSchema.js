import * as yup from 'yup';

const registerSchema = yup.object({
    firstName: yup.
        string()
        .required("Trường này không được để trống"),
    lastName: yup
        .string()
        .required("Trường này không được để trống"),
    email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
    password: yup
        .string()
        .min(8, "Mật khẩu phải từ 8 kí tự trở lên")
        .required("Mật khẩu không được để trống"),
    
    password_confirmation: yup
        .string()
        .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
})

export default registerSchema;