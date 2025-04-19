
import { createRoot } from 'react-dom/client'
import {Provider as ReduxProvider} from "react-redux"
import App from './App.jsx'

import LoadingProvider from './contexts/loadingContext.jsx'
import store from './components/store/index.js'
import UserProvider from './contexts/useContext.jsx'
// import ReduxProvider from './contexts/ReduxContext.jsx'
// import { UserProvider } from '../src/contexts/useContext.jsx'


createRoot(document.getElementById('root')).render(

    <UserProvider>
      <LoadingProvider>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      
      </LoadingProvider>
    
    </UserProvider>

)
