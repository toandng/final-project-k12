import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import routes from "./routes"

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes>
            {routes.map((route) => {
                const Component = route.component;
                return(
                  <Route key={route.path}
                    path={route.path}
                    element={<Component/>}
                  >
                  </Route>
                )
            })}
        </Routes>
    </BrowserRouter>
  )
}

export default App
