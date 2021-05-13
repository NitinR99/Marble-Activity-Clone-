import React, {useContext} from 'react';
import { motion } from "framer-motion"
import blue from "../images/bluemarble.png";
import bag from "../images/animsack.png";
import { Image} from 'semantic-ui-react';
const BlueMarble= (props) => {


  return (
    <div >
    <motion.div
    animate={{ y:[150,-100,0],scale:[0,1,3]}}
    transition={{ duration: 1 , delay:2}}

>
<img src={blue} style={{width:'20%'}} />

</motion.div >
<motion.div
animate={{ y:[0,20,-20,20,-20,20,-20,20,-20,20,0]}}
transition={{ duration: 2 }}

>
<img src={bag} style={{width:'100%'}} />

</motion.div >
<motion.div

animate={{ y:[150,-100,0],scale:[0,1,1]}}
transition={{ duration: 1 , delay:2}}

>
<p>You got a BLUE Marble!</p>
</motion.div >
</div>

  );
};

export default BlueMarble;
