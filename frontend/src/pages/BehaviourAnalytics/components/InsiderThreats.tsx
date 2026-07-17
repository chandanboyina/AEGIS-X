import { useEffect, useState } from "react";

import {
    Tag
} from "antd";

import {
    UserOutlined,
    WarningOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Threat{

    user:string;

    department:string;

    activity:string;

    confidence:number;

    severity:"LOW"|"MEDIUM"|"HIGH"|"CRITICAL";

}

const users=[

    "John Smith",

    "Sarah Wilson",

    "Cloud Admin",

    "Finance User",

    "Backup Operator",

    "HR Manager",

    "Administrator",

    "IT Support",

    "Azure Admin",

    "Contractor"

];

const departments=[

    "Finance",

    "IT",

    "Security",

    "SOC",

    "Cloud",

    "Operations",

    "HR"

];

const activities=[

    "Mass File Download",

    "Privilege Escalation",

    "Impossible Travel",

    "USB Data Copy",

    "Credential Dump",

    "PowerShell Abuse",

    "VPN Login",

    "Abnormal Login Time",

    "Sensitive File Access",

    "Lateral Movement"

];

const severityList=[

    "LOW",

    "MEDIUM",

    "HIGH",

    "CRITICAL"

] as const;

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function randomItem<T>(arr:readonly T[]):T{

    return arr[random(0,arr.length-1)];

}

function buildThreats():Threat[]{

    return Array.from({length:20},()=>({

        user:randomItem(users),

        department:randomItem(departments),

        activity:randomItem(activities),

        confidence:random(90,99),

        severity:randomItem(severityList)

    }));

}

export default function InsiderThreats(){

    const [threats,setThreats]=useState<Threat[]>(

        buildThreats()

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            setThreats(

                buildThreats()

            );

        },5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle AI Insider Threat Intelligence"
            height={900}
        >

            {/* Scrollable Threat Queue */}

            <div
                className="insiderScroll"
                style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:16,
                    maxHeight:430,
                    overflowY:"auto",
                    paddingRight:8
                }}
            >

                {

                    threats.map((threat,index)=>(

                        <div
                            key={index}
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderLeft:
                                    threat.severity==="CRITICAL"

                                    ?"5px solid #FF4D4F"

                                    :threat.severity==="HIGH"

                                    ?"5px solid #FA8C16"

                                    :threat.severity==="MEDIUM"

                                    ?"5px solid #1677FF"

                                    :"5px solid #00E676",

                                borderRadius:12,

                                padding:18
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
                                        display:"flex",
                                        alignItems:"center",
                                        gap:14
                                    }}
                                >

                                    <div
                                        style={{
                                            width:48,
                                            height:48,
                                            borderRadius:14,
                                            background:"#FF4D4F22",
                                            display:"flex",
                                            justifyContent:"center",
                                            alignItems:"center",
                                            color:"#FF4D4F",
                                            fontSize:22
                                        }}
                                    >

                                        <UserOutlined/>

                                    </div>

                                    <div>

                                        <div
                                            style={{
                                                color:"#FFFFFF",
                                                fontWeight:700,
                                                fontSize:16
                                            }}
                                        >
                                            {threat.user}
                                        </div>

                                        <div
                                            style={{
                                                color:"#8EA9CC",
                                                marginTop:4,
                                                fontSize:13
                                            }}
                                        >
                                            {threat.department}
                                        </div>

                                    </div>

                                </div>

                                <Tag
                                    color={
                                        threat.severity==="CRITICAL"

                                        ?"red"

                                        :threat.severity==="HIGH"

                                        ?"orange"

                                        :threat.severity==="MEDIUM"

                                        ?"blue"

                                        :"green"
                                    }
                                >
                                    {threat.severity}
                                </Tag>

                            </div>

                            <div
                                style={{
                                    marginTop:18,
                                    display:"flex",
                                    justifyContent:"space-between",
                                    flexWrap:"wrap",
                                    rowGap:14
                                }}
                            >

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Suspicious Activity
                                    </div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            marginTop:5
                                        }}
                                    >
                                        {threat.activity}
                                    </div>

                                </div>

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Oracle AI Confidence
                                    </div>

                                    <div
                                        style={{
                                            color:"#00E676",
                                            fontWeight:700,
                                            fontSize:22,
                                            marginTop:4
                                        }}
                                    >
                                        {threat.confidence}%
                                    </div>

                                </div>

                            </div>

                            <div
                                style={{
                                    marginTop:18,
                                    background:"#102033",
                                    borderLeft:"4px solid #00E676",
                                    borderRadius:10,
                                    padding:14
                                }}
                            >

                                <div
                                    style={{
                                        display:"flex",
                                        alignItems:"center",
                                        gap:8,
                                        marginBottom:8
                                    }}
                                >

                                    <WarningOutlined
                                        style={{
                                            color:"#00E676"
                                        }}
                                    />

                                    <span
                                        style={{
                                            color:"#FFFFFF",
                                            fontWeight:700
                                        }}
                                    >
                                        Oracle AI Investigation
                                    </span>

                                </div>

                                <div
                                    style={{
                                        color:"#DCE8F4",
                                        lineHeight:1.8
                                    }}
                                >

                                    Oracle AI has identified behavioural
                                    deviations that significantly differ
                                    from the user's historical baseline.
                                    The activity has been correlated with
                                    UEBA models and insider threat
                                    indicators. Continuous monitoring and
                                    analyst review are recommended.

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>
                        {/* Insider Threat Summary */}

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
                    Insider Threat Summary
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
                            Active Investigations
                        </span>

                        <span
                            style={{
                                color:"#FFFFFF",
                                fontWeight:700
                            }}
                        >
                            {threats.length}
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >
                        <span style={{color:"#8EA9CC"}}>
                            Critical Threats
                        </span>

                        <span
                            style={{
                                color:"#FF4D4F",
                                fontWeight:700
                            }}
                        >
                            {
                                threats.filter(
                                    t=>t.severity==="CRITICAL"
                                ).length
                            }
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >
                        <span style={{color:"#8EA9CC"}}>
                            High Severity
                        </span>

                        <span
                            style={{
                                color:"#FA8C16",
                                fontWeight:700
                            }}
                        >
                            {
                                threats.filter(
                                    t=>t.severity==="HIGH"
                                ).length
                            }
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >
                        <span style={{color:"#8EA9CC"}}>
                            Average AI Confidence
                        </span>

                        <span
                            style={{
                                color:"#00E676",
                                fontWeight:700
                            }}
                        >
                            {

                                Math.round(

                                    threats.reduce(

                                        (sum,item)=>

                                            sum+item.confidence,

                                        0

                                    )/threats.length

                                )

                            }%

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
                            ACTIVE
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
                        Oracle Insider Threat Engine
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13
                        }}
                    >
                        Continuously correlating user behaviour,
                        identity activity, privileged access,
                        endpoint telemetry and historical
                        behavioural patterns to detect insider
                        threats before compromise.

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

.insiderScroll::-webkit-scrollbar{

width:8px;

}

.insiderScroll::-webkit-scrollbar-track{

background:#0F172A;

border-radius:20px;

}

.insiderScroll::-webkit-scrollbar-thumb{

background:#FF4D4F;

border-radius:20px;

}

.insiderScroll::-webkit-scrollbar-thumb:hover{

background:#FF7875;

}

.liveDot{

width:12px;

height:12px;

border-radius:50%;

background:#00E676;

box-shadow:0 0 14px #00E676;

animation:livePulse 1.5s infinite;

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

`}

            </style>

        </EnterpriseCard>

    );

}