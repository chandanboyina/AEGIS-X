import { Row, Col, Progress } from "antd";
import {
    SafetyCertificateOutlined,
    WarningOutlined,
    RobotOutlined,
    ClusterOutlined,
    CloudServerOutlined,
    CheckCircleOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const cards = [
{
title:"Global Security Score",
value:96,
display:"96 /100",
color:"#00E676",
icon:<SafetyCertificateOutlined/>
},
{
title:"Active Threats",
value:14,
display:"14",
color:"#FF9800",
icon:<WarningOutlined/>
},
{
title:"AI Confidence",
value:98,
display:"98%",
color:"#40A9FF",
icon:<RobotOutlined/>
},
{
title:"Protected Assets",
value:12458,
display:"12,458",
color:"#00E676",
icon:<ClusterOutlined/>
},
{
title:"Critical Servers",
value:214,
display:"214",
color:"#FFD54F",
icon:<CloudServerOutlined/>
},
{
title:"Compliance",
value:99,
display:"99%",
color:"#00E676",
icon:<CheckCircleOutlined/>
}
];

function AnimatedValue({title,value,}:{title:string,value:number,display:string}){

const [count,setCount]=useState(0);

useEffect(()=>{

let current=0;

const step=Math.max(1,Math.ceil(value/60));

const timer=setInterval(()=>{

current+=step;

if(current>=value){

current=value;

clearInterval(timer);

}

setCount(current);

},18);

return()=>clearInterval(timer);

},[value]);

if(title==="Global Security Score"){

return <>{count} /100</>;

}

if(title==="AI Confidence" || title==="Compliance"){

return <>{count}%</>;

}

if(title==="Protected Assets"){

return <>{count.toLocaleString()}</>;

}

return <>{count}</>;

}

export default function ExecutiveKPIRow(){

return(

<Row gutter={[16,16]}>

{

cards.map(card=>(

<Col span={4} key={card.title}>

<div
style={{
background:"#16253B",
border:"1px solid #24425F",
padding:18,
borderRadius:8,
height:150
}}
>

<div
style={{
fontSize:30,
color:card.color
}}
>
{card.icon}
</div>

<div
style={{
marginTop:8,
fontSize:13,
color:"#8DA6BF"
}}
>
{card.title}
</div>

<div
style={{
fontSize:30,
fontWeight:700,
marginTop:6,
color:"#FFF"
}}
>

<AnimatedValue
title={card.title}
value={card.value}
display={card.display}
/>

</div>

<Progress
percent={90}
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