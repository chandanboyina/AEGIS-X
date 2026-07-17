import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Progress,
    Tag,
    Typography
} from "antd";

import {
    SafetyCertificateOutlined,
    RadarChartOutlined,
    ThunderboltOutlined,
    ApartmentOutlined,
    SyncOutlined,
    NodeIndexOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

const { Text } = Typography;

interface DNAKPI {

    title: string;

    value: number;

    icon: React.ReactNode;

    color: string;

    subtitle: string;

}

const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export default function DNAKPIs() {

    const [enterpriseScore, setEnterpriseScore] = useState(98);

    const [trustScore, setTrustScore] = useState(97);

    const [mutationScore, setMutationScore] = useState(99);

    const [learningScore, setLearningScore] = useState(96);

    const [syncScore, setSyncScore] = useState(98);

    const [behaviourScore, setBehaviourScore] = useState(95);

    const [lastUpdated, setLastUpdated] = useState("");

    const [kpis, setKpis] = useState<DNAKPI[]>([]);

    function refresh() {

        const enterprise = random(96, 100);

        const trust = random(95, 100);

        const mutation = random(96, 100);

        const learning = random(94, 100);

        const sync = random(96, 100);

        const behaviour = random(93, 100);

        setEnterpriseScore(enterprise);

        setTrustScore(trust);

        setMutationScore(mutation);

        setLearningScore(learning);

        setSyncScore(sync);

        setBehaviourScore(behaviour);

        setLastUpdated(
            new Date().toLocaleTimeString()
        );

        setKpis([
            {
                title: "Enterprise DNA",

                value: enterprise,

                subtitle: "Genome Integrity",

                icon: <RadarChartOutlined />,

                color: "#00E5FF"
            },
            {
                title: "Trust Index",

                value: trust,

                subtitle: "Zero Trust",

                icon: <SafetyCertificateOutlined />,

                color: "#00E676"
            },
            {
                title: "Mutation Stability",

                value: mutation,

                subtitle: "Threat Evolution",

                icon: <ThunderboltOutlined />,

                color: "#FFB300"
            },
            {
                title: "AI Learning",

                value: learning,

                subtitle: "Behaviour Engine",

                icon: <ApartmentOutlined />,

                color: "#7C4DFF"
            },
            {
                title: "Genome Sync",

                value: sync,

                subtitle: "Enterprise Assets",

                icon: <SyncOutlined spin />,

                color: "#4FC3F7"
            },
            {
                title: "Behaviour Match",

                value: behaviour,

                subtitle: "Identity Confidence",

                icon: <NodeIndexOutlined />,

                color: "#26C6DA"
            }

        ]);

    }

    useEffect(() => {

        refresh();

        const timer = setInterval(refresh, 5000);

        return () => clearInterval(timer);

    }, []);

    return (

        <EnterpriseCard
            title="Cyber DNA Intelligence"
            height={1200}
        >

            <Row
                justify="space-between"
                align="middle"
            >

                <Col>

                    <div>

                        <Text
                            style={{
                                color: "#8EA9CC",
                                fontSize: 13,
                                letterSpacing: 1
                            }}
                        >
                            ENTERPRISE GENOME STATUS
                        </Text>

                        <div
                            style={{
                                marginTop: 8,
                                fontSize: 42,
                                fontWeight: 700,
                                color: "#FFFFFF"
                            }}
                        >
                            {enterpriseScore}%
                        </div>

                        <div
                            style={{
                                color: "#00E676",
                                fontSize: 14,
                                marginTop: 4
                            }}
                        >
                            Healthy Autonomous Cyber DNA
                        </div>

                    </div>

                </Col>

                <Col>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10
                        }}
                    >

                        <div className="dnaPulse" />

                        <Tag
                            color="success"
                            style={{
                                padding: "6px 16px",
                                fontWeight: 700
                            }}
                        >
                            LIVE AI
                        </Tag>

                    </div>

                    <div
                        style={{
                            marginTop: 10,
                            color: "#8EA9CC",
                            textAlign: "right",
                            fontSize: 12
                        }}
                    >
                        Last Updated
                    </div>

                    <div
                        style={{
                            color: "#FFFFFF",
                            textAlign: "right",
                            fontSize: 13
                        }}
                    >
                        {lastUpdated}
                    </div>

                </Col>

            </Row>

            <div
                style={{
                    marginTop: 28
                }}
            >
                                <Row
                    gutter={24}
                    align="middle"
                >

                    {/* ================= DNA CORE ================= */}

                    <Col
                        xs={24}
                        lg={8}
                    >

                        <div className="dnaCore">

                            <div className="outerRing">

                                <div className="middleRing">

                                    <div className="innerRing">

                                        <Progress
                                            type="circle"
                                            percent={enterpriseScore}
                                            width={190}
                                            strokeWidth={9}
                                            strokeColor={{
                                                "0%": "#00E5FF",
                                                "50%": "#00E676",
                                                "100%": "#7C4DFF"
                                            }}
                                            trailColor="#203247"
                                            format={() => (
                                                <div>

                                                    <div
                                                        style={{
                                                            fontSize: 40,
                                                            fontWeight: 700,
                                                            color: "#FFFFFF"
                                                        }}
                                                    >

                                                        {enterpriseScore}%

                                                    </div>

                                                    <div
                                                        style={{
                                                            color: "#8EA9CC",
                                                            fontSize: 12,
                                                            marginTop: 6
                                                        }}
                                                    >

                                                        DNA HEALTH

                                                    </div>

                                                </div>
                                            )}
                                        />

                                    </div>

                                </div>

                            </div>

                            <div
                                style={{
                                    marginTop: 22,
                                    textAlign: "center"
                                }}
                            >

                                <Tag
                                    color="processing"
                                    style={{
                                        padding: "5px 16px",
                                        fontWeight: 700
                                    }}
                                >

                                    ● AUTONOMOUS LEARNING

                                </Tag>

                            </div>

                        </div>

                    </Col>

                    {/* ================= KPI GRID ================= */}

                    <Col
                        xs={24}
                        lg={16}
                    >

                        <Row gutter={[18,18]}>

                            {

                                kpis.map((item,index)=>(

                                    <Col
                                        xs={24}
                                        sm={12}
                                        lg={8}
                                        key={index}
                                    >

                                        <div
                                            className="dnaKpiCard"
                                        >

                                            <div
                                                style={{

                                                    display:"flex",

                                                    justifyContent:"space-between",

                                                    alignItems:"center"

                                                }}
                                            >

                                                <div
                                                    className="dnaIcon"
                                                    style={{

                                                        color:item.color,

                                                        background:`${item.color}18`

                                                    }}
                                                >

                                                    {item.icon}

                                                </div>

                                                <Tag
                                                    color="blue"
                                                >

                                                    LIVE

                                                </Tag>

                                            </div>

                                            <div
                                                style={{
                                                    marginTop:18,
                                                    color:"#FFFFFF",
                                                    fontWeight:700,
                                                    fontSize:28
                                                }}
                                            >

                                                {item.value}%

                                            </div>

                                            <div
                                                style={{
                                                    marginTop:5,
                                                    color:"#D8E5F3",
                                                    fontWeight:600
                                                }}
                                            >

                                                {item.title}

                                            </div>

                                            <div
                                                style={{
                                                    marginTop:4,
                                                    color:"#8EA9CC",
                                                    fontSize:12
                                                }}
                                            >

                                                {item.subtitle}

                                            </div>

                                            <Progress

                                                percent={item.value}

                                                showInfo={false}

                                                strokeColor={item.color}

                                                trailColor="#24384E"

                                                style={{
                                                    marginTop:16
                                                }}

                                            />

                                        </div>

                                    </Col>

                                ))

                            }

                        </Row>

                    </Col>

                </Row>

                {/* ================= AI HEALTH STRIP ================= */}

                <div
                    className="oracleHealthBar"
                    style={{
                        marginTop:30
                    }}
                >

                    <div>

                        <div
                            style={{
                                color:"#8EA9CC",
                                fontSize:12
                            }}
                        >

                            Oracle AI Assessment

                        </div>

                        <div
                            style={{
                                color:"#FFFFFF",
                                fontWeight:700,
                                fontSize:20,
                                marginTop:5
                            }}
                        >

                            Enterprise Cyber Genome is Operating
                            Normally with High Behavioural Integrity

                        </div>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            gap:12,
                            flexWrap:"wrap"
                        }}
                    >

                        <Tag color="success">

                            Zero Trust Verified

                        </Tag>

                        <Tag color="processing">

                            AI Learning Active

                        </Tag>

                        <Tag color="cyan">

                            Genome Synced

                        </Tag>

                    </div>

                </div>

                <div
                    style={{
                        marginTop:28
                    }}
                >
                                        <Row gutter={[20,20]}>

                        {/* ================= AI OPERATION METRICS ================= */}

                        <Col xs={24} lg={12}>

                            <div className="dnaInsightPanel">

                                <div className="sectionTitle">

                                    AI Operational Metrics

                                </div>

                                <MetricRow
                                    label="Genome Synchronization"
                                    value={`${syncScore}%`}
                                    color="#00E676"
                                />

                                <MetricRow
                                    label="Behaviour Correlation"
                                    value={`${behaviourScore}%`}
                                    color="#00E5FF"
                                />

                                <MetricRow
                                    label="Threat Mutation Stability"
                                    value={`${mutationScore}%`}
                                    color="#FFC107"
                                />

                                <MetricRow
                                    label="Enterprise Trust Index"
                                    value={`${trustScore}%`}
                                    color="#7C4DFF"
                                />

                                <MetricRow
                                    label="AI Learning Confidence"
                                    value={`${learningScore}%`}
                                    color="#00BCD4"
                                />

                            </div>

                        </Col>

                        {/* ================= ORACLE AI ================= */}

                        <Col xs={24} lg={12}>

                            <div className="dnaInsightPanel">

                                <div className="sectionTitle">

                                    Oracle AI Genome Analysis

                                </div>

                                <div
                                    style={{
                                        color:"#D7E5F5",
                                        lineHeight:1.9,
                                        marginTop:18,
                                        fontSize:13
                                    }}
                                >

                                    Oracle AI continuously analyses the
                                    behavioural genome of every enterprise
                                    identity, endpoint, cloud workload,
                                    application and network asset.

                                    <br/><br/>

                                    Current DNA signatures indicate a
                                    highly stable environment with minimal
                                    mutation activity and exceptionally
                                    strong behavioural consistency.

                                    <br/><br/>

                                    No abnormal genome drift has been
                                    detected across critical enterprise
                                    infrastructure.

                                </div>

                            </div>

                        </Col>

                    </Row>

                </div>

                {/* ================= EXECUTIVE SUMMARY ================= */}

                <div
                    className="dnaExecutiveCard"
                    style={{
                        marginTop:28
                    }}
                >

                    <div className="sectionTitle">

                        Executive Cyber DNA Summary

                    </div>

                    <Row
                        gutter={18}
                        style={{
                            marginTop:20
                        }}
                    >

                        <Col xs={24} md={6}>

                            <SummaryChip
                                title="Identity Genome"
                                value="Stable"
                                color="#00E676"
                            />

                        </Col>

                        <Col xs={24} md={6}>

                            <SummaryChip
                                title="Behaviour Model"
                                value="Learning"
                                color="#00BCD4"
                            />

                        </Col>

                        <Col xs={24} md={6}>

                            <SummaryChip
                                title="Threat Evolution"
                                value="Contained"
                                color="#FFC107"
                            />

                        </Col>

                        <Col xs={24} md={6}>

                            <SummaryChip
                                title="Enterprise Trust"
                                value="Verified"
                                color="#7C4DFF"
                            />

                        </Col>

                    </Row>

                    <div
                        style={{
                            marginTop:24,
                            color:"#DCE7F3",
                            lineHeight:1.9,
                            fontSize:13
                        }}
                    >

                        Enterprise Cyber DNA remains healthy with
                        continuously evolving behavioural intelligence.
                        Autonomous AI learning has maintained high
                        confidence across all enterprise assets,
                        ensuring identity integrity, trust verification,
                        mutation resistance and adaptive cyber resilience.

                    </div>

                    <div
                        style={{
                            marginTop:20,
                            display:"flex",
                            justifyContent:"space-between",
                            alignItems:"center",
                            flexWrap:"wrap",
                            gap:12
                        }}
                    >

                        <Tag
                            color="success"
                            style={{
                                padding:"6px 18px",
                                fontWeight:700
                            }}
                        >

                            ● ENTERPRISE HEALTHY

                        </Tag>

                        <Tag
                            color="processing"
                            style={{
                                padding:"6px 18px",
                                fontWeight:700
                            }}
                        >

                            Oracle AI Active

                        </Tag>

                    </div>

                </div>

                </div>

            </EnterpriseCard>

            

    );

}

/* ========================================================= */

function MetricRow({

    label,

    value,

    color

}:any){

    return(

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
                        color:"#8EA9CC",
                        fontSize:13
                    }}
                >
                    {label}
                </span>

                <span
                    style={{
                        color,
                        fontWeight:700
                    }}
                >
                    {value}
                </span>

            </div>

            <Progress
                percent={parseInt(value)}
                showInfo={false}
                strokeColor={color}
                trailColor="#24384E"
            />

        </div>

    );

}

function SummaryChip({

    title,

    value,

    color

}:any){

    return(

        <div className="summaryChip">

            <div
                style={{
                    color:"#8EA9CC",
                    fontSize:12
                }}
            >

                {title}

            </div>

            <div
                style={{
                    marginTop:8,
                    color,
                    fontWeight:700,
                    fontSize:18
                }}
            >

                {value}

            </div>

        </div>
        

    );

}
/* ========================================================= */

const styles = `

/* ================= HERO DNA CORE ================= */

.dnaCore{

display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
position:relative;
padding:12px;

}

.outerRing{

padding:14px;
border-radius:50%;
background:linear-gradient(135deg,#00E5FF22,#7C4DFF22);
animation:rotateRing 18s linear infinite;

}

.middleRing{

padding:14px;
border-radius:50%;
background:linear-gradient(135deg,#00E67622,#00BCD422);
animation:rotateRingReverse 14s linear infinite;

}

.innerRing{

padding:10px;
border-radius:50%;
background:#132436;
box-shadow:
0 0 35px rgba(0,229,255,.18),
0 0 70px rgba(124,77,255,.10);

}

/* ================= LIVE PULSE ================= */

.dnaPulse{

width:12px;
height:12px;
border-radius:50%;
background:#00E676;
box-shadow:0 0 16px #00E676;
animation:dnaPulse 1.6s infinite;

}

/* ================= KPI CARD ================= */

.dnaKpiCard{

background:linear-gradient(180deg,#15263B,#111E30);
border:1px solid #24384D;
border-radius:18px;
padding:18px;
transition:.35s;
position:relative;
overflow:hidden;
height:205px;

}

.dnaKpiCard::before{

content:"";
position:absolute;
left:-60%;
top:0;
width:45%;
height:100%;
background:linear-gradient(
90deg,
transparent,
rgba(255,255,255,.06),
transparent
);
transform:skewX(-25deg);
transition:.6s;

}

.dnaKpiCard:hover::before{

left:120%;

}

.dnaKpiCard:hover{

transform:translateY(-6px);
border-color:#00E5FF;
box-shadow:
0 14px 28px rgba(0,0,0,.35),
0 0 18px rgba(0,229,255,.14);

}

.dnaIcon{

width:56px;
height:56px;
border-radius:16px;
display:flex;
justify-content:center;
align-items:center;
font-size:24px;
animation:floatIcon 4s ease-in-out infinite;

}

/* ================= INSIGHT PANEL ================= */

.dnaInsightPanel{

background:linear-gradient(180deg,#14263A,#101C2D);
border:1px solid #24384D;
border-radius:18px;
padding:22px;
transition:.35s;
height:100%;

}

.dnaInsightPanel:hover{

border-color:#00BCD4;
transform:translateY(-4px);

}

/* ================= EXECUTIVE ================= */

.dnaExecutiveCard{

background:linear-gradient(135deg,#13263A,#101D2E);
border:1px solid #28405A;
border-radius:18px;
padding:24px;
transition:.35s;

}

.dnaExecutiveCard:hover{

border-color:#00E676;
box-shadow:
0 16px 34px rgba(0,0,0,.30);

}

.summaryChip{

background:#182A3F;
border:1px solid #2A425E;
border-radius:14px;
padding:16px;
transition:.3s;
text-align:center;

}

.summaryChip:hover{

transform:translateY(-5px);
border-color:#00E5FF;

}

/* ================= HEADINGS ================= */

.sectionTitle{

font-size:17px;
font-weight:700;
color:#FFFFFF;
letter-spacing:.5px;

}

/* ================= ANT DESIGN ================= */

.ant-progress-inner{

background:#22374B !important;

}

.ant-progress-bg{

transition:all .9s ease;

}

.ant-progress-circle-path{

transition:all .9s ease;

}

/* ================= ANIMATIONS ================= */

@keyframes dnaPulse{

0%{

transform:scale(1);
opacity:1;

}

50%{

transform:scale(1.7);
opacity:.45;

}

100%{

transform:scale(1);
opacity:1;

}

}

@keyframes floatIcon{

0%{

transform:translateY(0);

}

50%{

transform:translateY(-7px);

}

100%{

transform:translateY(0);

}

}

@keyframes rotateRing{

from{

transform:rotate(0deg);

}

to{

transform:rotate(360deg);

}

}

@keyframes rotateRingReverse{

from{

transform:rotate(360deg);

}

to{

transform:rotate(0deg);

}

}

`;

export const DNAKPIsStyles = styles;