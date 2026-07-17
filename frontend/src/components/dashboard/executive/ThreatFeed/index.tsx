import { useEffect,useState } from "react";

const feeds=[

"China → Government Cloud",
"Russia → Defence",
"Pakistan → Telecom",
"Iran → Banking",
"North Korea → Defence",
"USA → Healthcare",
"Germany → Power Grid",
"Singapore → Telecom",
"Australia → Railways",
"Japan → Banking"

];

export default function ThreatFeed(){

const [items,setItems]=useState(feeds);

useEffect(()=>{

const timer=setInterval(()=>{

setItems(old=>{

const updated=[...old];

updated.unshift(

feeds[Math.floor(Math.random()*feeds.length)]

);

return updated.slice(0,8);

});

},2000);

return()=>clearInterval(timer);

},[]);

return(

<div>

{

items.map((item,index)=>(

<div

key={index}

style={{

padding:"10px 0",

borderBottom:"1px solid #23374F",

display:"flex",

justifyContent:"space-between",

color:"#FFFFFF",

fontSize:14

}}

>

<span>

{item}

</span>

<span

style={{

color:"#7DD3FC"

}}

>

{new Date().toLocaleTimeString()}

</span>

</div>

))

}

</div>

);

}