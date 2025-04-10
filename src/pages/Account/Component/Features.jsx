import { Link } from "react-router-dom";
import config from "../../../config";
import {  Button } from "@mui/material";
import { useEffect, useState } from "react";
import authServices from "../../../services/authServices";
import useLoading from "../../../hooks/useLoading";
import {Accordion, AccordionItem } from "../../../components/Accordion";
import styles from "../Component/Features.module.scss"

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
      <h2>Tính năng chính</h2>
      <div>
       
    <div>
     <Accordion
           defaultIndex = {0}
           onChange={(index) => console.log("mở", index)} 
           collapseOthers  = {true}
         >
             <AccordionItem  header="Cộng đồng tài xế">  Nội dung của Accordion 1</AccordionItem>
             <AccordionItem  header="Thuê xe điện">  Nội dung của Accordion 2</AccordionItem>
             <AccordionItem  header="Thử thách">  Nội dung của Accordion 3</AccordionItem>
             <AccordionItem  header=" Bảng xếp hạng">  Nội dung của Accordion 3</AccordionItem>
             <AccordionItem  header="Tài khoản thanh toán">  Nội dung của Accordion 3</AccordionItem>
     
         </Accordion>
     </div>
    </div>
      <div className={styles.logout}>
        <Button component={Link} to={config.routes.login}>Logout</Button>
      </div>
    </div>
  );
}

export default Features;
