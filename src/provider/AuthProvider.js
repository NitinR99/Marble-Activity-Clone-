import React, { useState, useEffect } from "react";
import { authMethods } from "../firebase/authmethods";
import { auth } from "firebase";

export const firebaseAuth = React.createContext();

const AuthProvider = (props) => {
  const initState = { email: "", password: "" };
  const [inputs, setInputs] = useState(initState);
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const handleSignup = () => {
    authMethods.signup(inputs.email, inputs.password, setErrors, setToken);
  };
  const handleSignin = () => {
    authMethods.signin(
      inputs.email,
      inputs.password,
      setErrors,
      setToken,
      setIsLoggedIn
    );
  };

  const handleSignout = () => {
    authMethods.signout(setErrors, setToken);
  };
  const handleReset = () => {
    authMethods.ResetPassword(inputs.email, setErrors);
  };
  return (
    <firebaseAuth.Provider
      value={{
        //replaced test with handleSignup
        handleSignup,
        handleSignin,
        token,
        inputs,
        setInputs,
        errors,
        handleSignout,
        isLoggedin,
        handleReset,
      }}
    >
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;
