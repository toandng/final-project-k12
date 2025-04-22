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
import useLoading from "../../../../../hooks/useLoading";

// eslint-disable-next-line react/prop-types
function EditProfile({ user: initialUser }) {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [oldAvatar, setOldAvatar] = useState("");
  const { setLoading } = useLoading();
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
    const fetchUser = async () => {
      try {
        const response = await authServices.getCurrentUser();
        if (response.status === "success" && response.data) {
          const userData = response.data;
          setUser(userData);
          setOldAvatar(userData.avatar || "");
          setPreview(userData.avatar || "");
          reset({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            age: userData.age ? String(userData.age) : "",
            gender: userData.gender || "male",
            email: userData.email || "",
            phone: userData.phone || "",
            username: userData.username || "",
            birthDate: userData.birthDate || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    if (!initialUser) {
      fetchUser();
    }
  }, [initialUser, reset]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (preview) URL.revokeObjectURL(preview);
      const blob = URL.createObjectURL(file);
      console.log(blob);

      setPreview(blob);
      setAvatar(file);
    }
  };

  const handleCancelAvatar = () => {
    if (preview) URL.revokeObjectURL(preview);
    setAvatar(null);
    setPreview(oldAvatar);
  };

  const onSubmit = async (data) => {
    if (!user?.id) {
      toast.error("Thông tin người dùng không hợp lệ.");
      return;
    }

    setLoading(true);

    const requestData = {
      ...data,
      age: data.age ? Number(data.age) : undefined,
      gender: data.gender || "male",
    };

    try {
      let payload;

      if (avatar) {
        // Use FormData for avatar upload
        payload = new FormData();
        Object.entries(requestData).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            payload.append(key, value);
          }
        });
        payload.append("image", avatar);
      } else {
        payload = requestData;
      }

      const res = await authServices.editProfile(user.id, payload);
      if (res.status === "success") {
        toast.success("Cập nhật thành công!");
        setTimeout(() => navigate(config.routes.features), 800);
      } else {
        toast.error("Cập nhật thất bại!");
      }
    } catch (error) {
      if (error?.message?.phone) {
        setError("phone", { type: "manual", message: error.message.phone[0] });
      } else {
        toast.error("Lỗi cập nhật thông tin!");
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2>Cập nhật thông tin</h2>

      {/* Avatar section */}
      <div className={styles.avatarSection}>
        <h4>Thay đổi Avatar</h4>
        {preview && (
          <img src={preview} alt="Preview" className={styles.preview} />
        )}
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
        {avatar && (
          <Button type="button" onClick={handleCancelAvatar} size="sm">
            Hủy thay đổi avatar
          </Button>
        )}
      </div>

      <label>First Name</label>
      <input {...register("firstName")} className={styles.input} />
      {errors.firstName && (
        <p className={styles.error}>{errors.firstName.message}</p>
      )}

      <label>Last Name</label>
      <input {...register("lastName")} className={styles.input} />
      {errors.lastName && (
        <p className={styles.error}>{errors.lastName.message}</p>
      )}

      <label>Age</label>
      <input type="number" {...register("age")} className={styles.input} />
      {errors.age && <p className={styles.error}>{errors.age.message}</p>}

      <label>Gender</label>
      <select {...register("gender")} className={styles.input}>
        <option value="male">Nam</option>
        <option value="female">Nữ</option>
      </select>

      <label>Email</label>
      <input type="email" {...register("email")} className={styles.input} />
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}

      <label>Phone</label>
      <input type="tel" {...register("phone")} className={styles.input} />
      {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

      <label>Username</label>
      <input {...register("username")} className={styles.input} />
      {errors.username && (
        <p className={styles.error}>{errors.username.message}</p>
      )}

      <label>Birth Date</label>
      <Controller
        name="birthDate"
        control={control}
        render={({ field }) => (
          <input type="date" {...field} className={styles.input} />
        )}
      />
      {errors.birthDate && (
        <p className={styles.error}>{errors.birthDate.message}</p>
      )}

      <div className={styles.buttons}>
        <Button size="lg" type="button" onClick={() => navigate(-1)}>
          Hủy
        </Button>
        <Button size="lg" type="submit">
          Cập nhật
        </Button>
      </div>
    </form>
  );
}

export default EditProfile;
