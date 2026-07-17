import { useEffect, useState } from "react";

import {
    Badge,
    Tag
} from "antd";

import {
    GlobalOutlined,
    SafetyCertificateOutlined,
    ApartmentOutlined,
    DatabaseOutlined,
    CloudServerOutlined,
    DesktopOutlined,
    ApiOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface TwinNode{

    id:number;

    title:string;

    subtitle:string;

    icon:any;

    color:string;

    health:number;

    sync:number;

}

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function EnterpriseTwinView(){

    const [health,setHealth]=useState(99);

    const [sync,setSync]=useState(98);

    const [nodes,setNodes]=useState<TwinNode[]>([]);

    function refresh(){

        setHealth(random(97,100));

        setSync(random(96,100));

        setNodes([

            {

                id:1,

                title:"Internet",

                subtitle:"External",

                icon:<GlobalOutlined/>,

                color:"#1677FF",

                health:100,

                sync:100

            },

            {

                id:2,

                title:"Edge Firewall",

                subtitle:"Perimeter",

                icon:<SafetyCertificateOutlined/>,

                color:"#FAAD14",

                health:99,

                sync:99

            },

            {

                id:3,

                title:"Core Switch",

                subtitle:"Enterprise Core",

                icon:<ApartmentOutlined/>,

                color:"#00E676",

                health:98,

                sync:98

            },

            {

                id:4,

                title:"Oracle Database",

                subtitle:"Critical Data",

                icon:<DatabaseOutlined/>,

                color:"#722ED1",

                health:99,

                sync:98

            },

            {

                id:5,

                title:"Cloud Services",

                subtitle:"Hybrid Cloud",

                icon:<CloudServerOutlined/>,

                color:"#13C2C2",

                health:98,

                sync:97

            },

            {

                id:6,

                title:"Endpoints",

                subtitle:"Managed Devices",

                icon:<DesktopOutlined/>,

                color:"#1677FF",

                health:97,

                sync:98

            },

            {

                id:7,

                title:"Applications",

                subtitle:"Business Apps",

                icon:<ApiOutlined/>,

                color:"#52C41A",

                health:99,

                sync:99

            }

        ]);

    }

    useEffect(()=>{

        refresh();

        const timer=setInterval(refresh,5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle AI Enterprise Digital Twin"
            height={1550}
        >

            {/* Header */}

            <div
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    marginBottom:28
                }}
            >

                <div>

                    <div
                        style={{
                            color:"#00E676",
                            fontSize:18,
                            fontWeight:700
                        }}
                    >
                        Live Infrastructure Synchronization
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6
                        }}
                    >
                        Oracle AI continuously mirrors the physical
                        enterprise infrastructure into a real-time
                        Digital Twin.
                    </div>

                </div>

                <div
                    style={{
                        display:"flex",
                        gap:14
                    }}
                >

                    <Tag color="green">

                        Health {health}%

                    </Tag>

                    <Tag color="blue">

                        Sync {sync}%

                    </Tag>

                </div>

            </div>

            {/* ============================
                    DIGITAL TWIN
            ============================= */}

            <div className="twinContainer">

                {/* INTERNET */}

                <div className="twinRow">

                    <div className="twinNode">

                        <Badge status="processing"/>

                        <div
                            className="twinIcon"
                            style={{
                                color:nodes[0]?.color,
                                background:"#1677FF22"
                            }}
                        >

                            {nodes[0]?.icon}

                        </div>

                        <div className="nodeTitle">

                            {nodes[0]?.title}

                        </div>

                        <div className="nodeSub">

                            {nodes[0]?.subtitle}

                        </div>

                        <div className="nodeHealth">

                            {nodes[0]?.health}% Healthy

                        </div>

                    </div>

                </div>

                <div className="syncLine"/>

                {/* FIREWALL */}

                <div className="twinRow">

                    <div className="twinNode">

                        <Badge status="processing"/>

                        <div
                            className="twinIcon"
                            style={{
                                color:nodes[1]?.color,
                                background:"#FAAD1422"
                            }}
                        >

                            {nodes[1]?.icon}

                        </div>

                        <div className="nodeTitle">

                            {nodes[1]?.title}

                        </div>

                        <div className="nodeSub">

                            {nodes[1]?.subtitle}

                        </div>

                        <div className="nodeHealth">

                            Sync {nodes[1]?.sync}%

                        </div>

                    </div>

                </div>

                <div className="syncLine"/>

                {/* CORE SWITCH */}

                <div className="twinRow">

                    <div className="twinNode large">

                        <Badge status="processing"/>

                        <div
                            className="twinIcon"
                            style={{
                                color:nodes[2]?.color,
                                background:"#00E67622"
                            }}
                        >

                            {nodes[2]?.icon}

                        </div>

                        <div className="nodeTitle">

                            {nodes[2]?.title}

                        </div>

                        <div className="nodeSub">

                            {nodes[2]?.subtitle}

                        </div>

                        <div className="nodeHealth">

                            Twin Sync {nodes[2]?.sync}%

                        </div>

                    </div>

                </div>

                {/* BRANCHES */}

                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between",
                        marginTop:40
                    }}
                >

                    {

                        nodes.slice(3).map(node=>(

                            <div
                                key={node.id}
                                style={{
                                    display:"flex",
                                    flexDirection:"column",
                                    alignItems:"center",
                                    width:"22%"
                                }}
                            >

                                <div className="branchLine"/>

                                <div className="twinNode small">

                                    <Badge status="processing"/>

                                    <div
                                        className="twinIcon"
                                        style={{
                                            color:node.color,
                                            background:`${node.color}22`
                                        }}
                                    >

                                        {node.icon}

                                    </div>

                                    <div className="nodeTitle">

                                        {node.title}

                                    </div>

                                    <div className="nodeSub">

                                        {node.subtitle}

                                    </div>

                                    <div className="nodeHealth">

                                        {node.sync}% Sync

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

            {/* Oracle AI */}

            <div
                style={{
                    marginTop:30,
                    background:"#102033",
                    borderLeft:"4px solid #00E676",
                    borderRadius:12,
                    padding:18
                }}
            >

                <div
                    style={{
                        color:"#00E676",
                        fontWeight:700,
                        marginBottom:10
                    }}
                >

                    Oracle AI Digital Twin Engine

                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >

                    Oracle AI continuously synchronizes every
                    enterprise asset with its virtual Digital Twin.
                    Live telemetry, topology relationships,
                    infrastructure state, health metrics and
                    behavioural intelligence are mirrored in
                    real time, enabling predictive analysis,
                    simulations and proactive cyber resilience.

                </div>

            </div>
                        {/* Footer */}

            <div
                style={{
                    marginTop:24,
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}
            >

                <div>

                    <div
                        style={{
                            color:"#00E676",
                            fontWeight:700,
                            fontSize:16
                        }}
                    >
                        Oracle AI Digital Twin Intelligence
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13,
                            lineHeight:1.7
                        }}
                    >
                        Oracle AI continuously synchronizes enterprise
                        infrastructure, applications, identities and
                        cloud workloads into a real-time Digital Twin,
                        enabling predictive analysis, attack simulation,
                        failure forecasting and autonomous cyber
                        resilience.
                    </div>

                </div>

                <Tag
                    color="success"
                    style={{
                        padding:"4px 12px",
                        fontWeight:700
                    }}
                >
                    ● LIVE
                </Tag>

            </div>

            <style>

{`

.twinContainer{

display:flex;

flex-direction:column;

align-items:center;

position:relative;

}

.twinRow{

display:flex;

justify-content:center;

width:100%;

}

.twinNode{

width:180px;

background:#16253B;

border:1px solid #29425E;

border-radius:16px;

padding:18px;

display:flex;

flex-direction:column;

align-items:center;

transition:.35s;

position:relative;

animation:twinFloat 4s ease-in-out infinite;

}

.twinNode.large{

width:220px;

}

.twinNode.small{

width:160px;

}

.twinNode:hover{

transform:translateY(-6px);

border-color:#00E676;

box-shadow:0 12px 28px rgba(0,230,118,.22);

}

.twinIcon{

width:64px;

height:64px;

border-radius:18px;

display:flex;

justify-content:center;

align-items:center;

font-size:30px;

margin:12px 0;

}

.nodeTitle{

color:#FFFFFF;

font-size:17px;

font-weight:700;

text-align:center;

}

.nodeSub{

color:#8EA9CC;

font-size:13px;

margin-top:4px;

text-align:center;

}

.nodeHealth{

margin-top:10px;

color:#00E676;

font-weight:700;

font-size:13px;

}

.syncLine{

width:4px;

height:55px;

margin:8px 0;

background:linear-gradient(

180deg,

#00E676,

#1677FF

);

position:relative;

overflow:hidden;

border-radius:20px;

}

.syncLine::after{

content:"";

position:absolute;

left:-2px;

top:-22px;

width:8px;

height:20px;

border-radius:20px;

background:#FFFFFF;

box-shadow:0 0 14px #00E676;

animation:syncFlow 2s linear infinite;

}

.branchLine{

width:3px;

height:45px;

margin-bottom:12px;

background:linear-gradient(

180deg,

#00E676,

#13C2C2

);

position:relative;

overflow:hidden;

border-radius:20px;

}

.branchLine::after{

content:"";

position:absolute;

left:-2px;

top:-18px;

width:7px;

height:18px;

border-radius:20px;

background:#FFFFFF;

box-shadow:0 0 12px #13C2C2;

animation:branchFlow 2.4s linear infinite;

}

@keyframes syncFlow{

0%{

top:-20px;

opacity:0;

}

20%{

opacity:1;

}

100%{

top:100%;

opacity:0;

}

}

@keyframes branchFlow{

0%{

top:-18px;

opacity:0;

}

20%{

opacity:1;

}

100%{

top:100%;

opacity:0;

}

}

@keyframes twinFloat{

0%{

transform:translateY(0px);

}

50%{

transform:translateY(-6px);

}

100%{

transform:translateY(0px);

}

}

`}

            </style>

        </EnterpriseCard>

    );

}