import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from "react-auth-kit";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider
    children={<App />}
    authName='_auth'
    authType='cookie'
    cookieSecure={window.location.protocol === "https:"}
    cookieDomain={window.location.hostname}
  />
);
