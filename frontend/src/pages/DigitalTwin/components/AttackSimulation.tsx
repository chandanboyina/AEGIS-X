import { useEffect, useState } from "react";

import {
    Progress,
    Tag
} from "antd";

import {
    GlobalOutlined,
    SafetyCertificateOutlined,
    UserOutlined,
    ApartmentOutlined,
    DatabaseOutlined,
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface AttackNode{

    id:number;

    title:string;

    icon:any;

    status:"ENTRY"|"COMPROMISED"|"TARGET"|"SECURED";

}

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function AttackSimulation(){

    const [confidence,setConfidence]=useState(98);

    const [containment,setContainment]=useState(91);

    const [blastRadius,setBlastRadius]=useState(28);

    const [eta,setEta]=useState(6);

    const [nodes,setNodes]=useState<AttackNode[]>([]);

    function refresh(){

        setConfidence(random(96,99));

        setContainment(random(88,96));

        setBlastRadius(random(18,36));

        setEta(random(4,10));

        setNodes([

            {

                id:1,

                title:"Internet",

                icon:<GlobalOutlined/>,

                status:"ENTRY"

            },

            {

                id:2,

                title:"Firewall",

                icon:<SafetyCertificateOutlined/>,

                status:"COMPROMISED"

            },

            {

                id:3,

                title:"Employee",

                icon:<UserOutlined/>,

                status:"COMPROMISED"

            },

            {

                id:4,

                title:"ERP Server",

                icon:<ApartmentOutlined/>,

                status:"TARGET"

            },

            {

                id:5,

                title:"Oracle DB",

                icon:<DatabaseOutlined/>,

                status:"SECURED"

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
            title="Oracle AI Attack Simulation"
            height={1820}
        >

            <div
                style={{
                    display:"flex",
                    gap:24
                }}
            >

                {/* ==========================
                    Attack Simulation Path
                ========================== */}

                <div
                    style={{
                        flex:1.2,
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center"
                    }}
                >

                    {

                        nodes.map((node,index)=>(

                            <div
                                key={node.id}
                                style={{
                                    display:"flex",
                                    flexDirection:"column",
                                    alignItems:"center",
                                    width:"100%"
                                }}
                            >

                                <div
                                    className={`simulationNode ${node.status.toLowerCase()}`}
                                >

                                    <div className="simulationIcon">

                                        {node.icon}

                                    </div>

                                    <div
                                        style={{
                                            marginTop:10,
                                            color:"#FFFFFF",
                                            fontWeight:700,
                                            fontSize:16
                                        }}
                                    >
                                        {node.title}
                                    </div>

                                    {

                                        node.status==="ENTRY" && (

                                            <Tag
                                                color="blue"
                                                style={{
                                                    marginTop:10
                                                }}
                                            >
                                                ENTRY
                                            </Tag>

                                        )

                                    }

                                    {

                                        node.status==="COMPROMISED" && (

                                            <Tag
                                                color="red"
                                                style={{
                                                    marginTop:10
                                                }}
                                            >
                                                COMPROMISED
                                            </Tag>

                                        )

                                    }

                                    {

                                        node.status==="TARGET" && (

                                            <Tag
                                                color="orange"
                                                style={{
                                                    marginTop:10
                                                }}
                                            >
                                                TARGET
                                            </Tag>

                                        )

                                    }

                                    {

                                        node.status==="SECURED" && (

                                            <Tag
                                                color="green"
                                                style={{
                                                    marginTop:10
                                                }}
                                            >
                                                SECURED
                                            </Tag>

                                        )

                                    }

                                </div>

                                {

                                    index!==nodes.length-1 && (

                                        <div className="simulationLine"/>

                                    )

                                }

                            </div>

                        ))

                    }

                </div>

                {/* ==========================
                        AI Prediction
                ========================== */}

                <div
                    style={{
                        flex:1,
                        display:"flex",
                        flexDirection:"column",
                        gap:18
                    }}
                >

                    {/* AI Confidence */}

                    <div className="metricCard">

                        <div className="metricTitle">

                            Oracle AI Confidence

                        </div>

                        <Progress
                            percent={confidence}
                            showInfo={false}
                            strokeColor="#00E676"
                            trailColor="#223248"
                        />

                        <div className="metricValue">

                            {confidence}%

                        </div>

                    </div>

                    {/* Blast Radius */}

                    <div className="metricCard">

                        <div className="metricTitle">

                            Predicted Blast Radius

                        </div>

                        <div
                            style={{
                                color:"#FF4D4F",
                                fontSize:32,
                                fontWeight:700,
                                marginTop:10
                            }}
                        >

                            {blastRadius}

                        </div>

                        <div
                            style={{
                                color:"#8EA9CC",
                                marginTop:4
                            }}
                        >
                            Enterprise Assets
                        </div>

                    </div>

                    {/* Containment */}

                    <div className="metricCard">

                        <div className="metricTitle">

                            Containment Probability

                        </div>

                        <Progress
                            percent={containment}
                            showInfo={false}
                            strokeColor="#1677FF"
                            trailColor="#223248"
                        />

                        <div className="metricValue">

                            {containment}%

                        </div>

                    </div>

                    {/* ETA */}

                    <div className="metricCard">

                        <div className="metricTitle">

                            Estimated Time To Compromise

                        </div>

                        <div
                            style={{
                                color:"#FAAD14",
                                fontWeight:700,
                                fontSize:30,
                                marginTop:10
                            }}
                        >

                            {eta} Minutes

                        </div>

                    </div>

                    {/* Oracle AI */}

                    <div
                        style={{
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

                            Oracle AI Attack Simulation Engine

                        </div>

                        <div
                            style={{
                                color:"#DCE8F4",
                                lineHeight:1.8
                            }}
                        >

                            Oracle AI executes attack simulations
                            inside the Digital Twin before threats
                            reach production infrastructure.
                            By combining topology relationships,
                            behavioural analytics and threat
                            intelligence, the engine predicts attack
                            progression, blast radius and optimal
                            containment strategies.

                        </div>

                    </div>

                </div>

            </div>
                        {/* ==========================
                Simulation Summary
            ========================== */}

            <div
                style={{
                    marginTop:24,
                    background:"#16253B",
                    border:"1px solid #29425E",
                    borderRadius:12,
                    padding:18
                }}
            >

                <div
                    style={{
                        color:"#FFFFFF",
                        fontSize:17,
                        fontWeight:700,
                        marginBottom:18
                    }}
                >
                    Attack Simulation Summary
                </div>

                <div
                    style={{
                        display:"flex",
                        flexDirection:"column",
                        gap:14
                    }}
                >

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >
                        <span style={{color:"#8EA9CC"}}>

                            AI Confidence

                        </span>

                        <span
                            style={{
                                color:"#00E676",
                                fontWeight:700
                            }}
                        >

                            {confidence}%

                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >
                        <span style={{color:"#8EA9CC"}}>

                            Blast Radius

                        </span>

                        <span
                            style={{
                                color:"#FF4D4F",
                                fontWeight:700
                            }}
                        >

                            {blastRadius} Assets

                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >
                        <span style={{color:"#8EA9CC"}}>

                            Containment Probability

                        </span>

                        <span
                            style={{
                                color:"#1677FF",
                                fontWeight:700
                            }}
                        >

                            {containment}%

                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >
                        <span style={{color:"#8EA9CC"}}>

                            Estimated Compromise

                        </span>

                        <span
                            style={{
                                color:"#FAAD14",
                                fontWeight:700
                            }}
                        >

                            {eta} Minutes

                        </span>

                    </div>

                </div>

            </div>

            {/* Oracle AI Decision */}

            <div
                style={{
                    marginTop:22,
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
                        fontSize:16,
                        marginBottom:10
                    }}
                >
                    Oracle AI Containment Decision
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >

                    Oracle AI predicts that isolating the compromised
                    identity, blocking lateral movement and enforcing
                    adaptive segmentation will reduce the simulated
                    blast radius by more than 80%. The Digital Twin
                    validates every containment strategy before it is
                    applied to production infrastructure.

                </div>

            </div>

            {/* Footer */}

            <div
                style={{
                    marginTop:22,
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
                        Oracle AI Attack Intelligence
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13,
                            lineHeight:1.7
                        }}
                    >
                        Oracle AI continuously executes attack
                        simulations inside the Digital Twin,
                        evaluates attack progression, predicts
                        containment effectiveness and recommends
                        autonomous defensive actions before the
                        attack reaches production systems.

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

.metricCard{

background:#16253B;

border:1px solid #29425E;

border-radius:14px;

padding:18px;

transition:.35s;

}

.metricCard:hover{

transform:translateY(-4px);

border-color:#1677FF;

box-shadow:0 10px 24px rgba(22,119,255,.18);

}

.metricTitle{

color:#8EA9CC;

font-size:13px;

margin-bottom:10px;

}

.metricValue{

margin-top:12px;

font-size:24px;

font-weight:700;

color:#FFFFFF;

}

.simulationNode{

width:200px;

padding:18px;

background:#16253B;

border-radius:14px;

border:1px solid #29425E;

display:flex;

flex-direction:column;

align-items:center;

transition:.35s;

animation:nodeFloat 4s ease-in-out infinite;

}

.simulationIcon{

width:60px;

height:60px;

border-radius:16px;

display:flex;

justify-content:center;

align-items:center;

font-size:28px;

background:#223248;

color:#FFFFFF;

}

.entry{

border-color:#1677FF;

}

.compromised{

border:2px solid #FF4D4F;

box-shadow:0 0 18px rgba(255,77,79,.35);

animation:compromisePulse 2s infinite;

}

.target{

border:2px solid #FAAD14;

box-shadow:0 0 18px rgba(250,173,20,.35);

animation:targetPulse 2s infinite;

}

.secured{

border:2px solid #00E676;

box-shadow:0 0 18px rgba(0,230,118,.35);

}

.simulationLine{

width:4px;

height:46px;

margin:10px 0;

background:linear-gradient(180deg,#FF4D4F,#FAAD14);

position:relative;

overflow:hidden;

border-radius:20px;

}

.simulationLine::after{

content:"";

position:absolute;

left:-2px;

top:-20px;

width:8px;

height:20px;

border-radius:20px;

background:#FFFFFF;

box-shadow:0 0 14px #FF4D4F;

animation:attackFlow 1.8s linear infinite;

}

@keyframes attackFlow{

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

@keyframes compromisePulse{

0%{

transform:scale(1);

}

50%{

transform:scale(1.04);

box-shadow:0 0 26px rgba(255,77,79,.8);

}

100%{

transform:scale(1);

}

}

@keyframes targetPulse{

0%{

transform:scale(1);

}

50%{

transform:scale(1.04);

box-shadow:0 0 24px rgba(250,173,20,.8);

}

100%{

transform:scale(1);

}

}

@keyframes nodeFloat{

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