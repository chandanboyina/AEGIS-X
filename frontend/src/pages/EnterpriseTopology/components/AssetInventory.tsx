import { useEffect, useState } from "react";

import {
    Tag,
    Progress
} from "antd";

import {
    DesktopOutlined,
    CloudServerOutlined,
    DatabaseOutlined,
    LaptopOutlined,
    SafetyCertificateOutlined,
    ApiOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Asset{

    hostname:string;

    ip:string;

    os:string;

    location:string;

    risk:"LOW"|"MEDIUM"|"HIGH"|"CRITICAL";

    health:number;

    lastSeen:string;

    icon:any;

    color:string;

}

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function AssetInventory(){

    const [assets,setAssets]=useState<Asset[]>([]);

    function buildAssets(){

        setAssets([

            {

                hostname:"DC-01",

                ip:"10.10.1.5",

                os:"Windows Server 2022",

                location:"HQ",

                risk:"LOW",

                health:99,

                lastSeen:"3 sec ago",

                icon:<SafetyCertificateOutlined/>,

                color:"#00E676"

            },

            {

                hostname:"Oracle-DB",

                ip:"10.10.2.20",

                os:"Oracle Linux",

                location:"Data Center",

                risk:"MEDIUM",

                health:96,

                lastSeen:"5 sec ago",

                icon:<DatabaseOutlined/>,

                color:"#1677FF"

            },

            {

                hostname:"Finance-APP",

                ip:"10.10.5.17",

                os:"Ubuntu 24.04",

                location:"HQ",

                risk:"HIGH",

                health:91,

                lastSeen:"2 sec ago",

                icon:<DesktopOutlined/>,

                color:"#FAAD14"

            },

            {

                hostname:"Azure-Gateway",

                ip:"172.16.10.4",

                os:"Azure VM",

                location:"Azure",

                risk:"LOW",

                health:98,

                lastSeen:"1 sec ago",

                icon:<CloudServerOutlined/>,

                color:"#13C2C2"

            },

            {

                hostname:"Engineer-Laptop",

                ip:"10.10.20.84",

                os:"Windows 11",

                location:"Corporate",

                risk:"MEDIUM",

                health:94,

                lastSeen:"8 sec ago",

                icon:<LaptopOutlined/>,

                color:"#722ED1"

            },

            {

                hostname:"API-Gateway",

                ip:"10.10.40.9",

                os:"Rocky Linux",

                location:"DMZ",

                risk:"CRITICAL",

                health:86,

                lastSeen:"4 sec ago",

                icon:<ApiOutlined/>,

                color:"#FF4D4F"

            }

        ]);

    }

    useEffect(()=>{

        buildAssets();

        const timer=setInterval(()=>{

            setAssets(previous=>

                previous.map(asset=>({

                    ...asset,

                    health:Math.max(

                        80,

                        Math.min(

                            100,

                            asset.health+random(-2,2)

                        )

                    ),

                    lastSeen:`${random(1,9)} sec ago`

                }))

            );

        },5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Enterprise Asset Inventory"
            height={1200}
        >

            {/* Scrollable Asset Inventory */}

            <div
                className="inventoryScroll"
                style={{
                    maxHeight:540,
                    overflowY:"auto",
                    display:"flex",
                    flexDirection:"column",
                    gap:16,
                    paddingRight:8
                }}
            >

                {

                    assets.map((asset,index)=>(

                        <div
                            key={index}
                            style={{
                                background:"#16253B",
                                border:"1px solid #29425E",
                                borderLeft:`5px solid ${asset.color}`,
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
                                            background:`${asset.color}22`,
                                            display:"flex",
                                            justifyContent:"center",
                                            alignItems:"center",
                                            color:asset.color,
                                            fontSize:28
                                        }}
                                    >

                                        {asset.icon}

                                    </div>

                                    <div>

                                        <div
                                            style={{
                                                color:"#FFFFFF",
                                                fontSize:17,
                                                fontWeight:700
                                            }}
                                        >
                                            {asset.hostname}
                                        </div>

                                        <div
                                            style={{
                                                color:"#8EA9CC",
                                                marginTop:5,
                                                fontSize:13
                                            }}
                                        >
                                            {asset.os}
                                        </div>

                                    </div>

                                </div>

                                <Tag
                                    color={
                                        asset.risk==="CRITICAL"

                                        ?"red"

                                        :asset.risk==="HIGH"

                                        ?"orange"

                                        :asset.risk==="MEDIUM"

                                        ?"blue"

                                        :"green"
                                    }
                                >

                                    {asset.risk}

                                </Tag>

                            </div>

                            {/* Health */}

                            <div
                                style={{
                                    marginTop:18
                                }}
                            >

                                <Progress
                                    percent={asset.health}
                                    showInfo={false}
                                    strokeColor={asset.color}
                                    trailColor="#223248"
                                />

                            </div>

                            {/* Details */}

                            <div
                                style={{
                                    display:"grid",
                                    gridTemplateColumns:"repeat(4,1fr)",
                                    gap:18,
                                    marginTop:18
                                }}
                            >

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        IP Address
                                    </div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            marginTop:4,
                                            fontWeight:600
                                        }}
                                    >
                                        {asset.ip}
                                    </div>

                                </div>

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Location
                                    </div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            marginTop:4,
                                            fontWeight:600
                                        }}
                                    >
                                        {asset.location}
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
                                            color:asset.color,
                                            marginTop:4,
                                            fontWeight:700
                                        }}
                                    >
                                        {asset.health}%
                                    </div>

                                </div>

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Last Seen
                                    </div>

                                    <div
                                        style={{
                                            color:"#00E676",
                                            marginTop:4,
                                            fontWeight:700
                                        }}
                                    >
                                        {asset.lastSeen}
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
                        marginBottom:10
                    }}
                >
                    Oracle AI Asset Discovery
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >

                    Oracle AI continuously discovers enterprise
                    assets, validates inventory accuracy,
                    correlates endpoint telemetry, and identifies
                    unmanaged systems that increase the organization's
                    attack surface. Assets are automatically classified
                    according to business criticality and operational
                    risk.

                </div>

            </div>
                        {/* Asset Inventory Summary */}

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
                    Asset Inventory Summary
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
                            Total Assets
                        </span>

                        <span
                            style={{
                                color:"#FFFFFF",
                                fontWeight:700
                            }}
                        >
                            {assets.length}
                        </span>
                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >
                        <span style={{color:"#8EA9CC"}}>
                            Healthy Assets
                        </span>

                        <span
                            style={{
                                color:"#00E676",
                                fontWeight:700
                            }}
                        >
                            {
                                assets.filter(
                                    asset=>asset.health>=95
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
                            High Risk Assets
                        </span>

                        <span
                            style={{
                                color:"#FAAD14",
                                fontWeight:700
                            }}
                        >
                            {
                                assets.filter(
                                    asset=>

                                        asset.risk==="HIGH" ||

                                        asset.risk==="CRITICAL"

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

                                    assets.reduce(

                                        (sum,asset)=>

                                            sum+asset.health,

                                        0

                                    )/assets.length

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
                        Oracle AI Asset Intelligence
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13
                        }}
                    >
                        Oracle AI maintains a continuously updated
                        inventory of enterprise infrastructure,
                        correlating endpoint health, business
                        criticality, operating systems, network
                        location and security posture into a unified
                        infrastructure view.

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

.inventoryScroll::-webkit-scrollbar{

width:8px;

}

.inventoryScroll::-webkit-scrollbar-track{

background:#111C2D;

border-radius:20px;

}

.inventoryScroll::-webkit-scrollbar-thumb{

background:#1677FF;

border-radius:20px;

}

.inventoryScroll::-webkit-scrollbar-thumb:hover{

background:#4096FF;

}

.inventoryScroll>div{

transition:.35s;

}

.inventoryScroll>div:hover{

transform:translateY(-4px);

border-color:#1677FF !important;

box-shadow:0 10px 26px rgba(22,119,255,.18);

}

`}

            </style>

        </EnterpriseCard>

    );

}