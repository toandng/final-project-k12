import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import styles from "../../Component/Footer/Footer.module.scss";
import config from "../../../../config";

function Footer() {
    const [value, setValue] = React.useState("one");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div>
        <div className={styles.wrapper}>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              sx={{ width: "100%", maxWidth: "100%", overflowX: "auto" }} // Đảm bảo chiếm toàn bộ chiều ngang
              variant="scrollable" // Kích hoạt chế độ cuộn
              scrollButtons="auto" // Hiển thị nút cuộn khi cần
            >
              <Tab
                label="Trang chủ"
                component={NavLink}
                to={config.routes.home}
                value="one"
                sx={{ minWidth: "auto", padding: "4px 9px", fontSize: "9px" }}
              />
              <Tab
                label="Lịch sử"
                component={NavLink}
                to={config.routes.home}
                value="two"
                sx={{ minWidth: "auto", padding: "4px 9px", fontSize: "9px" }}
              />
              <Tab
                label="Thông báo"
                component={NavLink}
                to={config.routes.home}
                value="three"
                sx={{ minWidth: "auto", padding: "4px 9px", fontSize: "9px" }}
              />
              <Tab
                label="Thu nhập"
                component={NavLink}
                to={config.routes.home}
                value="four"
                sx={{ minWidth: "auto", padding: "4px 9px", fontSize: "9px" }}
              />
              
              <Tab
                label="Tài khoản"
                component={NavLink}
                to={config.routes.features}
                value="five"
                sx={{ minWidth: "auto", padding: "4px 9px", fontSize: "9px" }}
              />
            </Tabs>
          </Box>
        </div>
      </div>
    );
}
export default Footer;