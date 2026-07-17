import { useEffect, useMemo, useState } from "react";
import {
    Row,
    Col,
    Button,
    Tag,
    Progress,
    Input,
    Space
} from "antd";

import {
    RobotOutlined,
    //ThunderboltOutlined,
    SendOutlined,
    //SafetyCertificateOutlined,
    DeploymentUnitOutlined,
    BulbOutlined,
    NodeIndexOutlined,
    WarningOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

const { TextArea } = Input;

interface AIResponse{

    title:string;

    confidence:number;

    asset:string;

    mitre:string;

    verdict:string;

    prediction:string;

    recommendation:string;

    reasoning:string;

}

const assets=[

    "Government Cloud",

    "Power Grid",

    "Banking",

    "Healthcare",

    "Airport Network",

    "Railways",

    "Telecom",

    "Manufacturing"

];

const mitres=[

    "T1190",

    "T1078",

    "T1059",

    "T1110",

    "T1046",

    "T1021",

    "T1486"

];

const verdicts=[

    "Credential Abuse",

    "PowerShell Execution",

    "Privilege Escalation",

    "Ransomware Behaviour",

    "Lateral Movement",

    "Remote Code Execution"

];

const predictions=[

    "Attack expected to spread to Domain Controllers.",

    "Credential compromise likely within 8 minutes.",

    "Potential ransomware execution predicted.",

    "High probability of Active Directory abuse.",

    "Lateral movement toward production servers detected.",

    "Privilege escalation chain identified."

];

const recommendations=[

    "Execute Playbook PB-010 immediately.",

    "Isolate affected endpoints.",

    "Reset privileged credentials.",

    "Block external command-and-control IPs.",

    "Enable adaptive firewall rules.",

    "Trigger SOAR containment workflow."

];

const reasoning=[

    "Graph AI discovered abnormal authentication chains between multiple enterprise assets.",

    "Oracle AI correlated endpoint telemetry, threat intelligence and MITRE techniques.",

    "ThreatGPT identified behaviour matching historical ransomware campaigns.",

    "Behavior Analytics detected impossible travel authentication events.",

    "Knowledge Graph connected multiple suspicious identities to the same attack path."

];

const prompts=[

    "Explain latest incident",

    "Predict next attack",

    "Show attack path",

    "Top enterprise risks",

    "Generate executive report",

    "Explain MITRE technique",

    "Why this recommendation?",

    "Show affected assets"

];

const aiAnswers: Record<string,string>={

"Explain latest incident":
`Latest Incident

Oracle AI detected suspicious PowerShell execution targeting Government Cloud.

MITRE: T1059

Severity: Critical

Confidence: 97%

Recommendation:
Isolate affected hosts immediately.`,

"Predict next attack":
`Prediction

Oracle AI predicts lateral movement from VPN Gateway toward Domain Controller.

Estimated Time:
10 Minutes

Confidence:
96%

Recommendation:
Execute Playbook PB-010.`,

"Show attack path":
`Attack Path

Internet
↓

Firewall
↓

VPN Gateway
↓

Application Server
↓

Domain Controller

Expected Blast Radius:
19 Assets.`,

"Top enterprise risks":
`Top Enterprise Risks

1. Government Cloud

2. Banking

3. Power Grid

4. Telecom

Overall Risk:
Critical`,

"Generate executive report":
`Executive Summary

Overall Risk:
Critical

Predicted Blast Radius:
24 Assets

Estimated Financial Loss:
$11.2 Million

Immediate Action:
Deploy SOAR Playbook.`,

"Explain MITRE technique":
`MITRE T1078

Technique:
Valid Accounts

Oracle AI detected stolen enterprise credentials being used for privilege escalation and lateral movement.`,

"Why this recommendation?":
`Oracle AI correlated endpoint telemetry, MITRE ATT&CK, threat intelligence and graph relationships.

Historical attacks with similar patterns resulted in ransomware within 15 minutes.`,

"Show affected assets":
`Affected Assets

Government Cloud

VPN Gateway

Application Server

Domain Controller

Power Grid`
};

function randomItem(arr:any[]){

    return arr[Math.floor(Math.random()*arr.length)];

}

function generateResponse():AIResponse{

    return{

        title:"Oracle AI Executive Decision",

        confidence:94+Math.floor(Math.random()*6),

        asset:randomItem(assets),

        mitre:randomItem(mitres),

        verdict:randomItem(verdicts),

        prediction:randomItem(predictions),

        recommendation:randomItem(recommendations),

        reasoning:randomItem(reasoning)

    };

}

export default function OracleCopilot(){

    const [query,setQuery]=useState("");

    const [response,setResponse]=useState(generateResponse());

    const [displayed,setDisplayed]=useState("");

    const [typing,setTyping]=useState(true);

    const fullText=useMemo(()=>{

        return `${response.reasoning}

Prediction:
${response.prediction}

Recommendation:
${response.recommendation}`;

    },[response]);
        useEffect(() => {

        setTyping(true);
        setDisplayed("");

        let index = 0;

        const timer = setInterval(() => {

            index++;

            setDisplayed(fullText.slice(0, index));

            if (index >= fullText.length) {

                clearInterval(timer);
                setTyping(false);

            }

        }, 18);

        return () => clearInterval(timer);

    }, [fullText]);

    useEffect(() => {

        const timer = setInterval(() => {

            setResponse(generateResponse());

        }, 12000);

        return () => clearInterval(timer);

    }, []);

    const runPrompt=(text:string)=>{

        setQuery(text);

        const answer=

            aiAnswers[text] ??

            "Oracle AI completed analysis.";

        setResponse({

            ...generateResponse(),

            reasoning:answer,

            prediction:"",

            recommendation:""

        });

    };

    const askOracle=()=>{

        if(query.trim()===""){

            setResponse(generateResponse());

            return;

        }

        const answer=

            aiAnswers[query] ??

            `Oracle AI Analysis

    ${query}

    Oracle AI correlated enterprise telemetry, MITRE ATT&CK intelligence and behavioural analytics.

    Confidence:
    ${response.confidence}%

    Recommendation:
    ${response.recommendation}`;

        setResponse({

            ...generateResponse(),

            reasoning:answer,

            prediction:"",

            recommendation:""

        });

    };

    return (

        <EnterpriseCard
            title="Oracle AI Copilot"
            height={900}
        >

            <Row gutter={[24,24]}>

                {/* LEFT PANEL */}

                <Col xs={24} lg={16}>

                    <div
                        style={{
                            display:"flex",
                            gap:10,
                            marginBottom:20
                        }}
                    >

                        <TextArea

                            value={query}

                            onChange={(e)=>setQuery(e.target.value)}

                            onPressEnter={(e)=>{

                                e.preventDefault();

                                askOracle();

                            }}

                            placeholder="Ask Oracle AI anything about your enterprise..."

                            autoSize={{
                                minRows:2,
                                maxRows:4
                            }}

                            style={{
                                background:"#16253B",
                                color:"#FFFFFF",
                                border:"1px solid #304766"
                            }}

                        />

                        <Button

                            type="primary"

                            icon={<SendOutlined/>}

                            size="large"

                            style={{
                                height:72,
                                minWidth:70
                            }}

                            onClick={askOracle}

                        >

                            Ask

                        </Button>

                    </div>

                    <Space
                        wrap
                        size={[10,10]}
                        style={{
                            marginBottom:22
                        }}
                    >

                        {

                            prompts.map(prompt=>(

                                <Tag

                                    key={prompt}

                                    color="blue"

                                    style={{
                                        cursor:"pointer",
                                        padding:"6px 12px",
                                        fontSize:13
                                    }}

                                    onClick={()=>runPrompt(prompt)}

                                >

                                    {prompt}

                                </Tag>

                            ))

                        }

                    </Space>

                    <div
                        style={{
                            background:"#16253B",
                            border:"1px solid #28405D",
                            borderRadius:10,
                            padding:22,
                            minHeight:320
                        }}
                    >

                        <div
                            style={{
                                display:"flex",
                                alignItems:"center",
                                gap:12,
                                marginBottom:18
                            }}
                        >

                            <RobotOutlined
                                style={{
                                    fontSize:24,
                                    color:"#00E676"
                                }}
                            />

                            <div>

                                <div
                                    style={{
                                        color:"#FFFFFF",
                                        fontSize:20,
                                        fontWeight:700
                                    }}
                                >
                                    {response.title}
                                </div>

                                <div
                                    style={{
                                        color:"#8EA9CC",
                                        fontSize:13
                                    }}
                                >
                                    Oracle AI Reasoning Engine
                                </div>

                            </div>

                            <Tag
                                color="green"
                                style={{
                                    marginLeft:"auto"
                                }}
                            >
                                LIVE
                            </Tag>

                        </div>

                        <div
                            style={{
                                color:"#DCE8F4",
                                lineHeight:1.9,
                                fontSize:15,
                                whiteSpace:"pre-line",
                                minHeight:180
                            }}
                        >

                            {displayed}

                            {

                                typing &&

                                <span
                                    style={{
                                        color:"#00E676",
                                        marginLeft:3
                                    }}
                                >
                                    ▋
                                </span>

                            }

                        </div>

                    </div>

                </Col>
                                {/* RIGHT PANEL */}

                <Col xs={24} lg={8}>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 18
                        }}
                    >

                        {/* Confidence */}

                        <div
                            style={{
                                background: "#16253B",
                                border: "1px solid #29405C",
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

                                <span style={{ color: "#8EA9CC" }}>
                                    AI Confidence
                                </span>

                                <b
                                    style={{
                                        color: "#00E676"
                                    }}
                                >
                                    {response.confidence}%
                                </b>

                            </div>

                            <Progress
                                percent={response.confidence}
                                showInfo={false}
                                strokeColor="#00E676"
                                style={{ marginTop: 10 }}
                            />

                        </div>

                        {/* Asset */}

                        <div
                            style={{
                                background: "#16253B",
                                border: "1px solid #29405C",
                                borderRadius: 10,
                                padding: 18
                            }}
                        >

                            <Space>

                                <DeploymentUnitOutlined
                                    style={{
                                        color: "#2D7CFF",
                                        fontSize: 20
                                    }}
                                />

                                <div>

                                    <div
                                        style={{
                                            color: "#8EA9CC"
                                        }}
                                    >
                                        Highest Risk Asset
                                    </div>

                                    <div
                                        style={{
                                            color: "#FFF",
                                            fontWeight: 700,
                                            fontSize: 17
                                        }}
                                    >
                                        {response.asset}
                                    </div>

                                </div>

                            </Space>

                        </div>

                        {/* MITRE */}

                        <div
                            style={{
                                background: "#16253B",
                                border: "1px solid #29405C",
                                borderRadius: 10,
                                padding: 18
                            }}
                        >

                            <Space>

                                <NodeIndexOutlined
                                    style={{
                                        color: "#A855F7",
                                        fontSize: 20
                                    }}
                                />

                                <div>

                                    <div
                                        style={{
                                            color: "#8EA9CC"
                                        }}
                                    >
                                        MITRE Technique
                                    </div>

                                    <div
                                        style={{
                                            color: "#FFF",
                                            fontWeight: 700,
                                            fontSize: 17
                                        }}
                                    >
                                        {response.mitre}
                                    </div>

                                </div>

                            </Space>

                        </div>

                        {/* Verdict */}

                        <div
                            style={{
                                background: "#16253B",
                                border: "1px solid #29405C",
                                borderRadius: 10,
                                padding: 18
                            }}
                        >

                            <Space>

                                <WarningOutlined
                                    style={{
                                        color: "#FA8C16",
                                        fontSize: 20
                                    }}
                                />

                                <div>

                                    <div
                                        style={{
                                            color: "#8EA9CC"
                                        }}
                                    >
                                        AI Verdict
                                    </div>

                                    <div
                                        style={{
                                            color: "#FFF",
                                            fontWeight: 700,
                                            fontSize: 17
                                        }}
                                    >
                                        {response.verdict}
                                    </div>

                                </div>

                            </Space>

                        </div>

                        {/* Recommendation */}

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
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    marginBottom: 10
                                }}
                            >

                                <BulbOutlined
                                    style={{
                                        color: "#00E676"
                                    }}
                                />

                                <b
                                    style={{
                                        color: "#FFF"
                                    }}
                                >
                                    AI Recommendation
                                </b>

                            </div>

                            <div
                                style={{
                                    color: "#DCE8F4",
                                    lineHeight: 1.8
                                }}
                            >
                                {response.recommendation}
                            </div>

                        </div>

                    </div>

                </Col>

            </Row>

            <style>

                {`

textarea::placeholder{

color:#7E95AF !important;

}

.ant-input{

background:#16253B !important;

color:white !important;

}

.ant-input:focus{

border-color:#00E676 !important;

box-shadow:none !important;

}

`}

            </style>

        </EnterpriseCard>

    );

}