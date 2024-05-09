import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import createStore from "react-auth-kit/createStore";
import { AuthProvider } from "react-auth-kit";

// const store = createStore({
//   authName: "_auth",
//   authType: "cookie",
//   cookieDomain: window.location.hostname,
//   cookieSecure: window.location.protocol === "https:",
// });

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
  // store={}
  />
);
