import { useEffect, useState } from "react";

import {
    Progress,
    Tag
} from "antd";

import {
    //WarningOutlined,
    DatabaseOutlined,
    CloudServerOutlined,
    ThunderboltOutlined,
    ApartmentOutlined,
    ClockCircleOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Failure{

    id:number;

    asset:string;

    probability:number;

    eta:number;

    impact:string;

    affected:number;

    icon:any;

    color:string;

}

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function FailureSimulation(){

    const [failures,setFailures]=useState<Failure[]>([]);

    function refresh(){

        setFailures([

            {

                id:1,

                asset:"Oracle Database",

                probability:random(82,96),

                eta:random(12,28),

                impact:"High",

                affected:random(18,36),

                icon:<DatabaseOutlined/>,

                color:"#722ED1"

            },

            {

                id:2,

                asset:"Cloud Gateway",

                probability:random(68,88),

                eta:random(18,42),

                impact:"Medium",

                affected:random(10,22),

                icon:<CloudServerOutlined/>,

                color:"#13C2C2"

            },

            {

                id:3,

                asset:"Power Distribution",

                probability:random(72,94),

                eta:random(20,38),

                impact:"Critical",

                affected:random(24,48),

                icon:<ThunderboltOutlined/>,

                color:"#FAAD14"

            },

            {

                id:4,

                asset:"Core Switch",

                probability:random(60,84),

                eta:random(15,35),

                impact:"Medium",

                affected:random(8,20),

                icon:<ApartmentOutlined/>,

                color:"#1677FF"

            }

        ]);

    }

    useEffect(()=>{

        refresh();

        const timer=setInterval(refresh,5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle AI Failure Simulation"
            height={1200}
        >

            {/* Failure List */}

            <div
                className="failureScroll"
                style={{
                    maxHeight:520,
                    overflowY:"auto",
                    display:"flex",
                    flexDirection:"column",
                    gap:18,
                    paddingRight:8
                }}
            >

                {

                    failures.map(failure=>(

                        <div
                            key={failure.id}
                            style={{
                                background:"#16253B",
                                border:"1px solid #29425E",
                                borderLeft:`5px solid ${failure.color}`,
                                borderRadius:14,
                                padding:18
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
                                        display:"flex",
                                        alignItems:"center",
                                        gap:16
                                    }}
                                >

                                    <div
                                        style={{
                                            width:58,
                                            height:58,
                                            borderRadius:16,
                                            background:`${failure.color}22`,
                                            display:"flex",
                                            justifyContent:"center",
                                            alignItems:"center",
                                            color:failure.color,
                                            fontSize:28
                                        }}
                                    >

                                        {failure.icon}

                                    </div>

                                    <div>

                                        <div
                                            style={{
                                                color:"#FFFFFF",
                                                fontWeight:700,
                                                fontSize:17
                                            }}
                                        >
                                            {failure.asset}
                                        </div>

                                        <div
                                            style={{
                                                color:"#8EA9CC",
                                                marginTop:5
                                            }}
                                        >
                                            Predictive Failure Analysis
                                        </div>

                                    </div>

                                </div>

                                <Tag
                                    color={
                                        failure.impact==="Critical"

                                        ?"red"

                                        :failure.impact==="High"

                                        ?"orange"

                                        :"blue"
                                    }
                                >

                                    {failure.impact}

                                </Tag>

                            </div>

                            {/* Probability */}

                            <div
                                style={{
                                    marginTop:20
                                }}
                            >

                                <div
                                    style={{
                                        display:"flex",
                                        justifyContent:"space-between",
                                        marginBottom:8
                                    }}
                                >

                                    <span
                                        style={{
                                            color:"#8EA9CC"
                                        }}
                                    >
                                        Failure Probability
                                    </span>

                                    <span
                                        style={{
                                            color:"#FF4D4F",
                                            fontWeight:700
                                        }}
                                    >
                                        {failure.probability}%
                                    </span>

                                </div>

                                <Progress
                                    percent={failure.probability}
                                    showInfo={false}
                                    strokeColor="#FF4D4F"
                                    trailColor="#223248"
                                />

                            </div>

                            {/* Metrics */}

                            <div
                                style={{
                                    display:"grid",
                                    gridTemplateColumns:"repeat(3,1fr)",
                                    gap:18,
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
                                        ETA
                                    </div>

                                    <div
                                        style={{
                                            color:"#FAAD14",
                                            marginTop:5,
                                            fontWeight:700
                                        }}
                                    >

                                        <ClockCircleOutlined/>

                                        {" "}

                                        {failure.eta} min

                                    </div>

                                </div>

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Affected Assets
                                    </div>

                                    <div
                                        style={{
                                            color:"#1677FF",
                                            marginTop:5,
                                            fontWeight:700
                                        }}
                                    >
                                        {failure.affected}
                                    </div>

                                </div>

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Simulation
                                    </div>

                                    <Tag
                                        color="processing"
                                        style={{
                                            marginTop:5
                                        }}
                                    >
                                        RUNNING
                                    </Tag>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

            {/* Oracle AI */}

            <div
                style={{
                    marginTop:22,
                    background:"#102033",
                    borderLeft:"4px solid #FF4D4F",
                    borderRadius:12,
                    padding:18
                }}
            >

                <div
                    style={{
                        color:"#FF4D4F",
                        fontWeight:700,
                        marginBottom:10
                    }}
                >
                    Oracle AI Predictive Failure Engine
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.85
                    }}
                >

                    Oracle AI continuously executes predictive
                    simulations across the Digital Twin to identify
                    infrastructure degradation before failures occur.
                    Using telemetry, topology dependencies and historical
                    behaviour, the engine estimates failure probability,
                    projected impact and affected business services,
                    enabling proactive remediation before disruption.

                </div>

            </div>
                        {/* Simulation Summary */}

            <div
                style={{
                    marginTop:22,
                    background:"#16253B",
                    border:"1px solid #29425E",
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
                    Failure Simulation Summary
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
                            Simulations Running
                        </span>

                        <span
                            style={{
                                color:"#FFFFFF",
                                fontWeight:700
                            }}
                        >
                            {failures.length}
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >

                        <span style={{color:"#8EA9CC"}}>
                            Critical Predictions
                        </span>

                        <span
                            style={{
                                color:"#FF4D4F",
                                fontWeight:700
                            }}
                        >
                            {
                                failures.filter(
                                    failure=>failure.impact==="Critical"
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
                            Average Probability
                        </span>

                        <span
                            style={{
                                color:"#FAAD14",
                                fontWeight:700
                            }}
                        >
                            {
                                Math.round(
                                    failures.reduce(
                                        (sum,failure)=>sum+failure.probability,
                                        0
                                    )/failures.length
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
                            Estimated Impact
                        </span>

                        <span
                            style={{
                                color:"#1677FF",
                                fontWeight:700
                            }}
                        >
                            {
                                failures.reduce(
                                    (sum,failure)=>sum+failure.affected,
                                    0
                                )
                            } Assets
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
                        Oracle AI Predictive Intelligence
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13,
                            lineHeight:1.75
                        }}
                    >
                        Oracle AI continuously executes thousands of
                        Digital Twin simulations to forecast failures,
                        estimate operational impact and recommend
                        preventive actions before infrastructure
                        degradation affects critical enterprise
                        services.

                    </div>

                </div>

                <Tag
                    color="success"
                    style={{
                        padding:"4px 12px",
                        fontWeight:700
                    }}
                >
                    ● LIVE
                </Tag>

            </div>

            <style>

{`

.failureScroll::-webkit-scrollbar{

width:8px;

}

.failureScroll::-webkit-scrollbar-track{

background:#111C2D;

border-radius:20px;

}

.failureScroll::-webkit-scrollbar-thumb{

background:#FF4D4F;

border-radius:20px;

}

.failureScroll::-webkit-scrollbar-thumb:hover{

background:#FF7875;

}

.failureScroll>div{

transition:.35s;

}

.failureScroll>div:hover{

transform:translateY(-4px);

border-color:#FF4D4F !important;

box-shadow:0 10px 28px rgba(255,77,79,.18);

}

.ant-progress-bg{

transition:all .8s ease;

}

.ant-tag-processing{

animation:simulationPulse 2s infinite;

}

@keyframes simulationPulse{

0%{

transform:scale(1);

opacity:.8;

}

50%{

transform:scale(1.08);

opacity:1;

}

100%{

transform:scale(1);

opacity:.8;

}

}

`}

            </style>

        </EnterpriseCard>

    );

}