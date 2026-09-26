import React from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import AppRoutes from './APPRoutes.jsx'
import './style.scss'
import { AuthProvider } from './features/auth/auth.context.jsx'  

const App = () => {
  return (
    <AuthProvider>

      <AppRoutes />

    </AuthProvider>
    
  )
}

export default App
