import { useEffect, useState } from "react";
import authServices from "../../../services/authServices";
import styles from "../Profile/ProfilePage.module.scss"
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import config from "../../../config";

function ProfilePage () {
  const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
          try {
              const data = await authServices.getCurrentUser();
              
              data.user && setUser(data.user);
          } catch (error) {
              console.log(error);
          }
      })();
            
    }, []);

    console.log(user);
    
    
  const getDisplayValue = (value) => (value ? value : "Chưa cập nhật")
  return(
     <section className={styles.wrapper}>
    <div className={styles.header}>
        <h2 className={styles.title}>Thông tin cơ bản</h2>
        <p className={styles.desc}>
            Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.
        </p>
    </div>

    <div className={styles.content}>
        <p><strong>Tên đầy đủ:</strong> {user?.firstName}{user?.lastName} </p>
        <p><strong>Tuổi:</strong> {getDisplayValue(user?.age)}</p>
        <p><strong>Giới tính:</strong> {getDisplayValue(user?.gender)}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Số điện thoại:</strong> {getDisplayValue(user?.phone)}</p>
        <p><strong>Ngày sinh:</strong> {getDisplayValue(user?.birthDate)}</p>
        <p>
            <strong>Trạng thái tài khoản:</strong>{" "}
            {user?.emailVerifiedAt ? "Tài khoản đã được xác minh" : "Tài khoản chưa xác minh"}
        </p>
        <p><strong>Ngày tạo:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
    </div>
    <div>
        <Button component={Link} secondary  
        to={config.routes.edit}  > Cập nhật thông tin</Button>
    </div>
    <div>
        <Button component={Link} secondary
        to={config.routes.home}  > Quay lại</Button>
    </div>
    <div>
        <Button component={Link} secondary
        to={config.routes.login}  > Logout</Button>
    </div>
</section>
  )

}

export default ProfilePage;