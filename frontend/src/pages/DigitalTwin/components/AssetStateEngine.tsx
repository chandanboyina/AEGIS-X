import { useEffect, useState } from "react";

import {
    Tag,
    Progress
} from "antd";

import {
    DatabaseOutlined,
    CloudServerOutlined,
    DesktopOutlined,
    ApiOutlined,
    SafetyCertificateOutlined,
    ApartmentOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface AssetState{

    id:number;

    name:string;

    status:string;

    cpu:number;

    memory:number;

    sync:number;

    icon:any;

    color:string;

}

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function AssetStateEngine(){

    const [assets,setAssets]=useState<AssetState[]>([]);

    function refresh(){

        setAssets([

            {

                id:1,

                name:"Oracle Database",

                status:"Healthy",

                cpu:random(18,34),

                memory:random(46,60),

                sync:99,

                icon:<DatabaseOutlined/>,

                color:"#722ED1"

            },

            {

                id:2,

                name:"Edge Firewall",

                status:"Monitoring",

                cpu:random(22,38),

                memory:random(44,58),

                sync:98,

                icon:<SafetyCertificateOutlined/>,

                color:"#FAAD14"

            },

            {

                id:3,

                name:"Cloud Gateway",

                status:"Healthy",

                cpu:random(20,42),

                memory:random(40,66),

                sync:97,

                icon:<CloudServerOutlined/>,

                color:"#13C2C2"

            },

            {

                id:4,

                name:"Application Server",

                status:"High Load",

                cpu:random(60,82),

                memory:random(70,90),

                sync:96,

                icon:<ApiOutlined/>,

                color:"#1677FF"

            },

            {

                id:5,

                name:"Endpoints",

                status:"Protected",

                cpu:random(16,30),

                memory:random(36,55),

                sync:99,

                icon:<DesktopOutlined/>,

                color:"#00E676"

            },

            {

                id:6,

                name:"Core Switch",

                status:"Operational",

                cpu:random(24,40),

                memory:random(45,60),

                sync:98,

                icon:<ApartmentOutlined/>,

                color:"#52C41A"

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
            title="Oracle AI Asset State Engine"
            height={1550}
        >

            {/* Asset State List */}

            <div
                className="assetStateScroll"
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
                                                fontWeight:700,
                                                fontSize:17
                                            }}
                                        >
                                            {asset.name}
                                        </div>

                                        <div
                                            style={{
                                                color:"#8EA9CC",
                                                marginTop:5,
                                                fontSize:13
                                            }}
                                        >
                                            Runtime Digital Twin State
                                        </div>

                                    </div>

                                </div>

                                <Tag
                                    color={
                                        asset.status==="Healthy"

                                        ?"green"

                                        :asset.status==="Protected"

                                        ?"cyan"

                                        :asset.status==="Operational"

                                        ?"blue"

                                        :asset.status==="Monitoring"

                                        ?"orange"

                                        :"red"
                                    }
                                >

                                    {asset.status}

                                </Tag>

                            </div>

                            {/* CPU */}

                            <div
                                style={{
                                    marginTop:18
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
                                        CPU Usage
                                    </span>

                                    <span
                                        style={{
                                            color:"#FFFFFF",
                                            fontWeight:700
                                        }}
                                    >
                                        {asset.cpu}%
                                    </span>

                                </div>

                                <Progress
                                    percent={asset.cpu}
                                    showInfo={false}
                                    strokeColor="#1677FF"
                                    trailColor="#223248"
                                />

                            </div>

                            {/* Memory */}

                            <div
                                style={{
                                    marginTop:16
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
                                        Memory Usage
                                    </span>

                                    <span
                                        style={{
                                            color:"#FFFFFF",
                                            fontWeight:700
                                        }}
                                    >
                                        {asset.memory}%
                                    </span>

                                </div>

                                <Progress
                                    percent={asset.memory}
                                    showInfo={false}
                                    strokeColor="#722ED1"
                                    trailColor="#223248"
                                />

                            </div>

                            {/* Bottom */}

                            <div
                                style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    alignItems:"center",
                                    marginTop:18,
                                    paddingTop:14,
                                    borderTop:"1px solid #26384F"
                                }}
                            >

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Twin Synchronization
                                    </div>

                                    <div
                                        style={{
                                            color:"#00E676",
                                            fontWeight:700,
                                            marginTop:5
                                        }}
                                    >
                                        {asset.sync}%
                                    </div>

                                </div>

                                <Tag
                                    color="success"
                                    style={{
                                        fontWeight:700
                                    }}
                                >
                                    ● LIVE
                                </Tag>

                            </div>

                        </div>

                    ))

                }

            </div>

            {/* Oracle AI */}

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
                    Oracle AI Runtime State Engine
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.85
                    }}
                >

                    Oracle AI continuously synchronizes every
                    infrastructure component with its Digital Twin,
                    monitoring CPU utilization, memory consumption,
                    operational health and synchronization status.
                    Runtime changes are reflected instantly, enabling
                    predictive maintenance and autonomous operational
                    decision-making.

                </div>

            </div>
                        {/* Runtime Summary */}

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
                    Runtime State Summary
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

                            Active Assets

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

                                    a=>

                                        a.status==="Healthy" ||

                                        a.status==="Protected" ||

                                        a.status==="Operational"

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

                            Average CPU

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

                                        (sum,a)=>sum+a.cpu,

                                        0

                                    )/assets.length

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

                            Average Memory

                        </span>

                        <span
                            style={{
                                color:"#722ED1",
                                fontWeight:700
                            }}
                        >

                            {

                                Math.round(

                                    assets.reduce(

                                        (sum,a)=>sum+a.memory,

                                        0

                                    )/assets.length

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

                            Twin Synchronization

                        </span>

                        <span
                            style={{
                                color:"#13C2C2",
                                fontWeight:700
                            }}
                        >

                            {

                                Math.round(

                                    assets.reduce(

                                        (sum,a)=>sum+a.sync,

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
                        Oracle AI Runtime Intelligence
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13,
                            lineHeight:1.7
                        }}
                    >
                        Oracle AI continuously evaluates runtime
                        behaviour, infrastructure utilization,
                        synchronization health and operational
                        telemetry across the Digital Twin to ensure
                        every virtual asset accurately reflects the
                        physical enterprise environment.

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

.assetStateScroll::-webkit-scrollbar{

width:8px;

}

.assetStateScroll::-webkit-scrollbar-track{

background:#111C2D;

border-radius:20px;

}

.assetStateScroll::-webkit-scrollbar-thumb{

background:#00E676;

border-radius:20px;

}

.assetStateScroll::-webkit-scrollbar-thumb:hover{

background:#36CFC9;

}

.assetStateScroll>div{

transition:.35s;

}

.assetStateScroll>div:hover{

transform:translateY(-4px);

border-color:#00E676 !important;

box-shadow:0 10px 28px rgba(0,230,118,.18);

}

.ant-progress-bg{

transition:all .8s ease;

}

`}

            </style>

        </EnterpriseCard>

    );

}