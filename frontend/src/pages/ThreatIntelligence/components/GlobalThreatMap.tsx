import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Tag,
    Progress
} from "antd";

import {
    GlobalOutlined,
    ThunderboltOutlined,
    WarningOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Region{

    region:string;

    attacks:number;

    confidence:number;

    level:"LOW"|"MEDIUM"|"HIGH"|"CRITICAL";

}

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function generateRegions():Region[]{

    return[

        {

            region:"North America",

            attacks:random(40,90),

            confidence:random(94,99),

            level:"HIGH"

        },

        {

            region:"Europe",

            attacks:random(30,70),

            confidence:random(92,99),

            level:"MEDIUM"

        },

        {

            region:"Asia Pacific",

            attacks:random(60,120),

            confidence:random(95,99),

            level:"CRITICAL"

        },

        {

            region:"Middle East",

            attacks:random(15,40),

            confidence:random(90,98),

            level:"MEDIUM"

        },

        {

            region:"Africa",

            attacks:random(8,28),

            confidence:random(89,97),

            level:"LOW"

        },

        {

            region:"South America",

            attacks:random(18,45),

            confidence:random(91,98),

            level:"MEDIUM"

        }

    ];

}

export default function GlobalThreatMap(){

    const [regions,setRegions]=useState<Region[]>(

        generateRegions()

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            setRegions(

                generateRegions()

            );

        },6000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Oracle Global Threat Intelligence"
            height={1000}
        >

            <Row gutter={[20,20]}>

                {/* Global Regions */}

                <Col xs={24} lg={16}>

                    <Row gutter={[18,18]}>

                        {

                            regions.map(region=>(

                                <Col
                                    xs={24}
                                    md={12}
                                    key={region.region}
                                >

                                    <div
                                        style={{
                                            background:"#16253B",
                                            border:"1px solid #2A415D",
                                            borderLeft:
                                                region.level==="CRITICAL"

                                                ?"5px solid #FF4D4F"

                                                :region.level==="HIGH"

                                                ?"5px solid #FA8C16"

                                                :region.level==="MEDIUM"

                                                ?"5px solid #2D7CFF"

                                                :"5px solid #00E676",

                                            borderRadius:12,

                                            padding:18,

                                            height:170
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
                                                    gap:10
                                                }}
                                            >

                                                <GlobalOutlined
                                                    style={{
                                                        fontSize:24,
                                                        color:"#2D7CFF"
                                                    }}
                                                />

                                                <div
                                                    style={{
                                                        color:"#FFFFFF",
                                                        fontSize:18,
                                                        fontWeight:700
                                                    }}
                                                >
                                                    {region.region}
                                                </div>

                                            </div>

                                            <Tag
                                                color={
                                                    region.level==="CRITICAL"

                                                    ?"red"

                                                    :region.level==="HIGH"

                                                    ?"orange"

                                                    :region.level==="MEDIUM"

                                                    ?"blue"

                                                    :"green"
                                                }
                                            >
                                                {region.level}
                                            </Tag>

                                        </div>

                                        <div
                                            style={{
                                                marginTop:22,
                                                display:"flex",
                                                justifyContent:"space-between"
                                            }}
                                        >

                                            <div>

                                                <div
                                                    style={{
                                                        color:"#8EA9CC",
                                                        fontSize:13
                                                    }}
                                                >
                                                    Active Attacks
                                                </div>

                                                <div
                                                    style={{
                                                        color:"#FFFFFF",
                                                        fontSize:36,
                                                        fontWeight:700,
                                                        marginTop:6
                                                    }}
                                                >
                                                    {region.attacks}
                                                </div>

                                            </div>

                                            <div
                                                style={{
                                                    textAlign:"right"
                                                }}
                                            >

                                                <div
                                                    style={{
                                                        color:"#8EA9CC",
                                                        fontSize:13
                                                    }}
                                                >
                                                    AI Confidence
                                                </div>

                                                <div
                                                    style={{
                                                        color:"#00E676",
                                                        fontSize:26,
                                                        fontWeight:700,
                                                        marginTop:8
                                                    }}
                                                >
                                                    {region.confidence}%
                                                </div>

                                            </div>

                                        </div>

                                        <Progress
                                            percent={region.confidence}
                                            showInfo={false}
                                            strokeColor="#00E676"
                                            style={{
                                                marginTop:18
                                            }}
                                        />

                                    </div>

                                </Col>

                            ))

                        }

                    </Row>

                </Col>

                {/* Oracle AI Insight */}

                <Col xs={24} lg={8}>

                    <div
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            gap:18
                        }}
                    >

                        <div
                            style={{
                                background:"#102033",
                                borderLeft:"4px solid #00E676",
                                borderRadius:12,
                                padding:20
                            }}
                        >

                            <div
                                style={{
                                    display:"flex",
                                    alignItems:"center",
                                    gap:10,
                                    marginBottom:16
                                }}
                            >

                                <ThunderboltOutlined
                                    style={{
                                        color:"#00E676",
                                        fontSize:22
                                    }}
                                />

                                <span
                                    style={{
                                        color:"#FFFFFF",
                                        fontWeight:700,
                                        fontSize:18
                                    }}
                                >
                                    Oracle AI Insight
                                </span>

                            </div>

                            <div
                                style={{
                                    color:"#DCE8F4",
                                    lineHeight:1.9
                                }}
                            >

                                Asia Pacific currently exhibits the highest
                                concentration of coordinated cyber activity.
                                Oracle AI predicts increased exploitation
                                attempts targeting government cloud
                                infrastructure over the next few hours.

                            </div>

                        </div>

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:20
                            }}
                        >

                            <div
                                style={{
                                    display:"flex",
                                    alignItems:"center",
                                    gap:10,
                                    marginBottom:16
                                }}
                            >

                                <WarningOutlined
                                    style={{
                                        color:"#FF4D4F",
                                        fontSize:22
                                    }}
                                />

                                <span
                                    style={{
                                        color:"#FFFFFF",
                                        fontWeight:700
                                    }}
                                >
                                    Top Active Region
                                </span>

                            </div>

                            <div
                                style={{
                                    color:"#FFFFFF",
                                    fontSize:24,
                                    fontWeight:700
                                }}
                            >
                                Asia Pacific
                            </div>

                            <div
                                style={{
                                    marginTop:10,
                                    color:"#8EA9CC",
                                    lineHeight:1.8
                                }}
                            >
                                Highest observed attack volume with elevated
                                ransomware and credential abuse campaigns.
                            </div>

                        </div>
                                                <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:20
                            }}
                        >

                            <div
                                style={{
                                    color:"#FFFFFF",
                                    fontWeight:700,
                                    fontSize:18,
                                    marginBottom:18
                                }}
                            >
                                Live Intelligence Summary
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
                                        Global Campaigns
                                    </span>

                                    <span
                                        style={{
                                            color:"#FFFFFF",
                                            fontWeight:700
                                        }}
                                    >
                                        148
                                    </span>

                                </div>

                                <div
                                    style={{
                                        display:"flex",
                                        justifyContent:"space-between"
                                    }}
                                >
                                    <span style={{color:"#8EA9CC"}}>
                                        Active Threat Actors
                                    </span>

                                    <span
                                        style={{
                                            color:"#FFFFFF",
                                            fontWeight:700
                                        }}
                                    >
                                        18
                                    </span>

                                </div>

                                <div
                                    style={{
                                        display:"flex",
                                        justifyContent:"space-between"
                                    }}
                                >
                                    <span style={{color:"#8EA9CC"}}>
                                        Critical CVEs
                                    </span>

                                    <span
                                        style={{
                                            color:"#FF4D4F",
                                            fontWeight:700
                                        }}
                                    >
                                        32
                                    </span>

                                </div>

                                <div
                                    style={{
                                        display:"flex",
                                        justifyContent:"space-between"
                                    }}
                                >
                                    <span style={{color:"#8EA9CC"}}>
                                        IOC Correlation
                                    </span>

                                    <span
                                        style={{
                                            color:"#00E676",
                                            fontWeight:700
                                        }}
                                    >
                                        97%
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </Col>

            </Row>

            {/* Footer */}

            <div
                style={{
                    marginTop:24,
                    background:"#102033",
                    borderLeft:"4px solid #2D7CFF",
                    borderRadius:12,
                    padding:18,
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}
            >

                <div>

                    <div
                        style={{
                            color:"#2D7CFF",
                            fontWeight:700,
                            fontSize:18
                        }}
                    >
                        Oracle Global Threat Intelligence Engine
                    </div>

                    <div
                        style={{
                            color:"#DCE8F4",
                            marginTop:8
                        }}
                    >
                        Continuously correlating threat intelligence feeds,
                        global campaigns, MITRE ATT&CK mappings and enterprise
                        telemetry in real time.

                    </div>

                </div>

                <Tag
                    color="processing"
                    style={{
                        padding:"6px 14px",
                        fontSize:14
                    }}
                >
                    LIVE INTELLIGENCE
                </Tag>

            </div>

        </EnterpriseCard>

    );

}