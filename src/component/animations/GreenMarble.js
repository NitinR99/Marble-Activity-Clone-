import React, {useContext} from 'react';
import { motion } from "framer-motion"
import green from "../images/yellowmarble.png";
import bag from "../images/animsack.png";
import { Image} from 'semantic-ui-react';
const GreenMarble= (props) => {


  return (
    <div >
    <motion.div

    animate={{ y:[150,-100,0],scale:[0,1,3]}}
    transition={{ duration: 1 , delay:2}}

>
<img src={green} style={{width:'20%'}} />

</motion.div >
<motion.div
animate={{ y:[0,10,-10,10,-10,10,-10,10,-10,10,0]}}
transition={{ duration: 2 }}

>
<img src={bag} style={{width:'100%'}} />

</motion.div >
<motion.div

animate={{ y:[150,-100,0],scale:[0,1,1]}}
transition={{ duration: 1 , delay:2}}

>
<p>You got a YELLOW Marble!</p>
</motion.div >
</div>

  );
};

export default GreenMarble;
