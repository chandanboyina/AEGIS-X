import { useEffect, useState } from "react";
import {
    Tag
} from "antd";

import {
    BugOutlined,
    //WarningOutlined,
    SafetyCertificateOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface CVE{

    id:string;

    severity:"LOW"|"MEDIUM"|"HIGH"|"CRITICAL";

    cvss:number;

    asset:string;

    status:"UNPATCHED"|"PATCHING"|"PATCHED";

}

const assets=[

    "Government Cloud",

    "VPN Gateway",

    "Power Grid",

    "Domain Controller",

    "SQL Database",

    "Email Gateway",

    "Firewall",

    "Kubernetes Cluster"

];

const severities=[

    "LOW",

    "MEDIUM",

    "HIGH",

    "CRITICAL"

] as const;

const statusList=[

    "UNPATCHED",

    "PATCHING",

    "PATCHED"

] as const;

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function randomItem<T>(arr:readonly T[]):T{

    return arr[random(0,arr.length-1)];

}

function generateFeed():CVE[]{

    return Array.from({length:15},(_,)=>({

        id:`CVE-2026-${random(1000,9999)}`,

        severity:randomItem(severities),

        cvss:Number((7+Math.random()*3).toFixed(1)),

        asset:randomItem(assets),

        status:randomItem(statusList)

    }));

}

export default function CVEFeed(){

    const [feed,setFeed]=useState<CVE[]>(

        generateFeed()

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            setFeed(

                generateFeed()

            );

        },7000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Live CVE Intelligence Feed"
            height={1000}
        >

            <div
                style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:16,
                    maxHeight:420,
                    overflowY:"auto",
                    paddingRight:8
                }}
                className="cveScroll"
            >

                {

                    feed.map(cve=>(

                        <div
                            key={cve.id}
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderLeft:
                                    cve.severity==="CRITICAL"

                                    ?"5px solid #FF4D4F"

                                    :cve.severity==="HIGH"

                                    ?"5px solid #FA8C16"

                                    :cve.severity==="MEDIUM"

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

                                    <BugOutlined
                                        style={{
                                            color:"#FF4D4F",
                                            fontSize:24
                                        }}
                                    />

                                    <div>

                                        <div
                                            style={{
                                                color:"#FFFFFF",
                                                fontWeight:700,
                                                fontSize:17
                                            }}
                                        >
                                            {cve.id}
                                        </div>

                                        <div
                                            style={{
                                                color:"#8EA9CC",
                                                marginTop:4,
                                                fontSize:13
                                            }}
                                        >
                                            Affected Asset
                                        </div>

                                        <div
                                            style={{
                                                color:"#FFFFFF",
                                                marginTop:3
                                            }}
                                        >
                                            {cve.asset}
                                        </div>

                                    </div>

                                </div>

                                <Tag
                                    color={
                                        cve.severity==="CRITICAL"

                                        ?"red"

                                        :cve.severity==="HIGH"

                                        ?"orange"

                                        :cve.severity==="MEDIUM"

                                        ?"blue"

                                        :"green"
                                    }
                                >
                                    {cve.severity}
                                </Tag>

                            </div>

                            <div
                                style={{
                                    marginTop:18,
                                    display:"flex",
                                    justifyContent:"space-between",
                                    alignItems:"center"
                                }}
                            >

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        CVSS Score
                                    </div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            fontSize:26,
                                            fontWeight:700,
                                            marginTop:5
                                        }}
                                    >
                                        {cve.cvss}
                                    </div>

                                </div>

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Patch Status
                                    </div>

                                    <Tag
                                        color={
                                            cve.status==="PATCHED"

                                            ?"green"

                                            :cve.status==="PATCHING"

                                            ?"processing"

                                            :"red"
                                        }
                                        style={{
                                            marginTop:8
                                        }}
                                    >
                                        {cve.status}
                                    </Tag>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

            <div
                style={{
                    marginTop:22,
                    background:"#102033",
                    borderLeft:"4px solid #00E676",
                    borderRadius:10,
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

                    <SafetyCertificateOutlined
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
                        Oracle AI Recommendation
                    </span>

                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >

                    Oracle AI recommends prioritizing all Critical and High
                    severity vulnerabilities affecting enterprise-facing
                    infrastructure. Immediate remediation is advised for VPN
                    Gateway, Government Cloud and Domain Controller assets.

                </div>

            </div>
                        <div
                style={{
                    marginTop:22,
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}
            >

                <div
                    style={{
                        display:"flex",
                        flexDirection:"column",
                        gap:6
                    }}
                >

                    <div
                        style={{
                            color:"#8EA9CC",
                            fontSize:12
                        }}
                    >
                        Feed Status
                    </div>

                    <div
                        style={{
                            color:"#00E676",
                            fontWeight:700,
                            fontSize:16
                        }}
                    >
                        LIVE Vulnerability Intelligence
                    </div>

                </div>

                <Tag
                    color="processing"
                    style={{
                        padding:"6px 14px",
                        fontSize:14
                    }}
                >
                    AUTO REFRESH 7s
                </Tag>

            </div>

            <div
                style={{
                    marginTop:20,
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
                        marginBottom:14
                    }}
                >

                    <div
                        style={{
                            color:"#8EA9CC"
                        }}
                    >
                        Critical CVEs
                    </div>

                    <div
                        style={{
                            color:"#FF4D4F",
                            fontWeight:700
                        }}
                    >
                        {
                            feed.filter(
                                x=>x.severity==="CRITICAL"
                            ).length
                        }
                    </div>

                </div>

                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between",
                        marginBottom:14
                    }}
                >

                    <div
                        style={{
                            color:"#8EA9CC"
                        }}
                    >
                        High Severity
                    </div>

                    <div
                        style={{
                            color:"#FA8C16",
                            fontWeight:700
                        }}
                    >
                        {
                            feed.filter(
                                x=>x.severity==="HIGH"
                            ).length
                        }
                    </div>

                </div>

                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between",
                        marginBottom:14
                    }}
                >

                    <div
                        style={{
                            color:"#8EA9CC"
                        }}
                    >
                        Patched Assets
                    </div>

                    <div
                        style={{
                            color:"#00E676",
                            fontWeight:700
                        }}
                    >
                        {
                            feed.filter(
                                x=>x.status==="PATCHED"
                            ).length
                        }
                    </div>

                </div>

                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between"
                    }}
                >

                    <div
                        style={{
                            color:"#8EA9CC"
                        }}
                    >
                        Under Remediation
                    </div>

                    <div
                        style={{
                            color:"#2D7CFF",
                            fontWeight:700
                        }}
                    >
                        {
                            feed.filter(
                                x=>x.status==="PATCHING"
                            ).length
                        }
                    </div>

                </div>

            </div>
            <style>
            {`

            .cveScroll::-webkit-scrollbar{

                width:8px;

            }

            .cveScroll::-webkit-scrollbar-track{

                background:#0F172A;

                border-radius:20px;

            }

            .cveScroll::-webkit-scrollbar-thumb{

                background:#2D7CFF;

                border-radius:20px;

            }

            .cveScroll::-webkit-scrollbar-thumb:hover{

                background:#4096FF;

            }

            `}
            </style>

        </EnterpriseCard>

    );

}