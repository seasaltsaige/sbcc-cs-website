import React, { useState } from "react";
import { useIsAuthenticated, useSignIn, useSignOut, useAuthHeader } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import checkAdmin from "../../api/checkAdmin";
import loginAdmin from "../../api/loginAdmin";
import registerAdmin from "../../api/registerAdmin";
import updateAdmin from "../../api/updateAdmin";


export function Login() {

  const signIn = useSignIn();
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();
  // true: login, false: register, null: update
  const navigate = useNavigate();
  const [login_register_update, setLogin_Register_Update] = useState<"login" | "register" | "update">("login");
  const [info, setInfo] = useState<string>("");
  const [infoType, setInfoType] = useState<string | null>(null);
  const [loginObject, setLoginObject] = useState<{
    username?: string;
    password?: string;
    newUsername?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const createAlert = (text: string, type: "info" | "error" | "success", ms: number) => {
    setInfo(text);
    setInfoType(type);
    setTimeout(() => {
      setInfo("");
      setInfoType(null);
    }, ms);
  }

  const clearForm = () => {
    if (document.forms[0])
      document.forms[0].reset();
  }

  const login = async () => {
    try {
      const loginRes = await loginAdmin(loginObject.username!, loginObject.password!);

      const response = loginRes.data;

      if (signIn({
        expiresIn: response.expiresIn,
        token: response.accessToken,
        tokenType: "Bearer",
        authState: {
          username: response.username
        },
      })) {
        createAlert("Logging into account...", "success", 3000);
        setTimeout(() => navigate("/"), 3000);
      }

    } catch (err) {
      const errMsg = (err as any).response.data.message;
      if (errMsg) createAlert(errMsg, "error", 5000);
    }
  }

  const validatePassword = (single?: boolean) => {

    const password = single ? loginObject.newPassword : loginObject.password;
    const confirmPassword = loginObject.confirmPassword;
    if (!password) {
      createAlert("Enter a password", "info", 5000);
      return false;
    }
    if (!single && confirmPassword === undefined) {
      createAlert("Confirm your password", "info", 5000);
      return false;
    }
    if (!single && password !== confirmPassword) {
      createAlert("Passwords do not match", "error", 5000);
      return false;
    }

    // Minimum length of 8 characters
    if (password.length < 8) {
      createAlert("Password must be at least 8 characters", "error", 5000);
      return false;
    }

    // At least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      createAlert("Password must contain at least one uppercase character", "error", 5000);
      return false;
    }

    // At least one lowercase letter
    if (!/[a-z]/.test(password)) {
      createAlert("Password must contain at least one lowercase character", "error", 5000);
      return false;
    }

    // At least one digit
    if (!/\d/.test(password)) {
      createAlert("Password must contain at least one digit", "error", 5000);
      return false;
    }

    // At least one special character
    if (!/[^a-zA-Z0-9]/.test(password)) {
      createAlert("Password must contain at least one special character", "error", 5000);
      return false;
    }

    // All conditions passed, so it's a secure password
    return true;
  }

  const update = async () => {
    const authHead = authHeader();
    if (!loginObject.username) return createAlert("Please provide your current username", "info", 3000);
    const validNewPass = validatePassword(true);
    if (!validNewPass) return;

    try {
      const updateRes = await updateAdmin(
        loginObject.username!,
        loginObject.password!,
        {
          newPassword: loginObject.newPassword,
          newUsername: loginObject.newUsername
        },
        authHead,
      );
      if (updateRes.status === 200) {
        clearForm();
        return createAlert("Successfully changed password/username of admin account", "success", 5000);
      }
    } catch (err) {
      return createAlert(err as any, "error", 7500);
    }
  }

  const register = async () => {
    if (!loginObject.username) return createAlert("Username can not be empty", "error", 5000);
    try {
      const exists = await checkAdmin();
      // Admin account does not exist, so status is OK to make account
      if (exists.status === 200) {
        const validationResult = validatePassword();
        if (validationResult) {
          try {
            const registerRes = await registerAdmin(loginObject.username!, loginObject.password!) as any;
            const response = registerRes.data;

            if (signIn({
              expiresIn: response.expiresIn,
              token: response.accessToken,
              tokenType: "Bearer",
              authState: {
                username: response.username
              },
            })) {
              createAlert("Creating account...", "success", 3000);
              setTimeout(() => navigate("/"), 3000);
            }

          } catch (err) {
            return createAlert(err as any, "error", 7500);
          }
        }
      }
    } catch (err) {
      // Otherwise, account already exists
      createAlert("Admin account has already been created. Contact the Club President for more info", "info", 7500);
    }
  }

  return (

    <div className="auth-form">

      <div className="auth-type-list">
        {
          ["Login", "Register", "Update"].map((val, i) => (
            <button
              key={i}
              className={`auth-button ${val.toLowerCase() === login_register_update ? "button-active" : ""}`}
              onClick={() => { setLoginObject({}); setLogin_Register_Update(val.toLowerCase() as "login" | "register" | "update"); clearForm() }}>
              {val}
            </button>
          ))
        }
      </div>
      <div className="auth-panel">
        <div className={`alert-panel ${infoType}`}>
          <p className="alert-text">{info}</p>
        </div>
        <img className="login-logo" src="/loginlogo.png" alt="Login Logo" />
        {
          login_register_update === "login" ?
            (
              // Login state
              isAuthenticated() ?
                (<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <h1>You are already signed in...</h1>
                  <button className="submit-auth" onClick={(ev) => { ev.preventDefault(); signOut(); }}>Sign Out</button>
                </div>) :
                <form>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Enter Username" name="username" required onChange={(ev) => setLoginObject((old) => ({ ...old, username: ev.target.value }))} />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password" name="password" required onChange={(ev) => setLoginObject((old) => ({ ...old, password: ev.target.value }))} />
                  </div>

                  <button onClick={(ev) => { ev.preventDefault(); login(); }} className="submit-auth" type="submit">Login</button>
                </form>

            ) :
            (
              login_register_update === "update" ?
                (
                  <form>
                    <div>
                      <label htmlFor="username">Username</label>
                      <input type="text" placeholder="Enter Username" name="username" required onChange={(ev) => setLoginObject((old) => ({ ...old, username: ev.target.value }))} />
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <input type="password" placeholder="Enter Password" name="password" required onChange={(ev) => setLoginObject((old) => ({ ...old, password: ev.target.value }))} />
                    </div>

                    <div>
                      <label style={{ marginTop: 10, }} htmlFor="newUsername">New Username</label>
                      <input type="text" placeholder="Enter New Username (optional)" name="newUsername" onChange={(ev) => setLoginObject((old) => ({ ...old, newUsername: ev.target.value }))} />
                    </div>
                    <div>
                      <label htmlFor="newPassword">New Password</label>
                      <input type="password" placeholder="Enter Password" name="newPassword" required onChange={(ev) => setLoginObject((old) => ({ ...old, newPassword: ev.target.value }))} />
                    </div>


                    <button onClick={(ev) => { ev.preventDefault(); update(); }} className="submit-auth" type="submit">Update Admin</button>
                  </form>
                ) :
                (
                  isAuthenticated() ?
                    (<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <h1>You are already signed in...</h1>
                      <button className="submit-auth" onClick={(ev) => { ev.preventDefault(); signOut(); }}>Sign Out</button>
                    </div>) : <form id="register">
                      <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder="Enter Username" name="username" required onChange={(ev) => setLoginObject((old) => ({ ...old, username: ev.target.value }))} />
                      </div>
                      <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Password" name="password" required onChange={(ev) => setLoginObject((old) => ({ ...old, password: ev.target.value }))} />
                      </div>

                      <div>
                        <label htmlFor="confirm">Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" name="confirm" required onChange={(ev) => setLoginObject((old) => ({ ...old, confirmPassword: ev.target.value }))} />
                      </div>

                      <button onClick={(ev) => { ev.preventDefault(); register(); }} className="submit-auth" type="submit">Create Admin</button>
                    </form>
                )

            )
        }
      </div>
    </div>
  )

}