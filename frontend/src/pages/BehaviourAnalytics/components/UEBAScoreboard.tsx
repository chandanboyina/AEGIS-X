import { useEffect, useState } from "react";

import {
    Progress,
    Row,
    Col
} from "antd";

import {
    SafetyCertificateOutlined,
    LaptopOutlined,
    CloudOutlined,
    GlobalOutlined,
    AppstoreOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Score{

    name:string;

    value:number;

    icon:any;

    color:string;

}

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function UEBAScoreboard(){

    const [overall,setOverall]=useState(98);

    const [scores,setScores]=useState<Score[]>([]);

    function refresh(){

        setOverall(

            random(95,99)

        );

        setScores([

            {

                name:"Identity",

                value:random(82,99),

                icon:<SafetyCertificateOutlined/>,

                color:"#00E676"

            },

            {

                name:"Endpoint",

                value:random(80,98),

                icon:<LaptopOutlined/>,

                color:"#1677FF"

            },

            {

                name:"Cloud",

                value:random(80,98),

                icon:<CloudOutlined/>,

                color:"#722ED1"

            },

            {

                name:"Network",

                value:random(80,99),

                icon:<GlobalOutlined/>,

                color:"#FA8C16"

            },

            {

                name:"Application",

                value:random(80,98),

                icon:<AppstoreOutlined/>,

                color:"#13C2C2"

            }

        ]);

    }

    useEffect(()=>{

        refresh();

        const timer=setInterval(

            refresh,

            5000

        );

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle AI UEBA Scoreboard"
            height={1500}
        >

            {/* Overall AI Confidence */}

            <div
                style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    marginBottom:30
                }}
            >

                <div
                    className="uebaRingWrapper"
                    
                >

                    <Progress
                        type="circle"
                        percent={overall}
                        width={180}
                        strokeWidth={7}
                        strokeColor="#00E676"
                        trailColor="#223248"
                        format={()=>(

                            <div>

                                <div
                                    style={{
                                        color:"#FFFFFF",
                                        fontSize:22,
                                        fontWeight:800
                                    }}
                                >
                                    {overall}%
                                </div>

                                <div
                                    style={{
                                        color:"#8EA9CC",
                                        marginTop:6
                                    }}
                                >
                                    Oracle AI
                                </div>

                            </div>

                        )}
                    />

                </div>

                <div
                    style={{
                        marginTop:18,
                        color:"#00E676",
                        fontWeight:700,
                        fontSize:18
                    }}
                >
                    UEBA Confidence Engine
                </div>

            </div>

            {/* Domain Scores */}

            <Row gutter={[16,16]}>

                {

                    scores.map(score=>(

                        <Col
                            xs={24}
                            key={score.name}
                        >

                            <div
                                style={{
                                    background:"#16253B",
                                    border:"1px solid #2A415D",
                                    borderRadius:12,
                                    padding:16
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

                                        <div
                                            style={{
                                                width:42,
                                                height:42,
                                                borderRadius:12,
                                                background:`${score.color}22`,
                                                display:"flex",
                                                justifyContent:"center",
                                                alignItems:"center",
                                                color:score.color,
                                                fontSize:20
                                            }}
                                        >
                                            {score.icon}
                                        </div>

                                        <div>

                                            <div
                                                style={{
                                                    color:"#FFFFFF",
                                                    fontWeight:700
                                                }}
                                            >
                                                {score.name}
                                            </div>

                                            <div
                                                style={{
                                                    color:"#8EA9CC",
                                                    fontSize:12,
                                                    marginTop:4
                                                }}
                                            >
                                                Behaviour Confidence
                                            </div>

                                        </div>

                                    </div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            fontWeight:700,
                                            fontSize:22
                                        }}
                                    >
                                        {score.value}%
                                    </div>

                                </div>

                                <Progress
                                    percent={score.value}
                                    showInfo={false}
                                    strokeColor={score.color}
                                    trailColor="#223248"
                                    style={{
                                        marginTop:16
                                    }}
                                />

                            </div>

                        </Col>

                    ))

                }

            </Row>

            {/* Oracle AI Analysis */}

            <div
                style={{
                    marginTop:24,
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
                        fontSize:17,
                        marginBottom:10
                    }}
                >
                    Oracle AI Behaviour Engine
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >

                    Oracle AI continuously correlates identity,
                    endpoint, application, cloud and network
                    telemetry to generate adaptive UEBA risk
                    scores. Confidence is recalculated every few
                    seconds using behavioural learning models.

                </div>

            </div>
                        {/* UEBA Summary */}

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
                    UEBA Intelligence Summary
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
                            Overall AI Confidence
                        </span>

                        <span
                            style={{
                                color:"#00E676",
                                fontWeight:700
                            }}
                        >
                            {overall}%
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >

                        <span style={{color:"#8EA9CC"}}>
                            Highest Protected Domain
                        </span>

                        <span
                            style={{
                                color:"#FFFFFF",
                                fontWeight:700
                            }}
                        >
                            {
                                [...scores]
                                .sort((a,b)=>b.value-a.value)[0]
                                ?.name
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
                            Average Behaviour Score
                        </span>

                        <span
                            style={{
                                color:"#1677FF",
                                fontWeight:700
                            }}
                        >
                            {

                                Math.round(

                                    scores.reduce(

                                        (sum,item)=>

                                            sum+item.value,

                                        0

                                    )/scores.length

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
                            ACTIVE
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
                        Continuously learning enterprise behaviour
                        patterns using adaptive AI models,
                        behavioural baselines and identity
                        intelligence.

                    </div>

                </div>

                <div
                    style={{
                        display:"flex",
                        alignItems:"center",
                        gap:8
                    }}
                >

                    <span className="liveDot"/>

                    <span
                        style={{
                            color:"#FFFFFF",
                            fontWeight:700
                        }}
                    >
                        LIVE
                    </span>

                </div>

            </div>

            <style>

{`

.liveDot{

width:12px;

height:12px;

border-radius:50%;

background:#00E676;

box-shadow:0 0 14px #00E676;

animation:pulseLive 1.5s infinite;

}



.ant-progress-bg{

transition:all .6s ease;

}

@keyframes pulseLive{

0%{

transform:scale(.9);

opacity:.7;

}

50%{

transform:scale(1.35);

opacity:1;

box-shadow:0 0 20px #00E676;

}

100%{

transform:scale(.9);

opacity:.7;

}

}

.uebaRingWrapper{

position:relative;

width:220px;

height:220px;

display:flex;

justify-content:center;

align-items:center;

margin:0 auto;

border-radius:50%;

}

.uebaRingWrapper::before{

content:"";

position:absolute;

inset:-15px;

border-radius:50%;

background:radial-gradient(

circle,

rgba(0,230,118,.18) 0%,

rgba(0,230,118,.08) 45%,

transparent 75%

);

animation:haloPulse 3s infinite;

z-index:0;

}

.uebaRingWrapper .ant-progress{

position:relative;

z-index:1;

}

@keyframes haloPulse{

0%{

transform:scale(.95);

opacity:.6;

}

50%{

transform:scale(1.08);

opacity:1;

}

100%{

transform:scale(.95);

opacity:.6;

}

}

`}

            </style>

        </EnterpriseCard>

    );

}