import { useEffect, useState } from "react";

import { Row, Col } from "antd";

import {
    UserOutlined,
    WarningOutlined,
    SafetyCertificateOutlined,
    RadarChartOutlined,
    ApartmentOutlined,
    RiseOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface KPI {

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

export default function BehaviourKPIs(){

    const [kpis,setKpis]=useState<KPI[]>([]);

    function refresh(){

        setKpis([

            {

                title:"High Risk Users",

                value:String(random(12,28)),

                subtitle:"AI Risk Engine",

                icon:<UserOutlined/>,

                color:"#FF4D4F",

                trend:`▲ +${random(1,4)} Today`

            },

            {

                title:"Behaviour Anomalies",

                value:String(random(85,130)),

                subtitle:"Live Detection",

                icon:<WarningOutlined/>,

                color:"#FA8C16",

                trend:`+${random(5,15)} Events`

            },

            {

                title:"UEBA Confidence",

                value:`${random(95,99)}%`,

                subtitle:"Oracle AI",

                icon:<SafetyCertificateOutlined/>,

                color:"#00E676",

                trend:"Stable"

            },

            {

                title:"Insider Threats",

                value:String(random(3,8)),

                subtitle:"Under Investigation",

                icon:<RadarChartOutlined/>,

                color:"#722ED1",

                trend:"LIVE"

            },

            {

                title:"Lateral Movement",

                value:String(random(2,7)),

                subtitle:"Predicted Paths",

                icon:<ApartmentOutlined/>,

                color:"#1677FF",

                trend:"Tracking"

            },

            {

                title:"Learning Accuracy",

                value:`${random(97,100)}%`,

                subtitle:"Oracle AI Model",

                icon:<RiseOutlined/>,

                color:"#13C2C2",

                trend:"Improving"

            }

        ]);

    }

    useEffect(()=>{

        refresh();

        const timer=setInterval(refresh,5000);

        return()=>clearInterval(timer);

    },[]);
        return (

        <Row gutter={[20,20]}>

            {

                kpis.map((item)=>(

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                        xl={4}
                        key={item.title}
                    >

                        <EnterpriseCard
                        title=""
                            height={300}
                        >

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
                                            fontSize:15
                                        }}
                                    >
                                        {item.title}
                                    </div>

                                    <div
                                        className="kpiValue"
                                        style={{
                                            color:"#FFFFFF",
                                            fontSize:42,
                                            fontWeight:800,
                                            marginTop:8
                                        }}
                                    >
                                        {item.value}
                                    </div>

                                    <div
                                        style={{
                                            color:"#7D96B3",
                                            marginTop:4
                                        }}
                                    >
                                        {item.subtitle}
                                    </div>

                                </div>

                                <div
                                    className="kpiIcon"
                                    style={{
                                        width:64,
                                        height:64,
                                        borderRadius:18,
                                        display:"flex",
                                        justifyContent:"center",
                                        alignItems:"center",
                                        fontSize:30,
                                        color:item.color,
                                        background:`${item.color}22`
                                    }}
                                >
                                    {item.icon}
                                </div>

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
                                        alignItems:"center"
                                    }}
                                >

                                    <span
                                        style={{
                                            color:item.color,
                                            fontWeight:700
                                        }}
                                    >
                                        {item.trend}
                                    </span>

                                    <span
                                        className="liveDot"
                                    />

                                </div>

                                <div
                                    style={{
                                        marginTop:12,
                                        height:6,
                                        borderRadius:20,
                                        background:"#15253B",
                                        overflow:"hidden"
                                    }}
                                >

                                    <div
                                        className="progressAnimation"
                                        style={{
                                            width:`${90+random(5,10)}%`,
                                            height:"100%",
                                            background:item.color,
                                            borderRadius:20
                                        }}
                                    />

                                </div>

                            </div>

                        </EnterpriseCard>

                    </Col>

                ))

            }

        </Row>

    );

}

const styles = `

.kpiValue{

animation:kpiPulse 2.5s infinite;

}

.kpiIcon{

animation:floatIcon 4s ease-in-out infinite;

}

.liveDot{

width:10px;

height:10px;

border-radius:50%;

background:#00E676;

box-shadow:0 0 12px #00E676;

animation:livePulse 1.5s infinite;

}

.progressAnimation{

animation:progressMove 5s linear infinite;

}

@keyframes livePulse{

0%{

transform:scale(.9);

opacity:.7;

}

50%{

transform:scale(1.4);

opacity:1;

box-shadow:0 0 18px #00E676;

}

100%{

transform:scale(.9);

opacity:.7;

}

}

@keyframes floatIcon{

0%{

transform:translateY(0px);

}

50%{

transform:translateY(-6px);

}

100%{

transform:translateY(0px);

}

}

@keyframes progressMove{

0%{

transform:translateX(-25px);

opacity:.8;

}

50%{

transform:translateX(0px);

opacity:1;

}

100%{

transform:translateX(25px);

opacity:.8;

}

}

@keyframes kpiPulse{

0%{

transform:scale(1);

}

50%{

transform:scale(1.05);

text-shadow:0 0 18px rgba(255,255,255,.18);

}

100%{

transform:scale(1);

}

}

.ant-card{

transition:.35s;

}

.ant-card:hover{

transform:translateY(-4px);

box-shadow:0 10px 28px rgba(0,0,0,.35);

}

`;

export const BehaviourKPIsStyles = styles;