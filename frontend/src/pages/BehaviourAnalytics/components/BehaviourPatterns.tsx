import { useEffect, useState } from "react";

import {
    Tag
} from "antd";

import {
    BulbOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Pattern{

    name:string;

    reason:string;

    confidence:number;

    severity:"LOW"|"MEDIUM"|"HIGH"|"CRITICAL";

}

const patternNames=[

    "Impossible Travel",

    "Credential Stuffing",

    "Privilege Escalation",

    "Password Spray",

    "Service Account Abuse",

    "Kerberoasting",

    "Suspicious PowerShell",

    "VPN Anomaly",

    "Data Exfiltration",

    "Abnormal Login Time",

    "Lateral Movement",

    "Token Theft",

    "USB Data Copy",

    "Mass File Access",

    "Cloud Misconfiguration"

];

const reasons=[

    "Login from multiple countries",

    "Multiple failed authentication attempts",

    "Unusual administrator privileges",

    "Behaviour deviates from baseline",

    "Abnormal endpoint activity",

    "AI correlated multiple alerts",

    "Identity risk exceeded threshold",

    "Large volume of sensitive data accessed",

    "Repeated privileged operations",

    "Historical insider threat similarity"

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

function buildPatterns():Pattern[]{

    return Array.from({length:20},(_,index)=>({

        name:patternNames[index % patternNames.length],

        reason:randomItem(reasons),

        confidence:random(90,99),

        severity:randomItem(severityList)

    }));

}

export default function BehaviourPatterns(){

    const [patterns,setPatterns]=useState<Pattern[]>(

        buildPatterns()

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            setPatterns(

                buildPatterns()

            );

        },5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle AI Behaviour Pattern Intelligence"
            height={900}
        >

            {/* Scrollable Pattern Feed */}

            <div
                className="patternScroll"
                style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:16,
                    maxHeight:450,
                    overflowY:"auto",
                    paddingRight:8
                }}
            >

                {

                    patterns.map((pattern,index)=>(

                        <div
                            key={index}
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderLeft:
                                    pattern.severity==="CRITICAL"

                                    ?"5px solid #FF4D4F"

                                    :pattern.severity==="HIGH"

                                    ?"5px solid #FA8C16"

                                    :pattern.severity==="MEDIUM"

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

                                <div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            fontWeight:700,
                                            fontSize:17
                                        }}
                                    >
                                        {pattern.name}
                                    </div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            marginTop:5,
                                            fontSize:13
                                        }}
                                    >
                                        Oracle Behaviour Analytics
                                    </div>

                                </div>

                                <Tag
                                    color={
                                        pattern.severity==="CRITICAL"

                                        ?"red"

                                        :pattern.severity==="HIGH"

                                        ?"orange"

                                        :pattern.severity==="MEDIUM"

                                        ?"blue"

                                        :"green"
                                    }
                                >
                                    {pattern.severity}
                                </Tag>

                            </div>

                            <div
                                style={{
                                    marginTop:18,
                                    display:"flex",
                                    justifyContent:"space-between",
                                    flexWrap:"wrap",
                                    rowGap:12
                                }}
                            >

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Detection Reason
                                    </div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            marginTop:5
                                        }}
                                    >
                                        {pattern.reason}
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
                                            marginTop:5
                                        }}
                                    >
                                        {pattern.confidence}%
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

                                    <BulbOutlined
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
                                        Oracle AI Behaviour Insight
                                    </span>

                                </div>

                                <div
                                    style={{
                                        color:"#DCE8F4",
                                        lineHeight:1.8
                                    }}
                                >

                                    Oracle AI has correlated this
                                    behavioural pattern with historical
                                    enterprise activity and determined
                                    that it deviates significantly from
                                    the learned baseline. Continuous
                                    monitoring and analyst validation
                                    are recommended.

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>
                        {/* Behaviour Intelligence Summary */}

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
                    Behaviour Intelligence Summary
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
                            Patterns Analysed
                        </span>

                        <span
                            style={{
                                color:"#FFFFFF",
                                fontWeight:700
                            }}
                        >
                            {patterns.length}
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >

                        <span style={{color:"#8EA9CC"}}>
                            Critical Patterns
                        </span>

                        <span
                            style={{
                                color:"#FF4D4F",
                                fontWeight:700
                            }}
                        >
                            {
                                patterns.filter(
                                    p=>p.severity==="CRITICAL"
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
                            High Risk Patterns
                        </span>

                        <span
                            style={{
                                color:"#FA8C16",
                                fontWeight:700
                            }}
                        >
                            {
                                patterns.filter(
                                    p=>p.severity==="HIGH"
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

                                    patterns.reduce(

                                        (sum,item)=>

                                            sum+item.confidence,

                                        0

                                    )/patterns.length

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
                            LEARNING
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
                        Oracle Behaviour Intelligence Engine
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13
                        }}
                    >
                        Oracle AI continuously discovers new
                        behavioural patterns by learning from
                        enterprise identities, endpoint activity,
                        authentication events and historical attack
                        behaviour across the organization.

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

.patternScroll::-webkit-scrollbar{

width:8px;

}

.patternScroll::-webkit-scrollbar-track{

background:#0F172A;

border-radius:20px;

}

.patternScroll::-webkit-scrollbar-thumb{

background:#00E676;

border-radius:20px;

}

.patternScroll::-webkit-scrollbar-thumb:hover{

background:#33FF99;

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