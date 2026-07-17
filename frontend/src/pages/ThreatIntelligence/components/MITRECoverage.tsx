import { useEffect, useState } from "react";
import {
    Tag,
    Progress
} from "antd";

import {
    SecurityScanOutlined,
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Technique{

    tactic:string;

    coverage:number;

    detected:number;

    risk:"LOW"|"MEDIUM"|"HIGH";

}

const tactics=[

    "Initial Access",

    "Execution",

    "Persistence",

    "Privilege Escalation",

    "Defense Evasion",

    "Credential Access",

    "Discovery",

    "Lateral Movement",

    "Collection",

    "Exfiltration",

    "Impact"

];

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function buildCoverage():Technique[]{

    return Array.from({ length: 20 }, (_, i) => {

        const tactic = tactics[i % tactics.length];

        return {

            tactic,

            coverage: random(75,100),

            detected: random(4,28),

            risk:
                random(0,2)===0
                ? "LOW"
                : random(0,1)===0
                ? "MEDIUM"
                : "HIGH"

        };

    });

}

export default function MITRECoverage(){

    const [coverage,setCoverage]=useState<Technique[]>(

        buildCoverage()

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            setCoverage(

                buildCoverage()

            );

        },7000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="MITRE ATT&CK Coverage"
            height={1000}
        >

            <div
                className="mitreScroll"
                style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:16,
                    maxHeight:460,
                    overflowY:"auto",
                    paddingRight:8
                }}
            >

                {

                    coverage.map(item=>(

                        <div
                            key={item.tactic}
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
                                        {item.tactic}
                                    </div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            marginTop:4,
                                            fontSize:13
                                        }}
                                    >
                                        {item.detected} Techniques Detected
                                    </div>

                                </div>

                                <Tag
                                    color={
                                        item.risk==="HIGH"

                                        ?"red"

                                        :item.risk==="MEDIUM"

                                        ?"orange"

                                        :"green"
                                    }
                                >
                                    {item.risk}
                                </Tag>

                            </div>

                            <div
                                style={{
                                    marginTop:16
                                }}
                            >

                                <Progress
                                    percent={item.coverage}
                                    strokeColor={
                                        item.coverage>=95

                                        ?"#00E676"

                                        :item.coverage>=85

                                        ?"#2D7CFF"

                                        :"#FA8C16"
                                    }
                                    showInfo={false}
                                />

                            </div>

                            <div
                                style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    marginTop:10
                                }}
                            >

                                <span
                                    style={{
                                        color:"#8EA9CC"
                                    }}
                                >
                                    Oracle Coverage
                                </span>

                                <span
                                    style={{
                                        color:"#FFFFFF",
                                        fontWeight:700
                                    }}
                                >
                                    {item.coverage}%
                                </span>

                            </div>

                        </div>

                    ))

                }

            </div>

            {/* Oracle AI Insight */}

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
                        display:"flex",
                        alignItems:"center",
                        gap:10,
                        marginBottom:12
                    }}
                >

                    <SecurityScanOutlined
                        style={{
                            color:"#00E676",
                            fontSize:20
                        }}
                    />

                    <span
                        style={{
                            color:"#FFFFFF",
                            fontWeight:700
                        }}
                    >
                        Oracle AI MITRE Analysis
                    </span>

                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >

                    Oracle AI continuously maps enterprise telemetry
                    against the MITRE ATT&CK framework. Coverage exceeds
                    95% across critical tactics, enabling rapid
                    identification of adversary techniques and automated
                    playbook selection.

                </div>

            </div>
                        {/* Coverage Summary */}

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
                    ATT&CK Coverage Summary
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
                            Techniques Covered
                        </span>

                        <span
                            style={{
                                color:"#00E676",
                                fontWeight:700
                            }}
                        >
                            {coverage.length}
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >

                        <span style={{color:"#8EA9CC"}}>
                            High Risk Tactics
                        </span>

                        <span
                            style={{
                                color:"#FF4D4F",
                                fontWeight:700
                            }}
                        >
                            {
                                coverage.filter(
                                    x=>x.risk==="HIGH"
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
                            Average Coverage
                        </span>

                        <span
                            style={{
                                color:"#2D7CFF",
                                fontWeight:700
                            }}
                        >
                            {Math.round(
                                coverage.reduce(
                                    (sum,item)=>sum+item.coverage,
                                    0
                                )/coverage.length
                            )}%
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
                            OPTIMAL
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
                        Oracle MITRE Intelligence Engine
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13
                        }}
                    >
                        Continuously mapping enterprise telemetry to the
                        MITRE ATT&CK framework for advanced threat
                        detection and response.

                    </div>

                </div>

                <Tag
                    color="processing"
                    style={{
                        padding:"6px 14px",
                        fontSize:14
                    }}
                >
                    LIVE ATT&CK COVERAGE
                </Tag>

            </div>

            <style>
                {`

                .mitreScroll::-webkit-scrollbar{

                    width:8px;

                }

                .mitreScroll::-webkit-scrollbar-track{

                    background:#0F172A;

                    border-radius:20px;

                }

                .mitreScroll::-webkit-scrollbar-thumb{

                    background:#00E676;

                    border-radius:20px;

                }

                .mitreScroll::-webkit-scrollbar-thumb:hover{

                    background:#33FF99;

                }

                `}
                </style>

        </EnterpriseCard>

    );

}