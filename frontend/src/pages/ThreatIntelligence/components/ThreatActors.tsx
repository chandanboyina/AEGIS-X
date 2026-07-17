import { useEffect, useState } from "react";
import {
    Tag
} from "antd";

import {
    UserOutlined,
    GlobalOutlined,
    ThunderboltOutlined,
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface ThreatActor{

    name:string;

    country:string;

    target:string;

    confidence:number;

    severity:"LOW"|"MEDIUM"|"HIGH"|"CRITICAL";

}

const actorNames=[

    "APT29",

    "Lazarus",

    "APT41",

    "Volt Typhoon",

    "Sandworm",

    "FIN7",

    "Mustang Panda",

    "LockBit Group"

];

const countries=[

    "Russia",

    "China",

    "North Korea",

    "Iran",

    "Unknown"

];

const targets=[

    "Government",

    "Banking",

    "Healthcare",

    "Power Grid",

    "Telecom",

    "Cloud",

    "Defense"

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

function generateActors():ThreatActor[]{

    return Array.from({length:20},(_,index)=>({

        name:actorNames[index % actorNames.length],

        country:randomItem(countries),

        target:randomItem(targets),

        confidence:random(92,99),

        severity:randomItem(severityList)

    }));

}

export default function ThreatActors(){

    const [actors,setActors]=useState<ThreatActor[]>(

        generateActors()

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            setActors(generateActors());

        },7000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle Threat Actor Intelligence"
            height={830}
        >

            <div
                className="actorScroll"
                style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:16,
                    maxHeight:420,
                    overflowY:"auto",
                    paddingRight:8
                }}
            >

                {

                    actors.map((actor,index)=>(

                        <div
                            key={index}
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderLeft:
                                    actor.severity==="CRITICAL"

                                    ?"5px solid #FF4D4F"

                                    :actor.severity==="HIGH"

                                    ?"5px solid #FA8C16"

                                    :actor.severity==="MEDIUM"

                                    ?"5px solid #2D7CFF"

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
                                        gap:12
                                    }}
                                >

                                    <div
                                        style={{
                                            width:48,
                                            height:48,
                                            borderRadius:12,
                                            background:"#FF4D4F22",
                                            display:"flex",
                                            alignItems:"center",
                                            justifyContent:"center",
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
                                                fontSize:17
                                            }}
                                        >
                                            {actor.name}
                                        </div>

                                        <div
                                            style={{
                                                color:"#8EA9CC",
                                                marginTop:4,
                                                fontSize:13
                                            }}
                                        >
                                            Advanced Persistent Threat
                                        </div>

                                    </div>

                                </div>

                                <Tag
                                    color={
                                        actor.severity==="CRITICAL"

                                        ?"red"

                                        :actor.severity==="HIGH"

                                        ?"orange"

                                        :actor.severity==="MEDIUM"

                                        ?"blue"

                                        :"green"
                                    }
                                >
                                    {actor.severity}
                                </Tag>

                            </div>

                            <div
                                style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    marginTop:20
                                }}
                            >

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Origin
                                    </div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            marginTop:6,
                                            display:"flex",
                                            alignItems:"center",
                                            gap:6
                                        }}
                                    >

                                        <GlobalOutlined/>

                                        {actor.country}

                                    </div>

                                </div>

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Primary Target
                                    </div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            marginTop:6
                                        }}
                                    >
                                        {actor.target}
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
                                            fontSize:24,
                                            fontWeight:700,
                                            marginTop:4
                                        }}
                                    >
                                        {actor.confidence}%
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

                                    <ThunderboltOutlined
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
                                        Oracle AI Assessment
                                    </span>

                                </div>

                                <div
                                    style={{
                                        color:"#DCE8F4",
                                        lineHeight:1.8
                                    }}
                                >

                                    Oracle AI has correlated this threat actor
                                    with recent enterprise telemetry, historical
                                    campaigns and MITRE ATT&CK techniques.
                                    Continuous monitoring is recommended.

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>
                        {/* Intelligence Summary */}

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
                    Threat Actor Summary
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
                            Active Threat Actors
                        </span>

                        <span
                            style={{
                                color:"#FFFFFF",
                                fontWeight:700
                            }}
                        >
                            {actors.length}
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >

                        <span style={{color:"#8EA9CC"}}>
                            Critical Campaigns
                        </span>

                        <span
                            style={{
                                color:"#FF4D4F",
                                fontWeight:700
                            }}
                        >
                            {
                                actors.filter(
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
                                actors.filter(
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
                            {Math.round(
                                actors.reduce(
                                    (sum,item)=>sum+item.confidence,
                                    0
                                )/actors.length
                            )}%
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
                        Oracle Threat Actor Intelligence
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13
                        }}
                    >
                        Monitoring nation-state groups, ransomware operators,
                        financially motivated attackers and emerging APT
                        campaigns in real time.

                    </div>

                </div>

                <Tag
                    color="processing"
                    style={{
                        padding:"6px 14px",
                        fontSize:14
                    }}
                >
                    LIVE THREAT ACTORS
                </Tag>

            </div>

            <style>
            {`

            .actorScroll::-webkit-scrollbar{

                width:8px;

            }

            .actorScroll::-webkit-scrollbar-track{

                background:#0F172A;

                border-radius:20px;

            }

            .actorScroll::-webkit-scrollbar-thumb{

                background:#FF4D4F;

                border-radius:20px;

            }

            .actorScroll::-webkit-scrollbar-thumb:hover{

                background:#FF7875;

            }

            `}
            </style>

        </EnterpriseCard>

    );

}