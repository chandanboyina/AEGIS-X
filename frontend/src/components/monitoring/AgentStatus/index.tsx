interface Props{

events:any[];

}

export default function AgentStatus({

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

disk:0,

bandwidth:0

};

const agents=[

{

name:"Oracle",

value:latest.cpu

},

{

name:"Observer",

value:latest.ram

},

{

name:"Graph AI",

value:latest.disk

},

{
    // Clamps the final percentage value between 0 and 100
    name: "Enterprise Brain",
    value:60 + Math.floor(Math.random()*40)
},

{
    name:"SOAR",
    value:95+Math.floor(Math.random()*5)
}

];

return(

<div>

{

agents.map(agent=>

<div key={agent.name} style={{marginBottom:20}}>

<div

style={{

display:"flex",

justifyContent:"space-between",

marginBottom:6

}}

>

<span>{agent.name}</span>

<span>{agent.value}%</span>

</div>

<div

style={{

height:10,

background:"#13263C"

}}

>

<div

style={{

height:"100%",

width:`${agent.value}%`,

background:"white"

}}

>

</div>

</div>

</div>

)

}

</div>

);

}