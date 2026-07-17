interface Props{

events:any[];

}

export default function NetworkTraffic({

events

}:Props){

const latest=

events

.slice(-8)

.reverse();

return(

<div>

{

latest.map(flow=>

<div

key={flow.id}

style={{

padding:"14px 0",

borderBottom:"1px solid #20364E"

}}

>

<div

style={{

fontWeight:600

}}

>

{flow.source}

</div>

<div>

↓

</div>

<div>

{flow.destination}

</div>

<div

style={{

color:"#00E676"

}}

>

{flow.protocol}

</div>

</div>

)

}

</div>

);

}