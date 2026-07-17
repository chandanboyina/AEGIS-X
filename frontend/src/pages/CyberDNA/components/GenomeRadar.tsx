import "./GenomeRadar.css";
import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Tag,
    Typography,
    Progress
} from "antd";
import {
    RadarChartOutlined,
    WarningOutlined,
    SafetyCertificateOutlined,
    GlobalOutlined,
    ThunderboltOutlined
} from "@ant-design/icons";
import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

const { Text } = Typography;

interface ThreatPoint {
    id: number;
    x: number; // Percentage value (0-100)
    y: number; // Percentage value (0-100)
    severity: "Low" | "Medium" | "High" | "Critical";
    country: string;
}

function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function GenomeRadar() {
    const [coverage, setCoverage] = useState(99);
    const [confidence, setConfidence] = useState(98);
    const [activeThreats, setActiveThreats] = useState(18);
    const [criticalThreats, setCriticalThreats] = useState(2);
    const [points, setPoints] = useState<ThreatPoint[]>([]);

    function generateThreats() {
        const list: ThreatPoint[] = [];
        const severityList = ["Low", "Medium", "High", "Critical"] as const;
        const countries = [
            "India", "Germany", "USA", "Japan", 
            "Brazil", "Singapore", "Australia", "France"
        ];

        for (let i = 0; i < 18; i++) {
            // Generate using Polar Coordinates to keep points strictly on the radar tracks
            const angle = Math.random() * 2 * Math.PI;
            
            // Keep points between the inner core radius and the outer radar boundary
            const distancePercent = random(15, 42); 

            const x = 50 + Math.cos(angle) * distancePercent;
            const y = 50 + Math.sin(angle) * distancePercent;

            list.push({
                id: i,
                x: x,
                y: y,
                severity: severityList[random(0, 3)],
                country: countries[random(0, countries.length - 1)]
            });
        }

        setPoints(list);
        setCoverage(random(97, 100));
        setConfidence(random(96, 100));
        setActiveThreats(random(15, 24));
        setCriticalThreats(random(1, 4));
    }

    useEffect(() => {
        generateThreats();
        const timer = setInterval(generateThreats, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <EnterpriseCard title="Genome Threat Radar" height={1200}>
            <div className="genomeRadar">
                {/* ================= HEADER ================= */}
                <Row justify="space-between" align="middle" gutter={[16, 16]}>
                    <Col>
                        <Text className="radarCaption">
                            ORACLE AI • GLOBAL THREAT INTELLIGENCE
                        </Text>
                        <h2 className="radarTitle">Live Threat Radar</h2>
                        <p className="radarSubtitle">
                            Autonomous AI continuously scans identities, workloads, cloud assets and network traffic to discover evolving cyber threats.
                        </p>
                    </Col>
                    <Col>
                        <Tag color="processing">LIVE SCANNING</Tag>
                    </Col>
                </Row>

                {/* ================= CONTENT ================= */}
                <Row gutter={[28, 28]} className="radarContent">
                    {/* Left Canvas Panel */}
                    <Col xs={24} lg={16}>
                        <div className="radarCanvas">
                            <div className="radarGrid" />
                            <div className="radarGlow radarGlow1" />
                            <div className="radarGlow radarGlow2" />

                            {/* Radar Vector Graphic Matrix Layer */}
                            <svg className="radarSvg" viewBox="0 0 900 900" preserveAspectRatio="xMidYMid meet">
                                <defs>
                                    <radialGradient id="radarGradient">
                                        <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.15" />
                                        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                                    </radialGradient>
                                </defs>

                                <circle cx="450" cy="450" r="360" fill="url(#radarGradient)" />

                                {/* Rings */}
                                {[120, 200, 280, 360].map((radius, index) => (
                                    <circle
                                        key={index}
                                        cx="450"
                                        cy="450"
                                        r={radius}
                                        className="radarRing"
                                    />
                                ))}

                                {/* Cross Axises */}
                                <line x1="90" y1="450" x2="810" y2="450" className="radarAxis" />
                                <line x1="450" y1="90" x2="450" y2="810" className="radarAxis" />
                                <line x1="195" y1="195" x2="705" y2="705" className="radarAxis" />
                                <line x1="705" y1="195" x2="195" y2="705" className="radarAxis" />
                            </svg>

                            {/* Dynamic Scanning Sweep Line */}
                            <div className="radarSweepContainer">
                                <div className="radarSweepBeam" />
                            </div>

                            {/* ================= THREAT MARKERS LAYER ================= */}
                            <div className="threatLayer">
                                {points.map((point) => {
                                    let color = "#00E676";
                                    let size = 10;
                                    if (point.severity === "Medium") { color = "#FFC107"; size = 12; }
                                    if (point.severity === "High") { color = "#FF7043"; size = 14; }
                                    if (point.severity === "Critical") { color = "#FF1744"; size = 16; }

                                    return (
                                        <div
                                            key={point.id}
                                            className="threatPoint"
                                            style={{
                                                left: `${point.x}%`,
                                                top: `${point.y}%`
                                            }}
                                        >
                                            <span
                                                className="threatPulse"
                                                style={{
                                                    background: color,
                                                    width: size * 2.5,
                                                    height: size * 2.5
                                                }}
                                            />
                                            <span
                                                className="threatDot"
                                                style={{
                                                    background: color,
                                                    width: size,
                                                    height: size,
                                                    boxShadow: `0 0 14px ${color}`
                                                }}
                                            />
                                            <div className="threatTooltip">
                                                <div className="tooltipCountry">{point.country}</div>
                                                <div className="tooltipSeverity" style={{ color }}>
                                                    {point.severity} Severity
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* ================= RADAR CORE CENTER ================= */}
                            <div className="radarCenter">
                                <div className="radarPulse pulse1" />
                                <div className="radarPulse pulse2" />
                                <div className="radarPulse pulse3" />
                                <div className="radarCore">
                                    <RadarChartOutlined className="coreRadarIcon" />
                                    <div className="coreRadarScore">{coverage}%</div>
                                    <div className="coreRadarLabel">Coverage</div>
                                    <Progress
                                        percent={confidence}
                                        showInfo={false}
                                        strokeColor="#00E676"
                                        size="small"
                                    />
                                </div>
                            </div>

                            {/* Foreground Display Panels */}
                            <div className="radarStatus">
                                <div className="statusItem"><GlobalOutlined /><span>146 Regions Monitored</span></div>
                                <div className="statusItem"><ThunderboltOutlined /><span>AI Scan Active</span></div>
                                <div className="statusItem"><SafetyCertificateOutlined /><span>Correlation Running</span></div>
                            </div>

                            <div className="scanLabel">
                                <WarningOutlined />
                                <span>Threat Tracking Active</span>
                            </div>
                        </div>
                    </Col>

                    {/* Right Side Control Panels */}
                    <Col xs={24} lg={8}>
                        <div className="radarSidePanel">
                            {/* Card 1: Summary Metric */}
                            <div className="summaryCard">
                                <div className="summaryHeader">
                                    <WarningOutlined />
                                    <span>Active Threat Summary</span>
                                </div>
                                <div className="summaryMetricsRow">
                                    <div className="summaryMetric">
                                        <div className="summaryValue">{activeThreats}</div>
                                        <div className="summaryLabel">Active Threats</div>
                                    </div>
                                    <div className="summaryMetric">
                                        <div className="summaryValue critical">{criticalThreats}</div>
                                        <div className="summaryLabel">Critical Threats</div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Coverage Bars */}
                            <div className="summaryCard">
                                <div className="summaryHeader">
                                    <RadarChartOutlined />
                                    <span>Radar Performance Metrics</span>
                                </div>
                                <div className="progressSpacing">
                                    <div className="progressLabel"><span>Scan Coverage</span><span>{coverage}%</span></div>
                                    <Progress percent={coverage} showInfo={false} strokeColor="#00E676" />
                                </div>
                                <div className="progressSpacing">
                                    <div className="progressLabel"><span>AI Confidence</span><span>{confidence}%</span></div>
                                    <Progress percent={confidence} showInfo={false} strokeColor="#00E5FF" />
                                </div>
                            </div>

                            {/* Card 3: Color Legend */}
                            <div className="summaryCard">
                                <div className="summaryHeader">
                                    <SafetyCertificateOutlined />
                                    <span>Threat Severity Map</span>
                                </div>
                                <div className="legendGrid">
                                    <div className="legendItem"><span className="legendColor low" /><span>Low Severity</span></div>
                                    <div className="legendItem"><span className="legendColor medium" /><span>Medium Severity</span></div>
                                    <div className="legendItem"><span className="legendColor high" /><span>High Severity</span></div>
                                    <div className="legendItem"><span className="legendColor criticalCard" /><span>Critical Threat</span></div>
                                </div>
                            </div>

                            {/* Card 4: AI Assessment */}
                            <div className="summaryCard">
                                <div className="summaryHeader">
                                    <ThunderboltOutlined />
                                    <span>Oracle AI Assessment</span>
                                </div>
                                <div className="oracleStatus">
                                    <div className="oracleRow"><span>Threat Posture</span><strong className="good">SECURE</strong></div>
                                    <div className="oracleRow"><span>Detection Rate</span><strong>{confidence}%</strong></div>
                                    <div className="oracleRow"><span>Genome Stability</span><strong>{coverage}%</strong></div>
                                    <div className="oracleRow"><span>Recommendation</span><strong className="info">Autonomous Safe</strong></div>
                                </div>
                            </div>

                            {/* Card 5: Live Protection Data */}
                            <div className="summaryCard">
                                <div className="summaryHeader">
                                    <GlobalOutlined />
                                    <span>Live Infrastructure Metrics</span>
                                </div>
                                <div className="intelRow"><span>Regions Protected</span><strong>146</strong></div>
                                <div className="intelRow"><span>Active Endpoints</span><strong>12,486</strong></div>
                                <div className="intelRow"><span>Cloud Workloads</span><strong>3,982</strong></div>
                                <div className="intelRow"><span>Stream Events / min</span><strong>8.4K</strong></div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </EnterpriseCard>
    );
}