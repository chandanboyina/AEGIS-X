import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Progress,
    Tag
} from "antd";

import {
    GlobalOutlined,
    SafetyCertificateOutlined,
    ApartmentOutlined,
    DatabaseOutlined,
    CloudServerOutlined,
    RadarChartOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface AttackNode{

    name:string;

    icon:any;

    status:"safe"|"compromised"|"predicted";

}

const nodeTemplates=[

    {
        name:"Internet",
        icon:<GlobalOutlined/>
    },

    {
        name:"Firewall",
        icon:<SafetyCertificateOutlined/>
    },

    {
        name:"VPN Gateway",
        icon:<CloudServerOutlined/>
    },

    {
        name:"Application Server",
        icon:<ApartmentOutlined/>
    },

    {
        name:"Domain Controller",
        icon:<CloudServerOutlined/>
    },

    {
        name:"SQL Database",
        icon:<DatabaseOutlined/>
    },

    {
        name:"Power Grid",
        icon:<RadarChartOutlined/>
    }

];

function buildPath(){

    const compromised=Math.floor(Math.random()*3)+1;

    const predicted=compromised+1;

    return nodeTemplates.map((node,index)=>{

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

export default function AttackPathPrediction(){

    const [nodes,setNodes]=useState<AttackNode[]>(buildPath());

    const [confidence,setConfidence]=useState(96);

    const [eta,setEta]=useState(8);

    const [blast,setBlast]=useState(18);

    useEffect(()=>{

        const timer=setInterval(()=>{

            setNodes(buildPath());

            setConfidence(

                94+

                Math.floor(Math.random()*6)

            );

            setEta(

                5+

                Math.floor(Math.random()*8)

            );

            setBlast(

                12+

                Math.floor(Math.random()*15)

            );

        },7000);

        return()=>clearInterval(timer);

    },[]);
        return (

        <EnterpriseCard
            title="Oracle AI Attack Path Prediction"
            height={1200}
        >

            <Row gutter={[28,28]}>

                {/* Attack Flow */}

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

                                            ? "brainNode compromised"

                                            : node.status==="predicted"

                                            ? "brainNode predicted"

                                            : "brainNode safe"
                                        }
                                    >

                                        <div
                                            style={{
                                                fontSize:28
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
                                                className="brainArrow"
                                            />

                                        )

                                    }

                                </div>

                            ))

                        }

                    </div>

                </Col>

                {/* Prediction Panel */}

                <Col xs={24} lg={9}>
                                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 18
                        }}
                    >

                        {/* Prediction Confidence */}

                        <div
                            style={{
                                background: "#16253B",
                                border: "1px solid #2A415D",
                                borderRadius: 10,
                                padding: 18
                            }}
                        >

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}
                            >

                                <span
                                    style={{
                                        color: "#8EA9CC"
                                    }}
                                >
                                    Prediction Confidence
                                </span>

                                <b
                                    style={{
                                        color: "#00E676"
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
                                    marginTop: 10
                                }}
                            />

                        </div>

                        {/* ETA */}

                        <div
                            style={{
                                background: "#16253B",
                                border: "1px solid #2A415D",
                                borderRadius: 10,
                                padding: 18
                            }}
                        >

                            <div
                                style={{
                                    color: "#8EA9CC"
                                }}
                            >
                                Estimated Time To Next Stage
                            </div>

                            <div
                                style={{
                                    marginTop: 8,
                                    fontSize: 28,
                                    color: "#FFF",
                                    fontWeight: 700
                                }}
                            >
                                {eta} Minutes
                            </div>

                        </div>

                        {/* Blast Radius */}

                        <div
                            style={{
                                background: "#16253B",
                                border: "1px solid #2A415D",
                                borderRadius: 10,
                                padding: 18
                            }}
                        >

                            <div
                                style={{
                                    color: "#8EA9CC"
                                }}
                            >
                                Predicted Blast Radius
                            </div>

                            <Progress
                                percent={blast * 4}
                                strokeColor="#FA8C16"
                                showInfo={false}
                                style={{
                                    marginTop: 10
                                }}
                            />

                            <div
                                style={{
                                    color: "#FFF",
                                    marginTop: 8,
                                    fontWeight: 700
                                }}
                            >
                                {blast} Enterprise Assets
                            </div>

                        </div>

                        {/* AI Recommendation */}

                        <div
                            style={{
                                background: "#102033",
                                borderLeft: "4px solid #00E676",
                                borderRadius: 10,
                                padding: 18
                            }}
                        >

                            <div
                                style={{
                                    color: "#00E676",
                                    fontWeight: 700,
                                    marginBottom: 12
                                }}
                            >
                                Oracle AI Prediction
                            </div>

                            <div
                                style={{
                                    color: "#DCE8F4",
                                    lineHeight: 1.9
                                }}
                            >

                                Oracle AI predicts the attacker will attempt
                                lateral movement towards the highlighted node.
                                Immediate isolation of compromised assets is
                                recommended before the attack reaches critical
                                infrastructure.

                            </div>

                        </div>

                    </div>

                </Col>

            </Row>

            <style>

                {`

.brainNode{

width:190px;

padding:12px;

border-radius:12px;

text-align:center;

transition:.4s;

font-weight:600;

margin-bottom:6px;

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

box-shadow:0 0 18px rgba(255,77,79,.35);

animation:pulseRed 2s infinite;

}

.predicted{

background:#3B2B13;

border:2px solid #FA8C16;

color:#FFFFFF;

box-shadow:0 0 18px rgba(250,140,22,.35);

animation:pulseOrange 2s infinite;

}

.brainArrow{

width:3px;

height:38px;

background:#45607B;

margin:8px 0;

position:relative;

}

.brainArrow:after{

content:"";

position:absolute;

bottom:-6px;

left:-5px;

border-left:6px solid transparent;

border-right:6px solid transparent;

border-top:8px solid #45607B;

}

@keyframes pulseRed{

0%{

transform:scale(1);

}

50%{

transform:scale(1.03);

box-shadow:0 0 24px rgba(255,77,79,.7);

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

transform:scale(1.03);

box-shadow:0 0 22px rgba(250,140,22,.7);

}

100%{

transform:scale(1);

}

}

`}

            </style>

        </EnterpriseCard>

    );

}
                
                