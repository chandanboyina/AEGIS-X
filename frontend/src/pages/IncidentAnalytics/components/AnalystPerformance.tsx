import { useEffect, useState } from "react";
import { Tag } from "antd";
import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

const analysts = [

    "SOC L1 - Alice",

    "SOC L1 - John",

    "SOC L2 - Michael",

    "SOC L2 - Sophia",

    "Threat Hunter",

    "IR Lead"

];

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function generate(){

    return analysts.map(name=>({

        name,

        handled:random(15,120),

        sla:random(82,99),

        falsePositive:random(2,18),

        workload:random(20,95)

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

export default function AnalystPerformance(){

    const [rows,setRows]=useState(generate());

    useEffect(()=>{

        const timer=setInterval(()=>{

            setRows(generate());

        },5000);

        return()=>clearInterval(timer);

    },[]);

    return(

        <EnterpriseCard

            title="SOC Analyst Performance"

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

                        if(item.workload>70)

                            color="#FA8C16";

                        if(item.workload>90)

                            color="#FF4D4F";

                        return(

                            <div

                                key={item.name}

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

                                                color:"#FFF",

                                                fontWeight:700,

                                                fontSize:17

                                            }}

                                        >

                                            {item.name}

                                        </div>

                                        <div

                                            style={{

                                                color:"#8EA9CC",

                                                marginTop:2

                                            }}

                                        >

                                            {item.handled} Cases Resolved

                                        </div>

                                    </div>

                                    <Tag

                                        color={color}

                                        style={{

                                            padding:"4px 12px",

                                            fontSize:15

                                        }}

                                    >

                                        {item.workload}% Load

                                    </Tag>

                                </div>

                                <SegmentedBar

                                    value={item.workload}

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

                                        SLA Compliance

                                    </span>

                                    <span

                                        style={{

                                            color:"#FFFFFF",

                                            fontWeight:700

                                        }}

                                    >

                                        {item.sla}%

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

                                        False Positives

                                    </span>

                                    <span

                                        style={{

                                            color:"#FFFFFF",

                                            fontWeight:700

                                        }}

                                    >

                                        {item.falsePositive}

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

                    ● LIVE SOC OPERATIONS

                </span>

                <span>

                    Updated {new Date().toLocaleTimeString()}

                </span>

            </div>

        </EnterpriseCard>

    );

}