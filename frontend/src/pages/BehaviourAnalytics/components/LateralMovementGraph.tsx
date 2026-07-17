import { useEffect, useState } from "react";

import {
    Row,
    Col,
    Progress,
    Tag
} from "antd";

import {

    UserOutlined,
    LaptopOutlined,
    CloudOutlined,
    ApartmentOutlined,
    DatabaseOutlined,
    SafetyCertificateOutlined

} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";



const templates=[

    {

        name:"Administrator",

        icon:<UserOutlined/>

    },

    {

        name:"Endpoint",

        icon:<LaptopOutlined/>

    },

    {

        name:"VPN Gateway",

        icon:<CloudOutlined/>

    },

    {

        name:"Application Server",

        icon:<ApartmentOutlined/>

    },

    {

        name:"Domain Controller",

        icon:<SafetyCertificateOutlined/>

    },

    {

        name:"SQL Database",

        icon:<DatabaseOutlined/>

    }

];

function buildPath(){

    const compromised=Math.floor(

        Math.random()*3

    )+1;

    const predicted=compromised+1;

    return templates.map((node,index)=>{

        let status:"safe"|"compromised"|"predicted"="safe";

        if(index<=compromised)

            status="compromised";

        if(index===predicted)

            status="predicted";

        return{

            ...node,

            status

        };

    });

}

export default function LateralMovementGraph(){

    const [nodes,setNodes]=useState(buildPath());

    const [confidence,setConfidence]=useState(97);

    const [blast,setBlast]=useState(16);

    const [eta,setEta]=useState(6);

    useEffect(()=>{

        const timer=setInterval(()=>{

            setNodes(

                buildPath()

            );

            setConfidence(

                95+

                Math.floor(

                    Math.random()*5

                )

            );

            setBlast(

                12+

                Math.floor(

                    Math.random()*18

                )

            );

            setEta(

                4+

                Math.floor(

                    Math.random()*8

                )

            );

        },5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle AI Lateral Movement Graph"
            height={1500}
        >

            <Row gutter={[28,28]}>

                {/* Attack Path */}

                <Col xs={24} lg={15}>

                    <div
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            marginTop:10
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
                                            node.status==="compromised"

                                            ? "movementNode compromised"

                                            : node.status==="predicted"

                                            ? "movementNode predicted"

                                            : "movementNode safe"
                                        }
                                    >

                                        <div
                                            style={{
                                                fontSize:30
                                            }}
                                        >
                                            {node.icon}
                                        </div>

                                        <div
                                            style={{
                                                marginTop:8,
                                                fontWeight:700,
                                                fontSize:15
                                            }}
                                        >
                                            {node.name}
                                        </div>

                                        {

                                            node.status==="compromised" && (

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

                                            node.status==="predicted" && (

                                                <Tag
                                                    color="orange"
                                                    style={{
                                                        marginTop:10
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
                                                className="movementArrow"
                                            />

                                        )

                                    }

                                </div>

                            ))

                        }

                    </div>

                </Col>

                {/* Oracle AI */}

                <Col xs={24} lg={9}>

                    <div
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            gap:18
                        }}
                    >

                        {/* Confidence */}

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
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

                                <b
                                    style={{
                                        color:"#00E676"
                                    }}
                                >
                                    {confidence}%
                                </b>

                            </div>

                            <Progress
                                percent={confidence}
                                showInfo={false}
                                strokeColor="#00E676"
                                style={{
                                    marginTop:12
                                }}
                            />

                        </div>

                        {/* ETA */}

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:18
                            }}
                        >

                            <div
                                style={{
                                    color:"#8EA9CC"
                                }}
                            >
                                Estimated Pivot Time
                            </div>

                            <div
                                style={{
                                    color:"#FFFFFF",
                                    fontSize:30,
                                    fontWeight:700,
                                    marginTop:8
                                }}
                            >
                                {eta} Minutes
                            </div>

                        </div>

                        {/* Blast Radius */}

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:18
                            }}
                        >

                            <div
                                style={{
                                    color:"#8EA9CC"
                                }}
                            >
                                Identity Blast Radius
                            </div>

                            <Progress
                                percent={blast*4}
                                showInfo={false}
                                strokeColor="#FA8C16"
                                style={{
                                    marginTop:12
                                }}
                            />

                            <div
                                style={{
                                    color:"#FFFFFF",
                                    marginTop:8,
                                    fontWeight:700
                                }}
                            >
                                {blast} Reachable Assets
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
                                    marginBottom:12
                                }}
                            >
                                Oracle AI Prediction
                            </div>

                            <div
                                style={{
                                    color:"#DCE8F4",
                                    lineHeight:1.9
                                }}
                            >

                                Oracle AI predicts the attacker
                                will pivot from the compromised
                                identity to the highlighted asset
                                using privileged credentials.
                                Immediate identity isolation is
                                recommended to stop lateral
                                movement before domain compromise.

                            </div>

                        </div>

                    </div>

                </Col>

            </Row>
                        {/* Oracle Identity Summary */}

            <div
                style={{
                    marginTop:24,
                    background:"#16253B",
                    border:"1px solid #2A415D",
                    borderRadius:12,
                    padding:20
                }}
            >

                <Row gutter={[24,24]}>

                    <Col xs={12} md={6}>

                        <div
                            style={{
                                color:"#8EA9CC",
                                fontSize:13
                            }}
                        >
                            Compromised Nodes
                        </div>

                        <div
                            style={{
                                marginTop:8,
                                color:"#FF4D4F",
                                fontSize:30,
                                fontWeight:700
                            }}
                        >
                            {
                                nodes.filter(
                                    n=>n.status==="compromised"
                                ).length
                            }
                        </div>

                    </Col>

                    <Col xs={12} md={6}>

                        <div
                            style={{
                                color:"#8EA9CC",
                                fontSize:13
                            }}
                        >
                            Predicted Targets
                        </div>

                        <div
                            style={{
                                marginTop:8,
                                color:"#FA8C16",
                                fontSize:30,
                                fontWeight:700
                            }}
                        >
                            {
                                nodes.filter(
                                    n=>n.status==="predicted"
                                ).length
                            }
                        </div>

                    </Col>

                    <Col xs={12} md={6}>

                        <div
                            style={{
                                color:"#8EA9CC",
                                fontSize:13
                            }}
                        >
                            AI Confidence
                        </div>

                        <div
                            style={{
                                marginTop:8,
                                color:"#00E676",
                                fontSize:30,
                                fontWeight:700
                            }}
                        >
                            {confidence}%
                        </div>

                    </Col>

                    <Col xs={12} md={6}>

                        <div
                            style={{
                                color:"#8EA9CC",
                                fontSize:13
                            }}
                        >
                            Oracle AI
                        </div>

                        <div
                            style={{
                                marginTop:8,
                                color:"#1677FF",
                                fontSize:30,
                                fontWeight:700
                            }}
                        >
                            ACTIVE
                        </div>

                    </Col>

                </Row>

            </div>

            {/* Footer */}

            <div
                style={{
                    marginTop:24,
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    background:"#102033",
                    borderLeft:"4px solid #1677FF",
                    borderRadius:12,
                    padding:"18px 20px"
                }}
            >

                <div>

                    <div
                        style={{
                            color:"#1677FF",
                            fontWeight:700,
                            fontSize:17
                        }}
                    >
                        Oracle Identity Intelligence Engine
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13
                        }}
                    >
                        Continuously analysing identity trust,
                        authentication events, privileged access,
                        session behaviour and lateral movement
                        opportunities across the enterprise.

                    </div>

                </div>

                <Tag
                    color="processing"
                    style={{
                        padding:"6px 16px",
                        fontSize:14
                    }}
                >
                    LIVE IDENTITY GRAPH
                </Tag>

            </div>

            <style>

{`

.movementNode{

width:250px;

padding:18px;

border-radius:14px;

text-align:center;

transition:.4s;

font-weight:600;

margin-bottom:12px;

}

.safe{

background:#16253B;

border:1px solid #2A415D;

color:#DCE8F4;

}

.compromised{

background:#451F24;

border:2px solid #FF4D4F;

color:#FFFFFF;

box-shadow:0 0 20px rgba(255,77,79,.4);

animation:pulseRed 2s infinite;

}

.predicted{

background:#3B2B13;

border:2px solid #FA8C16;

color:#FFFFFF;

box-shadow:0 0 20px rgba(250,140,22,.4);

animation:pulseOrange 2s infinite;

}

.movementArrow{

width:4px;

height:42px;

background:#45607B;

margin:8px 0;

position:relative;

animation:flowDown 1.6s linear infinite;

}

.movementArrow:after{

content:"";

position:absolute;

bottom:-7px;

left:-5px;

border-left:7px solid transparent;

border-right:7px solid transparent;

border-top:10px solid #45607B;

}

@keyframes pulseRed{

0%{

transform:scale(1);

}

50%{

transform:scale(1.04);

box-shadow:0 0 30px rgba(255,77,79,.8);

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

box-shadow:0 0 28px rgba(250,140,22,.8);

}

100%{

transform:scale(1);

}

}

@keyframes flowDown{

0%{

opacity:.4;

transform:translateY(-4px);

}

50%{

opacity:1;

transform:translateY(4px);

}

100%{

opacity:.4;

transform:translateY(-4px);

}

}

`}

            </style>

        </EnterpriseCard>

    );

}