import { useEffect, useState } from "react";
import {
    Timeline,
    Tag,
    Statistic,
    Row,
    Col
} from "antd";

import {
    RobotOutlined,
    CheckCircleOutlined,
    SyncOutlined,
    ThunderboltOutlined,
    ClockCircleOutlined,
    SafetyCertificateOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Decision{

    id:number;

    title:string;

    model:string;

    confidence:number;

    duration:number;

    status:"EXECUTED"|"APPROVED"|"RUNNING";

    impact:string;

    timestamp:string;

}

const titles=[

    "Blocked malicious PowerShell execution",

    "Predicted lateral movement",

    "Started automated SOAR containment",

    "Recommended credential reset",

    "Detected ransomware propagation",

    "Isolated Government Cloud subnet",

    "Triggered enterprise IOC hunt",

    "Predicted attack path expansion",

    "Started Digital Twin simulation",

    "Executed adaptive firewall policy"

];

const models=[

    "Oracle AI",

    "ThreatGPT",

    "Graph AI",

    "Digital Twin",

    "Behavior Engine",

    "Neural SOC"

];

const impacts=[

    "Critical",

    "High",

    "Medium"

];

const statuses:Decision["status"][]=[

    "EXECUTED",

    "APPROVED",

    "RUNNING"

];

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function pick<T>(arr:T[]):T{

    return arr[random(0,arr.length-1)];

}

function generateDecision(id:number):Decision{

    return{

        id,

        title:pick(titles),

        model:pick(models),

        confidence:random(92,99),

        duration:random(1,12),

        status:pick(statuses),

        impact:pick(impacts),

        timestamp:new Date().toLocaleTimeString()

    };

}

export default function DecisionTimeline(){

    const [decisions,setDecisions]=useState<Decision[]>(

        Array.from(

            {length:8},

            (_,i)=>generateDecision(i+1)

        )

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            setDecisions(prev=>{

                const next=[

                    generateDecision(Date.now()),

                    ...prev

                ];

                return next.slice(0,8);

            });

        },5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle AI Decision Timeline"
            height={2300}
        >

            <Row gutter={[24,24]}>

                {/* Timeline */}

                <Col xs={24} lg={15}>

                    <Timeline
                        mode="left"
                        style={{
                            marginTop:10
                        }}
                        items={

                            decisions.map(decision=>({

                                color:

                                    decision.status==="EXECUTED"

                                    ?"green"

                                    :decision.status==="APPROVED"

                                    ?"blue"

                                    :"orange",

                                dot:

                                    decision.status==="EXECUTED"

                                    ?

                                    <CheckCircleOutlined
                                        style={{
                                            color:"#00E676",
                                            fontSize:20
                                        }}
                                    />

                                    :

                                    decision.status==="APPROVED"

                                    ?

                                    <SafetyCertificateOutlined
                                        style={{
                                            color:"#2D7CFF",
                                            fontSize:20
                                        }}
                                    />

                                    :

                                    <SyncOutlined
                                        spin
                                        style={{
                                            color:"#FA8C16",
                                            fontSize:20
                                        }}
                                    />,

                                children:

                                <div
                                    style={{
                                        background:"#16253B",
                                        border:"1px solid #2A415D",
                                        borderRadius:12,
                                        padding:18,
                                        marginBottom:20
                                    }}
                                >

                                    <div
                                        style={{
                                            display:"flex",
                                            justifyContent:"space-between",
                                            alignItems:"center"
                                        }}
                                    >

                                        <div
                                            style={{
                                                fontSize:18,
                                                color:"#FFF",
                                                fontWeight:700
                                            }}
                                        >
                                            {decision.title}
                                        </div>

                                        <Tag
                                            color={
                                                decision.status==="EXECUTED"

                                                ?"green"

                                                :decision.status==="APPROVED"

                                                ?"processing"

                                                :"orange"
                                            }
                                        >
                                            {decision.status}
                                        </Tag>

                                    </div>

                                    <div
                                        style={{
                                            marginTop:12,
                                            color:"#8EA9CC"
                                        }}
                                    >
                                        AI Model
                                    </div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            fontSize:16,
                                            marginTop:2
                                        }}
                                    >
                                        {decision.model}
                                    </div>

                                    <Row
                                        gutter={[16,16]}
                                        style={{
                                            marginTop:18
                                        }}
                                    >

                                        <Col span={8}>

                                            <Statistic
                                                title="Confidence"
                                                value={decision.confidence}
                                                suffix="%"
                                                valueStyle={{
                                                    color:"#00E676",
                                                    fontSize:20
                                                }}
                                                prefix={
                                                    <RobotOutlined/>
                                                }
                                            />

                                        </Col>

                                        <Col span={8}>

                                            <Statistic
                                                title="Duration"
                                                value={decision.duration}
                                                suffix="min"
                                                valueStyle={{
                                                    color:"#FA8C16",
                                                    fontSize:20
                                                }}
                                                prefix={
                                                    <ClockCircleOutlined/>
                                                }
                                            />

                                        </Col>

                                        <Col span={8}>

                                            <Statistic
                                                title="Impact"
                                                value={decision.impact}
                                                valueStyle={{
                                                    color:

                                                        decision.impact==="Critical"

                                                        ?"#FF4D4F"

                                                        :decision.impact==="High"

                                                        ?"#FA8C16"

                                                        :"#2D7CFF",

                                                    fontSize:20
                                                }}
                                                prefix={
                                                    <ThunderboltOutlined/>
                                                }
                                            />

                                        </Col>

                                    </Row>

                                    <div
                                        style={{
                                            marginTop:18,
                                            display:"flex",
                                            justifyContent:"space-between",
                                            color:"#8EA9CC",
                                            fontSize:13
                                        }}
                                    >

                                        <span>

                                            Decision Time

                                        </span>

                                        <span>

                                            {decision.timestamp}

                                        </span>

                                    </div>

                                </div>

                            }))

                        }

                    />

                </Col>

                {/* Right Executive Panel */}

                <Col xs={24} lg={9}>
                                    <div
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            gap:20,
                            height:"100%"
                        }}
                    >

                        {/* Executive Summary */}

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:20
                            }}
                        >

                            <div
                                style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    alignItems:"center",
                                    marginBottom:20
                                }}
                            >

                                <div
                                    style={{
                                        color:"#FFFFFF",
                                        fontSize:20,
                                        fontWeight:700
                                    }}
                                >
                                    Decision Summary
                                </div>

                                <Tag color="green">
                                    LIVE
                                </Tag>

                            </div>

                            <Row gutter={[16,16]}>

                                <Col span={12}>

                                    <Statistic
                                        title="Executed"
                                        value={
                                            decisions.filter(
                                                d=>d.status==="EXECUTED"
                                            ).length
                                        }
                                        valueStyle={{
                                            color:"#00E676"
                                        }}
                                    />

                                </Col>

                                <Col span={12}>

                                    <Statistic
                                        title="Running"
                                        value={
                                            decisions.filter(
                                                d=>d.status==="RUNNING"
                                            ).length
                                        }
                                        valueStyle={{
                                            color:"#FA8C16"
                                        }}
                                    />

                                </Col>

                                <Col span={12}>

                                    <Statistic
                                        title="Approved"
                                        value={
                                            decisions.filter(
                                                d=>d.status==="APPROVED"
                                            ).length
                                        }
                                        valueStyle={{
                                            color:"#2D7CFF"
                                        }}
                                    />

                                </Col>

                                <Col span={12}>

                                    <Statistic
                                        title="Avg Confidence"
                                        value={
                                            Math.round(

                                                decisions.reduce(

                                                    (a,b)=>a+b.confidence,

                                                    0

                                                )/decisions.length

                                            )
                                        }
                                        suffix="%"
                                        valueStyle={{
                                            color:"#00E676"
                                        }}
                                    />

                                </Col>

                            </Row>

                        </div>

                        {/* Oracle Reasoning */}

                        <div
                            style={{
                                background:"#16253B",
                                borderLeft:"4px solid #00E676",
                                borderRadius:12,
                                padding:22
                            }}
                        >

                            <div
                                style={{
                                    color:"#00E676",
                                    fontWeight:700,
                                    fontSize:18,
                                    marginBottom:14
                                }}
                            >
                                Oracle AI Reasoning
                            </div>

                            <div
                                style={{
                                    color:"#DCE8F4",
                                    lineHeight:1.9,
                                    fontSize:15
                                }}
                            >

                                Oracle AI continuously correlates
                                MITRE ATT&CK techniques,
                                endpoint telemetry,
                                Digital Twin simulations,
                                graph relationships,
                                threat intelligence,
                                and behavioural analytics
                                before automatically approving
                                enterprise response actions.

                            </div>

                        </div>

                        {/* Recent Decision */}

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:20
                            }}
                        >

                            <div
                                style={{
                                    color:"#FFFFFF",
                                    fontWeight:700,
                                    fontSize:18,
                                    marginBottom:18
                                }}
                            >
                                Latest AI Decision
                            </div>

                            <div
                                style={{
                                    color:"#00E676",
                                    fontWeight:700,
                                    fontSize:20
                                }}
                            >
                                {decisions[0].title}
                            </div>

                            <div
                                style={{
                                    color:"#8EA9CC",
                                    marginTop:12,
                                    lineHeight:1.8
                                }}
                            >

                                Generated by

                                <b
                                    style={{
                                        color:"#FFFFFF"
                                    }}
                                >

                                    {" "}
                                    {decisions[0].model}

                                </b>

                                {" "}with

                                <b
                                    style={{
                                        color:"#00E676"
                                    }}
                                >

                                    {" "}
                                    {decisions[0].confidence}%

                                </b>

                                {" "}confidence.

                            </div>

                            <Tag
                                color="processing"
                                style={{
                                    marginTop:18
                                }}
                            >
                                Decision Auto Logged
                            </Tag>

                        </div>

                        {/* Audit */}

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:20
                            }}
                        >

                            <div
                                style={{
                                    color:"#FFFFFF",
                                    fontWeight:700,
                                    fontSize:18,
                                    marginBottom:16
                                }}
                            >
                                Executive Audit

                            </div>

                            <div
                                style={{
                                    display:"flex",
                                    flexDirection:"column",
                                    gap:12
                                }}
                            >

                                <div
                                    style={{
                                        display:"flex",
                                        justifyContent:"space-between"
                                    }}
                                >
                                    <span style={{color:"#8EA9CC"}}>
                                        Decisions Logged
                                    </span>

                                    <b style={{color:"#FFFFFF"}}>
                                        {decisions.length}
                                    </b>

                                </div>

                                <div
                                    style={{
                                        display:"flex",
                                        justifyContent:"space-between"
                                    }}
                                >
                                    <span style={{color:"#8EA9CC"}}>
                                        AI Models
                                    </span>

                                    <b style={{color:"#FFFFFF"}}>
                                        6
                                    </b>

                                </div>

                                <div
                                    style={{
                                        display:"flex",
                                        justifyContent:"space-between"
                                    }}
                                >
                                    <span style={{color:"#8EA9CC"}}>
                                        Human Override
                                    </span>

                                    <b style={{color:"#00E676"}}>
                                        None
                                    </b>

                                </div>

                            </div>

                        </div>

                        <div
                            style={{
                                marginTop:"auto",
                                display:"flex",
                                justifyContent:"space-between",
                                alignItems:"center"
                            }}
                        >

                            <Tag color="processing">

                                Oracle AI Decision Engine

                            </Tag>

                            <div
                                style={{
                                    display:"flex",
                                    alignItems:"center",
                                    gap:8,
                                    color:"#00E676",
                                    fontWeight:700
                                }}
                            >

                                <CheckCircleOutlined/>

                                LIVE

                            </div>

                        </div>

                    </div>

                </Col>

            </Row>

        </EnterpriseCard>

    );

}