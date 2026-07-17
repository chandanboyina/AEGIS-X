import { useEffect, useState } from "react";

import {
    Progress,
    Tag
} from "antd";

import {
    RobotOutlined,
    DeploymentUnitOutlined,
    SafetyCertificateOutlined,
    ThunderboltOutlined,
    CheckCircleOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

const decisions=[

    "Infrastructure remains highly resilient with no immediate operational risk.",

    "Increase monitoring for cloud workloads during peak utilization.",

    "Enable adaptive segmentation for critical enterprise assets.",

    "Perform preventive maintenance on predicted high-risk infrastructure.",

    "Expand compute resources to sustain forecasted workload growth.",

    "Maintain current defensive posture while continuing AI monitoring."

];

export default function OracleTwinSummary(){

    const [health,setHealth]=useState(98);

    const [confidence,setConfidence]=useState(99);

    const [continuity,setContinuity]=useState(97);

    const [risk,setRisk]=useState(8);

    const [sync,setSync]=useState(99);

    const [decision,setDecision]=useState(decisions[0]);

    useEffect(()=>{

        const timer=setInterval(()=>{

            setHealth(random(96,100));

            setConfidence(random(96,99));

            setContinuity(random(95,100));

            setRisk(random(4,12));

            setSync(random(97,100));

            setDecision(

                decisions[

                    random(0,decisions.length-1)

                ]

            );

        },5000);

        return()=>clearInterval(timer);

    },[]);

    return(

        <EnterpriseCard
            title="Oracle AI Executive Digital Twin"
            height={1200}
        >

            {/* Executive Score */}

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
                                    fontSize:34,
                                    fontWeight:800,
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
                                Twin Health
                            </div>

                        </div>

                    )}
                />

            </div>

            {/* Executive Metrics */}

            <div
                style={{
                    display:"grid",
                    gridTemplateColumns:"repeat(2,1fr)",
                    gap:18
                }}
            >

                <div className="summaryCard">

                    <DeploymentUnitOutlined
                        style={{
                            color:"#1677FF",
                            fontSize:24
                        }}
                    />

                    <div className="summaryTitle">

                        Twin Sync

                    </div>

                    <div className="summaryValue">

                        {sync}%

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

                        AI Confidence

                    </div>

                    <div className="summaryValue">

                        {confidence}%

                    </div>

                </div>

                <div className="summaryCard">

                    <CheckCircleOutlined
                        style={{
                            color:"#13C2C2",
                            fontSize:24
                        }}
                    />

                    <div className="summaryTitle">

                        Business Continuity

                    </div>

                    <div className="summaryValue">

                        {continuity}%

                    </div>

                </div>

                <div className="summaryCard">

                    <ThunderboltOutlined
                        style={{
                            color:"#FAAD14",
                            fontSize:24
                        }}
                    />

                    <div className="summaryTitle">

                        Enterprise Risk

                    </div>

                    <div className="summaryValue">

                        {risk}%

                    </div>

                </div>

            </div>

            {/* Oracle Decision */}

            <div
                style={{
                    marginTop:24,
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
                    Oracle AI Executive Decision
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >

                    {decision}

                </div>

            </div>
                        {/* Executive Summary */}

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
                    Executive Digital Twin Summary
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
                            Digital Twin Synchronization
                        </span>

                        <span
                            style={{
                                color:"#1677FF",
                                fontWeight:700
                            }}
                        >
                            {sync}%
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
                                color:"#13C2C2",
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
                            Business Continuity
                        </span>

                        <span
                            style={{
                                color:"#52C41A",
                                fontWeight:700
                            }}
                        >
                            {continuity}%
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >
                        <span style={{color:"#8EA9CC"}}>
                            Enterprise Risk
                        </span>

                        <span
                            style={{
                                color:"#FAAD14",
                                fontWeight:700
                            }}
                        >
                            {risk}%
                        </span>

                    </div>

                </div>

            </div>

            {/* Oracle AI Intelligence */}

            <div
                style={{
                    marginTop:22,
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
                        fontSize:16,
                        marginBottom:10
                    }}
                >
                    Oracle AI Digital Twin Intelligence
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.85
                    }}
                >

                    Oracle AI continuously correlates Digital Twin
                    telemetry, infrastructure topology, behavioural
                    analytics, predictive simulations, asset health,
                    workload forecasting and cyber resilience metrics
                    into a unified operational model. Every recommendation
                    is validated against the Digital Twin before execution,
                    allowing enterprise teams to make confident,
                    low-risk operational decisions.

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
                        Oracle AI Executive Intelligence
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13,
                            lineHeight:1.7
                        }}
                    >
                        Oracle AI continuously synchronizes the Digital
                        Twin with production infrastructure to forecast
                        failures, validate recovery plans, simulate attacks,
                        optimize operations and maintain enterprise-wide
                        cyber resilience.

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

transform:translateY(-5px);

border-color:#1677FF;

box-shadow:0 12px 28px rgba(22,119,255,.18);

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

.ant-progress-circle{

animation:twinExecutiveFloat 4s ease-in-out infinite;

}

.ant-progress-circle-path{

transition:all .8s ease;

}

@keyframes twinExecutiveFloat{

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