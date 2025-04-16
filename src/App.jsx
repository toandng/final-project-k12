import {BrowserRouter} from "react-router-dom"
import AppRoute from "./components/AppRoute"
import UserProvider from "./components/UserProvider"


function App() {
  return (
    <BrowserRouter>
    <UserProvider />
 
    <AppRoute/>
    </BrowserRouter>
  )
}

export default App
