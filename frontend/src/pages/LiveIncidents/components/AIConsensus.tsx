import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";
import { Progress } from "antd";
import { useEffect,useState } from "react";

const models=[
"Oracle AI",
"Behaviour AI",
"Threat Intelligence",
"Graph AI",
"Digital Twin",
"Enterprise Brain",
"SOAR",
"Cyber DNA"
];

export default function AIConsensus(){

const [scores,setScores]=useState<number[]>([]);

useEffect(()=>{

const update=()=>{

setScores(

models.map(

()=>90+Math.floor(Math.random()*10)

)

);

};

update();

const timer=setInterval(update,2500);

return()=>clearInterval(timer);

},[]);

return(

<EnterpriseCard
title="AI Model Consensus"
height={500}
>

{

models.map((model,index)=>(

<div
key={model}
style={{
marginBottom:14
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
marginBottom:4
}}
>

<span
style={{
color:"#D7E6F5"
}}
>

{model}

</span>

<b
style={{
color:"#FFF"
}}
>

{scores[index] || 95}%

</b>

</div>

<Progress

percent={scores[index] || 95}

showInfo={false}

strokeColor="#00E676"

railColor="#223B58"

/>

</div>

))

}

</EnterpriseCard>

);

}