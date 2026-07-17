import { useEffect, useState } from "react";

import {
    Tag,
    Space,
    Badge
} from "antd";

import {
    //WarningOutlined,
    //ThunderboltOutlined,
    SafetyCertificateOutlined,
    RobotOutlined,
    ClockCircleOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../common/EnterpriseCard/EnterpriseCard";

interface Alert{

    id:number;

    severity:string;

    asset:string;

    title:string;

    confidence:number;

    eta:string;

}

const titles=[

"Privilege Escalation Detected",

"Credential Dumping Attempt",

"Suspicious PowerShell Activity",

"Lateral Movement Predicted",

"Ransomware Encryption Behaviour",

"Unusual Admin Login",

"Command & Control Communication",

"Mass Authentication Failure"

];

const assets=[

"Power Grid",

"Government Cloud",

"Healthcare",

"Banking",

"Airport Network",

"Telecom",

"Railways"

];

function createAlert(id:number):Alert{

    const confidence=90+Math.floor(Math.random()*10);

    const sev=Math.random();

    return{

        id,

        severity:

            sev>0.85

                ?"Critical"

                :sev>0.55

                ?"High"

                :"Medium",

        asset:assets[Math.floor(Math.random()*assets.length)],

        title:titles[Math.floor(Math.random()*titles.length)],

        confidence,

        eta:(2+Math.floor(Math.random()*18))+" min"

    };

}

export default function ExecutiveAlerts(){

    const [alerts,setAlerts]=useState<Alert[]>([]);

    useEffect(()=>{

        const initial=[];

        for(let i=0;i<6;i++){

            initial.push(createAlert(i));

        }

        setAlerts(initial);

    },[]);

    useEffect(()=>{

        const timer=setInterval(()=>{

            setAlerts(old=>{

                const next=[createAlert(Date.now()),...old];

                return next.slice(0,6);

            });

        },7000);

        return()=>clearInterval(timer);

    },[]);

    return(

        <EnterpriseCard
            title="Oracle AI Executive Alerts"
            height={860}
        >

            <div
                style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:16
                }}
            >

                {alerts.map(alert=>{

                    let color="#FAAD14";

                    if(alert.severity==="High")
                        color="#FA8C16";

                    if(alert.severity==="Critical")
                        color="#FF4D4F";

                    return(

                        <div

                            key={alert.id}

                            style={{

                                background:"#1A2C44",

                                borderRadius:10,

                                padding:16,

                                borderLeft:`5px solid ${color}`

                            }}

                        >

                            <div
                                style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    alignItems:"center"
                                }}
                            >

                                <Space>

                                    <Badge status="processing"/>

                                    <RobotOutlined
                                        style={{
                                            color:"#00E676"
                                        }}
                                    />

                                    <span
                                        style={{
                                            color:"#FFF",
                                            fontWeight:700,
                                            fontSize:16
                                        }}
                                    >
                                        {alert.title}
                                    </span>

                                </Space>

                                <Tag color={color}>
                                    {alert.severity}
                                </Tag>

                            </div>

                            <div
                                style={{
                                    marginTop:12,
                                    display:"flex",
                                    justifyContent:"space-between"
                                }}
                            >

                                <Space
                                    size={18}
                                >

                                    <span
                                        style={{
                                            color:"#8EA9CC"
                                        }}
                                    >

                                        <SafetyCertificateOutlined/>

                                        {" "}
                                        {alert.asset}

                                    </span>

                                    <span
                                        style={{
                                            color:"#00E676"
                                        }}
                                    >

                                        AI {alert.confidence}%

                                    </span>

                                </Space>

                                <span
                                    style={{
                                        color:"#FFD666"
                                    }}
                                >

                                    <ClockCircleOutlined/>

                                    {" "}

                                    ETA {alert.eta}

                                </span>

                            </div>

                            <div
                                style={{
                                    marginTop:10,
                                    color:"#9BC1FF",
                                    fontSize:13
                                }}
                            >

                                Oracle AI recommends immediate containment before attack propagation.

                            </div>

                        </div>

                    );

                })}

            </div>

        </EnterpriseCard>

    );

}