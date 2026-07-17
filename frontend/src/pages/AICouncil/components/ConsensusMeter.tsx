import { useEffect, useState } from "react";
import {
    Progress,
    Tag,
    Statistic,
    Row,
    Col
} from "antd";

import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    RobotOutlined,
    ThunderboltOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Vote{

    agent:string;

    vote:"APPROVE"|"REVIEW"|"ESCALATE";

    confidence:number;

}

const agents=[

    "Threat AI",

    "Graph AI",

    "MITRE AI",

    "Risk AI",

    "Compliance AI",

    "SOC AI"

];

const votes=["APPROVE","REVIEW","ESCALATE"] as const;

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function randomVote(){

    return votes[random(0,votes.length-1)];

}

function buildVotes():Vote[]{

    return agents.map(agent=>({

        agent,

        vote:randomVote(),

        confidence:random(94,99)

    }));

}

export default function ConsensusMeter(){

    const [data,setData]=useState(buildVotes());

    const [consensus,setConsensus]=useState(96);

    const [ready,setReady]=useState(true);

    useEffect(()=>{

        const timer=setInterval(()=>{

            const next=buildVotes();

            setData(next);

            setConsensus(random(93,99));

            setReady(Math.random()>0.25);

        },5000);

        return()=>clearInterval(timer);

    },[]);

    const approve=data.filter(
        d=>d.vote==="APPROVE"
    ).length;

    const review=data.filter(
        d=>d.vote==="REVIEW"
    ).length;

    const escalate=data.filter(
        d=>d.vote==="ESCALATE"
    ).length;
        return(

        <EnterpriseCard
            title="Oracle AI Consensus Engine"
            height={1800}
        >

            {/* Consensus Score */}

            <div
                style={{
                    display:"flex",
                    justifyContent:"center",
                    marginTop:10,
                    marginBottom:24
                }}
            >

                <Progress
                    type="dashboard"
                    percent={consensus}
                    strokeColor="#00E676"
                    trailColor="#2A415D"
                    width={220}
                />

            </div>

            <div
                style={{
                    textAlign:"center",
                    marginBottom:28
                }}
            >

                <div
                    style={{
                        color:"#FFFFFF",
                        fontSize:26,
                        fontWeight:700
                    }}
                >
                    {consensus}% Consensus
                </div>

                <div
                    style={{
                        color:"#8EA9CC",
                        marginTop:6
                    }}
                >
                    Oracle AI Council Agreement
                </div>

            </div>

            {/* Vote Statistics */}

            <Row gutter={[16,16]}>

                <Col span={8}>

                    <Statistic
                        title="Approve"
                        value={approve}
                        valueStyle={{
                            color:"#00E676"
                        }}
                        prefix={<CheckCircleOutlined/>}
                    />

                </Col>

                <Col span={8}>

                    <Statistic
                        title="Review"
                        value={review}
                        valueStyle={{
                            color:"#FA8C16"
                        }}
                        prefix={<ClockCircleOutlined/>}
                    />

                </Col>

                <Col span={8}>

                    <Statistic
                        title="Escalate"
                        value={escalate}
                        valueStyle={{
                            color:"#FF4D4F"
                        }}
                        prefix={<ThunderboltOutlined/>}
                    />

                </Col>

            </Row>

            {/* Individual Votes */}

            <div
                style={{
                    marginTop:28,
                    display:"flex",
                    flexDirection:"column",
                    gap:14
                }}
            >

                {

                    data.map(item=>(

                        <div
                            key={item.agent}
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:10,
                                padding:14
                            }}
                        >

                            <div
                                style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    alignItems:"center"
                                }}
                            >

                                <div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            fontWeight:700
                                        }}
                                    >
                                        {item.agent}
                                    </div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12,
                                            marginTop:4
                                        }}
                                    >
                                        Confidence {item.confidence}%
                                    </div>

                                </div>

                                <Tag
                                    color={
                                        item.vote==="APPROVE"

                                        ?"green"

                                        :item.vote==="REVIEW"

                                        ?"gold"

                                        :"red"
                                    }
                                >
                                    {item.vote}
                                </Tag>

                            </div>

                            <Progress
                                percent={item.confidence}
                                showInfo={false}
                                strokeColor={
                                    item.vote==="APPROVE"

                                    ?"#00E676"

                                    :item.vote==="REVIEW"

                                    ?"#FA8C16"

                                    :"#FF4D4F"
                                }
                                style={{
                                    marginTop:10
                                }}
                            />

                        </div>

                    ))

                }

            </div>

            {/* Executive Readiness */}

            <div
                style={{
                    marginTop:24,
                    padding:18,
                    background:"#102033",
                    borderLeft:"4px solid #00E676",
                    borderRadius:10
                }}
            >

                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center"
                    }}
                >

                    <span
                        style={{
                            color:"#FFFFFF",
                            fontWeight:700
                        }}
                    >
                        Executive Readiness
                    </span>

                    <Tag
                        color={
                            ready
                            ?"green"
                            :"orange"
                        }
                    >
                        {ready
                            ?"READY"
                            :"REVIEW REQUIRED"}
                    </Tag>

                </div>
                                <div
                    style={{
                        marginTop:18,
                        color:"#DCE8F4",
                        lineHeight:1.8,
                        fontSize:14
                    }}
                >

                    Oracle AI Council has completed collaborative reasoning
                    across Threat Intelligence, Graph AI, MITRE ATT&CK,
                    Risk Assessment, Compliance and SOC automation.
                    The consensus score indicates the confidence level
                    before autonomous execution.

                </div>

            </div>

            {/* Oracle Summary */}

            <div
                style={{
                    marginTop:22,
                    background:"#16253B",
                    border:"1px solid #2A415D",
                    borderRadius:12,
                    padding:18
                }}
            >

                <div
                    style={{
                        color:"#FFFFFF",
                        fontSize:18,
                        fontWeight:700,
                        marginBottom:16
                    }}
                >
                    Oracle Council Summary
                </div>

                <Row gutter={[16,16]}>

                    <Col span={12}>

                        <Statistic
                            title="AI Agents"
                            value={6}
                            valueStyle={{
                                color:"#2D7CFF"
                            }}
                            prefix={<RobotOutlined/>}
                        />

                    </Col>

                    <Col span={12}>

                        <Statistic
                            title="Consensus"
                            value={consensus}
                            suffix="%"
                            valueStyle={{
                                color:"#00E676"
                            }}
                            prefix={<CheckCircleOutlined/>}
                        />

                    </Col>

                </Row>

                <div
                    style={{
                        marginTop:18,
                        padding:14,
                        background:"#102033",
                        borderLeft:"4px solid #00E676",
                        borderRadius:8
                    }}
                >

                    <div
                        style={{
                            color:"#00E676",
                            fontWeight:700,
                            marginBottom:8
                        }}
                    >
                        Final Recommendation
                    </div>

                    <div
                        style={{
                            color:"#DCE8F4",
                            lineHeight:1.8,
                            fontSize:14
                        }}
                    >

                        Majority of AI agents recommend automated
                        containment using SOAR Playbook PB-010,
                        followed by credential reset and enterprise-wide
                        IOC hunting to prevent lateral movement.

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

                <Tag
                    color="processing"
                >
                    Oracle AI Consensus Engine
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

                    <RobotOutlined/>

                    LIVE

                </div>

            </div>

        </EnterpriseCard>

    );

}