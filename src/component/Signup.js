import React, { useContext } from "react";
import { firebaseAuth } from "../provider/AuthProvider";
import { withRouter } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import firebase from "../firebase/firebaseIndex";
import "semantic-ui-css/semantic.min.css";
const Signup = (props) => {
  const { handleSignup, inputs, setInputs, errors } = useContext(firebaseAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //wait to signup
    await handleSignup();
    //push home
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        props.history.push("/admin");
      }
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="green" textAlign="center">
          Add a new admin
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
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
            <Button color="green" fluid size="large">
              Sign up
            </Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message
            color="red"
            errors={errors}
            content="The email is badly formatted"
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default withRouter(Signup);
