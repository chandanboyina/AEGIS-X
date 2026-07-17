import { useEffect, useState } from "react";
import "./GenomeHero.css";
import {
    Row,
    Col,
    Tag,
    Progress,
    Typography
} from "antd";

import {
    RadarChartOutlined,
    ThunderboltOutlined,
    SafetyCertificateOutlined,
    ApartmentOutlined,
    CloudOutlined,
    DatabaseOutlined,
    LaptopOutlined,
    UserOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

const { Text } = Typography;

interface GenomeNode {
    id: number;
    title: string;
    icon: React.ReactNode;
    color: string;
    health: number;
    angle: number;
}

function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function GenomeHero() {
    const [health, setHealth] = useState(99);
    const [confidence, setConfidence] = useState(98);
    const [learning, setLearning] = useState(97);
    const [mutation, setMutation] = useState(2);
    const [nodes, setNodes] = useState<GenomeNode[]>([]);

    function refresh() {
        setHealth(random(97, 100));
        setConfidence(random(97, 100));
        setLearning(random(95, 100));
        setMutation(random(1, 4));
        setNodes([
            {
                id: 1,
                title: "Identity",
                icon: <UserOutlined />,
                color: "#00E676",
                health: random(95, 100),
                angle: 270
            },
            {
                id: 2,
                title: "Endpoints",
                icon: <LaptopOutlined />,
                color: "#00E5FF",
                health: random(95, 100),
                angle: 330
            },
            {
                id: 3,
                title: "Cloud",
                icon: <CloudOutlined />,
                color: "#7B61FF",
                health: random(95, 100),
                angle: 30
            },
            {
                id: 4,
                title: "Applications",
                icon: <ApartmentOutlined />,
                color: "#FFC107",
                health: random(95, 100),
                angle: 90
            },
            {
                id: 5,
                title: "Data",
                icon: <DatabaseOutlined />,
                color: "#26C6DA",
                health: random(95, 100),
                angle: 150
            },
            {
                id: 6,
                title: "Identity Trust",
                icon: <SafetyCertificateOutlined />,
                color: "#FF7043",
                health: random(95, 100),
                angle: 210
            }
        ]);
    }

    useEffect(() => {
        refresh();
        const timer = setInterval(refresh, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <EnterpriseCard title="Enterprise Genome Engine" height={1200}>
            <div className="genomeHero">
                {/* ================= HEADER ================= */}
                <Row justify="space-between" align="top" gutter={[24, 24]}>
                    <Col>
                        <Text className="heroCaption">
                            ORACLE AI • AUTONOMOUS ENTERPRISE GENOME
                        </Text>
                        <h1 className="heroTitle">Living Cyber Genome</h1>
                        <p className="heroSubtitle" style={{ maxWidth: 700 }}>
                            Every identity, device, workload and application continuously contributes to a living enterprise genome analysed by Oracle AI.
                        </p>
                    </Col>
                    <Col>
                        <div className="heroStatus">
                            <div className="liveDot" />
                            <Tag color="processing">AI ONLINE</Tag>
                        </div>
                    </Col>
                </Row>

                {/* ================= HERO ENGINE ================= */}
                <div className="heroEngineWrapper">
                    <div className="heroEngine">
                        {/*Background Layers */}
                        <div className="heroGrid" />
                        <div className="heroGlow heroGlow1" />
                        <div className="heroGlow heroGlow2" />
                        <div className="heroGlow heroGlow3" />

                        {/* Connection Canvas Layer (Synchronized Viewbox to exact pixel coordinates) */}
                        <svg className="connectionSvg" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
                            <defs>
                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00E5FF" />
                                    <stop offset="50%" stopColor="#00E676" />
                                    <stop offset="100%" stopColor="#7B61FF" />
                                </linearGradient>
                                <filter id="lineGlow">
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            {nodes.map(node => {
                                const radius = 230; // Matches CSS mapping radius perfectly
                                const rad = (node.angle * Math.PI) / 180;
                                const x = 500 + Math.cos(rad) * radius;
                                const y = 320 + Math.sin(rad) * radius;
                                return (
                                    <line
                                        key={node.id}
                                        x1="500"
                                        y1="320"
                                        x2={x}
                                        y2={y}
                                        stroke="url(#lineGradient)"
                                        strokeWidth="2"
                                        filter="url(#lineGlow)"
                                        className="genomeConnection"
                                    />
                                );
                            })}
                        </svg>

                        {/* Interactive Center & Vector Graphic Elements */}
                        <div className="radarSweep" />
                        <div className="radarCircle radar1" />
                        <div className="radarCircle radar2" />
                        <div className="radarCircle radar3" />
                        <div className="radarCircle radar4" />

                        {/* ================= AI CORE ================= */}
                        <div className="aiCoreContainer">
                            <div className="orbitRing ringOne" />
                            <div className="orbitRing ringTwo" />
                            <div className="orbitRing ringThree" />
                            <div className="pulseRing pulseOne" />
                            <div className="pulseRing pulseTwo" />
                            <div className="pulseRing pulseThree" />
                            <div className="aiCoreHex">
                                <div className="coreInner">
                                    <RadarChartOutlined className="coreIcon" />
                                    <div className="corePercentage">{health}%</div>
                                    <div className="coreLabel">AI GENOME CORE</div>
                                    <Progress
                                        percent={confidence}
                                        showInfo={false}
                                        strokeColor="#00E676"
                                        trailColor="#26384B"
                                        size="small"
                                        className="coreProgress"
                                    />
                                    <div className="coreLearning">
                                        <ThunderboltOutlined />
                                        <span>Learning {learning}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ================= ORBITING GENOME NODES ================= */}
                        <div className="genomeOrbit">
                            {nodes.map(node => {
                                const radius = 230; // Tightened down slightly to clear overlapping badges
                                const rad = (node.angle * Math.PI) / 180;
                                const x = Math.cos(rad) * radius;
                                const y = Math.sin(rad) * radius;
                                return (
                                    <div
                                        key={node.id}
                                        className="genomeNode"
                                        style={{
                                            "--tx": `${x}px`,
                                            "--ty": `${y}px`,
                                            transform: `translate(${x}px, ${y}px)`
                                        } as React.CSSProperties}
                                    >
                                        <div className="nodeGlow" style={{ background: node.color }} />
                                        <div className="nodeCircle" style={{ borderColor: node.color }}>
                                            <div className="nodeIcon" style={{ color: node.color }}>
                                                {node.icon}
                                            </div>
                                        </div>
                                        <div className="nodeInfo">
                                            <div className="nodeTitle">{node.title}</div>
                                            <div className="nodeHealth">{node.health}% Healthy</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* ================= FLOW PARTICLES ================= */}
                        <div className="particleLayer">
                            {Array.from({ length: 24 }).map((_, index) => {
                                const angle = (index * 15) * Math.PI / 180;
                                const radius = 230;
                                const startX = Math.cos(angle) * radius;
                                const startY = Math.sin(angle) * radius;
                                return (
                                    <span
                                        key={index}
                                        className="flowParticle"
                                        style={{
                                            left: `calc(50% + ${startX}px)`,
                                            top: `calc(50% + ${startY}px)`,
                                            animationDelay: `${index * 0.25}s`
                                        }}
                                    />
                                );
                            })}
                        </div>

                        {/* ================= AMBIENT STARS ================= */}
                        <div className="ambientLayer">
                            {Array.from({ length: 40 }).map((_, index) => {
                                const left = Math.random() * 100;
                                const top = Math.random() * 100;
                                const delay = Math.random() * 6;
                                const duration = 3 + Math.random() * 5;
                                return (
                                    <span
                                        key={index}
                                        className="ambientDot"
                                        style={{
                                            left: `${left}%`,
                                            top: `${top}%`,
                                            animationDelay: `${delay}s`,
                                            animationDuration: `${duration}s`
                                        }}
                                    />
                                );
                            })}
                        </div>

                        {/* ================= AI STATUS BADGES ================= */}
                        <div className="statusBadge badgeTopLeft">
                            <div className="badgeIndicator" />
                            <div>
                                <div className="badgeTitle">Autonomous Learning</div>
                                <div className="badgeValue">ACTIVE</div>
                            </div>
                        </div>

                        <div className="statusBadge badgeTopRight">
                            <div className="badgeIndicator green" />
                            <div>
                                <div className="badgeTitle">AI Confidence</div>
                                <div className="badgeValue">{confidence}%</div>
                            </div>
                        </div>

                        <div className="statusBadge badgeBottomLeft">
                            <div className="badgeIndicator orange" />
                            <div>
                                <div className="badgeTitle">Mutation Risk</div>
                                <div className="badgeValue">{mutation}%</div>
                            </div>
                        </div>

                        <div className="statusBadge badgeBottomRight">
                            <div className="badgeIndicator blue" />
                            <div>
                                <div className="badgeTitle">Protection</div>
                                <div className="badgeValue">ENABLED</div>
                            </div>
                        </div>
                    </div>

                    {/* ================= CLEANED LOWER HORIZONTAL TIERS ================= */}
                    <div className="engineBottomLayout">
                        <div className="liveGenomeFeed">
                            <div className="feedHeader">LIVE GENOME EVENTS</div>
                            <div className="feedItem"><span className="feedDot green" />Identity Trust Updated</div>
                            <div className="feedItem"><span className="feedDot blue" />Cloud Workload Verified</div>
                            <div className="feedItem"><span className="feedDot orange" />Behaviour Drift Analysed</div>
                            <div className="feedItem"><span className="feedDot purple" />AI Correlation Complete</div>
                        </div>

                        <div className="centerMetrics">
                            <div className="metricBox">
                                <div className="metricValue">{health}%</div>
                                <div className="metricTitle">Genome Health</div>
                            </div>
                            <div className="metricBox">
                                <div className="metricValue">{confidence}%</div>
                                <div className="metricTitle">AI Confidence</div>
                            </div>
                            <div className="metricBox">
                                <div className="metricValue">{mutation}%</div>
                                <div className="metricTitle">Mutation Risk</div>
                            </div>
                        </div>

                        <div className="aiOverlay">
                            <div className="overlayTitle">ORACLE AI</div>
                            <div className="overlayScore">Enterprise Genome Stable</div>
                            <div className="overlayProgress">
                                <Progress percent={health} showInfo={false} strokeColor="#00E676" />
                            </div>
                            <div className="overlayMetrics">
                                <div>Threat Surface <strong>LOW</strong></div>
                                <div>Drift <strong>MINIMAL</strong></div>
                                <div>Trust <strong>VERIFIED</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </EnterpriseCard>
    );
}