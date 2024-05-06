import React, { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import "./Login.css";


export function Login() {

  const signIn = useSignIn();

  // true: login, false: register, null: update
  const [login_register_update, setLogin_Register_Update] = useState<boolean | null>(true);

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
    login_register_update ?
      (
        // Login state
        <></>
      ) :
      (
        login_register_update === null ?
          (
            // Update state
            <></>
          ) :
          (
            // Register state
            <></>
          )
      )
  )
}