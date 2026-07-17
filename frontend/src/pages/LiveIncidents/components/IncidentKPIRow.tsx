import {
    Row,
    Col,
    Progress
} from "antd";

import {
    WarningOutlined,
    FireOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    SafetyCertificateOutlined,
    RobotOutlined
} from "@ant-design/icons";

import { useEffect, useState } from "react";

const cards=[

{
title:"Open Incidents",
value:28,
color:"#FF9800",
icon:<WarningOutlined/>
},

{
title:"Active Response",
value:16,
color:"#40A9FF",
icon:<RobotOutlined/>
},

{
title:"Critical",
value:4,
color:"#FF4D4F",
icon:<FireOutlined/>
},

{
title:"Resolved Today",
value:84,
color:"#00E676",
icon:<CheckCircleOutlined/>
},

{
title:"Average MTTR",
value:38,
suffix:" min",
color:"#FFD54F",
icon:<ClockCircleOutlined/>
},

{
title:"SLA Compliance",
value:97,
suffix:"%",
color:"#00E676",
icon:<SafetyCertificateOutlined/>
}

];

function Counter({

value,
suffix

}:{

value:number;
suffix?:string;

}){

const [count,setCount]=useState(0);

useEffect(()=>{

let current=0;

const timer=setInterval(()=>{

current++;

if(current>=value){

current=value;

clearInterval(timer);

}

setCount(current);

},20);

return()=>clearInterval(timer);

},[value]);

return(

<>

{count}

{suffix}

</>

);

}

export default function IncidentKPIRow(){

return(

<Row gutter={[16,16]}>

{

cards.map(card=>(

<Col span={4} key={card.title}>

<div

style={{

background:"#16253B",

border:"1px solid #26435E",

padding:16,

borderRadius:10,

height:135

}}

>

<div

style={{

fontSize:24,

color:card.color

}}

>

{card.icon}

</div>

<div

style={{

marginTop:8,

fontSize:12,

color:"#8EA9CC"

}}

>

{card.title}

</div>

<div

style={{

fontSize:22,

fontWeight:700,

marginTop:8,

color:"#FFF"

}}

>

<Counter

value={card.value}

suffix={card.suffix}

/>

</div>

<Progress

percent={85}

showInfo={false}

strokeColor={card.color}

/>

</div>

</Col>

))

}

</Row>

);

}