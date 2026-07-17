import { useEffect, useState } from "react";
import { Tag } from "antd";
import {
    SearchOutlined,
    BugOutlined,
    SafetyCertificateOutlined,
    CheckCircleOutlined,
    RocketOutlined,
    ClockCircleOutlined
} from "@ant-design/icons";
import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

const phases = [

    {
        title:"Detection",
        icon:<SearchOutlined/>
    },

    {
        title:"Investigation",
        icon:<BugOutlined/>
    },

    {
        title:"Containment",
        icon:<SafetyCertificateOutlined/>
    },

    {
        title:"Eradication",
        icon:<RocketOutlined/>
    },

    {
        title:"Recovery",
        icon:<CheckCircleOutlined/>
    }

];

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function generateTimeline(){

    return phases.map((phase,index)=>({

        ...phase,

        duration:random(1,15),

        confidence:random(90,99),

        completed:index<=random(2,4)

    }));

}

export default function ResponseTimeline(){

    const [steps,setSteps]=useState(generateTimeline());

    useEffect(()=>{

        const timer=setInterval(()=>{

            setSteps(generateTimeline());

        },5000);

        return()=>clearInterval(timer);

    },[]);

    return(

        <EnterpriseCard

            title="Incident Response Timeline"

            height={550}

        >

            <div

                style={{

                    display:"flex",

                    flexDirection:"column",

                    gap:18

                }}

            >

                {

                    steps.map((step,index)=>(

                        <div

                            key={step.title}

                            style={{

                                display:"flex",

                                alignItems:"center",

                                gap:18

                            }}

                        >

                            {/* Icon */}

                            <div

                                style={{

                                    width:46,

                                    height:46,

                                    borderRadius:"50%",

                                    background:

                                        step.completed

                                            ? "#00E67622"

                                            : "#20344D",

                                    display:"flex",

                                    alignItems:"center",

                                    justifyContent:"center",

                                    color:

                                        step.completed

                                            ? "#00E676"

                                            : "#8EA9CC",

                                    fontSize:20,

                                    flexShrink:0

                                }}

                            >

                                {step.icon}

                            </div>

                            {/* Connector */}

                            {

                                index!==steps.length-1 && (

                                    <div

                                        style={{

                                            position:"absolute",

                                            marginLeft:22,

                                            marginTop:62,

                                            width:2,

                                            height:40,

                                            background:"#324760"

                                        }}

                                    />

                                )

                            }

                            {/* Details */}

                            <div

                                style={{

                                    flex:1

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

                                                color:"#FFF",

                                                fontWeight:700,

                                                fontSize:16

                                            }}

                                        >

                                            {step.title}

                                        </div>

                                        <div

                                            style={{

                                                color:"#8EA9CC",

                                                fontSize:13

                                            }}

                                        >

                                            {step.duration} Minutes

                                        </div>

                                    </div>

                                    <Tag

                                        color={

                                            step.completed

                                                ? "green"

                                                : "processing"

                                        }

                                    >

                                        {

                                            step.completed

                                                ? "Completed"

                                                : "Running"

                                        }

                                    </Tag>

                                </div>

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

                                        AI Confidence

                                    </span>

                                    <span

                                        style={{

                                            color:"#FFF",

                                            fontWeight:700

                                        }}

                                    >

                                        {step.confidence}%

                                    </span>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

            <div

                style={{

                    display:"flex",

                    justifyContent:"space-between",

                    marginTop:24,

                    borderTop:"1px solid #263D57",

                    paddingTop:14,

                    color:"#8EA9CC",

                    fontSize:12

                }}

            >

                <span

                    style={{

                        color:"#00E676",

                        fontWeight:600

                    }}

                >

                    ● LIVE RESPONSE ORCHESTRATION

                </span>

                <span>

                    <ClockCircleOutlined/>

                    {" "}

                    Updated {new Date().toLocaleTimeString()}

                </span>

            </div>

        </EnterpriseCard>

    );

}