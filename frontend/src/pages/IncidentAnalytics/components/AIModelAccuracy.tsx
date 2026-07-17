import { useEffect, useState } from "react";
import { Tag } from "antd";
import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

const models = [

    "Oracle AI",

    "ThreatGPT",

    "Llama 3 SOC",

    "Graph Neural AI",

    "XGBoost Risk",

    "Behavior Engine",

    "Anomaly Detector"

];

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function generate(){

    return models.map(model=>({

        model,

        accuracy:random(88,99),

        confidence:random(86,99),

        predictions:random(900,5000),

        latency:random(45,180)

    }));

}

function SegmentedBar({

    value,

    color

}:{

    value:number;

    color:string;

}){

    const blocks=20;

    const active=Math.round(value/5);

    return(

        <div

            style={{

                display:"grid",

                gridTemplateColumns:"repeat(20,1fr)",

                gap:1,

                marginTop:8

            }}

        >

            {

                Array.from({

                    length:blocks

                }).map((_,i)=>(

                    <div

                        key={i}

                        style={{

                            height:12,

                            borderRadius:1,

                            background:

                                i<active

                                    ? color

                                    : "#324760"

                        }}

                    />

                ))

            }

        </div>

    );

}

export default function AIModelAccuracy(){

    const [rows,setRows]=useState(generate());

    useEffect(()=>{

        const timer=setInterval(()=>{

            setRows(generate());

        },4000);

        return()=>clearInterval(timer);

    },[]);

    return(

        <EnterpriseCard

            title="AI Model Accuracy"

            height={620}

        >

            <div

                style={{

                    display:"flex",

                    flexDirection:"column",

                    gap:18

                }}

            >

                {

                    rows.map(item=>{

                        let color="#00E676";

                        if(item.accuracy<90)

                            color="#FA8C16";

                        if(item.accuracy<88)

                            color="#FF4D4F";

                        return(

                            <div

                                key={item.model}

                                style={{

                                    borderBottom:"1px solid #263D57",

                                    paddingBottom:14

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

                                                color:"#FFFFFF",

                                                fontWeight:700,

                                                fontSize:17

                                            }}

                                        >

                                            {item.model}

                                        </div>

                                        <div

                                            style={{

                                                color:"#8EA9CC",

                                                fontSize:13,

                                                marginTop:2

                                            }}

                                        >

                                            {item.predictions.toLocaleString()} Predictions

                                        </div>

                                    </div>

                                    <Tag

                                        color={color}

                                        style={{

                                            padding:"4px 12px",

                                            fontSize:15

                                        }}

                                    >

                                        {item.accuracy}% Accuracy

                                    </Tag>

                                </div>

                                <SegmentedBar

                                    value={item.accuracy}

                                    color={color}

                                />

                                <div

                                    style={{

                                        display:"flex",

                                        justifyContent:"space-between",

                                        marginTop:10

                                    }}

                                >

                                    <span

                                        style={{

                                            color:"#8EA9CC"

                                        }}

                                    >

                                        Confidence

                                    </span>

                                    <span

                                        style={{

                                            color:"#FFFFFF",

                                            fontWeight:700

                                        }}

                                    >

                                        {item.confidence}%

                                    </span>

                                </div>

                                <div

                                    style={{

                                        display:"flex",

                                        justifyContent:"space-between",

                                        marginTop:6

                                    }}

                                >

                                    <span

                                        style={{

                                            color:"#8EA9CC"

                                        }}

                                    >

                                        Average Inference Latency

                                    </span>

                                    <span

                                        style={{

                                            color:"#00E676",

                                            fontWeight:700

                                        }}

                                    >

                                        {item.latency} ms

                                    </span>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

            <div

                style={{

                    display:"flex",

                    justifyContent:"space-between",

                    marginTop:18,

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

                    ● LIVE AI TELEMETRY

                </span>

                <span>

                    Updated {new Date().toLocaleTimeString()}

                </span>

            </div>

        </EnterpriseCard>

    );

}