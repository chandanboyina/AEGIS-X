import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Tag,
    Button,
    Statistic,
    Progress
} from "antd";

import {
    ThunderboltOutlined,
    SafetyCertificateOutlined,
    DollarOutlined,
    ApartmentOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    RobotOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Recommendation{

    id:number;

    priority:"CRITICAL"|"HIGH"|"MEDIUM"|"LOW";

    title:string;

    description:string;

    confidence:number;

    impact:string;

    eta:number;

    savings:number;

    assets:number;

}

const recommendations:Recommendation[]=[

    {

        id:1,

        priority:"CRITICAL",

        title:"Isolate Government Cloud",

        description:
            "Oracle AI detected coordinated lateral movement targeting privileged workloads.",

        confidence:99,

        impact:"Very High",

        eta:3,

        savings:14,

        assets:31

    },

    {

        id:2,

        priority:"HIGH",

        title:"Reset Privileged Credentials",

        description:
            "Credential abuse probability exceeds enterprise threshold.",

        confidence:97,

        impact:"High",

        eta:7,

        savings:11,

        assets:26

    },

    {

        id:3,

        priority:"HIGH",

        title:"Deploy SOAR Playbook PB-010",

        description:
            "Automated containment reduces ransomware propagation by 81%.",

        confidence:96,

        impact:"High",

        eta:5,

        savings:10,

        assets:21

    },

    {

        id:4,

        priority:"MEDIUM",

        title:"Increase Authentication Monitoring",

        description:
            "Adaptive monitoring recommended for privileged accounts.",

        confidence:95,

        impact:"Medium",

        eta:12,

        savings:7,

        assets:18

    },

    {

        id:5,

        priority:"LOW",

        title:"Patch Internet Facing Servers",

        description:
            "Reduce exposure to recently disclosed vulnerabilities.",

        confidence:94,

        impact:"Low",

        eta:25,

        savings:5,

        assets:13

    }

];

function priorityColor(priority:string){

    switch(priority){

        case "CRITICAL":

            return "#FF4D4F";

        case "HIGH":

            return "#FA8C16";

        case "MEDIUM":

            return "#FADB14";

        default:

            return "#00E676";

    }

}

export default function AIRecommendations(){

    const [active,setActive]=useState(0);

    useEffect(()=>{

        const timer=setInterval(()=>{

            setActive(prev=>

                (prev+1)%recommendations.length

            );

        },5000);

        return()=>clearInterval(timer);

    },[]);

    const recommendation=recommendations[active];

        return(

        <EnterpriseCard
            title="Oracle AI Recommendations"
            height={1800}
        >

            <Row gutter={[24,24]}>

                {/* LEFT PANEL */}

                <Col xs={24} lg={15}>

                    <div
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            gap:18
                        }}
                    >

                        {

                            recommendations.map((item,index)=>(

                                <div
                                    key={item.id}
                                    style={{
                                        background:
                                            index===active
                                            ? "#1B2F49"
                                            : "#16253B",

                                        border:
                                            index===active
                                            ? `2px solid ${priorityColor(item.priority)}`
                                            : "1px solid #2A415D",

                                        borderRadius:12,

                                        padding:20,

                                        transition:"0.35s"
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

                                            <Tag
                                                color={
                                                    item.priority==="CRITICAL"
                                                    ?"red"
                                                    :item.priority==="HIGH"
                                                    ?"orange"
                                                    :item.priority==="MEDIUM"
                                                    ?"gold"
                                                    :"green"
                                                }
                                            >
                                                {item.priority}
                                            </Tag>

                                        </div>

                                        <Button
                                            type={
                                                index===active
                                                ?"primary"
                                                :"default"
                                            }
                                            icon={<ThunderboltOutlined/>}
                                        >
                                            Execute
                                        </Button>

                                    </div>

                                    <div
                                        style={{
                                            color:"#FFF",
                                            fontSize:22,
                                            fontWeight:700,
                                            marginTop:16
                                        }}
                                    >
                                        {item.title}
                                    </div>

                                    <div
                                        style={{
                                            color:"#9BB6D8",
                                            marginTop:10,
                                            lineHeight:1.8
                                        }}
                                    >
                                        {item.description}
                                    </div>

                                    <Row
                                        gutter={[16,16]}
                                        style={{
                                            marginTop:22
                                        }}
                                    >

                                        <Col span={6}>

                                            <Statistic
                                                title="Confidence"
                                                value={item.confidence}
                                                suffix="%"
                                                prefix={<SafetyCertificateOutlined/>}
                                                valueStyle={{
                                                    color:"#00E676",
                                                    fontSize:22
                                                }}
                                            />

                                        </Col>

                                        <Col span={6}>

                                            <Statistic
                                                title="ETA"
                                                value={item.eta}
                                                suffix="min"
                                                prefix={<ClockCircleOutlined/>}
                                                valueStyle={{
                                                    color:"#FA8C16",
                                                    fontSize:22
                                                }}
                                            />

                                        </Col>

                                        <Col span={6}>

                                            <Statistic
                                                title="Assets"
                                                value={item.assets}
                                                prefix={<ApartmentOutlined/>}
                                                valueStyle={{
                                                    color:"#2D7CFF",
                                                    fontSize:22
                                                }}
                                            />

                                        </Col>

                                        <Col span={6}>

                                            <Statistic
                                                title="Savings"
                                                value={item.savings}
                                                suffix="M"
                                                prefix={<DollarOutlined/>}
                                                valueStyle={{
                                                    color:"#00E676",
                                                    fontSize:22
                                                }}
                                            />

                                        </Col>

                                    </Row>

                                </div>

                            ))

                        }

                    </div>

                </Col>

                {/* RIGHT PANEL */}

                <Col xs={24} lg={9}>
                                    <div
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            gap:20,
                            height:"100%"
                        }}
                    >

                        {/* Oracle AI Executive */}

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:22
                            }}
                        >

                            <div
                                style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    alignItems:"center",
                                    marginBottom:18
                                }}
                            >

                                <div
                                    style={{
                                        display:"flex",
                                        alignItems:"center",
                                        gap:10
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
                                            color:"#FFF",
                                            fontWeight:700,
                                            fontSize:18
                                        }}
                                    >
                                        Oracle AI Copilot
                                    </span>

                                </div>

                                <Tag color="green">
                                    LIVE
                                </Tag>

                            </div>

                            <div
                                style={{
                                    color:"#DCE8F4",
                                    lineHeight:1.9,
                                    fontSize:15
                                }}
                            >

                                Oracle AI continuously evaluates enterprise
                                telemetry, MITRE ATT&CK activity,
                                attack-path predictions and Digital Twin
                                simulations to recommend the safest
                                response strategy.

                            </div>

                        </div>

                        {/* Business Impact */}

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:22
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
                                Business Impact
                            </div>

                            <div
                                style={{
                                    display:"flex",
                                    flexDirection:"column",
                                    gap:18
                                }}
                            >

                                <div
                                    style={{
                                        display:"flex",
                                        justifyContent:"space-between"
                                    }}
                                >
                                    <span style={{color:"#8EA9CC"}}>
                                        Risk Reduction
                                    </span>

                                    <b style={{color:"#00E676"}}>
                                        82%
                                    </b>

                                </div>

                                <Progress
                                    percent={82}
                                    strokeColor="#00E676"
                                    showInfo={false}
                                />

                                <div
                                    style={{
                                        display:"flex",
                                        justifyContent:"space-between"
                                    }}
                                >
                                    <span style={{color:"#8EA9CC"}}>
                                        Automation Coverage
                                    </span>

                                    <b style={{color:"#2D7CFF"}}>
                                        91%
                                    </b>

                                </div>

                                <Progress
                                    percent={91}
                                    strokeColor="#2D7CFF"
                                    showInfo={false}
                                />

                                <div
                                    style={{
                                        display:"flex",
                                        justifyContent:"space-between"
                                    }}
                                >
                                    <span style={{color:"#8EA9CC"}}>
                                        False Positives Reduced
                                    </span>

                                    <b style={{color:"#FA8C16"}}>
                                        74%
                                    </b>

                                </div>

                                <Progress
                                    percent={74}
                                    strokeColor="#FA8C16"
                                    showInfo={false}
                                />

                            </div>

                        </div>

                        {/* Executive Recommendation */}

                        <div
                            style={{
                                background:"#102033",
                                borderLeft:"4px solid #00E676",
                                borderRadius:12,
                                padding:22
                            }}
                        >

                            <div
                                style={{
                                    color:"#00E676",
                                    fontSize:18,
                                    fontWeight:700,
                                    marginBottom:16
                                }}
                            >
                                Executive Recommendation
                            </div>

                            <div
                                style={{
                                    color:"#DCE8F4",
                                    lineHeight:1.9
                                }}
                            >

                                Oracle AI recommends executing

                                <b style={{color:"#FFFFFF"}}>
                                    {" "}
                                    {recommendation.title}
                                    {" "}
                                </b>

                                immediately.

                                This action is predicted to reduce enterprise
                                risk while protecting

                                <b style={{color:"#2D7CFF"}}>
                                    {" "}
                                    {recommendation.assets} assets
                                </b>

                                and avoiding approximately

                                <b style={{color:"#00E676"}}>
                                    {" "}
                                    ${recommendation.savings}M
                                </b>

                                in operational losses.

                            </div>

                        </div>

                        {/* Footer */}

                        <div
                            style={{
                                marginTop:"auto",
                                display:"flex",
                                justifyContent:"space-between",
                                alignItems:"center"
                            }}
                        >

                            <Tag
                                color="processing"
                            >
                                Oracle Recommendation Engine
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
                