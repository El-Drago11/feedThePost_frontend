import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import appStore from './store/appStore.js'
import { Toaster } from 'react-hot-toast'
import { SocketContextProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
    <BrowserRouter>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
      <Toaster/>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
