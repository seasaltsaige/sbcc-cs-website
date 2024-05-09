import React, { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import "./Login.css";
import checkAdmin from "../../api/checkAdmin";


export function Login() {

  const signIn = useSignIn();

  // true: login, false: register, null: update
  const [login_register_update, setLogin_Register_Update] = useState<"login" | "register" | "update">("login");

  const [loginObject, setLoginObject] = useState<{
    username?: string;
    password?: string;
    newUsername?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  
  const clearForm = () => {
    document.forms[0].reset();
  }

  const login = (ev: React.FormEvent<HTMLButtonElement>) => {
    // ev.preventDefault();
    console.log(loginObject);
  }

  const update = (ev: React.FormEvent<HTMLButtonElement>) => {
    console.log(loginObject);
  }


  
  const register = async (ev: React.FormEvent<HTMLButtonElement>) => {
    const exists = await checkAdmin();
    if (exists.status === 200) {
      console.log("Good to go");
    } else {
      console.log("account exists");
    }
    console.log(loginObject);
  }
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
              onClick={() => { setLoginObject({}); setLogin_Register_Update(val.toLowerCase() as "login" | "register" | "update"); clearForm() }}>
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
                  <input type="text" placeholder="Enter Username" name="username" required onChange={(ev) => setLoginObject((old) => ({ ...old, username: ev.target.value }))} />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input type="password" placeholder="Enter Password" name="password" required onChange={(ev) => setLoginObject((old) => ({ ...old, password: ev.target.value }))} />
                </div>

                <button onClick={(ev) => { ev.preventDefault(); login(ev) }} className="submit-auth" type="submit">Login</button>
              </form>
            ) :
            (
              login_register_update === "update" ?
                (
                  <form id="update">
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


                    <button onClick={(ev) => {ev.preventDefault(); update(ev); }} className="submit-auth" type="submit">Update Admin</button>
                  </form>
                ) :
                (
                  <form id="register">
                    <div>
                      <label htmlFor="username">Username</label>
                      <input type="text" placeholder="Enter Username" name="username" required onChange={(ev) => setLoginObject((old) => ({ ...old, username: ev.target.value }))}/>
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <input type="password" placeholder="Enter Password" name="password" required onChange={(ev) => setLoginObject((old) => ({ ...old, password: ev.target.value }))} />
                    </div>

                    <div>
                      <label htmlFor="confirm">Confirm Password</label>
                      <input type="password" placeholder="Confirm Password" name="confirm" required onChange={(ev) => setLoginObject((old) => ({ ...old, confirmPassword: ev.target.value }))}/>
                    </div>

                    <button onClick={(ev) => {ev.preventDefault(); register(ev); }} className="submit-auth" type="submit">Create Admin</button>
                  </form>
                )

            )
        }
      </div>
    </div>
  )

}