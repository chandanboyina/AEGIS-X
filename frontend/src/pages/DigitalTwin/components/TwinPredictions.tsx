import { useEffect, useState } from "react";

import {
    Progress,
    Tag,
    Timeline
} from "antd";

import {
    CalendarOutlined,
    ThunderboltOutlined,
    DatabaseOutlined,
    CloudServerOutlined,
    ApartmentOutlined,
    SafetyCertificateOutlined,
    RiseOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Prediction{

    id:number;

    title:string;

    timeframe:string;

    probability:number;

    impact:string;

    recommendation:string;

    icon:any;

    color:string;

}

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function TwinPredictions(){

    const [predictions,setPredictions]=useState<Prediction[]>([]);

    function refresh(){

        setPredictions([

            {

                id:1,

                title:"Storage Performance Degradation",

                timeframe:"Next 30 Minutes",

                probability:random(82,96),

                impact:"High",

                recommendation:"Move critical workloads to replicated storage.",

                icon:<DatabaseOutlined/>,

                color:"#722ED1"

            },

            {

                id:2,

                title:"Cloud Gateway Saturation",

                timeframe:"Within 2 Hours",

                probability:random(72,91),

                impact:"Medium",

                recommendation:"Scale cloud gateway resources automatically.",

                icon:<CloudServerOutlined/>,

                color:"#13C2C2"

            },

            {

                id:3,

                title:"Network Core Congestion",

                timeframe:"Today",

                probability:random(74,94),

                impact:"Critical",

                recommendation:"Re-route traffic using AI optimized paths.",

                icon:<ApartmentOutlined/>,

                color:"#1677FF"

            },

            {

                id:4,

                title:"Identity Risk Increase",

                timeframe:"Next 24 Hours",

                probability:random(66,89),

                impact:"Medium",

                recommendation:"Enable adaptive authentication policies.",

                icon:<SafetyCertificateOutlined/>,

                color:"#FAAD14"

            },

            {

                id:5,

                title:"Infrastructure Capacity Threshold",

                timeframe:"Next Week",

                probability:random(78,95),

                impact:"High",

                recommendation:"Expand compute cluster capacity.",

                icon:<ThunderboltOutlined/>,

                color:"#FF4D4F"

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
            title="Oracle AI Future Predictions"
            height={1400}
        >

            <div
                className="predictionScroll"
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

                    predictions.map(item=>(

                        <div
                            key={item.id}
                            style={{
                                background:"#16253B",
                                border:"1px solid #29425E",
                                borderLeft:`5px solid ${item.color}`,
                                borderRadius:14,
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
                                        gap:16
                                    }}
                                >

                                    <div
                                        style={{
                                            width:58,
                                            height:58,
                                            borderRadius:16,
                                            display:"flex",
                                            justifyContent:"center",
                                            alignItems:"center",
                                            fontSize:28,
                                            color:item.color,
                                            background:`${item.color}22`
                                        }}
                                    >

                                        {item.icon}

                                    </div>

                                    <div>

                                        <div
                                            style={{
                                                color:"#FFFFFF",
                                                fontWeight:700,
                                                fontSize:17
                                            }}
                                        >
                                            {item.title}
                                        </div>

                                        <div
                                            style={{
                                                color:"#8EA9CC",
                                                marginTop:5
                                            }}
                                        >

                                            <CalendarOutlined/>

                                            {" "}

                                            {item.timeframe}

                                        </div>

                                    </div>

                                </div>

                                <Tag
                                    color={
                                        item.impact==="Critical"

                                        ?"red"

                                        :item.impact==="High"

                                        ?"orange"

                                        :"blue"
                                    }
                                >
                                    {item.impact}
                                </Tag>

                            </div>

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
                                        Prediction Confidence
                                    </span>

                                    <span
                                        style={{
                                            color:"#00E676",
                                            fontWeight:700
                                        }}
                                    >
                                        {item.probability}%
                                    </span>

                                </div>

                                <Progress
                                    percent={item.probability}
                                    showInfo={false}
                                    strokeColor={item.color}
                                    trailColor="#223248"
                                />

                            </div>

                            <div
                                style={{
                                    marginTop:18,
                                    background:"#101C2D",
                                    borderRadius:10,
                                    padding:14
                                }}
                            >

                                <div
                                    style={{
                                        color:"#00E676",
                                        fontWeight:700,
                                        marginBottom:8
                                    }}
                                >
                                    Oracle AI Recommendation
                                </div>

                                <div
                                    style={{
                                        color:"#DCE8F4",
                                        lineHeight:1.7
                                    }}
                                >
                                    {item.recommendation}
                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

            <div
                style={{
                    marginTop:24
                }}
            >

                <Timeline
                    items={[
                        {
                            color:"green",
                            children:"Current Infrastructure Stable"
                        },
                        {
                            color:"blue",
                            children:"AI Predicts Performance Optimization"
                        },
                        {
                            color:"orange",
                            children:"Capacity Planning Trigger"
                        },
                        {
                            color:"red",
                            children:"Preventive Maintenance Window"
                        },
                        {
                            color:"green",
                            dot:<RiseOutlined/>,
                            children:"Infrastructure Health Improved"
                        }
                    ]}
                />

            </div>
                        {/* Prediction Summary */}

            <div
                style={{
                    marginTop:24,
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
                    Oracle AI Prediction Summary
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
                            Predictions Generated
                        </span>

                        <span
                            style={{
                                color:"#FFFFFF",
                                fontWeight:700
                            }}
                        >
                            {predictions.length}
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
                                predictions.filter(
                                    p=>p.impact==="Critical"
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
                            {
                                Math.round(
                                    predictions.reduce(
                                        (sum,p)=>sum+p.probability,
                                        0
                                    )/predictions.length
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
                            AI Forecast Status
                        </span>

                        <span
                            style={{
                                color:"#1677FF",
                                fontWeight:700
                            }}
                        >
                            Active
                        </span>

                    </div>

                </div>

            </div>

            {/* Oracle AI */}

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
                        color:"#00E676",
                        fontWeight:700,
                        fontSize:16,
                        marginBottom:10
                    }}
                >
                    Oracle AI Future Intelligence
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >

                    Oracle AI continuously projects future
                    infrastructure conditions using Digital Twin
                    simulations, historical telemetry, workload
                    behaviour, infrastructure dependencies and
                    predictive analytics. Recommended actions are
                    validated before implementation to reduce risk,
                    prevent outages and maintain business continuity.

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
                        Oracle AI Prediction Engine
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13,
                            lineHeight:1.7
                        }}
                    >
                        Oracle AI forecasts infrastructure risks,
                        capacity trends, service degradation and
                        operational anomalies days before they occur,
                        enabling proactive cyber resilience through
                        predictive Digital Twin intelligence.

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

.predictionScroll::-webkit-scrollbar{

width:8px;

}

.predictionScroll::-webkit-scrollbar-track{

background:#111C2D;

border-radius:20px;

}

.predictionScroll::-webkit-scrollbar-thumb{

background:#1677FF;

border-radius:20px;

}

.predictionScroll::-webkit-scrollbar-thumb:hover{

background:#4096FF;

}

.predictionScroll>div{

transition:.35s;

}

.predictionScroll>div:hover{

transform:translateY(-4px);

border-color:#1677FF !important;

box-shadow:0 10px 28px rgba(22,119,255,.18);

}

.ant-progress-bg{

transition:all .8s ease;

}

.ant-timeline-item-tail{

border-left:2px solid #29425E;

}

.ant-timeline-item-head{

box-shadow:0 0 12px rgba(0,230,118,.5);

}

.ant-timeline{

margin-top:12px;

}

`}

            </style>

        </EnterpriseCard>

    );

}