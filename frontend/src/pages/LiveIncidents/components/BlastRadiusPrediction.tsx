import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";
import { Progress } from "antd";
import { useEffect,useState } from "react";

const assets=[
"Power Grid",
"Government Cloud",
"Banking",
"Railways",
"Healthcare",
"Defence"
];

export default function BlastRadiusPrediction(){

const [values,setValues]=useState<number[]>([]);

useEffect(()=>{

const update=()=>{

setValues(

assets.map(

()=>20+Math.floor(Math.random()*80)

)

);

};

update();

const timer=setInterval(update,2200);

return()=>clearInterval(timer);

},[]);

return(

<EnterpriseCard
title="Graph AI Blast Radius"
height={500}
>

{

assets.map((asset,index)=>(

<div
key={asset}
style={{
marginBottom:18
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
marginBottom:5
}}
>

<span
style={{
color:"#D7E6F5"
}}
>

{asset}

</span>

<b
style={{
color:"#FFF"
}}
>

{values[index] || 60}%

</b>

</div>

<Progress

percent={values[index] || 60}

showInfo={false}

strokeColor={
(values[index] || 60)>70
?"#FF4D4F"
:(values[index] || 60)>45
?"#FAAD14"
:"#00E676"
}

trailColor="#223B58"

/>

</div>

))

}

</EnterpriseCard>

);

}