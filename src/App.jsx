import { BrowserRouter } from "react-router-dom";
import AppRoute from "./components/AppRoute";
import UserProvider from "./components/UserProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <UserProvider />

      <AppRoute />
      <ToastContainer position="top-center" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
