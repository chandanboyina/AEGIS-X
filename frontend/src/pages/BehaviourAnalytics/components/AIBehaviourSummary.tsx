import { useEffect, useState } from "react";

import {
    Progress,
    Tag
} from "antd";

import {
    RobotOutlined,
    SafetyCertificateOutlined,
    UserOutlined,
    WarningOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

const users=[

    "Administrator",

    "Cloud Admin",

    "Finance User",

    "John Smith",

    "Sarah Wilson",

    "HR Manager",

    "Azure Admin"

];

const threats=[

    "Privilege Escalation",

    "Credential Abuse",

    "Impossible Travel",

    "Lateral Movement",

    "Service Account Abuse",

    "PowerShell Execution",

    "Data Exfiltration"

];

const predictions=[

    "Attempt Domain Controller Access",

    "Target SQL Database",

    "Steal Additional Credentials",

    "Expand Privileged Session",

    "Move Towards Backup Server",

    "Access Sensitive Financial Data"

];

const actions=[

    "Disable Privileged Session",

    "Force Password Reset",

    "Isolate Endpoint",

    "Block VPN Access",

    "Require MFA Reauthentication",

    "Notify SOC Immediately"

];

export default function AIBehaviourSummary(){

    const [confidence,setConfidence]=useState(98);

    const [risk,setRisk]=useState(91);

    const [user,setUser]=useState(users[0]);

    const [threat,setThreat]=useState(threats[0]);

    const [prediction,setPrediction]=useState(predictions[0]);

    const [action,setAction]=useState(actions[0]);

    useEffect(()=>{

        const timer=setInterval(()=>{

            setConfidence(

                random(95,99)

            );

            setRisk(

                random(82,98)

            );

            setUser(

                users[random(0,users.length-1)]

            );

            setThreat(

                threats[random(0,threats.length-1)]

            );

            setPrediction(

                predictions[random(0,predictions.length-1)]

            );

            setAction(

                actions[random(0,actions.length-1)]

            );

        },5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle AI Executive Behaviour Summary"
            height={1500}
        >

            {/* Oracle AI Confidence */}

            <div
                style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    marginBottom:24
                }}
            >

                <Progress
                    type="circle"
                    percent={confidence}
                    width={180}
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
                                {confidence}%
                            </div>

                            <div
                                style={{
                                    color:"#8EA9CC",
                                    fontSize:12
                                }}
                            >
                                AI Confidence
                            </div>

                        </div>

                    )}
                />

                <div
                    style={{
                        marginTop:18,
                        color:"#00E676",
                        fontSize:18,
                        fontWeight:700
                    }}
                >
                    Oracle Executive AI
                </div>

            </div>

            {/* Highest Risk User */}

            <div
                style={{
                    background:"#16253B",
                    border:"1px solid #2A415D",
                    borderRadius:12,
                    padding:18,
                    marginBottom:18
                }}
            >

                <div
                    style={{
                        display:"flex",
                        alignItems:"center",
                        gap:10,
                        marginBottom:10
                    }}
                >

                    <UserOutlined
                        style={{
                            color:"#FF4D4F",
                            fontSize:18
                        }}
                    />

                    <span
                        style={{
                            color:"#8EA9CC"
                        }}
                    >
                        Highest Risk Identity
                    </span>

                </div>

                <div
                    style={{
                        color:"#FFFFFF",
                        fontWeight:700,
                        fontSize:22
                    }}
                >
                    {user}
                </div>

            </div>

            {/* Behaviour Threat */}

            <div
                style={{
                    background:"#16253B",
                    border:"1px solid #2A415D",
                    borderRadius:12,
                    padding:18,
                    marginBottom:18
                }}
            >

                <div
                    style={{
                        display:"flex",
                        alignItems:"center",
                        gap:10,
                        marginBottom:10
                    }}
                >

                    <WarningOutlined
                        style={{
                            color:"#FA8C16",
                            fontSize:18
                        }}
                    />

                    <span
                        style={{
                            color:"#8EA9CC"
                        }}
                    >
                        Primary Behaviour Threat
                    </span>

                </div>

                <div
                    style={{
                        color:"#FFFFFF",
                        fontWeight:700,
                        fontSize:20
                    }}
                >
                    {threat}
                </div>

            </div>

            {/* Predicted Next Action */}

            <div
                style={{
                    background:"#102033",
                    borderLeft:"4px solid #1677FF",
                    borderRadius:12,
                    padding:18,
                    marginBottom:18
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

                    Oracle AI predicts the attacker will

                    <b
                        style={{
                            color:"#FFFFFF"
                        }}
                    >
                        {" "}
                        {prediction}
                    </b>

                    {" "}within the next few minutes based on
                    identity behaviour correlation,
                    authentication anomalies and endpoint
                    telemetry.

                </div>

            </div>

            {/* Recommended Action */}

            <div
                style={{
                    background:"#16253B",
                    border:"1px solid #2A415D",
                    borderRadius:12,
                    padding:18,
                    marginBottom:18
                }}
            >

                <div
                    style={{
                        display:"flex",
                        alignItems:"center",
                        gap:10,
                        marginBottom:10
                    }}
                >

                    <SafetyCertificateOutlined
                        style={{
                            color:"#00E676",
                            fontSize:18
                        }}
                    />

                    <span
                        style={{
                            color:"#8EA9CC"
                        }}
                    >
                        Recommended Response
                    </span>

                </div>

                <Tag
                    color="green"
                    style={{
                        fontSize:14,
                        padding:"6px 12px"
                    }}
                >
                    {action}
                </Tag>

            </div>

            {/* Behaviour Risk */}

            <div
                style={{
                    background:"#16253B",
                    border:"1px solid #2A415D",
                    borderRadius:12,
                    padding:18
                }}
            >

                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between"
                    }}
                >

                    <span
                        style={{
                            color:"#8EA9CC"
                        }}
                    >
                        Overall Behaviour Risk
                    </span>

                    <span
                        style={{
                            color:"#FF4D4F",
                            fontWeight:700
                        }}
                    >
                        {risk}%
                    </span>

                </div>

                <Progress
                    percent={risk}
                    showInfo={false}
                    strokeColor="#FF4D4F"
                    style={{
                        marginTop:12
                    }}
                />

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
                        marginBottom:12
                    }}
                >
                    Oracle AI Executive Decision
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.9
                    }}
                >

                    Oracle AI recommends immediate containment of the
                    identified privileged identity before behavioural
                    anomalies progress into enterprise-wide lateral
                    movement. Based on historical attack chains,
                    behavioural baselines and UEBA correlation, the
                    current risk remains elevated. Immediate analyst
                    validation and automated response are recommended.

                </div>

            </div>

            {/* Executive Summary */}

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
                        fontWeight:700,
                        fontSize:17,
                        marginBottom:18
                    }}
                >
                    Executive Summary
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
                            Oracle AI Confidence
                        </span>

                        <span
                            style={{
                                color:"#00E676",
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
                            Highest Risk Identity
                        </span>

                        <span
                            style={{
                                color:"#FFFFFF",
                                fontWeight:700
                            }}
                        >
                            {user}
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >

                        <span style={{color:"#8EA9CC"}}>
                            Current Behaviour Risk
                        </span>

                        <span
                            style={{
                                color:"#FF4D4F",
                                fontWeight:700
                            }}
                        >
                            {risk}%
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >

                        <span style={{color:"#8EA9CC"}}>
                            Oracle AI Status
                        </span>

                        <span
                            style={{
                                color:"#00E676",
                                fontWeight:700
                            }}
                        >
                            MONITORING
                        </span>

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

                <div>

                    <div
                        style={{
                            color:"#00E676",
                            fontWeight:700,
                            fontSize:16
                        }}
                    >
                        Oracle Executive Behaviour Engine
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13
                        }}
                    >
                        Delivering executive-level behavioural
                        intelligence by continuously correlating
                        identity activity, UEBA signals and
                        enterprise telemetry into actionable
                        security decisions.

                    </div>

                </div>

                <div
                    style={{
                        display:"flex",
                        alignItems:"center",
                        gap:8
                    }}
                >

                    <span className="liveDot"/>

                    <span
                        style={{
                            color:"#FFFFFF",
                            fontWeight:700
                        }}
                    >
                        LIVE
                    </span>

                </div>

            </div>

            <style>

{`

.liveDot{

width:12px;

height:12px;

border-radius:50%;

background:#00E676;

box-shadow:0 0 14px #00E676;

animation:livePulse 1.5s infinite;

}

.ant-progress-circle-path{

animation:ringGlow 4s linear infinite;

}

@keyframes livePulse{

0%{

transform:scale(.9);

opacity:.7;

}

50%{

transform:scale(1.35);

opacity:1;

box-shadow:0 0 22px #00E676;

}

100%{

transform:scale(.9);

opacity:.7;

}

}

@keyframes ringGlow{

0%{

filter:drop-shadow(0 0 3px #00E676);

}

50%{

filter:drop-shadow(0 0 12px #00E676);

}

100%{

filter:drop-shadow(0 0 3px #00E676);

}

}

`}

            </style>

        </EnterpriseCard>

    );

}