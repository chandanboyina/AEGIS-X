import { useEffect, useState } from "react";

import {
    Progress,
    Tag
} from "antd";

import {
    GlobalOutlined,
    GatewayOutlined,
    ApartmentOutlined,
    ThunderboltOutlined,
    DashboardOutlined,
    WifiOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function NetworkHealth(){

    const [availability,setAvailability]=useState(99);

    const [throughput,setThroughput]=useState(8.6);

    const [latency,setLatency]=useState(14);

    const [packetLoss,setPacketLoss]=useState(1);

    const [routerHealth,setRouterHealth]=useState(98);

    const [switchHealth,setSwitchHealth]=useState(97);

    useEffect(()=>{

        const timer=setInterval(()=>{

            setAvailability(random(97,100));

            setThroughput(

                Number(

                    (

                        random(72,95)/10

                    ).toFixed(1)

                )

            );

            setLatency(random(10,22));

            setPacketLoss(random(0,2));

            setRouterHealth(random(96,100));

            setSwitchHealth(random(95,100));

        },5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Enterprise Network Health"
            height={1200}
        >

            <div
                style={{
                    display:"grid",
                    gridTemplateColumns:"repeat(2,1fr)",
                    gap:18
                }}
            >

                {/* Availability */}

                <div className="healthCard">

                    <div className="healthHeader">

                        <GlobalOutlined
                            style={{
                                color:"#00E676",
                                fontSize:24
                            }}
                        />

                        <span>Network Availability</span>

                    </div>

                    <Progress
                        type="circle"
                        percent={availability}
                        width={90}
                        strokeColor="#00E676"
                        trailColor="#223248"
                    />

                    <div className="metricValue">

                        {availability}%

                    </div>

                </div>

                {/* Throughput */}

                <div className="healthCard">

                    <div className="healthHeader">

                        <ThunderboltOutlined
                            style={{
                                color:"#FAAD14",
                                fontSize:24
                            }}
                        />

                        <span>Throughput</span>

                    </div>

                    <Progress
                        percent={throughput*10}
                        strokeColor="#FAAD14"
                        showInfo={false}
                    />

                    <div className="metricValue">

                        {throughput} Gbps

                    </div>

                </div>

                {/* Latency */}

                <div className="healthCard">

                    <div className="healthHeader">

                        <WifiOutlined
                            style={{
                                color:"#1677FF",
                                fontSize:24
                            }}
                        />

                        <span>Internet Latency</span>

                    </div>

                    <Progress
                        percent={100-latency}
                        strokeColor="#1677FF"
                        showInfo={false}
                    />

                    <div className="metricValue">

                        {latency} ms

                    </div>

                </div>

                {/* Packet Loss */}

                <div className="healthCard">

                    <div className="healthHeader">

                        <DashboardOutlined
                            style={{
                                color:"#FF4D4F",
                                fontSize:24
                            }}
                        />

                        <span>Packet Loss</span>

                    </div>

                    <Progress
                        percent={100-(packetLoss*25)}
                        strokeColor="#FF4D4F"
                        showInfo={false}
                    />

                    <div className="metricValue">

                        {packetLoss}%

                    </div>

                </div>

                {/* Router */}

                <div className="healthCard">

                    <div className="healthHeader">

                        <GatewayOutlined
                            style={{
                                color:"#13C2C2",
                                fontSize:24
                            }}
                        />

                        <span>Router Health</span>

                    </div>

                    <Progress
                        percent={routerHealth}
                        strokeColor="#13C2C2"
                        showInfo={false}
                    />

                    <div className="metricValue">

                        {routerHealth}%

                    </div>

                </div>

                {/* Switch */}

                <div className="healthCard">

                    <div className="healthHeader">

                        <ApartmentOutlined
                            style={{
                                color:"#722ED1",
                                fontSize:24
                            }}
                        />

                        <span>Switch Health</span>

                    </div>

                    <Progress
                        percent={switchHealth}
                        strokeColor="#722ED1"
                        showInfo={false}
                    />

                    <div className="metricValue">

                        {switchHealth}%

                    </div>

                </div>

            </div>

            {/* Oracle AI */}

            <div
                style={{
                    marginTop:24,
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
                    Oracle AI Network Insight
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.85
                    }}
                >

                    Oracle AI continuously evaluates network
                    availability, throughput, latency, routing
                    behaviour and packet delivery. Current telemetry
                    indicates a healthy enterprise backbone with
                    no significant degradation across WAN links or
                    internal switching infrastructure.

                </div>

            </div>
                        {/* Network Summary */}

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
                    Network Health Summary
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
                            Availability
                        </span>

                        <span
                            style={{
                                color:"#00E676",
                                fontWeight:700
                            }}
                        >
                            {availability}%
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >

                        <span style={{color:"#8EA9CC"}}>
                            Throughput
                        </span>

                        <span
                            style={{
                                color:"#FAAD14",
                                fontWeight:700
                            }}
                        >
                            {throughput} Gbps
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >

                        <span style={{color:"#8EA9CC"}}>
                            WAN Latency
                        </span>

                        <span
                            style={{
                                color:"#1677FF",
                                fontWeight:700
                            }}
                        >
                            {latency} ms
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >

                        <span style={{color:"#8EA9CC"}}>
                            Packet Loss
                        </span>

                        <span
                            style={{
                                color:"#FF4D4F",
                                fontWeight:700
                            }}
                        >
                            {packetLoss}%
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}
                    >

                        <span style={{color:"#8EA9CC"}}>
                            Infrastructure Health
                        </span>

                        <span
                            style={{
                                color:"#13C2C2",
                                fontWeight:700
                            }}
                        >
                            {Math.round((routerHealth+switchHealth)/2)}%
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
                        Oracle AI Network Intelligence
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6,
                            fontSize:13,
                            lineHeight:1.7
                        }}
                    >
                        Oracle AI continuously analyses network
                        performance, routing behaviour, throughput,
                        switch health and WAN connectivity to detect
                        degradation before it impacts critical
                        enterprise services.

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

.healthCard{

background:#16253B;

border:1px solid #29425E;

border-radius:14px;

padding:18px;

display:flex;

flex-direction:column;

align-items:center;

transition:.35s;

}

.healthCard:hover{

transform:translateY(-4px);

border-color:#1677FF;

box-shadow:0 10px 26px rgba(22,119,255,.18);

}

.healthHeader{

display:flex;

align-items:center;

gap:10px;

color:#FFFFFF;

font-weight:600;

margin-bottom:16px;

font-size:14px;

}

.metricValue{

margin-top:14px;

font-size:22px;

font-weight:700;

color:#FFFFFF;

}

.ant-progress-bg{

transition:all .8s ease;

}

.ant-progress-circle-path{

transition:all .8s ease;

}

`}

            </style>

        </EnterpriseCard>

    );

}