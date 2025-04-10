import { Outlet } from "react-router-dom";

import Footer from "../DefaultLayout/Component/Footer/Footer";
import Header from "./Component/Header/Header";
// import SlideBar from "./components/SlideBar";

function DefaultLayout() {
    return (
        <div style={{ minHeight: "100vh", paddingBottom: "60px"}}>
           <Header/>
            <main>
                <div
                    style={{
                        display: "flex",
                    }}
                >
                    {/* <SlideBar /> */}

                    <div
                        style={{
                            width: "100%",
                            margin: " 0 auto",
                            padding: "0 32px 0 10px",
                        }}
                    >
                        <div className="container-fluid">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default DefaultLayout;