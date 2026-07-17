import { useEffect, useState } from "react";
import { Row, Col, Tag, Progress } from "antd";

import {
    RobotOutlined,
    SafetyCertificateOutlined,
    ApartmentOutlined,
    NodeIndexOutlined,
    ThunderboltOutlined,
    AuditOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Member{

    id:number;

    name:string;

    role:string;

    confidence:number;

    status:string;

    vote:string;

    color:string;

    icon:any;

}

const templates=[

    {

        name:"Threat AI",

        role:"Threat Intelligence",

        color:"#FF4D4F",

        icon:<ThunderboltOutlined/>

    },

    {

        name:"Graph AI",

        role:"Relationship Analysis",

        color:"#2D7CFF",

        icon:<ApartmentOutlined/>

    },

    {

        name:"MITRE AI",

        role:"ATT&CK Mapping",

        color:"#A855F7",

        icon:<NodeIndexOutlined/>

    },

    {

        name:"Risk AI",

        role:"Business Risk",

        color:"#FA8C16",

        icon:<SafetyCertificateOutlined/>

    },

    {

        name:"Compliance AI",

        role:"Governance",

        color:"#13C2C2",

        icon:<AuditOutlined/>

    },

    {

        name:"SOC AI",

        role:"Incident Response",

        color:"#00E676",

        icon:<RobotOutlined/>

    }

];

const statuses=[

    "Analyzing",

    "Voting",

    "Reviewing",

    "Correlating",

    "Learning"

];

const votes=[

    "APPROVE",

    "REVIEW",

    "ESCALATE"

];

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function randomItem(arr:any[]){

    return arr[random(0,arr.length-1)];

}

function generate():Member[]{

    return templates.map((item,index)=>({

        id:index,

        ...item,

        confidence:random(94,99),

        status:randomItem(statuses),

        vote:randomItem(votes)

    }));

}

export default function CouncilMembers(){

    const [members,setMembers]=useState<Member[]>(

        generate()

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            setMembers(generate());

        },5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <Row gutter={[20,20]}>

            {

                members.map(member=>(

                    <Col
                        key={member.id}
                        xs={24}
                        sm={12}
                        md={8}
                        lg={8}
                        xl={4}
                    >

                        <EnterpriseCard
                            title=""
                            height={420}
                        >

                            <div
                                style={{
                                    display:"flex",
                                    flexDirection:"column",
                                    height:"100%"
                                }}
                            >

                                {/* Header */}

                                <div
                                    style={{
                                        display:"flex",
                                        justifyContent:"space-between",
                                        alignItems:"center"
                                    }}
                                >

                                    <div
                                        style={{
                                            width:52,
                                            height:52,
                                            borderRadius:14,
                                            background:member.color+"20",
                                            display:"flex",
                                            alignItems:"center",
                                            justifyContent:"center",
                                            color:member.color,
                                            fontSize:24
                                        }}
                                    >

                                        {member.icon}

                                    </div>

                                    <Tag
                                        color="green"
                                    >
                                        LIVE
                                    </Tag>

                                </div>

                                <div
                                    style={{
                                        marginTop:16,
                                        color:"#FFFFFF",
                                        fontSize:20,
                                        fontWeight:700
                                    }}
                                >
                                    {member.name}
                                </div>

                                <div
                                    style={{
                                        color:"#8EA9CC",
                                        fontSize:13,
                                        marginTop:4
                                    }}
                                >
                                    {member.role}
                                </div>

                                <div
                                    style={{
                                        marginTop:18,
                                        display:"flex",
                                        justifyContent:"space-between",
                                        color:"#8EA9CC"
                                    }}
                                >

                                    <span>
                                        Confidence
                                    </span>

                                    <b
                                        style={{
                                            color:member.color
                                        }}
                                    >
                                        {member.confidence}%
                                    </b>

                                </div>

                                <Progress
                                    percent={member.confidence}
                                    showInfo={false}
                                    strokeColor={member.color}
                                    style={{
                                        marginTop:8
                                    }}
                                />

                                <div
                                    style={{
                                        marginTop:18,
                                        display:"flex",
                                        justifyContent:"space-between",
                                        alignItems:"center"
                                    }}
                                >

                                    <span
                                        style={{
                                            color:"#8EA9CC"
                                        }}
                                    >
                                        Status
                                    </span>

                                    <Tag color="processing">
                                        {member.status}
                                    </Tag>

                                </div>

                                <div
                                    style={{
                                        marginTop:14,
                                        display:"flex",
                                        justifyContent:"space-between",
                                        alignItems:"center"
                                    }}
                                >

                                    <span
                                        style={{
                                            color:"#8EA9CC"
                                        }}
                                    >
                                        Vote
                                    </span>

                                    <Tag

                                        color={
                                            member.vote==="APPROVE"

                                            ?"green"

                                            :member.vote==="REVIEW"

                                            ?"gold"

                                            :"red"
                                        }

                                    >

                                        {member.vote}

                                    </Tag>

                                </div>
                                                                <div
                                    style={{
                                        marginTop:"auto",
                                        paddingTop:18,
                                        borderTop:"1px solid #2A415D",
                                        display:"flex",
                                        justifyContent:"space-between",
                                        alignItems:"center"
                                    }}
                                >

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Oracle AI Council
                                    </div>

                                    <div
                                        style={{
                                            display:"flex",
                                            alignItems:"center",
                                            gap:6,
                                            color:member.color,
                                            fontWeight:700,
                                            fontSize:12
                                        }}
                                    >

                                        <span
                                            style={{
                                                width:8,
                                                height:8,
                                                borderRadius:"50%",
                                                background:member.color,
                                                display:"inline-block",
                                                animation:"pulseDot 1.5s infinite"
                                            }}
                                        />

                                        {member.status}

                                    </div>

                                </div>

                            </div>

                        </EnterpriseCard>

                    </Col>

                ))

            }

            <style>

                {`

@keyframes pulseDot{

0%{

opacity:.3;

transform:scale(0.8);

}

50%{

opacity:1;

transform:scale(1.3);

}

100%{

opacity:.3;

transform:scale(0.8);

}

}

`}

            </style>

        </Row>

    );

}