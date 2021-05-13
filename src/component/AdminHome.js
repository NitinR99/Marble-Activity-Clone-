import React, { useContext } from "react";
import Gamehistory from "./Gamehistory";
import Newgame from "./Newgame";
import { firebaseAuth } from "../provider/AuthProvider";
import {
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Button,
  Placeholder,
  Dropdown,
} from "semantic-ui-react";
import store from "store";
const AdminHome = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [option, setOption] = React.useState(false);
  const { handleSignout } = useContext(firebaseAuth);
  const { history } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignout();
    store.set("loggedIn", false);
    history.push("/admin");
  };
  const redirectToReset = () => {
    store.set("loggedIn", false);
    history.push("/resetPassword");
  };
  return (
    <div>
      <div>
        <Menu primary="true">
          <Menu.Item>
            <Icon loading name="certificate" />
            Admin Panel
          </Menu.Item>
          <Menu.Item />
          <Menu.Item
            name="New Activity"
            onClick={() => {
              setOption(false);
            }}
            active={!option}
          />
          <Menu.Item
            name="All activities"
            onClick={() => {
              setOption(true);
            }}
            active={option}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <Dropdown icon="setting">
                <Dropdown.Menu>
                  <Dropdown.Item text="Add new admin..." href="/admin/signup" />
                  <Dropdown.Item
                    text="Reset Password"
                    onClick={redirectToReset}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
            <Menu.Item name="logout" onClick={handleSubmit} />
          </Menu.Menu>
        </Menu>
      </div>
      <div>
        {!option && <Newgame />}
        {option && <Gamehistory />}
      </div>
    </div>
  );
};

export default AdminHome;
