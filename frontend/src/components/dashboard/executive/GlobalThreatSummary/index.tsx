import { useEffect, useState } from "react";
import { Row, Col } from "antd";

export default function GlobalThreatSummary(){

const [stats,setStats]=useState({

incoming:18,
blocked:15,
active:3,
critical:2

});

useEffect(()=>{

const timer=setInterval(()=>{

setStats({

incoming:15+Math.floor(Math.random()*12),

blocked:10+Math.floor(Math.random()*10),

active:2+Math.floor(Math.random()*6),

critical:1+Math.floor(Math.random()*4)

});

},2000);

return()=>clearInterval(timer);

},[]);

const card=(title:string,value:number,color:string)=>(
<div
style={{
background:"#132238",
padding:14,
borderRadius:8,
borderLeft:`4px solid ${color}`
}}
>

<div style={{color:"#9FB3C8"}}>
{title}
</div>

<div
style={{
fontSize:28,
fontWeight:700,
color
}}
>
{value}
</div>

</div>
);

return(

<Row gutter={12}>

<Col span={6}>
{card("Incoming",stats.incoming,"#FF9800")}
</Col>

<Col span={6}>
{card("Blocked",stats.blocked,"#00E676")}
</Col>

<Col span={6}>
{card("Active",stats.active,"#40A9FF")}
</Col>

<Col span={6}>
{card("Critical",stats.critical,"#FF4D4F")}
</Col>

</Row>

);

}