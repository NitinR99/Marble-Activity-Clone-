import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import firebase from "./firebase/firebaseIndex";
import { firebaseAuth } from "./provider/AuthProvider";
import isLoggedIn from "./helpers/is_logged_in";
import store from "store";
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/admin",
            }}
          />
        )
      }
    />
  );
};
