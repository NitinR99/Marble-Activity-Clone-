import React, {useContext} from 'react';
import {firebaseAuth} from '../provider/AuthProvider'
import config from '../firebase/config'
import { Button, Checkbox, Form, Container, Header, Message,Input, Divider } from 'semantic-ui-react'
import Firebase from "firebase";

const handleIDChange = (e) =>{game.id=e.target.value;}
const handleNameChange = (e) =>{game.name=e.target.value;}
const handleParticipantChange = (e) =>{game.participant=parseInt(e.target.value);}

var game={
	id:'',
	name:'',
	blue:50,
	green:50,
	blueCount:0,
	greenCount:0,
  participant:0,
	participated:0,
	values:[],
	ipAddress:[],
	ipValue:[]
};

const Newgame= (props) => {
const handleBlue= (e)=>{setblueChance(parseInt(e.target.value)); setgreenChance(parseInt(100-e.target.value)); game.blue=blueChance; game.green=greenChance;}
const handleGreen= (e)=>{setgreenChance(parseInt(e.target.value));setblueChance(parseInt(100-e.target.value)); game.blue=blueChance; game.green=greenChance;}
const [greenChance, setgreenChance]=React.useState(50);
const [blueChance, setblueChance]=React.useState(50);
const [submit, setsubmit]=React.useState(false);
const [error, seterror]=React.useState(false);
const [visible, setVisible] = React.useState(false);
const writeUserData = () => {
if(game.id===''||game.name===''||game.participant===0)
{
  setsubmit(false);
  seterror(true);
  return;
}
game.blue=blueChance;
game.green=greenChance;
game.blueCount=(game.blue/100)*game.participant;
game.greenCount=game.participant-game.blueCount;
var i;
for(i=0;i<Math.round(game.blueCount);i++){game.values.push('blue');}
for(i=0;i<Math.round(game.greenCount);i++){game.values.push('green');}
//shuffle algorithm (fisher-yates)
for(let i = game.values.length-1; i > 0; i--){
  const j = Math.floor(Math.random() * i)
  const temp = game.values[i]
  game.values[i] = game.values[j]
  game.values[j] = temp
}
game.ipAddress.push('start');
game.ipValue.push('start');
    Firebase.database()
      .ref("/games/"+game.id.toString())
      .set(game);
      seterror(false);
      setsubmit(true);
			game={
				id:'',
				name:'',
				blue:50,
				green:50,
				blueCount:0,
				greenCount:0,
			  participant:0,
				participated:0,
				values:[],
				ipAddress:[],
				ipValue:[]
				}
  };
  return (
<div>
<Container>
	<Form onSubmit={writeUserData} style={{marginTop:20}}>
	<Header as='h1'>Add a new activity</Header>
  <Divider />
    <Form.Field required onChange={handleIDChange}>
      <label>Activity ID</label>
      <Input placeholder='Ex: 58954, A8G1D,...' maxLength='8'/>
    </Form.Field>
    <Form.Field required onChange={handleNameChange}>
      <label>Activity name</label>
      <Input placeholder='Name' />
    </Form.Field>
    <Header as='h3'>Options</Header>

    <Form.Field>
      <label>Blue: {blueChance}%</label>
      <Form.Input
            label={'probability'}
            min={0}
            max={100}
            name='duration'
            onChange={handleBlue}
            step={1}
            type='range'
            value={blueChance}
          />
    </Form.Field>
    <Form.Field>
      <label>Yellow: {greenChance}%</label>
      <Form.Input
            label={'probability'}
            min={0}
            max={100}
            name='duration'
            onChange={handleGreen}
            style={{color:'green'}}
            step={1}
            type='range'
            value={greenChance}
          />
    </Form.Field>
    <Header as='h3'>Participants</Header>
    <Divider />
    <Form.Field required onChange={handleParticipantChange}>
      <label>Number of participants</label>
      <Input placeholder='participant count' type='number' min='2' max='1000' />
    </Form.Field>
    <Divider />
    <Button type='submit'>Add activity</Button>
  </Form>
{submit &&
<Message
      success
      header='Insert Completed'
      content="Activity has been uploaded to the database"
    />
}
{error &&
<Message
      warning
      header='Missing values'
      content="Please recheck to see if you missed an input"
    />
}
</Container>
</div>



  );
};

export default Newgame;
