import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import authServices from "@/services/authServices";
import useLoading from "@/hooks/useLoading";
import { Accordion, AccordionItem } from "@/components/Accordion";
import styles from "../Component/Features.module.scss";
import { logoutUser } from "@/features/auth/authSlice";

function Features() {
  const [user, setUser] = useState(null);
  const { setLoading } = useLoading();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await authServices.getCurrentUser();
        if (result?.data) {
          setUser(result.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [setLoading]);

  const onClick = () => {
    dispatch(logoutUser());
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Button
        component={Link}
        to={`/users/${user.username}`}
        variant="contained"
      >
        Hồ sơ
      </Button>

      <div>
        <div>
          <p>Avatar: {user?.avatar || "No avatar available"}</p>
        </div>
        <div>
          <p>
            {user?.firstName} {user?.lastName}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {user?.phone || "Not provided"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
      </div>

      <h2>Tính năng chính</h2>
      <div>
        <div>
          <Accordion
            defaultIndex={0}
            onChange={(index) => console.log("Opened accordion index", index)}
            collapseOthers={true}
          >
            <AccordionItem header="Cộng đồng tài xế">
              Nội dung của Accordion 1
            </AccordionItem>
            <AccordionItem header="Thuê xe điện">
              Nội dung của Accordion 2
            </AccordionItem>
            <AccordionItem header="Thử thách">
              Nội dung của Accordion 3
            </AccordionItem>
            <AccordionItem header="Bảng xếp hạng">
              Nội dung của Accordion 4
            </AccordionItem>
            <AccordionItem header="Tài khoản thanh toán">
              Nội dung của Accordion 5
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Logout Button */}
      <div className={styles.logout}>
        <Button component={Link} onClick={onClick}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Features;
