import {

ClusterOutlined,

DatabaseOutlined,

ThunderboltOutlined,

WarningOutlined,

FireOutlined,

CloudServerOutlined,

DeploymentUnitOutlined

}

from "@ant-design/icons";

interface Props{

events:any[];

}

export default function SystemMetrics({

events

}:Props){

const latest=

events.length

?

events[events.length-1]

:

{

cpu:0,

ram:0,

bandwidth:0,

packets:0,

alerts:0,

dropped:0,

temperature:0,

power:0

};

const cards=[

{

icon:<ClusterOutlined/>,

title:"CPU",

value:`${latest.cpu}%`

},

{

icon:<DatabaseOutlined/>,

title:"Memory",

value:`${latest.ram}%`

},

{

icon:<CloudServerOutlined/>,

title:"Bandwidth",

value:`${latest.bandwidth} Mbps`

},

{

icon:<WarningOutlined/>,

title:"Alerts",

value:latest.alerts

},

{

icon:<DeploymentUnitOutlined/>,

title:"Packets",

value:`${latest.packets}/sec`

},

{

icon:<ThunderboltOutlined/>,

title:"Power",

value:`${latest.power.toFixed(2)} kW`

},

{

icon:<FireOutlined/>,

title:"Temperature",

value:`${latest.temperature}°C`

},

{

icon:<WarningOutlined/>,

title:"Dropped",

value:latest.dropped

}

];

return(

<div

style={{

display:"grid",

gridTemplateColumns:"repeat(4,1fr)",

gap:16

}}

>

{

cards.map(card=>

<div

key={card.title}

style={{

display:"flex",

alignItems:"center",

gap:16,

padding:18,

background:"#132238",

border:"1px solid #23476A"

}}

>

<div

style={{

fontSize:28,

color:"#79C7FF"

}}

>

{card.icon}

</div>

<div>

<div

style={{

fontSize:13,

color:"#87A6C4"

}}

>

{card.title}

</div>

<div

style={{

fontSize:26,

fontWeight:700,

color:"#FFFFFF"

}}

>

{card.value}

</div>

</div>

</div>

)

}

</div>

);

}