import React, { useContext } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Signup from "./component/Signup";
import Signin from "./component/Signin";
import Home from "./component/Home";
import AdminHome from "./component/AdminHome";
import Newgame from "./component/Newgame";
import Gamehistory from "./component/Gamehistory";
import "./App.css";
import { firebaseAuth } from "./provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import ResetPassword from "./component/resetPassword";
function App() {
  const { token } = useContext(firebaseAuth);
  return (
    <BrowserRouter>
      {/* switch allows switching which components render.  */}
      <Switch>
        {/* route allows you to render by url path */}
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Signin} />
        <Route exact path="/resetPassword" component={ResetPassword} />
        <ProtectedRoute exact path="/adminHome" component={AdminHome} />
        <ProtectedRoute exact path="/admin/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}
//
export default App;
