
import styles from "../../Component/Footer/Footer.module.scss";
import config from "../../../../config";
import {faFacebook} from "@fortawesome/free-brands-svg-icons"
import  Button  from "../../../../components/Button/index";
import { faBell, faCalendar, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  
  
    return (
      <div>
          <div className={styles.container}>
            <div className={styles.foter}>
              <div>
                <Button icon={faHouse} normal to={config.routes.home}>Trang chủ</Button>
              </div>
              <div>
                <Button icon={faCalendar} normal to={config.routes.home}>Lịch sử</Button>
              </div>  
              <div>
                <Button icon={faBell} normal to={config.routes.home}>Thông báo</Button>
              </div>  
              <div>
                <Button icon={faFacebook} normal to={config.routes.home}>Thu nhập</Button>
              </div>  
              <div>
                <Button icon={faUser} normal to={config.routes.features}>Tài khoản</Button>
              </div>  
            </div>
        </div>
      </div>
    );
}
export default Footer;