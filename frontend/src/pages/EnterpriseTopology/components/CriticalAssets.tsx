import { useEffect, useState } from "react";

import {
    Tag,
    Progress
} from "antd";

import {
    DatabaseOutlined,
    DesktopOutlined,
    CloudServerOutlined,
    SafetyCertificateOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Asset{

    id:number;

    name:string;

    type:string;

    risk:string;

    health:number;

    icon:any;

    color:string;

    location:string;

}

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function CriticalAssets(){

    const [assets,setAssets]=useState<Asset[]>([]);

    function refresh(){

        setAssets([

            {

                id:1,

                name:"Domain Controller",

                type:"Identity",

                risk:"LOW",

                health:99,

                icon:<SafetyCertificateOutlined/>,

                color:"#00E676",

                location:"HQ"

            },

            {

                id:2,

                name:"Oracle Database",

                type:"Database",

                risk:"MEDIUM",

                health:96,

                icon:<DatabaseOutlined/>,

                color:"#1677FF",

                location:"Data Center"

            },

            {

                id:3,

                name:"Finance Server",

                type:"Application",

                risk:"HIGH",

                health:89,

                icon:<DesktopOutlined/>,

                color:"#FA8C16",

                location:"HQ"

            },

            {

                id:4,

                name:"SCADA Gateway",

                type:"OT",

                risk:"CRITICAL",

                health:83,

                icon:<CloudServerOutlined/>,

                color:"#FF4D4F",

                location:"Plant A"

            },

            {

                id:5,

                name:"Azure AD",

                type:"Cloud",

                risk:"LOW",

                health:98,

                icon:<CloudServerOutlined/>,

                color:"#13C2C2",

                location:"Azure"

            },

            {

                id:6,

                name:"VPN Gateway",

                type:"Network",

                risk:"MEDIUM",

                health:95,

                icon:<SafetyCertificateOutlined/>,

                color:"#722ED1",

                location:"DMZ"

            }

        ]);

    }

    useEffect(()=>{

        refresh();

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
                    )

                }))

            );

        },5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Critical Enterprise Assets"
            height={1400}
        >

            {/* Scrollable Asset List */}

            <div
                className="assetScroll"
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

                    assets.map(asset=>(

                        <div
                            key={asset.id}
                            style={{
                                background:"#16253B",
                                border:"1px solid #29425E",
                                borderLeft:`5px solid ${asset.color}`,
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
                                        gap:16,
                                        alignItems:"center"
                                    }}
                                >

                                    <div
                                        style={{
                                            width:56,
                                            height:56,
                                            borderRadius:16,
                                            background:`${asset.color}22`,
                                            color:asset.color,
                                            display:"flex",
                                            justifyContent:"center",
                                            alignItems:"center",
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
                                            {asset.name}
                                        </div>

                                        <div
                                            style={{
                                                color:"#8EA9CC",
                                                marginTop:5
                                            }}
                                        >
                                            {asset.type}
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

                            <div
                                style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    marginTop:12,
                                    flexWrap:"wrap",
                                    rowGap:10
                                }}
                            >

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
                                            marginTop:4
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
                                        Status
                                    </div>

                                    <div
                                        style={{
                                            marginTop:4
                                        }}
                                    >

                                        <Tag color="success">

                                            ONLINE

                                        </Tag>

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
                    padding:16
                }}
            >

                <div
                    style={{
                        color:"#00E676",
                        fontWeight:700,
                        marginBottom:10
                    }}
                >
                    Oracle AI Infrastructure Insight
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >

                    Oracle AI continuously evaluates the health,
                    availability and exposure of enterprise-critical
                    assets. High-value systems receive priority
                    monitoring and adaptive protection based on
                    topology relationships and threat intelligence.

                </div>

            </div>
                        {/* Asset Summary */}

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
                    Critical Asset Summary
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
                            Critical Assets
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
                                    a=>a.health>=95
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
                                    a=>a.risk==="HIGH" || a.risk==="CRITICAL"
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
                                        (sum,a)=>sum+a.health,
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
                        Continuously discovering enterprise assets,
                        analysing criticality, health and business
                        impact while maintaining a real-time
                        infrastructure inventory.

                    </div>

                </div>

                <Tag
                    color="success"
                    style={{
                        fontWeight:700,
                        padding:"4px 12px"
                    }}
                >
                    ● LIVE
                </Tag>

            </div>

            <style>

{`

.assetScroll::-webkit-scrollbar{

width:8px;

}

.assetScroll::-webkit-scrollbar-track{

background:#111C2D;

border-radius:20px;

}

.assetScroll::-webkit-scrollbar-thumb{

background:#1677FF;

border-radius:20px;

}

.assetScroll::-webkit-scrollbar-thumb:hover{

background:#4096FF;

}

.assetScroll > div{

transition:.35s;

}

.assetScroll > div:hover{

transform:translateY(-3px);

border-color:#1677FF !important;

box-shadow:0 10px 24px rgba(22,119,255,.15);

}

`}

            </style>

        </EnterpriseCard>

    );

}