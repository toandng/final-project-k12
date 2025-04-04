import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import UserProvider from './contexts/useContext.jsx'
import LoadingProvider from './contexts/loadingContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <LoadingProvider>

        <App />
      </LoadingProvider>
    
    </UserProvider>

  </StrictMode>,
)
