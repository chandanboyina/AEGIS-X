import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Tag,
    Statistic
} from "antd";

import {
    CheckCircleOutlined,
    RobotOutlined,
    //ThunderboltOutlined,
    SafetyCertificateOutlined,
    ClockCircleOutlined,
    DollarCircleOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Decision{

    title:string;

    severity:string;

    confidence:number;

    savings:number;

    eta:number;

    recommendation:string;

    reasoning:string;

}

const decisions=[

    {

        title:"Automated Enterprise Containment",

        severity:"CRITICAL",

        recommendation:"Execute SOAR Playbook PB-010 immediately.",

        reasoning:"All Oracle AI Council members reached strong consensus that immediate containment prevents lateral movement and minimizes enterprise impact."

    },

    {

        title:"Reset Privileged Credentials",

        severity:"HIGH",

        recommendation:"Reset all privileged identities across affected infrastructure.",

        reasoning:"Threat AI and MITRE AI detected credential abuse consistent with T1078."

    },

    {

        title:"Isolate Government Cloud",

        severity:"CRITICAL",

        recommendation:"Disconnect Government Cloud from east-west traffic until validation completes.",

        reasoning:"Graph AI predicts propagation toward critical infrastructure."

    },

    {

        title:"Enterprise IOC Hunting",

        severity:"HIGH",

        recommendation:"Launch enterprise-wide IOC hunting using Oracle AI.",

        reasoning:"Behavior Analytics indicates coordinated malicious activity."

    }

];

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function generateDecision():Decision{

    const base=decisions[

        random(0,decisions.length-1)

    ];

    return{

        ...base,

        confidence:random(95,99),

        savings:random(6,18),

        eta:random(3,12)

    };

}

export default function FinalDecision(){

    const [decision,setDecision]=useState<Decision>(

        generateDecision()

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            setDecision(generateDecision());

        },6000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle AI Council Final Decision"
            height={900}
        >

            <Row gutter={[24,24]}>

                {/* Left Panel */}

                <Col xs={24} lg={16}>

                    <div
                        style={{
                            background:"#102033",
                            borderLeft:"5px solid #00E676",
                            borderRadius:12,
                            padding:24
                        }}
                    >

                        <Tag
                            color={
                                decision.severity==="CRITICAL"
                                ?"red"
                                :"orange"
                            }
                            style={{
                                marginBottom:18
                            }}
                        >
                            {decision.severity}
                        </Tag>

                        <div
                            style={{
                                color:"#FFFFFF",
                                fontSize:30,
                                fontWeight:700
                            }}
                        >
                            {decision.title}
                        </div>

                        <div
                            style={{
                                marginTop:18,
                                color:"#DCE8F4",
                                lineHeight:1.9,
                                fontSize:15
                            }}
                        >
                            {decision.reasoning}
                        </div>

                        <div
                            style={{
                                marginTop:28,
                                padding:18,
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12
                            }}
                        >

                            <div
                                style={{
                                    color:"#00E676",
                                    fontWeight:700,
                                    fontSize:18,
                                    marginBottom:12
                                }}
                            >
                                Oracle AI Recommendation
                            </div>

                            <div
                                style={{
                                    color:"#FFFFFF",
                                    lineHeight:1.8
                                }}
                            >
                                {decision.recommendation}
                            </div>

                        </div>

                    </div>

                </Col>

                {/* Right KPIs */}

                <Col xs={24} lg={8}>

                    <div
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            gap:18
                        }}
                    >

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:18
                            }}
                        >

                            <Statistic
                                title="Confidence"
                                value={decision.confidence}
                                suffix="%"
                                prefix={<SafetyCertificateOutlined/>}
                                valueStyle={{
                                    color:"#00E676"
                                }}
                            />

                        </div>

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:18
                            }}
                        >

                            <Statistic
                                title="Estimated ETA"
                                value={decision.eta}
                                suffix="min"
                                prefix={<ClockCircleOutlined/>}
                                valueStyle={{
                                    color:"#FA8C16"
                                }}
                            />

                        </div>

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:18
                            }}
                        >

                            <Statistic
                                title="Potential Savings"
                                value={decision.savings}
                                suffix="M"
                                prefix={<DollarCircleOutlined/>}
                                valueStyle={{
                                    color:"#2D7CFF"
                                }}
                            />

                        </div>

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
                                    display:"flex",
                                    alignItems:"center",
                                    gap:10,
                                    marginBottom:12
                                }}
                            >

                                <RobotOutlined
                                    style={{
                                        color:"#00E676",
                                        fontSize:22
                                    }}
                                />

                                <span
                                    style={{
                                        color:"#FFFFFF",
                                        fontWeight:700
                                    }}
                                >
                                    Oracle AI Verdict
                                </span>

                            </div>

                            <div
                                style={{
                                    color:"#DCE8F4",
                                    lineHeight:1.8
                                }}
                            >
                                The AI Council has reached a unanimous decision.
                                The recommended action is approved for automated
                                execution with high confidence and minimal
                                operational disruption.
                            </div>

                        </div>

                    </div>

                </Col>
                            </Row>

            {/* Executive Approval */}

            <div
                style={{
                    marginTop:24,
                    background:"#102033",
                    borderLeft:"5px solid #00E676",
                    borderRadius:12,
                    padding:22
                }}
            >

                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center",
                        flexWrap:"wrap",
                        gap:12
                    }}
                >

                    <div>

                        <div
                            style={{
                                color:"#00E676",
                                fontSize:20,
                                fontWeight:700
                            }}
                        >
                            Oracle AI Council Decision Approved
                        </div>

                        <div
                            style={{
                                marginTop:8,
                                color:"#DCE8F4",
                                lineHeight:1.8
                            }}
                        >
                            All AI Council members completed analysis,
                            reached enterprise consensus and approved
                            automated execution of the recommended
                            security playbook.
                        </div>

                    </div>

                    <Tag
                        color="success"
                        style={{
                            fontSize:15,
                            padding:"6px 14px"
                        }}
                    >
                        APPROVED FOR EXECUTION
                    </Tag>

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

                <Tag
                    color="processing"
                    style={{
                        padding:"4px 12px"
                    }}
                >
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

                    EXECUTION READY

                </div>

            </div>

        </EnterpriseCard>

    );

}