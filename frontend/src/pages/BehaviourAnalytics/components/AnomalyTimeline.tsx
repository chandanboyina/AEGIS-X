import { useEffect, useState } from "react";

import {
    Tag
} from "antd";

import {
    WarningOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Event{

    time:string;

    event:string;

    user:string;

    technique:string;

    confidence:number;

    severity:"LOW"|"MEDIUM"|"HIGH"|"CRITICAL";

}

const events=[

    "Impossible Travel",

    "Privilege Escalation",

    "Credential Dump",

    "PowerShell Execution",

    "Mass File Access",

    "VPN Login",

    "Lateral Movement",

    "Remote Session",

    "Kerberoasting",

    "Service Account Abuse"

];

const users=[

    "John Smith",

    "Sarah Wilson",

    "Administrator",

    "Finance-PC",

    "HR-Laptop",

    "Azure Admin",

    "Backup Server",

    "Cloud Admin"

];

const techniques=[

    "T1078",

    "T1059",

    "T1003",

    "T1021",

    "T1098",

    "T1110",

    "T1087",

    "T1558"

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

function currentTime(){

    const now=new Date();

    return now.toLocaleTimeString([],{

        hour:"2-digit",

        minute:"2-digit",

        second:"2-digit"

    });

}

function buildTimeline():Event[]{

    return Array.from({length:18},()=>({

        time:currentTime(),

        event:randomItem(events),

        user:randomItem(users),

        technique:randomItem(techniques),

        confidence:random(90,99),

        severity:randomItem(severityList)

    }));

}

export default function AnomalyTimeline(){

    const [timeline,setTimeline]=useState<Event[]>(

        buildTimeline()

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            setTimeline(

                buildTimeline()

            );

        },5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle AI Behaviour Timeline"
            height={900}
        >

            {/* Scrollable Timeline */}

            <div
                className="timelineScroll"
                style={{
                    maxHeight:430,
                    overflowY:"auto",
                    paddingRight:8
                }}
            >

                {

                    timeline.map((item,index)=>(

                        <div
                            key={index}
                            style={{
                                display:"flex",
                                gap:18,
                                marginBottom:22
                            }}
                        >

                            {/* Timeline */}

                            <div
                                style={{
                                    display:"flex",
                                    flexDirection:"column",
                                    alignItems:"center"
                                }}
                            >

                                <div
                                    className="timelineDot"
                                    style={{
                                        background:
                                            item.severity==="CRITICAL"

                                            ? "#FF4D4F"

                                            : item.severity==="HIGH"

                                            ? "#FA8C16"

                                            : item.severity==="MEDIUM"

                                            ? "#1677FF"

                                            : "#00E676"
                                    }}
                                />

                                {

                                    index!==timeline.length-1 && (

                                        <div
                                            className="timelineLine"
                                        />

                                    )

                                }

                            </div>

                            {/* Card */}

                            <div
                                style={{
                                    flex:1,
                                    background:"#16253B",
                                    border:"1px solid #2A415D",
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
                                                fontSize:16
                                            }}
                                        >
                                            {item.event}
                                        </div>

                                        <div
                                            style={{
                                                color:"#8EA9CC",
                                                marginTop:5,
                                                fontSize:13
                                            }}
                                        >
                                            {item.time}
                                        </div>

                                    </div>

                                    <Tag
                                        color={
                                            item.severity==="CRITICAL"

                                            ?"red"

                                            :item.severity==="HIGH"

                                            ?"orange"

                                            :item.severity==="MEDIUM"

                                            ?"blue"

                                            :"green"
                                        }
                                    >
                                        {item.severity}
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
                                            User
                                        </div>

                                        <div
                                            style={{
                                                color:"#FFFFFF",
                                                marginTop:5
                                            }}
                                        >
                                            {item.user}
                                        </div>

                                    </div>

                                    <div>

                                        <div
                                            style={{
                                                color:"#8EA9CC",
                                                fontSize:12
                                            }}
                                        >
                                            MITRE
                                        </div>

                                        <div
                                            style={{
                                                color:"#FA8C16",
                                                marginTop:5,
                                                fontWeight:700
                                            }}
                                        >
                                            {item.technique}
                                        </div>

                                    </div>

                                    <div>

                                        <div
                                            style={{
                                                color:"#8EA9CC",
                                                fontSize:12
                                            }}
                                        >
                                            AI Confidence
                                        </div>

                                        <div
                                            style={{
                                                color:"#00E676",
                                                marginTop:5,
                                                fontWeight:700
                                            }}
                                        >
                                            {item.confidence}%
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
                                            Oracle AI Observation
                                        </span>

                                    </div>

                                    <div
                                        style={{
                                            color:"#DCE8F4",
                                            lineHeight:1.8
                                        }}
                                    >

                                        Oracle AI detected abnormal behavioural
                                        activity correlated with historical
                                        attack patterns and UEBA telemetry.
                                        Continuous monitoring has been enabled.

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>
                        {/* Timeline Summary */}

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
                    Behaviour Timeline Summary
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
                            Events Analysed
                        </span>

                        <span
                            style={{
                                color:"#FFFFFF",
                                fontWeight:700
                            }}
                        >
                            {timeline.length}
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >
                        <span style={{color:"#8EA9CC"}}>
                            Critical Events
                        </span>

                        <span
                            style={{
                                color:"#FF4D4F",
                                fontWeight:700
                            }}
                        >
                            {
                                timeline.filter(
                                    x=>x.severity==="CRITICAL"
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
                                timeline.filter(
                                    x=>x.severity==="HIGH"
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

                                    timeline.reduce(
                                        (sum,item)=>

                                            sum+item.confidence,

                                        0

                                    )/timeline.length

                                )
                            }%
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
                        Continuously correlating user behaviour,
                        endpoint telemetry and identity events
                        to predict insider threats before
                        compromise occurs.

                    </div>

                </div>

                <Tag
                    color="processing"
                    style={{
                        padding:"6px 14px",
                        fontSize:14
                    }}
                >
                    LIVE TIMELINE
                </Tag>

            </div>

            <style>

{`

.timelineScroll::-webkit-scrollbar{

width:8px;

}

.timelineScroll::-webkit-scrollbar-track{

background:#0F172A;

border-radius:20px;

}

.timelineScroll::-webkit-scrollbar-thumb{

background:#1677FF;

border-radius:20px;

}

.timelineScroll::-webkit-scrollbar-thumb:hover{

background:#4096FF;

}

.timelineDot{

width:16px;

height:16px;

border-radius:50%;

box-shadow:0 0 14px currentColor;

animation:timelinePulse 2s infinite;

}

.timelineLine{

width:3px;

height:120px;

background:linear-gradient(

180deg,

#2D7CFF,

#00E676

);

margin-top:4px;

opacity:.8;

}

@keyframes timelinePulse{

0%{

transform:scale(1);

}

50%{

transform:scale(1.35);

box-shadow:0 0 24px currentColor;

}

100%{

transform:scale(1);

}

}

`}

            </style>

        </EnterpriseCard>

    );

}