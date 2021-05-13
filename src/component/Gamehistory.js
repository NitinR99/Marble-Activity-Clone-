import React, {useContext} from 'react';
import {firebaseAuth} from '../provider/AuthProvider'
import { Header, Icon, Image, Menu, Segment, Sidebar, Button, Placeholder,  Dropdown, Container, Divider, Card, Table, Modal } from 'semantic-ui-react'
import Firebase from "firebase";


const Gamehistory= (props) => {
const [visible, setVisible] = React.useState(false);
var [inp,setinp]=React.useState(null);
const getUserData = () => {
    let ref = Firebase.database().ref("/games");
    ref.on("value", snapshot => {
       setinp( snapshot.val());
    });
  };

  return (
<Container>
	<Header as='h1' style={{marginTop:20}}>All saved activities</Header>
  <Divider />
  <Button onClick={getUserData}>Get</Button>
<br />
<Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell singleLine>Activity name</Table.HeaderCell>
        <Table.HeaderCell>Code</Table.HeaderCell>
        <Table.HeaderCell>Blue %</Table.HeaderCell>
        <Table.HeaderCell>Yellow %</Table.HeaderCell>
        <Table.HeaderCell>No. of Participants</Table.HeaderCell>
        <Table.HeaderCell>Participated</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell>Details</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {inp!=null && Object.keys(inp).map((keyName, i) => (
      <Table.Row>
        <Table.Cell>
          {inp[keyName].name}
        </Table.Cell>
        <Table.Cell >
           {inp[keyName].id}
        </Table.Cell>
        <Table.Cell>
          {inp[keyName].blue}%
        </Table.Cell>
        <Table.Cell >
        {inp[keyName].green}%
        </Table.Cell>
        <Table.Cell>
        {inp[keyName].participant}
        </Table.Cell>
        <Table.Cell>
        {inp[keyName].participated}
        </Table.Cell>
        <Table.Cell textAlign="center">
        <Button style={{backgroundColor:"red"}} onClick={()=>{
           Firebase.database().ref("/games/"+inp[keyName].id.toString()).remove();
           console.log("removed");
        }}>Remove Activity</Button>
        </Table.Cell>
        <Table.Cell>
        <Modal trigger={<Button>Show</Button>}>
  <Modal.Header>{inp[keyName].name}</Modal.Header>
  <Modal.Content >

    <Modal.Description>
      <Header>Code: {inp[keyName].id}</Header>
      <Header>Blue marbles : {Math.round(inp[keyName].blueCount)}</Header>
      <Header>Yellow marbles: {Math.round(inp[keyName].greenCount)} [table value "green" implies yellow marble]</Header>
      <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Marbles</Table.HeaderCell>
        <Table.HeaderCell>Assigned to Public IP</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>

      {inp[keyName].ipValue!=null &&Object.keys(inp[keyName].ipValue).map((keyName2, j) => (<Table.Row>
        <Table.Cell>
          {inp[keyName].ipValue[keyName2].toString()}
        </Table.Cell>

        <Table.Cell >
        {inp[keyName].ipAddress[keyName2]!=null  && inp[keyName].ipAddress[keyName2].toString()}
        </Table.Cell>
      </Table.Row>))}

    </Table.Body>
  </Table>
    </Modal.Description>
  </Modal.Content>

</Modal>

        </Table.Cell>
      </Table.Row>
      ))}
    </Table.Body>
  </Table>
</Container>



  );
};

export default Gamehistory;
