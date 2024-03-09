import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to='/auth/login-email' />} />
        <Route index path='/auth/login-email' element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
