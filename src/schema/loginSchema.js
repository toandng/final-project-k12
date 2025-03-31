import * as yup from 'yup';
const loginSchema = yup.object({
   email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
    password: yup
        .string()
        .min(8, "Mật khẩu phải từ 8 kí tự trở lên")
        .required("Mật khẩu không được để trống"),
})
export default loginSchema;