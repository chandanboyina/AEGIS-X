import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Tag,
    Progress,
    Statistic,
    Divider
} from "antd";

import {
    RobotOutlined,
    ThunderboltOutlined,
    WarningOutlined,
    ApartmentOutlined,
    SafetyCertificateOutlined,
    RadarChartOutlined,
    RiseOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Summary {

    incidents:number;

    critical:number;

    asset:string;

    mitre:string;

    blast:number;

    confidence:number;

    prediction:number;

    level:string;

    recommendation:string;

    reasoning:string;

    timestamp:string;

}

const assets=[

    "Government Cloud",

    "Power Grid",

    "Banking",

    "Healthcare",

    "Railways",

    "Telecom",

    "Manufacturing",

    "Airport Network"

];

const mitre=[

    "T1190",

    "T1078",

    "T1059",

    "T1110",

    "T1021",

    "T1046",

    "T1486"

];

const levels=[

    "LOW",

    "MODERATE",

    "HIGH",

    "CRITICAL"

];

const recommendations=[

    "Execute Playbook PB-010 immediately.",

    "Isolate all compromised endpoints.",

    "Reset privileged credentials.",

    "Block malicious external IP addresses.",

    "Deploy SOAR containment workflow.",

    "Increase monitoring for lateral movement.",

    "Enable adaptive firewall policies.",

    "Start enterprise-wide IOC hunting."

];

const reasoning=[

    "Oracle AI detected coordinated lateral movement across multiple assets.",

    "Graph AI predicts propagation to adjacent network segments.",

    "Threat intelligence indicates active exploitation campaign.",

    "Credential abuse probability increased significantly.",

    "Attack pattern matches historical ransomware behaviour.",

    "Endpoint telemetry indicates privilege escalation attempts.",

    "Behavior analytics detected unusual authentication activity."

];

function randomItem(arr:any[]){

    return arr[Math.floor(Math.random()*arr.length)];

}

function generateSummary():Summary{

    return{

        incidents:85+Math.floor(Math.random()*25),

        critical:8+Math.floor(Math.random()*12),

        asset:randomItem(assets),

        mitre:randomItem(mitre),

        blast:8+Math.floor(Math.random()*20),

        confidence:92+Math.floor(Math.random()*8),

        prediction:100+Math.floor(Math.random()*30),

        level:randomItem(levels),

        recommendation:randomItem(recommendations),

        reasoning:randomItem(reasoning),

        timestamp:new Date().toLocaleTimeString()

    };

}

export default function AIExecutiveSummary(){

    const [summary,setSummary]=useState(generateSummary());

    useEffect(()=>{

        const timer=setInterval(()=>{

            setSummary(generateSummary());

        },5000);

        return()=>clearInterval(timer);

    },[]);
    
        return (
            <EnterpriseCard
            title="Oracle AI Executive Summary"
            height={1200}
        >

            {/* Threat Level */}

            <Row gutter={[18,18]}>

                <Col span={16}>

                    <div
                        style={{
                            color:"#8EA9CC",
                            fontSize:13
                        }}
                    >
                        Overall Threat Level
                    </div>

                    <div
                        style={{
                            display:"flex",
                            alignItems:"center",
                            gap:12,
                            marginTop:8
                        }}
                    >

                        <Progress
                            percent={
                                summary.level==="LOW"
                                ?25
                                :summary.level==="MODERATE"
                                ?50
                                :summary.level==="HIGH"
                                ?80
                                :97
                            }
                            strokeColor={
                                summary.level==="LOW"
                                ?"#00E676"
                                :summary.level==="MODERATE"
                                ?"#FADB14"
                                :summary.level==="HIGH"
                                ?"#FA8C16"
                                :"#FF4D4F"
                            }
                            showInfo={false}
                            style={{width:220}}
                        />

                        <Tag
                            color={
                                summary.level==="LOW"
                                ?"green"
                                :summary.level==="MODERATE"
                                ?"gold"
                                :summary.level==="HIGH"
                                ?"orange"
                                :"red"
                            }
                        >
                            {summary.level}
                        </Tag>

                    </div>

                </Col>

                <Col span={8}>

                    <div
                        style={{
                            textAlign:"right"
                        }}
                    >

                        <Tag
                            color="green"
                            style={{
                                padding:"4px 10px"
                            }}
                        >
                            LIVE AI
                        </Tag>

                        <div
                            style={{
                                color:"#8EA9CC",
                                marginTop:8
                            }}
                        >
                            {summary.timestamp}
                        </div>

                    </div>

                </Col>

            </Row>

            <Divider/>

            {/* KPI */}

            <Row gutter={[20,20]}>

                <Col span={8}>

                    <Statistic
                        title="Incidents"
                        value={summary.incidents}
                        prefix={<WarningOutlined/>}
                        valueStyle={{
                            color:"#FFFFFF"
                        }}
                    />

                </Col>

                <Col span={8}>

                    <Statistic
                        title="Critical"
                        value={summary.critical}
                        prefix={<ThunderboltOutlined/>}
                        valueStyle={{
                            color:"#FF4D4F"
                        }}
                    />

                </Col>

                <Col span={8}>

                    <Statistic
                        title="Prediction"
                        value={summary.prediction}
                        prefix={<RiseOutlined/>}
                        valueStyle={{
                            color:"#00E676"
                        }}
                    />

                </Col>

            </Row>

            <Divider/>

            {/* Intelligence */}

            <Row gutter={[18,18]}>

                <Col span={12}>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginBottom:6
                        }}
                    >
                        <ApartmentOutlined/>

                        {" "}Primary Target
                    </div>

                    <div
                        style={{
                            color:"#FFFFFF",
                            fontSize:18,
                            fontWeight:700
                        }}
                    >
                        {summary.asset}
                    </div>

                </Col>

                <Col span={12}>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginBottom:6
                        }}
                    >
                        <RadarChartOutlined/>

                        {" "}Top MITRE Technique
                    </div>

                    <div
                        style={{
                            color:"#FFFFFF",
                            fontSize:18,
                            fontWeight:700
                        }}
                    >
                        {summary.mitre}
                    </div>

                </Col>

            </Row>

            <Divider/>

            {/* Blast Radius */}

            <div
                style={{
                    color:"#8EA9CC"
                }}
            >
                <SafetyCertificateOutlined/>

                {" "}Predicted Blast Radius
            </div>

            <Progress
                percent={summary.blast*4}
                strokeColor="#FA8C16"
            />

            <div
                style={{
                    color:"#FFFFFF",
                    marginTop:4
                }}
            >
                Estimated impact on

                <b>

                    {" "} {summary.blast} enterprise assets

                </b>

            </div>

            <Divider/>

            {/* AI Confidence */}

            <div
                style={{
                    color:"#8EA9CC"
                }}
            >
                <RobotOutlined/>

                {" "}Oracle AI Confidence
            </div>

            <Progress

                percent={summary.confidence}

                strokeColor="#00E676"

            />

            <div
                style={{
                    marginTop:10,
                    color:"#DCE8F4",
                    lineHeight:1.8
                }}
            >

                {summary.reasoning}

            </div>

            <Divider/>

            {/* PART 3 STARTS HERE */}

                        {/* Oracle AI Recommendation */}

            <div>

                <div
                    style={{
                        color:"#8EA9CC",
                        fontSize:13,
                        marginBottom:8
                    }}
                >
                    <RobotOutlined/>

                    {" "}Oracle AI Recommendation
                </div>

                <div
                    style={{
                        background:"#16253B",
                        border:"1px solid #2D4765",
                        borderRadius:10,
                        padding:16
                    }}
                >

                    <div
                        style={{
                            color:"#FFFFFF",
                            fontSize:16,
                            fontWeight:700
                        }}
                    >
                        {summary.recommendation}
                    </div>

                    <div
                        style={{
                            marginTop:12,
                            color:"#9FC3FF",
                            lineHeight:1.8
                        }}
                    >
                        {summary.reasoning}
                    </div>

                </div>

            </div>

            <Divider/>

            {/* AI Suggested Actions */}

            <div>

                <div
                    style={{
                        color:"#8EA9CC",
                        marginBottom:12
                    }}
                >
                    Recommended Immediate Actions
                </div>

                <div
                    style={{
                        display:"grid",
                        gridTemplateColumns:"1fr 1fr",
                        gap:12
                    }}
                >

                    <div
                        style={{
                            background:"#18293E",
                            borderRadius:8,
                            padding:12
                        }}
                    >
                        ✅ Execute PB-010 Playbook
                    </div>

                    <div
                        style={{
                            background:"#18293E",
                            borderRadius:8,
                            padding:12
                        }}
                    >
                        ✅ Isolate Critical Hosts
                    </div>

                    <div
                        style={{
                            background:"#18293E",
                            borderRadius:8,
                            padding:12
                        }}
                    >
                        ✅ Block Malicious IPs
                    </div>

                    <div
                        style={{
                            background:"#18293E",
                            borderRadius:8,
                            padding:12
                        }}
                    >
                        ✅ Notify SOC L2 Team
                    </div>

                </div>

            </div>

            <Divider/>

            {/* Executive Insight */}

            <div
                style={{
                    background:"#102033",
                    borderLeft:"4px solid #00E676",
                    borderRadius:8,
                    padding:14
                }}
            >

                <div
                    style={{
                        color:"#00E676",
                        fontWeight:700,
                        marginBottom:8
                    }}
                >
                    Oracle AI Executive Insight
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >
                    Oracle AI predicts an elevated probability of lateral
                    movement targeting <b>{summary.asset}</b>. Based on
                    current telemetry, the attack chain aligns with
                    <b> {summary.mitre}</b> and is expected to affect
                    approximately <b>{summary.blast}</b> enterprise assets
                    if containment is delayed. Immediate automated response
                    is recommended with an AI confidence of
                    <b> {summary.confidence}%</b>.
                </div>

            </div>

            <div
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    marginTop:20,
                    borderTop:"1px solid #263D57",
                    paddingTop:12
                }}
            >

                <div
                    style={{
                        display:"flex",
                        alignItems:"center",
                        gap:10,
                        color:"#00E676",
                        fontWeight:700
                    }}
                >

                    <div
                        style={{
                            width:10,
                            height:10,
                            borderRadius:"50%",
                            background:"#00E676",
                            animation:"pulseAI 1.2s infinite"
                        }}
                    />

                    Oracle AI Copilot Running

                </div>

                <div
                    style={{
                        color:"#8EA9CC",
                        fontSize:12
                    }}
                >
                    Last Updated : {summary.timestamp}
                </div>

            </div>

            <style>

                {`

@keyframes pulseAI{

0%{

opacity:.4;

transform:scale(.8);

}

50%{

opacity:1;

transform:scale(1.3);

}

100%{

opacity:.4;

transform:scale(.8);

}

}

`}

            </style>

        </EnterpriseCard>

    );

}
    