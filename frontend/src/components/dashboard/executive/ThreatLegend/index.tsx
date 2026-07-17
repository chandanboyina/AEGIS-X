import { useEffect,useState } from "react";

export default function ThreatLegend(){

const [stats,setStats]=useState({

critical:12,

high:26,

medium:41,

low:73,

outbound:18

});

useEffect(()=>{

const timer=setInterval(()=>{

setStats({

critical:10+Math.floor(Math.random()*6),

high:20+Math.floor(Math.random()*8),

medium:35+Math.floor(Math.random()*10),

low:70+Math.floor(Math.random()*15),

outbound:15+Math.floor(Math.random()*8)

});

},2500);

return()=>clearInterval(timer);

},[]);

const row=(title:string,color:string,value:number)=>(

<div
style={{
marginBottom:18
}}
>

<div

style={{

display:"flex",

justifyContent:"space-between",

color:"#FFFFFF",

marginBottom:6

}}

>

<span>{title}</span>

<b>{value}</b>

</div>

<div

style={{

height:8,

background:"#26384E",

borderRadius:4,

overflow:"hidden"

}}

>

<div

style={{

height:"100%",

width:`${value}%`,

background:color,

transition:"0.4s"

}}

>

</div>

</div>

</div>

);

return(

<div>

{row("Critical","#FF4D4F",stats.critical)}

{row("High","#FF9800",stats.high)}

{row("Medium","#FFD54F",stats.medium)}

{row("Low","#00E676",stats.low)}

{row("Outbound","#40A9FF",stats.outbound)}

</div>

);

}