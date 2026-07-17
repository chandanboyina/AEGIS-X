import { useEffect, useState } from "react";

import {
    Tag,
    Space
} from "antd";

import {
    GlobalOutlined,
    WarningOutlined,
    ThunderboltOutlined,
    SafetyCertificateOutlined,
    RadarChartOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../common/EnterpriseCard/EnterpriseCard";

const feeds = [

{
icon:<WarningOutlined />,
color:"#FF4D4F",
text:"APT-41 targeting Government Infrastructure"
},

{
icon:<ThunderboltOutlined />,
color:"#FA8C16",
text:"Oracle AI detected privilege escalation"
},

{
icon:<GlobalOutlined />,
color:"#00E676",
text:"CVE-2026-21891 actively exploited"
},

{
icon:<SafetyCertificateOutlined />,
color:"#1890FF",
text:"CISA released new advisory"
},

{
icon:<RadarChartOutlined />,
color:"#00E676",
text:"IOC Feed updated with 218 indicators"
},

{
icon:<WarningOutlined />,
color:"#FF4D4F",
text:"Ransomware campaign detected in Banking"
},

{
icon:<ThunderboltOutlined />,
color:"#FFD666",
text:"Graph AI predicts lateral movement"
},

{
icon:<GlobalOutlined />,
color:"#13C2C2",
text:"Threat Intelligence confidence increased"
}

];

export default function ThreatIntelTicker(){

const [items,setItems]=useState(feeds);

useEffect(()=>{

const timer=setInterval(()=>{

setItems(old=>{

const next=[...old];

next.push(next.shift()!);

return [...next];

});

},3000);

return()=>clearInterval(timer);

},[]);

return(

<EnterpriseCard
title="Live Threat Intelligence Feed"
height={150}

>

<div
style={{
display:"flex",
alignItems:"center",
overflow:"hidden",
whiteSpace:"nowrap",
marginBottom: 10
}}
>

<div
style={{
display:"flex",
gap:24,
animation:"tickerMove 25s linear infinite"
}}
>

{items.map((item,index)=>(

<Space
key={index}
size={10}
>

<Tag
style={{
background:item.color,
border:0,
color:"#fff",
fontWeight:700,
padding:"4px 10px"
}}
>

LIVE

</Tag>

<span
style={{
color:item.color,
fontSize:18
}}
>

{item.icon}

</span>

<span
style={{
color:"#EAF4FF",
fontWeight:600
}}
>

{item.text}

</span>

</Space>

))}

</div>

</div>

<style>

{`

@keyframes tickerMove{

0%{

transform:translateX(0);

}

100%{

transform:translateX(-50%);

}

}

`}

</style>

</EnterpriseCard>

);

}