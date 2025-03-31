import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import editProfileSchema from "../../../../../schema/editProfile";
import styles from "../../../Profile/Component/EditProfile/EditProfile.module.scss";
import authServices from "../../../../../services/authServices";
import config from "../../../../../config";
import Button from "../../../../../components/Button";
import { toast } from "react-toastify";

function EditProfile({ user: initialUser }) {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "male",
      email: "",
      phone: "",
      username: "",
      birthDate: "",
    },
  });

  useEffect(() => {
    if (!initialUser) {
      (async () => {
        try {
          const response = await authServices.getCurrentUser();
          if (response.status === "success" && response.user) {
            setUser(response.user);
            reset({
              firstName: response.user.firstName || "",
              lastName: response.user.lastName || "",
              age: response.user.age ? String(response.user.age) : "",
              gender: response.user.gender || "male",
              email: response.user.email || "",
              phone: response.user.phone || "",
              username: response.user.username || "",
              birthDate: response.user.birthDate || "",
            });
          }
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      })();
    }
  }, [initialUser, reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const requestData = {
      ...data,
      age: data.age ? Number(data.age) : undefined,
      gender: data.gender || "male",
    };

    try {
      const res = await authServices.editProfile(user?.id, requestData);
      if (res.status === "success") {
        toast.success("Cập nhật thành công!");
        setTimeout(() => navigate(config.routes.profile), 500);
      }
    } catch (error) {
      if (error?.message?.phone) {
        setError("phone", { type: "manual", message: error.message.phone[0] });
      } else {
        toast.error("Lỗi cập nhật thông tin!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2>Cập nhật thông tin</h2>

      <label>First Name</label>
      <input {...register("firstName")} className={styles.input} />
      {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
    <br />
      <label>Last Name</label>
      <input {...register("lastName")} className={styles.input} />
      {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
      <br />

      <label>Age</label>
      <input type="number" {...register("age")} className={styles.input} />
      {errors.age && <p className={styles.error}>{errors.age.message}</p>}
      <br />

      <label>Gender</label>
      <select {...register("gender")} className={styles.input}>
        <option value="male">Nam</option>
        <option value="female">Nữ</option>
      </select>
      {errors.gender && <p className={styles.error}>{errors.gender.message}</p>}
      <br />

      <label>Email</label>
      <input type="email" {...register("email")} className={styles.input} />
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      <br />

      <label>Phone</label>
      <input type="tel" {...register("phone")} className={styles.input} />
      {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
      <br />

      <label>Username</label>
      <input {...register("username")} className={styles.input} />
      {errors.username && <p className={styles.error}>{errors.username.message}</p>}
      <br />

      <label>Date of Birth</label>
      <Controller
        name="birthDate"
        control={control}
        render={({ field }) => <input type="date" {...field} className={styles.input} />}
      />
      {errors.birthDate && <p className={styles.error}>{errors.birthDate.message}</p>}

      <div className={styles.buttons}>
        <Button size="lg" type="button" onClick={() => navigate(-1)}>
          Hủy
        </Button>
        <Button size="lg" type="submit" isLoading={isLoading}>
          Cập nhật
        </Button>
      </div> 
    </form>
  );
}

export default EditProfile;
