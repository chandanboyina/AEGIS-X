import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Progress,
    Tag,
    Statistic
} from "antd";

import {
    RobotOutlined,
    SafetyCertificateOutlined,
    NodeIndexOutlined,
    ThunderboltOutlined,
    //ApartmentOutlined,
    RadarChartOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface ExplainFeature{

    feature:string;

    contribution:number;

    color:string;

}

interface Explainability{

    confidence:number;

    recommendation:string;

    reasoning:string;

    models:string[];

    features:ExplainFeature[];

}

const featureNames=[

    "Credential Abuse",

    "PowerShell Activity",

    "Threat Intelligence",

    "Behavior Analytics",

    "Graph AI Correlation",

    "MITRE ATT&CK Mapping",

    "Endpoint Telemetry"

];

const recommendations=[

    "Contain Immediately",

    "Execute SOAR Playbook PB-010",

    "Reset Privileged Credentials",

    "Block External Command Server",

    "Isolate Critical Assets",

    "Begin Enterprise IOC Hunt"

];

const reasoning=[

    "Oracle AI correlated endpoint telemetry, graph intelligence, MITRE ATT&CK mapping and historical incidents to reach this recommendation.",

    "Behavior analytics detected abnormal authentication patterns combined with lateral movement prediction.",

    "ThreatGPT identified attack behaviour consistent with enterprise ransomware campaigns.",

    "Digital Twin simulation predicts rapid propagation unless containment begins immediately."

];

const aiModels=[

    "Oracle AI",

    "ThreatGPT",

    "Graph AI",

    "Digital Twin",

    "Behavior Engine",

    "MITRE Engine"

];

const colors=[

    "#FF4D4F",

    "#FA8C16",

    "#2D7CFF",

    "#00E676",

    "#A855F7",

    "#13C2C2",

    "#FADB14"

];

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function generate(){

    const values=featureNames.map((feature,index)=>({

        feature,

        contribution:random(8,34),

        color:colors[index]

    }));

    values.sort(

        (a,b)=>b.contribution-a.contribution

    );

    return{

        confidence:random(94,99),

        recommendation:

            recommendations[

                random(

                    0,

                    recommendations.length-1

                )

            ],

        reasoning:

            reasoning[

                random(

                    0,

                    reasoning.length-1

                )

            ],

        models:aiModels,

        features:values

    };

}

export default function Explainability(){

    const [data,setData]=useState<Explainability>(

        generate()

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            setData(generate());

        },5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle AI Explainability Engine"
            height={920}
        >

            <Row gutter={[24,24]}>

                {/* LEFT PANEL */}

                <Col xs={24} lg={15}>

                    <div
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            gap:22
                        }}
                    >

                        {/* Confidence */}

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
                                    alignItems:"center"
                                }}
                            >

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:13
                                        }}
                                    >
                                        Oracle AI Decision Confidence
                                    </div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            fontSize:30,
                                            fontWeight:700,
                                            marginTop:6
                                        }}
                                    >
                                        {data.confidence}%
                                    </div>

                                </div>

                                <RobotOutlined
                                    style={{
                                        fontSize:42,
                                        color:"#00E676"
                                    }}
                                />

                            </div>

                            <Progress
                                percent={data.confidence}
                                showInfo={false}
                                strokeColor="#00E676"
                                style={{
                                    marginTop:18
                                }}
                            />

                        </div>

                        {/* Feature Importance */}

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
                                    fontSize:20,
                                    marginBottom:24
                                }}
                            >
                                AI Feature Importance
                            </div>

                            {

                                data.features.map(feature=>(

                                    <div
                                        key={feature.feature}
                                        style={{
                                            marginBottom:22
                                        }}
                                    >

                                        <div
                                            style={{
                                                display:"flex",
                                                justifyContent:"space-between",
                                                marginBottom:8
                                            }}
                                        >

                                            <span
                                                style={{
                                                    color:"#DCE8F4"
                                                }}
                                            >
                                                {feature.feature}
                                            </span>

                                            <b
                                                style={{
                                                    color:feature.color
                                                }}
                                            >
                                                {feature.contribution}%
                                            </b>

                                        </div>

                                        <Progress
                                            percent={feature.contribution}
                                            strokeColor={feature.color}
                                            showInfo={false}
                                        />

                                    </div>

                                ))

                            }

                        </div>

                    </div>

                </Col>

                {/* RIGHT PANEL */}

                <Col xs={24} lg={9}>
                                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 20,
                            height: "100%"
                        }}
                    >

                        {/* AI Models */}

                        <div
                            style={{
                                background: "#16253B",
                                border: "1px solid #2A415D",
                                borderRadius: 12,
                                padding: 22
                            }}
                        >

                            <div
                                style={{
                                    color: "#FFFFFF",
                                    fontWeight: 700,
                                    fontSize: 18,
                                    marginBottom: 18
                                }}
                            >
                                AI Models Used
                            </div>

                            {

                                data.models.map(model=>(

                                    <Tag
                                        key={model}
                                        color="processing"
                                        style={{
                                            marginBottom:10,
                                            padding:"4px 12px"
                                        }}
                                    >
                                        {model}
                                    </Tag>

                                ))

                            }

                        </div>

                        {/* Final Decision */}

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:22
                            }}
                        >

                            <Statistic
                                title="Final AI Decision"
                                value={data.recommendation}
                                valueStyle={{
                                    color:"#00E676",
                                    fontSize:24
                                }}
                                prefix={<SafetyCertificateOutlined/>}
                            />

                        </div>

                        {/* Oracle Explanation */}

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
                                    fontWeight:700,
                                    fontSize:18,
                                    marginBottom:14
                                }}
                            >
                                Oracle AI Explanation
                            </div>

                            <div
                                style={{
                                    color:"#DCE8F4",
                                    lineHeight:1.9,
                                    fontSize:15
                                }}
                            >
                                {data.reasoning}
                            </div>

                        </div>

                        {/* Explainability Summary */}

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
                                Explainability Summary
                            </div>

                            <Row gutter={[16,16]}>

                                <Col span={12}>

                                    <Statistic
                                        title="Signals"
                                        value={data.features.length}
                                        prefix={<RadarChartOutlined/>}
                                        valueStyle={{
                                            color:"#2D7CFF"
                                        }}
                                    />

                                </Col>

                                <Col span={12}>

                                    <Statistic
                                        title="AI Models"
                                        value={data.models.length}
                                        prefix={<RobotOutlined/>}
                                        valueStyle={{
                                            color:"#00E676"
                                        }}
                                    />

                                </Col>

                                <Col span={12}>

                                    <Statistic
                                        title="Top Feature"
                                        value={data.features[0].feature}
                                        valueStyle={{
                                            color:"#FA8C16",
                                            fontSize:18
                                        }}
                                        prefix={<ThunderboltOutlined/>}
                                    />

                                </Col>

                                <Col span={12}>

                                    <Statistic
                                        title="Confidence"
                                        value={data.confidence}
                                        suffix="%"
                                        valueStyle={{
                                            color:"#00E676"
                                        }}
                                        prefix={<NodeIndexOutlined/>}
                                    />

                                </Col>

                            </Row>

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

                            <Tag color="processing">
                                Explainability Engine
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

                    </div>

                </Col>

            </Row>

        </EnterpriseCard>

    );

}