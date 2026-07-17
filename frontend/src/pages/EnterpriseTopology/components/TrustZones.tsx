import { useEffect, useState } from "react";

import {
    Tag,
    Progress
} from "antd";

import {
    GlobalOutlined,
    SafetyCertificateOutlined,
    CloudOutlined,
    ApartmentOutlined,
    ApiOutlined,
    GatewayOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Zone{

    id:number;

    name:string;

    icon:any;

    devices:number;

    health:number;

    traffic:string;

    risk:"LOW"|"MEDIUM"|"HIGH";

    color:string;

}

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function TrustZones(){

    const [zones,setZones]=useState<Zone[]>([]);

    function refresh(){

        setZones([

            {

                id:1,

                name:"Internet",

                icon:<GlobalOutlined/>,

                devices:0,

                health:100,

                traffic:"2.6 Gbps",

                risk:"LOW",

                color:"#1677FF"

            },

            {

                id:2,

                name:"DMZ",

                icon:<GatewayOutlined/>,

                devices:48,

                health:97,

                traffic:"4.8 Gbps",

                risk:"MEDIUM",

                color:"#13C2C2"

            },

            {

                id:3,

                name:"Corporate LAN",

                icon:<ApartmentOutlined/>,

                devices:684,

                health:99,

                traffic:"8.4 Gbps",

                risk:"LOW",

                color:"#00E676"

            },

            {

                id:4,

                name:"Cloud",

                icon:<CloudOutlined/>,

                devices:142,

                health:98,

                traffic:"6.3 Gbps",

                risk:"LOW",

                color:"#722ED1"

            },

            {

                id:5,

                name:"OT Network",

                icon:<SafetyCertificateOutlined/>,

                devices:81,

                health:92,

                traffic:"1.9 Gbps",

                risk:"HIGH",

                color:"#FAAD14"

            },

            {

                id:6,

                name:"Partner Network",

                icon:<ApiOutlined/>,

                devices:34,

                health:95,

                traffic:"900 Mbps",

                risk:"MEDIUM",

                color:"#FF4D4F"

            }

        ]);

    }

    useEffect(()=>{

        refresh();

        const timer=setInterval(()=>{

            setZones(previous=>

                previous.map(zone=>({

                    ...zone,

                    health:Math.max(

                        90,

                        Math.min(

                            100,

                            zone.health+random(-2,2)

                        )

                    )

                }))

            );

        },5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Enterprise Trust Zones"
            height={1400}
        >

            {/* Scrollable Zones */}

            <div
                className="zoneScroll"
                style={{
                    maxHeight:520,
                    overflowY:"auto",
                    display:"flex",
                    flexDirection:"column",
                    gap:16,
                    paddingRight:8
                }}
            >

                {

                    zones.map(zone=>(

                        <div
                            key={zone.id}
                            style={{
                                background:"#16253B",
                                border:"1px solid #29425E",
                                borderLeft:`5px solid ${zone.color}`,
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
                                            width:56,
                                            height:56,
                                            borderRadius:16,
                                            background:`${zone.color}22`,
                                            display:"flex",
                                            justifyContent:"center",
                                            alignItems:"center",
                                            color:zone.color,
                                            fontSize:28
                                        }}
                                    >
                                        {zone.icon}
                                    </div>

                                    <div>

                                        <div
                                            style={{
                                                color:"#FFFFFF",
                                                fontSize:17,
                                                fontWeight:700
                                            }}
                                        >
                                            {zone.name}
                                        </div>

                                        <div
                                            style={{
                                                color:"#8EA9CC",
                                                marginTop:5,
                                                fontSize:13
                                            }}
                                        >
                                            Secure Enterprise Zone
                                        </div>

                                    </div>

                                </div>

                                <Tag
                                    color={
                                        zone.risk==="HIGH"

                                        ?"red"

                                        :zone.risk==="MEDIUM"

                                        ?"orange"

                                        :"green"
                                    }
                                >

                                    {zone.risk}

                                </Tag>

                            </div>

                            {/* Health */}

                            <div
                                style={{
                                    marginTop:18
                                }}
                            >

                                <Progress
                                    percent={zone.health}
                                    showInfo={false}
                                    strokeColor={zone.color}
                                    trailColor="#223248"
                                />

                            </div>

                            {/* Statistics */}

                            <div
                                style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    marginTop:18,
                                    flexWrap:"wrap",
                                    rowGap:14
                                }}
                            >

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Devices
                                    </div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            marginTop:4,
                                            fontWeight:700
                                        }}
                                    >
                                        {zone.devices}
                                    </div>

                                </div>

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Traffic
                                    </div>

                                    <div
                                        style={{
                                            color:"#00E676",
                                            marginTop:4,
                                            fontWeight:700
                                        }}
                                    >
                                        {zone.traffic}
                                    </div>

                                </div>

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Health
                                    </div>

                                    <div
                                        style={{
                                            color:zone.color,
                                            marginTop:4,
                                            fontWeight:700
                                        }}
                                    >
                                        {zone.health}%
                                    </div>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

            {/* Oracle AI Insight */}

            <div
                style={{
                    marginTop:20,
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
                        marginBottom:10,
                        fontSize:16
                    }}
                >
                    Oracle AI Trust Zone Analysis
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >

                    Oracle AI continuously analyses communication
                    between trust zones, validates segmentation
                    policies, monitors lateral movement opportunities,
                    and detects abnormal traffic crossing security
                    boundaries before enterprise compromise.

                </div>

            </div>
                        {/* Trust Zone Summary */}

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
                    Trust Zone Summary
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
                            Active Trust Zones
                        </span>

                        <span
                            style={{
                                color:"#FFFFFF",
                                fontWeight:700
                            }}
                        >
                            {zones.length}
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >

                        <span style={{color:"#8EA9CC"}}>
                            Healthy Zones
                        </span>

                        <span
                            style={{
                                color:"#00E676",
                                fontWeight:700
                            }}
                        >
                            {
                                zones.filter(
                                    z=>z.health>=97
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
                            High Risk Zones
                        </span>

                        <span
                            style={{
                                color:"#FAAD14",
                                fontWeight:700
                            }}
                        >
                            {
                                zones.filter(
                                    z=>z.risk==="HIGH"
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
                            Average Health
                        </span>

                        <span
                            style={{
                                color:"#1677FF",
                                fontWeight:700
                            }}
                        >
                            {

                                Math.round(

                                    zones.reduce(
                                        (sum,z)=>sum+z.health,
                                        0
                                    )/zones.length

                                )

                            }%

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
                        Oracle AI Trust Intelligence
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13
                        }}
                    >
                        Oracle AI continuously evaluates enterprise
                        segmentation, validates trust relationships,
                        and monitors communication across secure zones
                        to minimize attack propagation and reduce
                        infrastructure risk.

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

.zoneScroll::-webkit-scrollbar{

width:8px;

}

.zoneScroll::-webkit-scrollbar-track{

background:#111C2D;

border-radius:20px;

}

.zoneScroll::-webkit-scrollbar-thumb{

background:#13C2C2;

border-radius:20px;

}

.zoneScroll::-webkit-scrollbar-thumb:hover{

background:#36CFC9;

}

.zoneScroll > div{

transition:.35s;

}

.zoneScroll > div:hover{

transform:translateY(-3px);

border-color:#13C2C2 !important;

box-shadow:0 10px 24px rgba(19,194,194,.18);

}

`}

            </style>

        </EnterpriseCard>

    );

}