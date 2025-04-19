import { useEffect } from "react";
import authServices from "../../../services/authServices";
import styles from "../Profile/ProfilePage.module.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import config from "../../../config";
import useUser from "../../../hooks/useUser";
import useLoading from "../../../hooks/useLoading";

function ProfilePage() {
  const [user, setUser] = useUser();
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        const res = await authServices.getCurrentUser();
        if (res?.data) {
          setUser(res.data);
        } else {
          console.log("Lỗi khi tải dữ liệu người dùng");
        }
      } catch (error) {
        console.log("Lỗi kết nối API", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchUser();
  }, [setLoading, setUser]);
  console.log(user);

  const getDisplayValue = (value) => (value ? value : "Chưa cập nhật");

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Thông tin cơ bản</h2>
        <p className={styles.desc}>
          Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.
        </p>
      </div>

      <div className={styles.avatarContainer}>
        <h2>Ảnh đại diện</h2>
        {/* Kiểm tra nếu user có avatar */}
        {user?.avatar ? (
          <img
            src={
              user?.avatar?.startsWith("http")
                ? user.avatar
                : `${import.meta.env.VITE_API_URL}/${user?.avatar}`
            }
            alt="Avatar"
            className={styles.avatar}
            width={120}
            height={120}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <p>Không có avatar</p>
        )}
      </div>

      <div className={styles.content}>
        <p>
          <strong>Tên đầy đủ:</strong> {user?.firstName} {user?.lastName}
        </p>
        <p>
          <strong>Tuổi:</strong> {getDisplayValue(user?.age)}
        </p>
        <p>
          <strong>Giới tính:</strong> {getDisplayValue(user?.gender)}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Số điện thoại:</strong> {getDisplayValue(user?.phone)}
        </p>
        <p>
          <strong>Ngày sinh:</strong> {getDisplayValue(user?.birthDate)}
        </p>
        <p>
          <strong>Trạng thái tài khoản:</strong>{" "}
          {user?.emailVerifiedAt
            ? "Tài khoản đã được xác minh"
            : "Tài khoản chưa xác minh"}
        </p>
        <p>
          <strong>Ngày tạo:</strong>{" "}
          {new Date(user?.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div>
        <Button component={Link} to={config.routes.edit}>
          Cập nhật thông tin
        </Button>
      </div>

      <div>
        <Button component={Link} to={config.routes.home}>
          Quay lại
        </Button>
      </div>
    </section>
  );
}

export default ProfilePage;
