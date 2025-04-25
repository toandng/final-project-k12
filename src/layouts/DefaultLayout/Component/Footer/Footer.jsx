import styles from "../../Component/Footer/Footer.module.scss";
import config from "../../../../config";
import Button from "../../../../components/Button";
import {
  faBell,
  faCalendar,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer({ defaultIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);

  const navItems = [
    { icon: faHouse, label: "Trang chủ", to: config.routes.home },
    { icon: faCalendar, label: "Lịch sử", to: config.routes.history },
    { icon: faBell, label: "Thông báo", to: config.routes.notify },
    { icon: faUser, label: "Tài khoản", to: config.routes.features },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        {navItems.map((item, index) => {
          const active = currentIndex === index;
          return (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={styles.footerItem}
            >
              <Button
                icon={item.icon}
                normal
                to={item.to}
                className={`${styles.footerButton} ${
                  active ? styles.active : ""
                }`}
              >
                <span className={styles.label}>{item.label}</span>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Footer;
