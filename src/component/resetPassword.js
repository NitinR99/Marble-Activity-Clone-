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
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import store from "store";
const ResetPassword = (props) => {
  const { handleSignout } = useContext(firebaseAuth);
  const { handleReset, inputs, setInputs, errors } = useContext(firebaseAuth);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleReset();
    onButtonClickHandler();
    props.history.push("/admin");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const onButtonClickHandler = () => {
    if (errors.length < 0) {
      window.alert("An email has been sent if you have an account");
    }
  };
  const logout = (e) => {
    e.preventDefault();
    handleSignout();
    store.set("loggedIn", false);
    props.history.push("/admin");
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
            Reset your Password
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="email"
                required
                value={inputs.email}
              />
              <Button.Group widths="2">
                <Button color="teal" fluid size="large" onClick={handleSubmit}>
                  Reset Password
                </Button>
                <Button color="teal" size="large" onClick={logout}>
                  Back to login
                </Button>
              </Button.Group>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message
              color="red"
              errors={errors}
              content={"The email is badly formatted"}
            />
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ResetPassword;
