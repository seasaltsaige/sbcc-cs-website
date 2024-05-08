import React, { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import "./Login.css";


export function Login() {

  const signIn = useSignIn();

  // true: login, false: register, null: update
  const [login_register_update, setLogin_Register_Update] = useState<"login" | "register" | "update">("login");

  // signIn({
  //   auth: {
  //     token: "", // Token recieved from api
  //     type: "Bearer"
  //   },
  //   userState: {
  //     username: "admin", // will be returned or whatever, formdata
  //   }
  // })

  return (

    <div className="auth-form">
      <div className="auth-type-list">
        {
          ["Login", "Register", "Update"].map((val, i) => (
            <button
              key={i}
              className={`auth-button ${val.toLowerCase() === login_register_update ? "button-active" : ""}`}
              onClick={() => setLogin_Register_Update(val.toLowerCase() as "login" | "register" | "update")}>
              {val}
            </button>
          ))
        }
      </div>
      <div className="auth-panel">
        <img className="login-logo" src="/loginlogo.png" alt="Login Logo" />
        {
          login_register_update === "login" ?
            (
              // Login state

              <form>
                <div>
                  <label htmlFor="username">Username</label>
                  <input type="text" placeholder="Enter Username" name="username" required />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input type="password" placeholder="Enter Password" name="password" required />
                </div>

                <button className="submit-auth" type="submit">Login</button>
              </form>
            ) :
            (
              login_register_update === "update" ?
                (
                  <form>
                    <div>
                      <label htmlFor="username">Username</label>
                      <input type="text" placeholder="Enter Username" name="username" required />
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <input type="password" placeholder="Enter Password" name="password" required />
                    </div>

                    <div>
                      <label style={{marginTop: 10, }} htmlFor="newUsername">New Username</label>
                      <input type="text" placeholder="Enter New Username (optional)" name="newUsername" />
                    </div>
                    <div>
                      <label htmlFor="newPassword">New Password</label>
                      <input type="password" placeholder="Enter Password" name="newPassword" required />
                    </div>


                    <button className="submit-auth" type="submit">Update Admin</button>
                  </form>
                ) :
                (
                  <form>
                    <div>
                      <label htmlFor="username">Username</label>
                      <input type="text" placeholder="Enter Username" name="username" required />
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <input type="password" placeholder="Enter Password" name="password" required />
                    </div>

                    <div>
                      <label htmlFor="confirm">Confirm Password</label>
                      <input type="password" placeholder="Confirm Password" name="confirm" required />
                    </div>

                    <button className="submit-auth" type="submit">Create Admin</button>
                  </form>
                )

            )
        }
      </div>
    </div>
  )

}