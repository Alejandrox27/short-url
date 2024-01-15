import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css';
import "./css/login.css";
import "./css/register.css";
import "./css/home.css";
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import UserProvider from './context/userContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
