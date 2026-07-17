import { useEffect, useState } from "react";
import {
    Tag
} from "antd";

import {
    GlobalOutlined,
    LinkOutlined,
    MailOutlined,
    SafetyCertificateOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface IOC{

    type:"IP"|"DOMAIN"|"HASH"|"EMAIL";

    value:string;

    confidence:number;

    severity:"LOW"|"MEDIUM"|"HIGH"|"CRITICAL";

}

const ips=[
"185.220.101.45",
"91.214.124.87",
"103.45.18.220",
"45.13.226.91"
];

const domains=[
"update-security.net",
"secure-authverify.com",
"cloud-login365.net",
"office-auth.live"
];

const hashes=[
"9A4F81E2A76C",
"AF22BC98E45D",
"88FF1122CCDD",
"AABBCDD77881"
];

const emails=[
"support@security-alert.co",
"admin@cloud-alert.net",
"verify@office-auth.live",
"it@secure-update.co"
];

const severityList=[
"LOW",
"MEDIUM",
"HIGH",
"CRITICAL"
] as const;

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function randomItem<T>(arr:readonly T[]):T{

    return arr[random(0,arr.length-1)];

}

function generateFeed():IOC[]{

    return Array.from({ length: 20 }, (_, index) => {

        const type = ["IP","DOMAIN","HASH","EMAIL"][index % 4] as IOC["type"];

        return{

            type,

            value:
                type==="IP"
                ? randomItem(ips)
                : type==="DOMAIN"
                ? randomItem(domains)
                : type==="HASH"
                ? randomItem(hashes)
                : randomItem(emails),

            confidence:random(90,99),

            severity:randomItem(severityList)

        };

    });

}

export default function IOCFeed(){

    const [feed,setFeed]=useState<IOC[]>(

        generateFeed()

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            setFeed(generateFeed());

        },6000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Live IOC Intelligence Feed"
            height={1000}
        >

            <div
                className="iocScroll"
                style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:16,
                    maxHeight:420,
                    overflowY:"auto",
                    paddingRight:8
                }}
            >

                {

                    feed.map((ioc,index)=>(

                        <div
                            key={index}
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderLeft:
                                    ioc.severity==="CRITICAL"

                                    ?"5px solid #FF4D4F"

                                    :ioc.severity==="HIGH"

                                    ?"5px solid #FA8C16"

                                    :ioc.severity==="MEDIUM"

                                    ?"5px solid #2D7CFF"

                                    :"5px solid #00E676",

                                borderRadius:12,

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
                                        alignItems:"center",
                                        gap:12
                                    }}
                                >

                                    {

                                        ioc.type==="IP"

                                        ?

                                        <GlobalOutlined
                                            style={{
                                                color:"#2D7CFF",
                                                fontSize:24
                                            }}
                                        />

                                        :

                                        ioc.type==="DOMAIN"

                                        ?

                                        <LinkOutlined
                                            style={{
                                                color:"#A855F7",
                                                fontSize:24
                                            }}
                                        />

                                        :

                                        ioc.type==="EMAIL"

                                        ?

                                        <MailOutlined
                                            style={{
                                                color:"#FA8C16",
                                                fontSize:24
                                            }}
                                        />

                                        :

                                        <SafetyCertificateOutlined
                                            style={{
                                                color:"#00E676",
                                                fontSize:24
                                            }}
                                        />

                                    }

                                    <div>

                                        <div
                                            style={{
                                                color:"#FFFFFF",
                                                fontSize:16,
                                                fontWeight:700
                                            }}
                                        >
                                            {ioc.value}
                                        </div>

                                        <div
                                            style={{
                                                color:"#8EA9CC",
                                                marginTop:4
                                            }}
                                        >
                                            {ioc.type} Indicator
                                        </div>

                                    </div>

                                </div>

                                <Tag
                                    color={
                                        ioc.severity==="CRITICAL"

                                        ?"red"

                                        :ioc.severity==="HIGH"

                                        ?"orange"

                                        :ioc.severity==="MEDIUM"

                                        ?"blue"

                                        :"green"
                                    }
                                >
                                    {ioc.severity}
                                </Tag>

                            </div>

                            <div
                                style={{
                                    marginTop:18,
                                    display:"flex",
                                    justifyContent:"space-between",
                                    alignItems:"center"
                                }}
                            >

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Oracle AI Confidence
                                    </div>

                                    <div
                                        style={{
                                            color:"#00E676",
                                            fontSize:26,
                                            fontWeight:700,
                                            marginTop:5
                                        }}
                                    >
                                        {ioc.confidence}%
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
                                            fontSize:12
                                        }}
                                    >
                                        Correlation
                                    </div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            fontWeight:700,
                                            marginTop:6
                                        }}
                                    >
                                        Enterprise Matched
                                    </div>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

            <div
                style={{
                    marginTop:22,
                    background:"#102033",
                    borderLeft:"4px solid #00E676",
                    borderRadius:10,
                    padding:18
                }}
            >

                <div
                    style={{
                        display:"flex",
                        alignItems:"center",
                        gap:10,
                        marginBottom:12
                    }}
                >

                    <SafetyCertificateOutlined
                        style={{
                            color:"#00E676",
                            fontSize:20
                        }}
                    />

                    <span
                        style={{
                            color:"#FFFFFF",
                            fontWeight:700
                        }}
                    >
                        Oracle AI Correlation
                    </span>

                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >

                    Oracle AI correlated multiple Indicators of Compromise
                    with enterprise telemetry, identifying relationships
                    across endpoints, cloud infrastructure and identity
                    systems. Immediate IOC hunting is recommended.

                </div>

            </div>
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
                        fontSize:18,
                        marginBottom:18
                    }}
                >
                    IOC Intelligence Summary
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
                            Malicious IPs
                        </span>

                        <span
                            style={{
                                color:"#FF4D4F",
                                fontWeight:700
                            }}
                        >
                            {
                                feed.filter(
                                    x=>x.type==="IP"
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
                            Malicious Domains
                        </span>

                        <span
                            style={{
                                color:"#A855F7",
                                fontWeight:700
                            }}
                        >
                            {
                                feed.filter(
                                    x=>x.type==="DOMAIN"
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
                            File Hashes
                        </span>

                        <span
                            style={{
                                color:"#00E676",
                                fontWeight:700
                            }}
                        >
                            {
                                feed.filter(
                                    x=>x.type==="HASH"
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
                            Phishing Emails
                        </span>

                        <span
                            style={{
                                color:"#FA8C16",
                                fontWeight:700
                            }}
                        >
                            {
                                feed.filter(
                                    x=>x.type==="EMAIL"
                                ).length
                            }
                        </span>

                    </div>

                </div>

            </div>

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
                            color:"#8EA9CC",
                            fontSize:12
                        }}
                    >
                        Feed Status
                    </div>

                    <div
                        style={{
                            color:"#00E676",
                            fontWeight:700,
                            fontSize:16
                        }}
                    >
                        LIVE IOC Intelligence
                    </div>

                </div>

                <Tag
                    color="processing"
                    style={{
                        padding:"6px 14px",
                        fontSize:14
                    }}
                >
                    AUTO REFRESH 6s
                </Tag>

            </div>

            <style>
                {`

                .iocScroll::-webkit-scrollbar{

                    width:8px;

                }

                .iocScroll::-webkit-scrollbar-track{

                    background:#0F172A;

                    border-radius:20px;

                }

                .iocScroll::-webkit-scrollbar-thumb{

                    background:#A855F7;

                    border-radius:20px;

                }

                .iocScroll::-webkit-scrollbar-thumb:hover{

                    background:#C084FC;

                }

                `}
                </style>

        </EnterpriseCard>

    );

}