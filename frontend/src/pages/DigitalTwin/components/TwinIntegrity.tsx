import { useEffect, useState } from "react";

import { Row, Col, Progress, Tag } from "antd";

import {
    SafetyCertificateOutlined,
    SyncOutlined,
    DatabaseOutlined,
    DeploymentUnitOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    RadarChartOutlined,
    CloudSyncOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function TwinIntegrity(){

    const [health,setHealth]=useState(98);

    const [sync,setSync]=useState(99);

    const [sources,setSources]=useState(28);

    const [refreshTime,setRefreshTime]=useState(12);

    const [confidence,setConfidence]=useState(98);

    const [lastSimulation,setLastSimulation]=useState(3);

    const [coverage,setCoverage]=useState(96);

    const [version]=useState("v4.2.1");

    useEffect(()=>{

        const timer=setInterval(()=>{

            setHealth(random(97,100));

            setSync(random(97,100));

            setSources(random(26,32));

            setRefreshTime(random(6,15));

            setConfidence(random(96,100));

            setLastSimulation(random(2,8));

            setCoverage(random(94,99));

        },5000);

        return()=>clearInterval(timer);

    },[]);

    return(

        <EnterpriseCard
            title="Digital Twin Integrity"
            height={600}
        >

            {/* Top Status */}

            <div
                style={{

                    display:"flex",

                    justifyContent:"space-between",

                    alignItems:"center",

                    marginBottom:20

                }}
            >

                <div>

                    <div
                        style={{

                            color:"#8EA9CC",

                            fontSize:13

                        }}
                    >

                        Enterprise Digital Twin

                    </div>

                    <div
                        style={{

                            color:"#FFFFFF",

                            fontSize:22,

                            fontWeight:700,

                            marginTop:4

                        }}
                    >

                        Integrity Score

                    </div>

                </div>

                <Tag
                    color="success"
                    style={{

                        fontWeight:700,

                        padding:"3px 12px"

                    }}
                >

                    {health}% VERIFIED

                </Tag>

            </div>

            {/* Four Metrics */}

            <Row gutter={[16,16]}>

                <Col span={6}>

                    <Metric

                        icon={<SafetyCertificateOutlined/>}

                        color="#00E676"

                        title="Health"

                        value={`${health}%`}

                    />

                </Col>

                <Col span={6}>

                    <Metric

                        icon={<CloudSyncOutlined/>}

                        color="#1677FF"

                        title="Freshness"

                        value={`${refreshTime}s`}

                    />

                </Col>

                <Col span={6}>

                    <Metric

                        icon={<DeploymentUnitOutlined/>}

                        color="#13C2C2"

                        title="Sync"

                        value={`${sync}%`}

                    />

                </Col>

                <Col span={6}>

                    <Metric

                        icon={<DatabaseOutlined/>}

                        color="#722ED1"

                        title="Sources"

                        value={`${sources}`}

                    />

                </Col>

            </Row>

            {/* Divider */}

            <div
                style={{

                    marginTop:18,

                    borderTop:"1px solid #2A3B53",

                    paddingTop:16

                }}
            >

                <Row gutter={[12,12]}>

                    <Col span={12}>

                        <InfoRow

                            icon={<CheckCircleOutlined/>}

                            title="AI Validation"

                            value="VERIFIED"

                            color="#00E676"

                        />

                    </Col>

                    <Col span={12}>

                        <InfoRow

                            icon={<ClockCircleOutlined/>}

                            title="Last Simulation"

                            value={`${lastSimulation}s ago`}

                            color="#13C2C2"

                        />

                    </Col>

                    <Col span={12}>

                        <InfoRow

                            icon={<RadarChartOutlined/>}

                            title="Twin Version"

                            value={version}

                            color="#FFFFFF"

                        />

                    </Col>

                    <Col span={12}>

                        <InfoRow

                            icon={<SyncOutlined/>}

                            title="Coverage"

                            value={`${coverage}%`}

                            color="#1677FF"

                        />

                    </Col>

                </Row>

            </div>

            {/* Confidence */}

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

                        Oracle AI Confidence

                    </span>

                    <span
                        style={{

                            color:"#00E676",

                            fontWeight:700

                        }}
                    >

                        {confidence}%

                    </span>

                </div>

                <Progress

                    percent={confidence}

                    showInfo={false}

                    strokeColor="#00E676"

                    trailColor="#223248"

                />
                

            </div>
                        {/* Oracle AI */}

            <div
                style={{
                    marginTop:18,
                    background:"#102033",
                    borderLeft:"4px solid #00E676",
                    borderRadius:12,
                    padding:14
                }}
            >

                <div
                    style={{
                        color:"#00E676",
                        fontWeight:700,
                        marginBottom:8,
                        fontSize:15
                    }}
                >
                    Oracle AI Digital Twin Engine
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        fontSize:13,
                        lineHeight:1.7
                    }}
                >

                    Oracle AI continuously validates Digital Twin
                    synchronization, infrastructure consistency,
                    telemetry freshness and model integrity to ensure
                    every enterprise decision is executed using an
                    accurate real-time representation.

                </div>

            </div>

            {/* Footer */}

            <div
                style={{
                    marginTop:14,
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
                        Oracle Digital Twin
                    </div>

                    <div
                        style={{
                            color:"#FFFFFF",
                            fontSize:13,
                            marginTop:4
                        }}
                    >
                        Integrity Monitoring
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

        </EnterpriseCard>

    );

}

/* ========================================================= */

function Metric({

    icon,

    title,

    value,

    color

}:any){

    return(

        <div
            className="metricBox"
        >

            <div
                className="metricIcon"
                style={{
                    color,
                    background:`${color}18`
                }}
            >

                {icon}

            </div>

            <div
                className="metricTitle"
            >

                {title}

            </div>

            <div
                style={{
                    color,
                    fontWeight:700,
                    fontSize:17,
                    marginTop:6
                }}
            >

                {value}

            </div>

        </div>

    );

}

/* ========================================================= */

function InfoRow({

    icon,

    title,

    value,

    color

}:any){

    return(

        <div
            className="infoRow"
        >

            <div
                style={{
                    display:"flex",
                    alignItems:"center",
                    gap:8
                }}
            >

                <span
                    style={{
                        color
                    }}
                >

                    {icon}

                </span>

                <span
                    style={{
                        color:"#8EA9CC",
                        fontSize:12
                    }}
                >

                    {title}

                </span>

            </div>

            <span
                style={{
                    color,
                    fontWeight:700,
                    fontSize:12
                }}
            >

                {value}

            </span>

        </div>

    );

}

const styles=`

.metricBox{

text-align:center;

transition:.35s;

}

.metricBox:hover{

transform:translateY(-4px);

}

.metricIcon{

width:46px;

height:46px;

border-radius:12px;

display:flex;

justify-content:center;

align-items:center;

font-size:22px;

margin:auto;

animation:metricFloat 4s ease-in-out infinite;

}

.metricTitle{

margin-top:10px;

font-size:12px;

color:#8EA9CC;

}

.infoRow{

display:flex;

justify-content:space-between;

align-items:center;

padding:8px 10px;

background:#16263B;

border:1px solid #26384F;

border-radius:10px;

transition:.3s;

}

.infoRow:hover{

border-color:#00E676;

transform:translateX(3px);

}

.ant-progress-bg{

transition:all .8s ease;

}

@keyframes metricFloat{

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

`;

export const TwinIntegrityStyles = styles;