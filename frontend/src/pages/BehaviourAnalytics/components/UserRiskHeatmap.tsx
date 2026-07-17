import { useEffect, useState } from "react";

import {
    Tag,
    Progress
} from "antd";

import {
    UserOutlined,
    SafetyCertificateOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface UserRisk{

    name:string;

    department:string;

    role:string;

    score:number;

    severity:"LOW"|"MEDIUM"|"HIGH"|"CRITICAL";

}

const names=[

    "John Smith",
    "Sarah Wilson",
    "David Miller",
    "Sophia Brown",
    "Michael Lee",
    "Emma Davis",
    "Daniel Clark",
    "Olivia White",
    "James Harris",
    "Benjamin Scott"

];

const departments=[

    "Finance",

    "HR",

    "IT",

    "Security",

    "Cloud",

    "Operations",

    "SOC"

];

const roles=[

    "Administrator",

    "Engineer",

    "Analyst",

    "Manager",

    "Contractor",

    "Developer"

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

function buildUsers():UserRisk[]{

    return Array.from({length:20},(_,index)=>({

        name:names[index % names.length],

        department:randomItem(departments),

        role:randomItem(roles),

        score:random(45,99),

        severity:randomItem(severityList)

    }));

}

export default function UserRiskHeatmap(){

    const [users,setUsers]=useState<UserRisk[]>(

        buildUsers()

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            setUsers(

                buildUsers()

            );

        },5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle AI User Risk Heatmap"
            height={1000}
        >

            {/* Scrollable User List */}

            <div
                className="riskScroll"
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

                    users.map((user,index)=>(

                        <div
                            key={index}
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderLeft:
                                    user.severity==="CRITICAL"

                                    ?"5px solid #FF4D4F"

                                    :user.severity==="HIGH"

                                    ?"5px solid #FA8C16"

                                    :user.severity==="MEDIUM"

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
                                        gap:14
                                    }}
                                >

                                    <div
                                        style={{
                                            width:48,
                                            height:48,
                                            borderRadius:14,
                                            background:"#2D7CFF22",
                                            display:"flex",
                                            alignItems:"center",
                                            justifyContent:"center",
                                            color:"#2D7CFF",
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
                                            {user.name}
                                        </div>

                                        <div
                                            style={{
                                                color:"#8EA9CC",
                                                marginTop:4,
                                                fontSize:13
                                            }}
                                        >
                                            {user.department} • {user.role}
                                        </div>

                                    </div>

                                </div>

                                <Tag
                                    color={
                                        user.severity==="CRITICAL"

                                        ?"red"

                                        :user.severity==="HIGH"

                                        ?"orange"

                                        :user.severity==="MEDIUM"

                                        ?"blue"

                                        :"green"
                                    }
                                >
                                    {user.severity}
                                </Tag>

                            </div>

                            <div
                                style={{
                                    marginTop:18
                                }}
                            >

                                <Progress
                                    percent={user.score}
                                    showInfo={false}
                                    strokeColor={
                                        user.score>=90

                                        ?"#FF4D4F"

                                        :user.score>=75

                                        ?"#FA8C16"

                                        :user.score>=60

                                        ?"#2D7CFF"

                                        :"#00E676"
                                    }
                                />

                                <div
                                    style={{
                                        display:"flex",
                                        justifyContent:"space-between",
                                        marginTop:8
                                    }}
                                >

                                    <span
                                        style={{
                                            color:"#8EA9CC"
                                        }}
                                    >
                                        Oracle Behaviour Risk
                                    </span>

                                    <span
                                        style={{
                                            color:"#FFFFFF",
                                            fontWeight:700
                                        }}
                                    >
                                        {user.score}%
                                    </span>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

            {/* Oracle AI Analysis */}

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
                        Oracle AI Behaviour Analysis
                    </span>

                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >

                    Oracle AI continuously evaluates every user,
                    correlating login patterns, privileged actions,
                    endpoint telemetry and behavioural anomalies.
                    High-risk identities are prioritized for
                    investigation before malicious activity occurs.

                </div>

            </div>
                        {/* Behaviour Summary */}

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
                    Behaviour Risk Summary
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
                            Monitored Users
                        </span>

                        <span
                            style={{
                                color:"#FFFFFF",
                                fontWeight:700
                            }}
                        >
                            {users.length}
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >

                        <span style={{color:"#8EA9CC"}}>
                            Critical Risk
                        </span>

                        <span
                            style={{
                                color:"#FF4D4F",
                                fontWeight:700
                            }}
                        >
                            {
                                users.filter(
                                    u=>u.severity==="CRITICAL"
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
                            High Risk
                        </span>

                        <span
                            style={{
                                color:"#FA8C16",
                                fontWeight:700
                            }}
                        >
                            {
                                users.filter(
                                    u=>u.severity==="HIGH"
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
                            Average Risk Score
                        </span>

                        <span
                            style={{
                                color:"#2D7CFF",
                                fontWeight:700
                            }}
                        >
                            {
                                Math.round(
                                    users.reduce(
                                        (sum,user)=>sum+user.score,
                                        0
                                    )/users.length
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
                        Oracle UEBA Intelligence Engine
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13
                        }}
                    >
                        Continuously learning user behaviour,
                        privilege usage, login activity and
                        identity anomalies using Oracle AI.

                    </div>

                </div>

                <Tag
                    color="processing"
                    style={{
                        padding:"6px 14px",
                        fontSize:14
                    }}
                >
                    LIVE UEBA
                </Tag>

            </div>

            <style>

            {`

.riskScroll::-webkit-scrollbar{

width:8px;

}

.riskScroll::-webkit-scrollbar-track{

background:#0F172A;

border-radius:20px;

}

.riskScroll::-webkit-scrollbar-thumb{

background:#2D7CFF;

border-radius:20px;

}

.riskScroll::-webkit-scrollbar-thumb:hover{

background:#4096FF;

}

`}

            </style>

        </EnterpriseCard>

    );

}