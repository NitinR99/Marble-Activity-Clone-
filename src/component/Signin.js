import React, { useContext } from "react";
import { firebaseAuth } from "../provider/AuthProvider";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Modal,
  Input,
} from "semantic-ui-react";
import firebase from "../firebase/firebaseIndex";
import "semantic-ui-css/semantic.min.css";
import store from "store";
import { Redirect } from "react-router-dom";
import isLoggedIn from "../helpers/is_logged_in";
function Signin(props) {
  const { handleSignin, inputs, setInputs, errors } = useContext(firebaseAuth);
  const { history } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignin();
    //history.push("/adminHome");
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        store.set("loggedIn", true);
        history.push("/adminHome");
        console.log(isLoggedIn());
      }
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const ResetPassword = () => {
    history.push("/resetPassword");
  };

  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" color="teal" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={handleChange}
                name="email"
                placeholder="email"
                value={inputs.email}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={handleChange}
                name="password"
                placeholder="password"
                value={inputs.password}
              />
              <Button.Group widths="2">
                <Button color="teal" size="large" onClick={handleSubmit}>
                  Login
                </Button>
                <Button color="teal" size="large" onClick={ResetPassword}>
                  Forgot Password?
                </Button>
              </Button.Group>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message
              color="red"
              errors={errors}
              content="The email/password is incorrect. Try again!"
            />
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Signin;
