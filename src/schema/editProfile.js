import * as yup from 'yup';
const editProfile = yup.object({
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
})
export default editProfile;