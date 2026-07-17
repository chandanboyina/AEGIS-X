import "./GenomePredictions.css";
import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Tag,
    Progress,
    Typography
} from "antd";
import {
    LineChartOutlined,
    ThunderboltOutlined,
    RadarChartOutlined,
    SafetyCertificateOutlined,
    RiseOutlined
} from "@ant-design/icons";
import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

const { Text } = Typography;

interface Prediction {
    id: number;
    attack: string;
    probability: number;
    eta: string;
    severity: "Low" | "Medium" | "High" | "Critical";
}

export default function GenomePredictions() {
    const [confidence, setConfidence] = useState(98);
    const [forecast, setForecast] = useState(93);
    const [predictions, setPredictions] = useState<Prediction[]>([]);

    useEffect(() => {
        setPredictions([
            {
                id: 1,
                attack: "Credential Stuffing",
                probability: 94,
                eta: "18 mins",
                severity: "High"
            },
            {
                id: 2,
                attack: "Ransomware Activity",
                probability: 86,
                eta: "42 mins",
                severity: "Critical"
            },
            {
                id: 3,
                attack: "Lateral Movement",
                probability: 81,
                eta: "26 mins",
                severity: "High"
            },
            {
                id: 4,
                attack: "Privilege Escalation",
                probability: 72,
                eta: "1 hr",
                severity: "Medium"
            }
        ]);

        const timer = setInterval(() => {
            setConfidence(v => v >= 99 ? 97 : v + 1);
            setForecast(v => v >= 99 ? 92 : v + 1);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    return (
        <EnterpriseCard title="Predictive Threat Intelligence" height={2000}>
            <div className="genomePredictions">
                {/* ================= HEADER ================= */}
                <Row justify="space-between" align="middle" gutter={[16, 16]}>
                    <Col>
                        <Text className="predictionCaption">
                            ORACLE AI • PREDICTIVE CYBER INTELLIGENCE
                        </Text>
                        <h2 className="predictionTitle">Attack Forecast Engine</h2>
                        <p className="predictionSubtitle">
                            Oracle AI predicts attack paths, estimates breach probability, and recommends autonomous defensive actions before an attack reaches critical infrastructure.
                        </p>
                    </Col>
                    <Col>
                        <Tag color="processing">AI FORECAST ACTIVE</Tag>
                    </Col>
                </Row>

                {/* ================= STABLE LAYOUT DASHBOARD ================= */}
                <div className="predictionDashboard">
                    
                    {/* TIER 1: CORE ENGINE & FORECAST GRAPH MAP */}
                    <div className="visualizationRow">
                        <div className="forecastEngine">
                            <div className="forecastGlow" />
                            <div className="forecastCore">
                                <div className="forecastRing" />
                                <div className="forecastRing second" />
                                <div className="forecastRing third" />
                                <div className="forecastCenter">
                                    <RadarChartOutlined className="forecastIcon" />
                                    <div className="forecastValue">{confidence}%</div>
                                    <div className="forecastLabel">Prediction Confidence</div>
                                </div>
                            </div>
                        </div>

                        <div className="forecastGraph">
                            <svg viewBox="0 0 900 280" className="graphSvg" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#00E5FF" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path
                                    className="graphArea"
                                    d="M0 220 C100 210 180 170 250 160 S420 90 500 110 S650 180 720 120 S850 40 900 60 L900 280 L0 280 Z"
                                />
                                <path
                                    className="graphLine"
                                    d="M0 220 C100 210 180 170 250 160 S420 90 500 110 S650 180 720 120 S850 40 900 60"
                                />
                            </svg>
                            <div className="graphOverlay">
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="graphPoint"
                                        style={{
                                            left: `${index * 10}%`,
                                            top: `${140 + Math.sin(index) * 40}px`, // Dynamically maps vector curves safely
                                            animationDelay: `${index * 0.2}s`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* TIER 2: HORIZONTAL LIVE INFRASTRUCTURE TELEMETRY METRICS */}
                    <div className="forecastMetrics">
                        <div className="metricCard">
                            <LineChartOutlined />
                            <div className="metricValue">{forecast}%</div>
                            <div className="metricLabel">Forecast Accuracy</div>
                            <Progress percent={forecast} showInfo={false} strokeColor="#00E676" />
                        </div>
                        <div className="metricCard">
                            <SafetyCertificateOutlined />
                            <div className="metricValue">14</div>
                            <div className="metricLabel">Active Prediction Models</div>
                        </div>
                        <div className="metricCard">
                            <RiseOutlined />
                            <div className="metricValue">2.7M</div>
                            <div className="metricLabel">Events Analysed Today</div>
                        </div>
                        <div className="metricCard">
                            <ThunderboltOutlined />
                            <div className="metricValue">97 ms</div>
                            <div className="metricLabel">Average Prediction Time</div>
                        </div>
                    </div>

                    {/* TIER 3: DATA GRID MATRIX & STRATEGIC RECOMMENDATIONS */}
                    <div className="analyticsDetailsSection">
                        <div className="predictionTable">
                            <div className="predictionHeader">Predicted Attack Timeline</div>
                            <div className="predictionRowsWrapper">
                                {predictions.map((prediction) => (
                                    <div key={prediction.id} className="predictionRow">
                                        <div className="predictionInfo">
                                            <div className="predictionAttack">{prediction.attack}</div>
                                            <div className="predictionEta">Estimated in {prediction.eta}</div>
                                        </div>
                                        <div className="predictionRisk">
                                            <Progress
                                                type="circle"
                                                width={48}
                                                percent={prediction.probability}
                                                strokeColor={
                                                    prediction.severity === "Critical" ? "#FF5252" :
                                                    prediction.severity === "High" ? "#FF9800" :
                                                    prediction.severity === "Medium" ? "#FFC107" : "#00E676"
                                                }
                                            />
                                        </div>
                                        <div className="predictionSeverity">
                                            <Tag color={
                                                prediction.severity === "Critical" ? "red" :
                                                prediction.severity === "High" ? "orange" :
                                                prediction.severity === "Medium" ? "gold" : "green"
                                            }>
                                                {prediction.severity}
                                            </Tag>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="recommendationPanel">
                            <div className="recommendationHeader">
                                <ThunderboltOutlined />
                                <span>Oracle AI Recommendation</span>
                            </div>
                            <div className="recommendationCard">
                                <div className="recommendationPriority">HIGH PRIORITY</div>
                                <div className="recommendationTitle">Strengthen Identity Protection</div>
                                <p className="recommendationText">
                                    Oracle AI predicts an increased probability of credential-based attacks within the next 30 minutes. Enable adaptive MFA, temporarily increase authentication sensitivity, and monitor privileged accounts for anomalous behavior.
                                </p>
                            </div>
                            <div className="recommendationCard">
                                <div className="recommendationPriority medium">MEDIUM PRIORITY</div>
                                <div className="recommendationTitle">Reduce Lateral Movement Risk</div>
                                <p className="recommendationText">
                                    Segment critical workloads, restrict east-west communication, and apply temporary policy tightening to high-value assets until predicted threat activity decreases.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* TIER 4: BOTTOM EXECUTIVE INSIGHT BREAKDOWNS */}
                    <div className="predictionSummary">
                        <div className="summaryHeader">EXECUTIVE PREDICTION SUMMARY</div>
                        <p className="summaryDescription">
                            Oracle AI continuously evaluates billions of security events, behavioral patterns, identity signals, endpoint telemetry, cloud workloads, and threat intelligence feeds to forecast cyber attacks before they reach critical assets.
                        </p>
                        <div className="summaryMetrics">
                            <div className="summaryMetric"><div className="summaryNumber">98%</div><div className="summaryLabel">AI Confidence</div></div>
                            <div className="summaryMetric"><div className="summaryNumber">14</div><div className="summaryLabel">Prediction Models</div></div>
                            <div className="summaryMetric"><div className="summaryNumber">2.7M</div><div className="summaryLabel">Events Analysed</div></div>
                            <div className="summaryMetric"><div className="summaryNumber">97 ms</div><div className="summaryLabel">Prediction Time</div></div>
                        </div>
                    </div>

                    {/* TIER 5: OVERALL GLOBAL NETWORK CARD METRICS FOOTER */}
                    <div className="predictionFooter">
                        <div className="footerCard"><div className="footerValue">146</div><div className="footerLabel">Protected Regions</div></div>
                        <div className="footerCard"><div className="footerValue">12,486</div><div className="footerLabel">Connected Endpoints</div></div>
                        <div className="footerCard"><div className="footerValue">3,982</div><div className="footerLabel">Cloud Assets</div></div>
                        <div className="footerCard"><div className="footerValue">99.7%</div><div className="footerLabel">Autonomous Decisions</div></div>
                    </div>

                </div>
            </div>
        </EnterpriseCard>
    );
}