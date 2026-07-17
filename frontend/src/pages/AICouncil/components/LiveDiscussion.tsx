import { useEffect, useState } from "react";
import { Avatar, Tag } from "antd";

import {
    RobotOutlined,
    ThunderboltOutlined,
    ApartmentOutlined,
    NodeIndexOutlined,
    SafetyCertificateOutlined,
    AuditOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Message{

    id:number;

    agent:string;

    role:string;

    message:string;

    color:string;

    icon:any;

}

const templates=[

    {

        agent:"Threat AI",

        role:"Threat Intelligence",

        color:"#FF4D4F",

        icon:<ThunderboltOutlined/>,

        messages:[

            "Possible ransomware propagation detected across enterprise assets.",

            "Threat intelligence indicates an active campaign targeting critical infrastructure.",

            "Credential abuse probability increased significantly."

        ]

    },

    {

        agent:"Graph AI",

        role:"Relationship Analysis",

        color:"#2D7CFF",

        icon:<ApartmentOutlined/>,

        messages:[

            "Graph analysis predicts lateral movement to Domain Controller.",

            "Multiple interconnected assets share suspicious authentication events.",

            "Attack path expansion probability exceeds 92%."

        ]

    },

    {

        agent:"MITRE AI",

        role:"ATT&CK Mapping",

        color:"#A855F7",

        icon:<NodeIndexOutlined/>,

        messages:[

            "Technique matches MITRE T1078.",

            "Observed behaviour also aligns with T1021.",

            "Privilege escalation pattern resembles T1055."

        ]

    },

    {

        agent:"Risk AI",

        role:"Business Risk",

        color:"#FA8C16",

        icon:<SafetyCertificateOutlined/>,

        messages:[

            "Estimated financial impact exceeds $11 Million.",

            "Enterprise risk score elevated to Critical.",

            "Power Grid identified as highest-risk asset."

        ]

    },

    {

        agent:"Compliance AI",

        role:"Governance",

        color:"#13C2C2",

        icon:<AuditOutlined/>,

        messages:[

            "Critical infrastructure compliance policies may be violated.",

            "Executive notification is recommended.",

            "Audit evidence collection initiated."

        ]

    },

    {

        agent:"SOC AI",

        role:"Incident Response",

        color:"#00E676",

        icon:<RobotOutlined/>,

        messages:[

            "Recommend Playbook PB-010.",

            "SOAR containment workflow ready.",

            "Immediate endpoint isolation advised."

        ]

    }

];

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function buildMessages():Message[]{

    return templates.map((item,index)=>({

        id:index,

        agent:item.agent,

        role:item.role,

        color:item.color,

        icon:item.icon,

        message:item.messages[

            random(0,item.messages.length-1)

        ]

    }));

}

export default function LiveDiscussion(){

    const [messages,setMessages]=useState<Message[]>(

        buildMessages()

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            setMessages(buildMessages());

        },5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle AI Council Discussion"
            height={1000}
        >

            <div
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    marginBottom:22
                }}
            >

                <div
                    style={{
                        color:"#8EA9CC",
                        fontSize:14
                    }}
                >
                    Live collaborative reasoning between Oracle AI expert agents
                </div>

                <Tag
                    color="green"
                    style={{
                        padding:"4px 12px"
                    }}
                >
                    LIVE COUNCIL
                </Tag>

            </div>

            <div
                style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:18,
                    maxHeight:620,
                    overflowY:"auto",
                    paddingRight:8
                }}
            >

                {

                    messages.map(msg=>(

                        <div
                            key={msg.id}
                            style={{
                                background:"#16253B",
                                border:`1px solid ${msg.color}40`,
                                borderLeft:`5px solid ${msg.color}`,
                                borderRadius:12,
                                padding:18,
                                transition:"0.3s"
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

                                    <Avatar
                                        size={50}
                                        style={{
                                            background:msg.color,
                                            color:"#FFFFFF"
                                        }}
                                        icon={msg.icon}
                                    />

                                    <div>

                                        <div
                                            style={{
                                                color:"#FFFFFF",
                                                fontWeight:700,
                                                fontSize:17
                                            }}
                                        >
                                            {msg.agent}
                                        </div>

                                        <div
                                            style={{
                                                color:"#8EA9CC",
                                                fontSize:13,
                                                marginTop:3
                                            }}
                                        >
                                            {msg.role}
                                        </div>

                                    </div>

                                </div>

                                <Tag
                                    color="processing"
                                >
                                    Speaking
                                </Tag>

                            </div>

                            <div
                                style={{
                                    marginTop:18,
                                    marginLeft:64,
                                    color:"#DCE8F4",
                                    lineHeight:1.9,
                                    fontSize:15
                                }}
                            >
                                {msg.message}
                            </div>

                        </div>

                    ))

                }

            </div>

            <div
                style={{
                    marginTop:20,
                    background:"#102033",
                    borderLeft:"4px solid #00E676",
                    borderRadius:10,
                    padding:18
                }}
            >

                <div
                    style={{
                        color:"#00E676",
                        fontWeight:700,
                        marginBottom:10
                    }}
                >
                    Oracle AI Council Status
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >
                    All AI agents are actively exchanging observations,
                    correlating enterprise telemetry, MITRE ATT&CK techniques,
                    Digital Twin simulations and Graph AI relationships before
                    submitting their final vote to the Oracle AI Council.
                </div>

            </div>
                        <div
                style={{
                    marginTop:20,
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}
            >

                <Tag
                    color="processing"
                    style={{
                        padding:"4px 14px"
                    }}
                >
                    Oracle AI Discussion Engine
                </Tag>

                <div
                    style={{
                        display:"flex",
                        alignItems:"center",
                        gap:8,
                        color:"#00E676",
                        fontWeight:700
                    }}
                >

                    <RobotOutlined/>

                    LIVE

                </div>

            </div>

        </EnterpriseCard>

    );

}