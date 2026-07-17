import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";
import { useEffect, useState } from "react";

const logs = [

"Oracle AI detected IOC",

"SOAR isolated endpoint",

"PowerShell blocked",

"Threat neutralized",

"Playbook PB-010 executed",

"Firewall updated",

"Malware quarantined"

];

export default function ActivityStream(){

const [events,setEvents]=useState(logs);

useEffect(()=>{

const timer=setInterval(()=>{

setEvents(old=>{

const next=[

logs[Math.floor(Math.random()*logs.length)],

...old

];

return next.slice(0,8);

});

},3000);

return()=>clearInterval(timer);

},[]);

return(

<EnterpriseCard
title="Activity Stream"
height={400}
>

{

events.map((e,i)=>(

<div
key={i}
style={{
padding:"10px 0",
borderBottom:"1px solid #24384F"
}}
>

{new Date().toLocaleTimeString()} • {e}

</div>

))

}

</EnterpriseCard>

);

}