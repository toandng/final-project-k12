import styles from "../../components/ActiveUser/activeUser.module.scss";
import useUser from "../../hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"; // ✅ THÊM VÀO

function ActiveUser() {
  const user = useUser();

  return (
    <div className={styles.wrapper}>
      <div className={styles.active}>
        <h2>{user ? "Đang trực tuyến" : "Đang ngoại tuyến"}</h2>
        <p>
          {user
            ? "Bạn đang sẵn sàng nhận đơn"
            : "Bật trực tuyến để bắt đầu nhận đơn"}
        </p>
      </div>

      <div className={styles["active-img"]}>
        {user?.avatar ? (
          <img
            src={
              user.avatar.startsWith("http")
                ? user.avatar
                : `${import.meta.env.VITE_BASE_URL}/${user.avatar}`
            }
            alt="Avatar"
            className={styles.avatar}
            width={120}
            height={120}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <div className={styles.fallback}>
            <FontAwesomeIcon icon={faUser} size="2x" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ActiveUser;
