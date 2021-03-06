import firebaseconfig from "./firebaseIndex";
import * as firebase from "firebase";
import store from "store";
export const authMethods = {
  // firebase helper methods go here...
  signup: (email, password, setErrors, setToken) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      //make res asynchonous so that we can make grab the token before saving it.
      .then(async (res) => {
        const token = await Object.entries(res.user)[5][1].b;
        //set token to localStorage
        await localStorage.setItem("token", token);
        setToken(token);
        //grab token from local storage and set to state.
        console.log(res);
      })
      .catch((err) => {
        setErrors((prev) => [...prev, err.message]);
      });
  },
  signin: (email, password, setErrors, setToken) => {
    //change from create users to...
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      //everything is almost exactly the same as the function above
      .then(async (res) => {
        //store.set("loggedIn", true);
        const token = await Object.entries(res.user)[5][1].b;
        //set token to localStorage
        await localStorage.setItem("token", token);

        setToken(window.localStorage.token);
        console.log("toke", token);
        //Auth.authenticate();
        //console.log(Auth.getAuth());
      })
      .catch((err) => {
        setErrors((prev) => [...prev, err.message]);
        console.log("Error login");
      });
    return true;
  },
  //no need for email and password
  signout: (setErrors, setToken) => {
    // signOut is a no argument function
    firebase
      .auth()
      .signOut()
      .then((res) => {
        //remove the token
        localStorage.removeItem("token");
        //set the token back to original state
        setToken(null);
        store.set("loggedIn", false);
        //console.log("Logged out", is_logged_in());
      })
      .catch((err) => {
        //there shouldn't every be an error from firebase but just in case
        setErrors((prev) => [...prev, err.message]);
        //whether firebase does the trick or not i want my user to do there thing.
        localStorage.removeItem("token");
        setToken(null);
        console.error(err.message);
      });
  },
  ResetPassword: (email, setErrors) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((error) => {
        // Email sent.
        console.log("Email is sent");
        window.alert("An email has been sent if you have an account");
      })
      .catch((error) => {
        setErrors((prev) => [...prev, error.message]);
        // An error happened.
      });
  },
};
