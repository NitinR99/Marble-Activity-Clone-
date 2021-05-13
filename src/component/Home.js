//getuserData gets called twice on submission.
import React, {useContext} from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Button, Form, Grid, Header, Image, Message, Segment, Input, Modal, Dimmer, Container } from 'semantic-ui-react'
import Firebase from "firebase";
import BlueMarble from "./animations/BlueMarble";
import GreenMarble from "./animations/GreenMarble";
import ftplogo from "./images/ftpmainlogo.png";
import sack from "./images/animsack.png";
import config from '../firebase/config'
import ipify from 'react-native-ipify';
//get public ip
var ipAdd='';
ipify().then(ip => {
	ipAdd=ip;
});
const publicIp = require('public-ip');

(async () => {
	if(ipAdd==='')
	{
		try{
		//	console.log(await publicIp.v4());
			ipAdd=await publicIp.v4();
			}
			catch(err){
				console.log('ipv4 not found');
			}
	//=> 'fe80::200:f8ff:fe21:67cf'
	}

	else{
		try{
	//	console.log(await publicIp.v6());
			ipAdd=await publicIp.v6();
	}
	catch{
		console.log('ipv6 not found');
	}
		//=> '46.5.21.123'
	}
//console.log(ipAdd);
})();

function createSession() {
	if(localStorage.getItem('inSession')==true){
		console.log('already in a session');
		return;
	}
	else{
	localStorage.setItem('inSession', true);
	console.log('started new session');
	return;
}
}
function endSession(){
	if(localStorage.getItem('inSession')==false){
		console.log('session already ended');
		return;
	}
	else {
		localStorage.setItem('inSession',false);
		console.log('ended session');
		return;
	}
}
function inSession(){
	if(localStorage.getItem('inSession')==true){
		return true;
	}
	return false;
}
function Home(props){
  const [index, setIndex]=React.useState(-1);
  const [received, setReceived]=React.useState('');
const[gameID, setGameID]=React.useState('');
const[answer, setAnswer]=React.useState('');
  const [error, setError]=React.useState(false);
	const [full, setFull]=React.useState(false);
  const [op, setOp]=React.useState(null);
const [modalopen, setmodalopen]=React.useState(false);
const [resultModalopen, setresultModalopen]=React.useState(false);

  function getUserData() {
		if(inSession){
    setOp(null);
    setError(false);
		setFull(false);
    if(gameID===''){endSession(); return;}


      let ref=Firebase.database().ref("/games/"+gameID.toString()).on("value", snapshot => {
        if(snapshot.val()===null){
          setError(true);
					endSession();
          return;
        }
         setOp(snapshot.val());

        // get choice
        setIndex(parseInt(snapshot.val().ipAddress.indexOf(ipAdd)));
        if(index!=-1 ) {
          setReceived(snapshot.val().ipValue[index].toString());
					endSession();
					setmodalopen(true);
					return;
        }
        else
        {
					var newObj=snapshot.val();
					if(parseInt(newObj.participated)>=parseInt(newObj.participant))
					{
						endSession();
						setFull(true);
						return;
					}

					var indexval=parseInt(newObj.participated);
        	setReceived(newObj.values[parseInt(indexval)].toString());
					endSession();
					setmodalopen(true);
					return;
        }

      });
			return;
}
return;
    };
    function sendParticipationData(op){

      if(index===-1 ){
      op.participated+=1;
      op.ipAddress.push(ipAdd.toString());
      op.ipValue.push(received.toString());

        Firebase.database().ref("/games/"+gameID.toString()).set(op);
				return;
          }
return;

    };

  return (
<div>
  <div>
	<Dimmer active={true}>
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450, paddingBottom: 120 }}>
		<Image src={ftplogo} />
      <Header as='h2' textAlign='center' style={{color:'#58bbb5'}}>
         Enter activity ID to get your marble
      </Header>
      <Form size='large' >
        <Segment stacked style={{backgroundColor:'#58585b'}}>
        <Form.Field required  >
          <Input icon='keyboard' iconPosition='left' placeholder='ID' type='text' maxLength="8" value={gameID} onChange={(e) =>{setGameID(e.target.value.toString());}}/>
          </Form.Field>
          <Button color='blue' fluid size='large' type='submit' style={{backgroundColor:'#58bbb5'}} onClick={() => {createSession(); getUserData(); return;}}>
            Begin
          </Button>
        </Segment>
      </Form>
      {error && <p>Please make sure you entered the correct activity ID.</p>}{full && <p>The activity has reached it's maximum participants<br/>If you already got a marble, click begin again to see what you got.</p>}
    </Grid.Column>
  </Grid>
	<p style={{color:"grey"}}>The Flip the Script™ Program: Marble Activity</p>
	</Dimmer>
  </div>
  <div>
  <Modal basic size='small' open={modalopen && inSession } closeIcon={false}  style={{textAlign:"center"}} >
    <Modal.Content>
      <Modal.Description>
        <Header style={{color:"white"}} >{op!=null && "It's your turn to pick a marble"}{op===null && "Retrieving result... (close this window if it takes more than 30 seconds)"}</Header>
				<Image src={sack} />
        {op!=null && <Button style={{backgroundColor:"red"}} onClick={() => { setAnswer(received);endSession();sendParticipationData(op);setmodalopen(false);setresultModalopen(true); return;}}>Get your marble</Button> }
      </Modal.Description>
    </Modal.Content>
  </Modal>

	<Modal basic size='small' open={resultModalopen} style={{textAlign:"center"}} closeIcon={true} onClose={() => {setmodalopen(false); setresultModalopen(false); setGameID(''); setOp(null); localStorage.clear();window.location.reload(); return; }} >
    <Modal.Content >
      <Modal.Description >
        <Header style={{color:"white"}}>{op===null && "Retrieving result... (close this window if it takes more than 30 seconds)"}</Header>

        {op!=null && answer==="blue"?<BlueMarble/>:<GreenMarble/> }

      </Modal.Description>
    </Modal.Content>
  </Modal>
  </div>
</div>

  );
};

export default Home;
