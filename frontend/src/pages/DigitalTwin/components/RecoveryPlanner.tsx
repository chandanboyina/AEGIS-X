import { useEffect, useState } from "react";

import {
    Tag,
    Progress
} from "antd";

import {
    SafetyCertificateOutlined,
    ReloadOutlined,
    DatabaseOutlined,
    CloudServerOutlined,
    CheckCircleOutlined,
    ThunderboltOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface RecoveryStep{

    id:number;

    title:string;

    description:string;

    priority:"Critical"|"High"|"Medium";

    automation:number;

    eta:number;

    icon:any;

    color:string;

}

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function RecoveryPlanner(){

    const [steps,setSteps]=useState<RecoveryStep[]>([]);

    function refresh(){

        setSteps([

            {

                id:1,

                title:"Isolate Compromised Assets",

                description:"Disconnect affected endpoints from production network.",

                priority:"Critical",

                automation:random(92,99),

                eta:random(1,3),

                icon:<SafetyCertificateOutlined/>,

                color:"#FF4D4F"

            },

            {

                id:2,

                title:"Restore Network Segmentation",

                description:"Apply Oracle AI adaptive segmentation policies.",

                priority:"High",

                automation:random(88,97),

                eta:random(3,6),

                icon:<ReloadOutlined/>,

                color:"#1677FF"

            },

            {

                id:3,

                title:"Recover Critical Database",

                description:"Verify integrity and restore protected snapshots.",

                priority:"Critical",

                automation:random(90,99),

                eta:random(4,8),

                icon:<DatabaseOutlined/>,

                color:"#722ED1"

            },

            {

                id:4,

                title:"Validate Cloud Services",

                description:"Synchronize workloads and verify cloud health.",

                priority:"Medium",

                automation:random(84,95),

                eta:random(2,5),

                icon:<CloudServerOutlined/>,

                color:"#13C2C2"

            },

            {

                id:5,

                title:"Business Service Validation",

                description:"Confirm recovery of enterprise applications.",

                priority:"High",

                automation:random(90,99),

                eta:random(5,9),

                icon:<CheckCircleOutlined/>,

                color:"#00E676"

            },

            {

                id:6,

                title:"Infrastructure Stabilization",

                description:"Optimize infrastructure after recovery.",

                priority:"Medium",

                automation:random(80,95),

                eta:random(6,10),

                icon:<ThunderboltOutlined/>,

                color:"#FAAD14"

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
            title="Oracle AI Recovery Planner"
            height={1400}
        >

            {/* Recovery Workflow */}

            <div
                className="recoveryScroll"
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

                    steps.map(step=>(

                        <div
                            key={step.id}
                            style={{
                                background:"#16253B",
                                border:"1px solid #29425E",
                                borderLeft:`5px solid ${step.color}`,
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
                                        gap:16,
                                        alignItems:"center"
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
                                            color:step.color,
                                            background:`${step.color}22`
                                        }}
                                    >

                                        {step.icon}

                                    </div>

                                    <div>

                                        <div
                                            style={{
                                                color:"#FFFFFF",
                                                fontWeight:700,
                                                fontSize:17
                                            }}
                                        >
                                            {step.title}
                                        </div>

                                        <div
                                            style={{
                                                color:"#8EA9CC",
                                                marginTop:5,
                                                lineHeight:1.6
                                            }}
                                        >
                                            {step.description}
                                        </div>

                                    </div>

                                </div>

                                <Tag
                                    color={
                                        step.priority==="Critical"

                                        ?"red"

                                        :step.priority==="High"

                                        ?"orange"

                                        :"blue"
                                    }
                                >

                                    {step.priority}

                                </Tag>

                            </div>

                            {/* Automation */}

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
                                        Automation Progress
                                    </span>

                                    <span
                                        style={{
                                            color:"#00E676",
                                            fontWeight:700
                                        }}
                                    >
                                        {step.automation}%
                                    </span>

                                </div>

                                <Progress
                                    percent={step.automation}
                                    showInfo={false}
                                    strokeColor="#00E676"
                                    trailColor="#223248"
                                />

                            </div>

                            {/* Footer */}

                            <div
                                style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    alignItems:"center",
                                    marginTop:18,
                                    paddingTop:14,
                                    borderTop:"1px solid #2A3B53"
                                }}
                            >

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Estimated Recovery Time
                                    </div>

                                    <div
                                        style={{
                                            color:"#FAAD14",
                                            marginTop:5,
                                            fontWeight:700
                                        }}
                                    >
                                        {step.eta} Minutes
                                    </div>

                                </div>

                                <Tag
                                    color="processing"
                                    style={{
                                        fontWeight:700
                                    }}
                                >
                                    EXECUTING
                                </Tag>

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
                    borderLeft:"4px solid #00E676",
                    borderRadius:12,
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
                    Oracle AI Recovery Engine
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.85
                    }}
                >

                    Oracle AI automatically generates prioritized
                    recovery workflows based on attack impact,
                    infrastructure dependencies, business criticality
                    and Digital Twin simulations. Recovery actions are
                    continuously optimized to minimize downtime while
                    preserving operational continuity and cyber
                    resilience.

                </div>

            </div>
                        {/* Recovery Summary */}

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
                    Recovery Execution Summary
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
                            Recovery Tasks
                        </span>

                        <span
                            style={{
                                color:"#FFFFFF",
                                fontWeight:700
                            }}
                        >
                            {steps.length}
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >
                        <span style={{color:"#8EA9CC"}}>
                            Critical Actions
                        </span>

                        <span
                            style={{
                                color:"#FF4D4F",
                                fontWeight:700
                            }}
                        >
                            {
                                steps.filter(
                                    step=>step.priority==="Critical"
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
                            Average Automation
                        </span>

                        <span
                            style={{
                                color:"#00E676",
                                fontWeight:700
                            }}
                        >
                            {
                                Math.round(

                                    steps.reduce(
                                        (sum,step)=>
                                            sum+step.automation,
                                        0
                                    )/steps.length

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
                            Estimated Completion
                        </span>

                        <span
                            style={{
                                color:"#FAAD14",
                                fontWeight:700
                            }}
                        >
                            {
                                Math.max(
                                    ...steps.map(
                                        step=>step.eta
                                    )
                                )
                            } Minutes
                        </span>

                    </div>

                </div>

            </div>

            {/* Executive Decision */}

            <div
                style={{
                    marginTop:22,
                    background:"#102033",
                    borderLeft:"4px solid #1677FF",
                    borderRadius:12,
                    padding:18
                }}
            >

                <div
                    style={{
                        color:"#1677FF",
                        fontWeight:700,
                        fontSize:16,
                        marginBottom:10
                    }}
                >
                    Oracle AI Recovery Decision
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >

                    Oracle AI recommends executing the recovery
                    workflow in the displayed priority order.
                    Critical infrastructure should be isolated first,
                    followed by adaptive network segmentation,
                    database integrity verification and application
                    validation. Digital Twin simulations indicate
                    that this recovery sequence minimizes operational
                    disruption while restoring enterprise services
                    safely.

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
                        Oracle AI Autonomous Recovery
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13,
                            lineHeight:1.7
                        }}
                    >
                        Oracle AI continuously evaluates recovery
                        progress, infrastructure dependencies and
                        Digital Twin simulations to orchestrate
                        autonomous restoration with minimal business
                        impact and maximum cyber resilience.

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

.recoveryScroll::-webkit-scrollbar{

width:8px;

}

.recoveryScroll::-webkit-scrollbar-track{

background:#111C2D;

border-radius:20px;

}

.recoveryScroll::-webkit-scrollbar-thumb{

background:#00E676;

border-radius:20px;

}

.recoveryScroll::-webkit-scrollbar-thumb:hover{

background:#36CFC9;

}

.recoveryScroll>div{

transition:.35s;

}

.recoveryScroll>div:hover{

transform:translateY(-4px);

border-color:#00E676 !important;

box-shadow:0 10px 28px rgba(0,230,118,.18);

}

.ant-progress-bg{

transition:all .8s ease;

}

.ant-tag-processing{

animation:executePulse 1.8s infinite;

}

@keyframes executePulse{

0%{

transform:scale(1);

opacity:.75;

}

50%{

transform:scale(1.08);

opacity:1;

}

100%{

transform:scale(1);

opacity:.75;

}

}

`}

            </style>

        </EnterpriseCard>

    );

}