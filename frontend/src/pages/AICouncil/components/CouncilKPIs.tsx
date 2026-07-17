import { useEffect, useState } from "react";
import { Row, Col } from "antd";

import {
    RobotOutlined,
    TeamOutlined,
    SafetyCertificateOutlined,
    ThunderboltOutlined,
    CheckCircleOutlined,
    SyncOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface KPIData {

    agents:number;

    active:number;

    consensus:number;

    decisions:number;

    confidence:number;

    latency:number;

}

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function generate():KPIData{

    return{

        agents:6,

        active:random(5,6),

        consensus:random(93,99),

        decisions:random(120,180),

        confidence:random(94,99),

        latency:random(80,180)

    };

}

export default function CouncilKPIs(){

    const [data,setData]=useState<KPIData>(generate());

    useEffect(()=>{

        const timer=setInterval(()=>{

            setData(generate());

        },5000);

        return()=>clearInterval(timer);

    },[]);

    const cards=[

        {

            title:"AI Council",

            value:data.agents,

            subtitle:"Expert Agents",

            color:"#00E676",

            icon:<RobotOutlined/>

        },

        {

            title:"Active Agents",

            value:data.active,

            subtitle:"Currently Voting",

            color:"#2D7CFF",

            icon:<TeamOutlined/>

        },

        {

            title:"Consensus",

            value:`${data.consensus}%`,

            subtitle:"Council Agreement",

            color:"#00E676",

            icon:<CheckCircleOutlined/>

        },

        {

            title:"AI Decisions",

            value:data.decisions,

            subtitle:"Today",

            color:"#FA8C16",

            icon:<ThunderboltOutlined/>

        },

        {

            title:"Confidence",

            value:`${data.confidence}%`,

            subtitle:"Average Accuracy",

            color:"#00E676",

            icon:<SafetyCertificateOutlined/>

        },

        {

            title:"Inference",

            value:`${data.latency} ms`,

            subtitle:"Decision Time",

            color:"#A855F7",

            icon:<SyncOutlined/>

        }

    ];

    return(

        <Row gutter={[20,20]}>

            {
                cards.map(card=>(
                                        <Col
                        key={card.title}
                        xs={24}
                        sm={12}
                        md={8}
                        lg={4}
                    >

                        <EnterpriseCard
                            title=""
                            height={150}
                        >

                            <div
                                style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    alignItems:"center",
                                    height:"100%"
                                }}
                            >

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        {card.title}
                                    </div>

                                    <div
                                        style={{
                                            marginTop:6,
                                            color:"#FFFFFF",
                                            fontSize:24,
                                            fontWeight:700
                                        }}
                                    >
                                        {card.value}
                                    </div>

                                    <div
                                        style={{
                                            marginTop:4,
                                            color:"#8EA9CC",
                                            fontSize:11
                                        }}
                                    >
                                        {card.subtitle}
                                    </div>

                                </div>

                                <div
                                    style={{
                                        width:46,
                                        height:46,
                                        borderRadius:12,
                                        display:"flex",
                                        alignItems:"center",
                                        justifyContent:"center",
                                        background:card.color+"20",
                                        color:card.color,
                                        fontSize:24
                                    }}
                                >

                                    {card.icon}

                                </div>

                            </div>

                        </EnterpriseCard>

                    </Col>
                                    ))

            }

        </Row>

    );

}