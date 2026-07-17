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
    CloudServerOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";



const topology=[

    {

        name:"Internet",

        icon:<GlobalOutlined/>

    },

    {

        name:"Edge Firewall",

        icon:<SafetyCertificateOutlined/>

    },

    {

        name:"VPN Gateway",

        icon:<CloudServerOutlined/>

    },

    {

        name:"Corporate User",

        icon:<UserOutlined/>

    },

    {

        name:"Application Server",

        icon:<ApartmentOutlined/>

    },

    {

        name:"Oracle Database",

        icon:<DatabaseOutlined/>

    }

];

function buildAttack(){

    const compromised=Math.floor(

        Math.random()*3

    )+1;

    const target=compromised+1;

    return topology.map((item,index)=>{

        let status:"SAFE"|"COMPROMISED"|"TARGET"="SAFE";

        if(index<=compromised)

            status="COMPROMISED";

        if(index===target)

            status="TARGET";

        return{

            ...item,

            status

        };

    });

}

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function AttackPathExplorer(){

    const [nodes,setNodes]=useState(

        buildAttack()

    );

    const [confidence,setConfidence]=useState(98);

    const [blast,setBlast]=useState(18);

    const [eta,setEta]=useState(7);

    useEffect(()=>{

        const timer=setInterval(()=>{

            setNodes(

                buildAttack()

            );

            setConfidence(

                random(95,99)

            );

            setBlast(

                random(15,34)

            );

            setEta(

                random(4,10)

            );

        },5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle AI Attack Path Explorer"
            height={1400}
        >

            <div
                style={{
                    display:"flex",
                    gap:24,
                    height:"100%"
                }}
            >

                {/* ===========================
                        Attack Path
                =========================== */}

                <div
                    style={{
                        flex:1.4,
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center"
                    }}
                >

                    {

                        nodes.map((node,index)=>(

                            <div
                                key={node.name}
                                style={{
                                    display:"flex",
                                    flexDirection:"column",
                                    alignItems:"center",
                                    width:"100%"
                                }}
                            >

                                <div
                                    className={
                                        node.status==="COMPROMISED"

                                        ?"attackNode compromised"

                                        :node.status==="TARGET"

                                        ?"attackNode target"

                                        :"attackNode safe"
                                    }
                                >

                                    <div
                                        className="attackIcon"
                                    >
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
                                        {node.name}
                                    </div>

                                    {

                                        node.status==="COMPROMISED" && (

                                            <Tag
                                                color="red"
                                                style={{
                                                    marginTop:12
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
                                                    marginTop:12
                                                }}
                                            >
                                                NEXT TARGET
                                            </Tag>

                                        )

                                    }

                                </div>

                                {

                                    index!==nodes.length-1 && (

                                        <div
                                            className="attackLine"
                                        />

                                    )

                                }

                            </div>

                        ))

                    }

                </div>

                {/* ===========================
                        Oracle AI
                =========================== */}

                <div
                    style={{
                        flex:1,
                        display:"flex",
                        flexDirection:"column",
                        gap:18
                    }}
                >

                    {/* Confidence */}

                    <div
                        style={{
                            background:"#16253B",
                            border:"1px solid #29425E",
                            borderRadius:12,
                            padding:18
                        }}
                    >

                        <div
                            style={{
                                display:"flex",
                                justifyContent:"space-between"
                            }}
                        >

                            <span
                                style={{
                                    color:"#8EA9CC"
                                }}
                            >
                                Oracle AI Confidence
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

                        <Progress
                            percent={confidence}
                            showInfo={false}
                            strokeColor="#00E676"
                            trailColor="#223248"
                            style={{
                                marginTop:12
                            }}
                        />

                    </div>

                    {/* Blast Radius */}

                    <div
                        style={{
                            background:"#16253B",
                            border:"1px solid #29425E",
                            borderRadius:12,
                            padding:18
                        }}
                    >

                        <div
                            style={{
                                color:"#8EA9CC"
                            }}
                        >
                            Predicted Blast Radius
                        </div>

                        <div
                            style={{
                                color:"#FFFFFF",
                                fontSize:30,
                                fontWeight:700,
                                marginTop:8
                            }}
                        >
                            {blast} Assets
                        </div>

                    </div>

                    {/* ETA */}

                    <div
                        style={{
                            background:"#16253B",
                            border:"1px solid #29425E",
                            borderRadius:12,
                            padding:18
                        }}
                    >

                        <div
                            style={{
                                color:"#8EA9CC"
                            }}
                        >
                            Estimated Time To Compromise
                        </div>

                        <div
                            style={{
                                color:"#FAAD14",
                                fontSize:30,
                                fontWeight:700,
                                marginTop:8
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
                            Oracle AI Attack Prediction
                        </div>

                        <div
                            style={{
                                color:"#DCE8F4",
                                lineHeight:1.85
                            }}
                        >

                            Oracle AI predicts that the attacker
                            will continue traversing the enterprise
                            topology toward the highlighted target.
                            Based on topology analysis, identity
                            relationships, exposed services and
                            historical attack chains, proactive
                            isolation of the affected segment is
                            recommended before lateral expansion.

                        </div>

                    </div>

                </div>

            </div>
                        {/* Attack Path Summary */}

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
                        fontWeight:700,
                        fontSize:17,
                        marginBottom:18
                    }}
                >
                    Attack Path Summary
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
                            Compromised Nodes
                        </span>

                        <span
                            style={{
                                color:"#FF4D4F",
                                fontWeight:700
                            }}
                        >
                            {
                                nodes.filter(
                                    n=>n.status==="COMPROMISED"
                                ).length
                            }
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >

                        <span style={{color:"#8EA9CC"}}>
                            Predicted Targets
                        </span>

                        <span
                            style={{
                                color:"#FAAD14",
                                fontWeight:700
                            }}
                        >
                            {
                                nodes.filter(
                                    n=>n.status==="TARGET"
                                ).length
                            }
                        </span>

                    </div>

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
                            Estimated Blast Radius
                        </span>

                        <span
                            style={{
                                color:"#1677FF",
                                fontWeight:700
                            }}
                        >
                            {blast} Assets
                        </span>

                    </div>

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
                            fontSize:13
                        }}
                    >
                        Oracle AI continuously predicts attacker
                        movement through enterprise infrastructure,
                        correlating topology, identities, vulnerabilities
                        and network trust relationships to stop attacks
                        before business-critical assets are reached.

                    </div>

                </div>

                <Tag
                    color="success"
                    style={{
                        fontWeight:700,
                        padding:"4px 12px"
                    }}
                >
                    ● LIVE
                </Tag>

            </div>

            <style>

{`

.attackNode{

width:220px;

padding:18px;

border-radius:14px;

text-align:center;

transition:.35s;

border:1px solid #29425E;

background:#16253B;

animation:floatNode 4s ease-in-out infinite;

}

.attackNode:hover{

transform:translateY(-5px);

box-shadow:0 10px 26px rgba(0,0,0,.35);

}

.attackIcon{

width:58px;

height:58px;

margin:auto;

border-radius:16px;

display:flex;

justify-content:center;

align-items:center;

font-size:28px;

background:#223248;

color:#FFFFFF;

}

.safe{

border-color:#29425E;

}

.compromised{

border:2px solid #FF4D4F;

box-shadow:0 0 18px rgba(255,77,79,.35);

animation:pulseRed 2s infinite;

}

.target{

border:2px solid #FAAD14;

box-shadow:0 0 18px rgba(250,173,20,.35);

animation:pulseOrange 2s infinite;

}

.attackLine{

width:4px;

height:44px;

margin:10px 0;

background:linear-gradient(

180deg,

#00E676,

#1677FF

);

position:relative;

overflow:hidden;

border-radius:10px;

}

.attackLine::after{

content:"";

position:absolute;

left:-2px;

top:-18px;

width:8px;

height:18px;

background:#FFFFFF;

border-radius:20px;

box-shadow:0 0 12px #00E676;

animation:dataFlow 2s linear infinite;

}

@keyframes dataFlow{

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

@keyframes pulseRed{

0%{

transform:scale(1);

}

50%{

transform:scale(1.04);

box-shadow:0 0 28px rgba(255,77,79,.8);

}

100%{

transform:scale(1);

}

}

@keyframes pulseOrange{

0%{

transform:scale(1);

}

50%{

transform:scale(1.04);

box-shadow:0 0 28px rgba(250,173,20,.8);

}

100%{

transform:scale(1);

}

}

@keyframes floatNode{

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