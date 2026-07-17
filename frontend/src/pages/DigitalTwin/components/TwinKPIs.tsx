import { useEffect, useState } from "react";
import { Row, Col } from "antd";

import {
    SyncOutlined,
    CloudSyncOutlined,
    DeploymentUnitOutlined,
    WarningOutlined,
    RadarChartOutlined,
    SafetyCertificateOutlined
} from "@ant-design/icons";

interface KPI{

    title:string;

    value:string;

    subtitle:string;

    icon:any;

    color:string;

    trend:string;

}

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function TwinKPIs(){

    const [kpis,setKpis]=useState<KPI[]>([]);

    function refresh(){

        setKpis([

            {
                title:"Twin Accuracy",
                value:`${random(97,100)}%`,
                subtitle:"Oracle AI Sync",
                icon:<SyncOutlined/>,
                color:"#00E676",
                trend:"Synchronized"
            },

            {
                title:"Synced Assets",
                value:String(random(1480,1560)),
                subtitle:"Infrastructure",
                icon:<CloudSyncOutlined/>,
                color:"#1677FF",
                trend:`+${random(8,24)} Updated`
            },

            {
                title:"Live Simulations",
                value:String(random(12,24)),
                subtitle:"Running",
                icon:<DeploymentUnitOutlined/>,
                color:"#13C2C2",
                trend:"Processing"
            },

            {
                title:"Predicted Failures",
                value:String(random(2,8)),
                subtitle:"Next 24 Hours",
                icon:<WarningOutlined/>,
                color:"#FAAD14",
                trend:"Forecast"
            },

            {
                title:"Risk Forecast",
                value:`${random(91,99)}%`,
                subtitle:"Prediction Engine",
                icon:<RadarChartOutlined/>,
                color:"#722ED1",
                trend:"AI Learning"
            },

            {
                title:"Oracle Confidence",
                value:`${random(96,99)}%`,
                subtitle:"Digital Twin AI",
                icon:<SafetyCertificateOutlined/>,
                color:"#00E676",
                trend:"Verified"
            }

        ]);

    }

    useEffect(()=>{

        refresh();

        const timer=setInterval(refresh,5000);

        return()=>clearInterval(timer);

    },[]);

    return(

        <Row gutter={[16,16]}>

            {

                kpis.map(item=>(

                    <Col
                        key={item.title}
                        xs={24}
                        sm={12}
                        lg={8}
                        xl={4}
                        xxl={4}
                    >

                        <div
                            style={{

                                background:"#17263B",

                                border:"1px solid #2A3D56",

                                borderRadius:16,

                                padding:18,

                                height:255,

                                display:"flex",

                                flexDirection:"column",

                                justifyContent:"space-between",

                                transition:"all .35s"

                            }}
                            className="twinCard"
                        >

                            {/* TOP */}

                            <div>

                                <div
                                    style={{

                                        display:"flex",

                                        justifyContent:"space-between",

                                        alignItems:"flex-start"

                                    }}
                                >

                                    <div>

                                        <div
                                            style={{

                                                color:"#8EA9CC",

                                                fontSize:13,

                                                fontWeight:500

                                            }}
                                        >

                                            {item.title}

                                        </div>

                                        <div
                                            className="twinKPIValue"
                                            style={{

                                                fontSize:30,

                                                fontWeight:800,

                                                color:"#FFFFFF",

                                                marginTop:8,

                                                lineHeight:1

                                            }}
                                        >

                                            {item.value}

                                        </div>

                                        <div
                                            style={{

                                                color:"#7D96B3",

                                                fontSize:12,

                                                marginTop:6

                                            }}
                                        >

                                            {item.subtitle}

                                        </div>

                                    </div>

                                    <div
                                        className="twinKPIIcon"
                                        style={{

                                            width:54,

                                            height:54,

                                            borderRadius:14,

                                            background:`${item.color}20`,

                                            display:"flex",

                                            justifyContent:"center",

                                            alignItems:"center",

                                            fontSize:24,

                                            color:item.color,

                                            flexShrink:0

                                        }}
                                    >

                                        {item.icon}

                                    </div>

                                </div>

                            </div>

                            {/* BOTTOM */}

                            <div>

                                <div
                                    style={{

                                        display:"flex",

                                        justifyContent:"space-between",

                                        alignItems:"center"

                                    }}
                                >

                                    <span
                                        style={{

                                            color:item.color,

                                            fontWeight:700,

                                            fontSize:13

                                        }}
                                    >

                                        {item.trend}

                                    </span>

                                    <span
                                        className="twinLiveDot"
                                    />

                                </div>

                                <div
                                    style={{

                                        marginTop:10,

                                        height:5,

                                        background:"#23354A",

                                        borderRadius:20,

                                        overflow:"hidden"

                                    }}
                                >

                                    <div
                                        className="twinProgress"
                                        style={{

                                            width:`${random(90,98)}%`,

                                            height:"100%",

                                            background:item.color,

                                            borderRadius:20

                                        }}
                                    />

                                </div>

                                <div
                                    style={{

                                        marginTop:14,

                                        paddingTop:10,

                                        borderTop:"1px solid #26384F",

                                        display:"flex",

                                        justifyContent:"space-between",

                                        alignItems:"center"

                                    }}
                                >
                                                                        <span
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:11,
                                            fontWeight:500
                                        }}
                                    >
                                        Oracle Digital Twin
                                    </span>

                                    <span
                                        style={{
                                            color:"#00E676",
                                            fontSize:11,
                                            fontWeight:700
                                        }}
                                    >
                                        LIVE
                                    </span>

                                </div>

                            </div>

                        </div>

                    </Col>

                ))

            }

        </Row>

    );

}

const styles = `

.twinCard{

transition:all .35s ease;

cursor:pointer;

}

.twinCard:hover{

transform:translateY(-6px);

border-color:#3B82F6;

box-shadow:0 12px 30px rgba(0,0,0,.35);

}

.twinKPIValue{

animation:twinValuePulse 3s ease-in-out infinite;

}

.twinKPIIcon{

animation:twinFloat 4s ease-in-out infinite;

transition:.35s;

}

.twinCard:hover .twinKPIIcon{

transform:scale(1.08);

}

.twinLiveDot{

width:8px;

height:8px;

border-radius:50%;

background:#00E676;

box-shadow:0 0 10px #00E676;

animation:twinLivePulse 1.8s infinite;

}

.twinProgress{

animation:twinProgressMove 4s ease-in-out infinite;

}

@keyframes twinFloat{

0%{

transform:translateY(0px);

}

50%{

transform:translateY(-4px);

}

100%{

transform:translateY(0px);

}

}

@keyframes twinLivePulse{

0%{

transform:scale(.8);

opacity:.7;

}

50%{

transform:scale(1.4);

opacity:1;

box-shadow:0 0 14px #00E676;

}

100%{

transform:scale(.8);

opacity:.7;

}

}

@keyframes twinProgressMove{

0%{

opacity:.8;

}

50%{

opacity:1;

}

100%{

opacity:.8;

}

}

@keyframes twinValuePulse{

0%{

transform:scale(1);

}

50%{

transform:scale(1.03);

text-shadow:0 0 12px rgba(255,255,255,.18);

}

100%{

transform:scale(1);

}

}

`;

export const TwinKPIsStyles = styles;
                            