import { Link } from "react-router-dom";
import config from "../../../config";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import authServices from "../../../services/authServices";
import useLoading from "../../../hooks/useLoading";

function Features() {
  const [user, setUser] = useState(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    (async () => {
      setLoading(true); // Bật loading trước khi gọi API
      try {
        const result = await authServices.getCurrentUser();
        if (result?.data) {
          setUser(result.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Tắt loading sau khi xử lý xong
      }
    })();
  }, []);

  return (
    <div>
      <Button component={Link} to={config.routes.profile} variant="contained">
        Hồ sơ
      </Button>
      <div>
        <div>
          <p>Avatar: {user?.avatar}</p>
        </div>
        <div>
          <p>
            {user?.firstName} {user?.lastName}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {user?.phone}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
      </div>
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
  );
}

export default Features;
