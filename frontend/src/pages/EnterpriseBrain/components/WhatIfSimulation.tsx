import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Select,
    Button,
    Progress,
    Statistic,
    Tag,
    Divider
} from "antd";

import {
    PlayCircleOutlined,
    ThunderboltOutlined,
    SafetyCertificateOutlined,
    ApartmentOutlined,
    DollarOutlined,
    //RadarChartOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

const { Option } = Select;

interface SimulationResult{

    blast:number;

    risk:number;

    confidence:number;

    savings:number;

    downtime:number;

    action:string;

    recommendation:string;

}

const scenarios=[

    "Ransomware",

    "APT Campaign",

    "Insider Threat",

    "Supply Chain Attack",

    "Credential Theft",

    "Zero-Day Exploit",

    "Cloud Misconfiguration",

    "Data Exfiltration"

];

const actions=[

    "Run SOAR Playbook",

    "Isolate Compromised Assets",

    "Disable Privileged Accounts",

    "Patch Critical Servers",

    "Block External IPs",

    "Deploy AI Firewall Policy",

    "Force Password Rotation",

    "Enable Network Segmentation"

];

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function generate(action:string):SimulationResult{

    return{

        blast:random(4,22),

        risk:random(18,74),

        confidence:random(93,99),

        savings:random(3,15),

        downtime:random(4,36),

        action,

        recommendation:

            "Oracle AI recommends executing '"+action+
            "' immediately to minimize enterprise-wide impact."

    };

}

export default function WhatIfSimulation(){

    const [scenario,setScenario]=useState(scenarios[0]);

    const [action,setAction]=useState(actions[0]);

    const [running,setRunning]=useState(false);

    const [result,setResult]=useState<SimulationResult>(
        generate(actions[0])
    );

    function runSimulation(){

        setRunning(true);

        setTimeout(()=>{

            setResult(generate(action));

            setRunning(false);

        },1800);

    }

    useEffect(()=>{

        setResult(generate(action));

    },[action,scenario]);
        return (

        <EnterpriseCard
            title="Oracle AI What-If Simulation"
            height={900}
        >

            <Row gutter={[28,28]}>

                {/* LEFT PANEL */}

                <Col xs={24} lg={10}>

                    <div
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            gap:22
                        }}
                    >

                        {/* Scenario */}

                        <div>

                            <div
                                style={{
                                    color:"#8EA9CC",
                                    marginBottom:8,
                                    fontSize:13
                                }}
                            >
                                Attack Scenario
                            </div>

                            <Select
                                value={scenario}
                                style={{width:"100%"}}
                                size="large"
                                onChange={setScenario}
                            >

                                {

                                    scenarios.map(item=>(

                                        <Option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </Option>

                                    ))

                                }

                            </Select>

                        </div>

                        {/* Action */}

                        <div>

                            <div
                                style={{
                                    color:"#8EA9CC",
                                    marginBottom:8,
                                    fontSize:13
                                }}
                            >
                                Response Action
                            </div>

                            <Select
                                value={action}
                                style={{width:"100%"}}
                                size="large"
                                onChange={setAction}
                            >

                                {

                                    actions.map(item=>(

                                        <Option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </Option>

                                    ))

                                }

                            </Select>

                        </div>

                        <Button
                            type="primary"
                            icon={<PlayCircleOutlined/>}
                            loading={running}
                            size="large"
                            onClick={runSimulation}
                            style={{
                                height:52,
                                fontWeight:700,
                                background:"#2D7CFF"
                            }}
                        >
                            {

                                running

                                ? "Running Oracle AI..."

                                : "Run Simulation"

                            }
                        </Button>

                        <Divider
                            style={{
                                borderColor:"#2A415D"
                            }}
                        />

                        <Row gutter={[16,16]}>

                            <Col span={12}>

                                <Statistic
                                    title="Blast Radius"
                                    value={result.blast}
                                    suffix="Assets"
                                    valueStyle={{
                                        color:"#FA8C16"
                                    }}
                                    prefix={<ApartmentOutlined/>}
                                />

                            </Col>

                            <Col span={12}>

                                <Statistic
                                    title="AI Confidence"
                                    value={result.confidence}
                                    suffix="%"
                                    valueStyle={{
                                        color:"#00E676"
                                    }}
                                    prefix={<SafetyCertificateOutlined/>}
                                />

                            </Col>

                            <Col span={12}>

                                <Statistic
                                    title="Downtime"
                                    value={result.downtime}
                                    suffix="min"
                                    valueStyle={{
                                        color:"#FF4D4F"
                                    }}
                                    prefix={<ThunderboltOutlined/>}
                                />

                            </Col>

                            <Col span={12}>

                                <Statistic
                                    title="Savings"
                                    value={result.savings}
                                    suffix="M"
                                    prefix={<DollarOutlined/>}
                                    valueStyle={{
                                        color:"#2D7CFF"
                                    }}
                                />

                            </Col>

                        </Row>

                    </div>

                </Col>

                {/* RIGHT PANEL */}

                <Col xs={24} lg={14}>
                                    <div
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            gap:22,
                            height:"100%"
                        }}
                    >

                        {/* Risk Comparison */}

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
                                    fontSize:18,
                                    fontWeight:700,
                                    color:"#FFF",
                                    marginBottom:24
                                }}
                            >
                                Enterprise Risk Simulation
                            </div>

                            <div
                                style={{
                                    marginBottom:22
                                }}
                            >

                                <div
                                    style={{
                                        display:"flex",
                                        justifyContent:"space-between",
                                        color:"#8EA9CC"
                                    }}
                                >
                                    <span>Current Enterprise Risk</span>
                                    <b style={{color:"#FF4D4F"}}>91%</b>
                                </div>

                                <Progress
                                    percent={91}
                                    showInfo={false}
                                    strokeColor="#FF4D4F"
                                />

                            </div>

                            <div>

                                <div
                                    style={{
                                        display:"flex",
                                        justifyContent:"space-between",
                                        color:"#8EA9CC"
                                    }}
                                >
                                    <span>Predicted Risk After Action</span>

                                    <b
                                        style={{
                                            color:"#00E676"
                                        }}
                                    >
                                        {result.risk}%
                                    </b>

                                </div>

                                <Progress
                                    percent={result.risk}
                                    showInfo={false}
                                    strokeColor="#00E676"
                                />

                            </div>

                        </div>

                        {/* Business Impact */}

                        <Row gutter={[16,16]}>

                            <Col span={12}>

                                <div
                                    style={{
                                        background:"#16253B",
                                        border:"1px solid #2A415D",
                                        borderRadius:10,
                                        padding:18
                                    }}
                                >

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:13
                                        }}
                                    >
                                        Financial Loss Prevented
                                    </div>

                                    <div
                                        style={{
                                            fontSize:30,
                                            color:"#00E676",
                                            fontWeight:700,
                                            marginTop:10
                                        }}
                                    >
                                        ${result.savings}M
                                    </div>

                                </div>

                            </Col>

                            <Col span={12}>

                                <div
                                    style={{
                                        background:"#16253B",
                                        border:"1px solid #2A415D",
                                        borderRadius:10,
                                        padding:18
                                    }}
                                >

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:13
                                        }}
                                    >
                                        Estimated Downtime
                                    </div>

                                    <div
                                        style={{
                                            fontSize:30,
                                            color:"#FA8C16",
                                            fontWeight:700,
                                            marginTop:10
                                        }}
                                    >
                                        {result.downtime} min
                                    </div>

                                </div>

                            </Col>

                        </Row>

                        {/* Recommendation */}

                        <div
                            style={{
                                background:"#102033",
                                borderLeft:"5px solid #00E676",
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
                                Oracle AI Recommendation
                            </div>

                            <div
                                style={{
                                    color:"#DCE8F4",
                                    lineHeight:1.9,
                                    fontSize:15
                                }}
                            >
                                {result.recommendation}
                            </div>

                        </div>

                        {/* Executive Decision */}

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

                                <span
                                    style={{
                                        color:"#8EA9CC"
                                    }}
                                >
                                    Oracle Executive Decision
                                </span>

                                <Tag color="green">
                                    APPROVED
                                </Tag>

                            </div>

                            <div
                                style={{
                                    color:"#FFFFFF",
                                    lineHeight:2,
                                    fontSize:15
                                }}
                            >

                                Running the selected response action is predicted
                                to reduce enterprise risk from

                                <b
                                    style={{
                                        color:"#FF4D4F"
                                    }}
                                >
                                    {" "}91%{" "}
                                </b>

                                to

                                <b
                                    style={{
                                        color:"#00E676"
                                    }}
                                >
                                    {result.risk}%{" "}
                                </b>

                                while preventing approximately

                                <b
                                    style={{
                                        color:"#2D7CFF"
                                    }}
                                >
                                    ${result.savings} Million
                                </b>

                                in business losses.

                            </div>

                        </div>

                        <div
                            style={{
                                display:"flex",
                                justifyContent:"space-between",
                                alignItems:"center",
                                marginTop:"auto"
                            }}
                        >

                            <Tag color="processing">
                                DIGITAL TWIN SIMULATION
                            </Tag>

                            <span
                                style={{
                                    color:"#8EA9CC"
                                }}
                            >
                                Oracle AI Engine
                            </span>

                        </div>

                    </div>

                </Col>

            </Row>

        </EnterpriseCard>

    );
    

}
                