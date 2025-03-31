import { Link } from "react-router-dom";
import config from "../../../config";
import { Button } from "@mui/material";

function Features () {
return(
    <div>
         <Button 
        component={Link} 
        to={config.routes.profile} 
        variant="contained"
        color="primary"
      >
        Thông tin tài khoản
      </Button>
        <h2>Chức năng chính</h2>
        <ul>
            <li>Cộng đồng tài xế</li>
            <li>Bảo hiểm cho đối tác tài xế</li>
            <li>Thuê xe điện</li>
            <li>Thử thách</li>
            <li>Bảng xếp hạng</li>
            <li>Tài khoản thanh toán</li>
        </ul>
        <Button component={Link} to={config.routes.login}>Logout</Button>
    </div>
)
}
export default Features;