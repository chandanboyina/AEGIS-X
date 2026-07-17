import { useEffect, useState } from "react";
import { infrastructure } from "../../../../data/infrastructure";
import "./index.css";

export default function NationalInfrastructure(){

const [assets,setAssets]=useState(infrastructure);

useEffect(()=>{

const timer=setInterval(()=>{

setAssets(old=>

old.map(asset=>{

let health=asset.health;

health+=Math.floor(Math.random()*7)-3;

health=Math.max(25,Math.min(100,health));

let status="healthy";

if(health<60)
status="critical";

else if(health<85)
status="warning";

return{

...asset,

health,

status

};

})

);

},3000);

return()=>clearInterval(timer);

},[]);

const color=(status:string)=>{

switch(status){

case "healthy":
return "#00E676";

case "warning":
return "#FFD54F";

case "critical":
return "#FF4D4F";

default:
return "#4FC3F7";

}

};

return(

<div>

{

assets.map(asset=>(

<div

key={asset.name}

style={{

marginBottom:18

}}

>

<div

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center"

}}

>

<div>


<span

className="blink-dot"

style={{

display:"inline-block",

width:10,

height:10,

borderRadius:"50%",

background:color(asset.status),

marginRight:10,

boxShadow:`0 0 10px ${color(asset.status)}`

}}

>


</span>

<span

style={{

color:"#FFFFFF",

fontWeight:500

}}

>

{asset.name}

</span>

</div>

<div

style={{

color:"#FFFFFF",

fontWeight:700

}}

>

{asset.health}%

</div>

</div>

<div
style={{
display:"flex",
gap:1,
marginTop:10
}}
>

{

Array.from({length:20}).map((_,i)=>{

const filled=i<(asset.health/5);

return(

<div

key={i}

style={{

height:18,

flex:1,

borderRadius:1,

background:filled
? "#FFFFFF"
: "#30435B",

transition:"0.3s"

}}

/>

);

})

}

</div>

</div>

))

}

</div>

);

}