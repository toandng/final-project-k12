

import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

function NoHeader() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    );
}

export default NoHeader