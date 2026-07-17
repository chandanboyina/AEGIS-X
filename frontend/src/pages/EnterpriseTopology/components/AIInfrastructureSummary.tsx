import { useEffect, useState } from "react";

import {
    Progress,
    Tag
} from "antd";

import {
    RobotOutlined,
    ApartmentOutlined,
    SafetyCertificateOutlined,
    WarningOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

const predictions=[

    "Increase monitoring of DMZ assets",

    "Segment high-risk OT devices",

    "Strengthen privileged access controls",

    "Deploy additional endpoint sensors",

    "Isolate exposed infrastructure",

    "Review firewall trust policies"

];

const recommendations=[

    "Initiate Adaptive Network Segmentation",

    "Enable Continuous Asset Verification",

    "Increase Monitoring Frequency",

    "Perform Infrastructure Risk Assessment",

    "Validate Trust Relationships",

    "Run Oracle AI Infrastructure Scan"

];

export default function AIInfrastructureSummary(){

    const [health,setHealth]=useState(98);

    const [confidence,setConfidence]=useState(99);

    const [assets,setAssets]=useState(1528);

    const [zones,setZones]=useState(16);

    const [critical,setCritical]=useState(3);

    const [prediction,setPrediction]=useState(predictions[0]);

    const [recommendation,setRecommendation]=useState(recommendations[0]);

    useEffect(()=>{

        const timer=setInterval(()=>{

            setHealth(random(96,100));

            setConfidence(random(96,99));

            setAssets(random(1480,1560));

            setZones(random(14,18));

            setCritical(random(2,6));

            setPrediction(

                predictions[

                    random(0,predictions.length-1)

                ]

            );

            setRecommendation(

                recommendations[

                    random(0,recommendations.length-1)

                ]

            );

        },5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle AI Infrastructure Executive Summary"
            height={1400}
        >

            {/* Infrastructure Health */}

            <div
                style={{
                    display:"flex",
                    justifyContent:"center",
                    marginBottom:28
                }}
            >

                <Progress
                    type="circle"
                    percent={health}
                    width={170}
                    strokeColor="#00E676"
                    trailColor="#223248"
                    format={()=>(

                        <div>

                            <RobotOutlined
                                style={{
                                    color:"#00E676",
                                    fontSize:28
                                }}
                            />

                            <div
                                style={{
                                    color:"#FFFFFF",
                                    fontWeight:800,
                                    fontSize:34,
                                    marginTop:6
                                }}
                            >
                                {health}%
                            </div>

                            <div
                                style={{
                                    color:"#8EA9CC",
                                    fontSize:12
                                }}
                            >
                                Infrastructure
                            </div>

                        </div>

                    )}
                />

            </div>

            {/* Statistics */}

            <div
                style={{
                    display:"grid",
                    gridTemplateColumns:"repeat(2,1fr)",
                    gap:18
                }}
            >

                <div className="summaryCard">

                    <ApartmentOutlined
                        style={{
                            color:"#1677FF",
                            fontSize:24
                        }}
                    />

                    <div className="summaryTitle">

                        Enterprise Assets

                    </div>

                    <div className="summaryValue">

                        {assets}

                    </div>

                </div>

                <div className="summaryCard">

                    <SafetyCertificateOutlined
                        style={{
                            color:"#00E676",
                            fontSize:24
                        }}
                    />

                    <div className="summaryTitle">

                        Protected Zones

                    </div>

                    <div className="summaryValue">

                        {zones}

                    </div>

                </div>

                <div className="summaryCard">

                    <WarningOutlined
                        style={{
                            color:"#FF4D4F",
                            fontSize:24
                        }}
                    />

                    <div className="summaryTitle">

                        Critical Risks

                    </div>

                    <div className="summaryValue">

                        {critical}

                    </div>

                </div>

                <div className="summaryCard">

                    <RobotOutlined
                        style={{
                            color:"#13C2C2",
                            fontSize:24
                        }}
                    />

                    <div className="summaryTitle">

                        AI Confidence

                    </div>

                    <div className="summaryValue">

                        {confidence}%

                    </div>

                </div>

            </div>

            {/* Oracle AI Prediction */}

            <div
                style={{
                    marginTop:24,
                    background:"#102033",
                    borderLeft:"4px solid #1677FF",
                    borderRadius:12,
                    padding:18
                }}
            >

                <div
                    style={{
                        color:"#1677FF",
                        fontWeight:700,
                        marginBottom:10
                    }}
                >
                    Oracle AI Prediction
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >

                    Oracle AI predicts that the highest
                    probability infrastructure improvement is to

                    <span
                        style={{
                            color:"#FFFFFF",
                            fontWeight:700
                        }}
                    >

                        {" "}{prediction}

                    </span>

                    {" "}based on current topology,
                    segmentation posture, enterprise telemetry
                    and infrastructure health.

                </div>

            </div>

            {/* Recommended Action */}

            <div
                style={{
                    marginTop:20,
                    background:"#16253B",
                    border:"1px solid #29425E",
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
                    Oracle AI Recommended Action
                </div>

                <Tag
                    color="green"
                    style={{
                        fontSize:14,
                        padding:"6px 14px"
                    }}
                >
                    {recommendation}
                </Tag>

            </div>
                        {/* Executive Infrastructure Summary */}

            <div
                style={{
                    marginTop:22,
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
                    Executive Infrastructure Summary
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
                            Infrastructure Health
                        </span>

                        <span
                            style={{
                                color:"#00E676",
                                fontWeight:700
                            }}
                        >
                            {health}%
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >
                        <span style={{color:"#8EA9CC"}}>
                            Enterprise Assets
                        </span>

                        <span
                            style={{
                                color:"#FFFFFF",
                                fontWeight:700
                            }}
                        >
                            {assets}
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >
                        <span style={{color:"#8EA9CC"}}>
                            Protected Trust Zones
                        </span>

                        <span
                            style={{
                                color:"#1677FF",
                                fontWeight:700
                            }}
                        >
                            {zones}
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >
                        <span style={{color:"#8EA9CC"}}>
                            Critical Infrastructure Risks
                        </span>

                        <span
                            style={{
                                color:"#FF4D4F",
                                fontWeight:700
                            }}
                        >
                            {critical}
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >
                        <span style={{color:"#8EA9CC"}}>
                            Oracle AI Confidence
                        </span>

                        <span
                            style={{
                                color:"#13C2C2",
                                fontWeight:700
                            }}
                        >
                            {confidence}%
                        </span>

                    </div>

                </div>

            </div>

            {/* Executive Decision */}

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
                        fontSize:17,
                        marginBottom:10
                    }}
                >
                    Oracle AI Executive Decision
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.85
                    }}
                >

                    Oracle AI has completed a comprehensive analysis
                    of enterprise infrastructure, topology integrity,
                    trust relationships and asset health. The current
                    environment is operating within acceptable security
                    thresholds, however proactive segmentation,
                    continuous asset verification and adaptive
                    monitoring are recommended to reduce future attack
                    exposure and improve cyber resilience.

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
                        Oracle AI Infrastructure Intelligence
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13,
                            lineHeight:1.7
                        }}
                    >
                        Oracle AI continuously correlates enterprise
                        topology, asset inventory, trust boundaries,
                        infrastructure telemetry and operational
                        intelligence to maintain a real-time digital
                        understanding of the organization's network.

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

.summaryCard{

background:#16253B;

border:1px solid #29425E;

border-radius:14px;

padding:18px;

display:flex;

flex-direction:column;

align-items:center;

transition:.35s;

}

.summaryCard:hover{

transform:translateY(-4px);

border-color:#1677FF;

box-shadow:0 10px 24px rgba(22,119,255,.18);

}

.summaryTitle{

margin-top:12px;

color:#8EA9CC;

font-size:13px;

text-align:center;

}

.summaryValue{

margin-top:8px;

font-size:28px;

font-weight:700;

color:#FFFFFF;

}

.ant-progress-circle-path{

transition:all .8s ease;

}

.ant-progress-circle{

animation:ringFloat 4s ease-in-out infinite;

}

@keyframes ringFloat{

0%{

transform:translateY(0px);

}

50%{

transform:translateY(-5px);

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