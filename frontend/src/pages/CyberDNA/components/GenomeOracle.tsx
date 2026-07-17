import "./GenomeOracle.css";
import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Tag,
    Typography,
    Progress
} from "antd";
import {
    RobotOutlined,
    SafetyCertificateOutlined,
    BulbOutlined,
    ThunderboltOutlined,
    CheckCircleOutlined
} from "@ant-design/icons";
import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

const { Text } = Typography;

interface OracleInsight {
    id: number;
    title: string;
    description: string;
    confidence: number;
    priority: "Low" | "Medium" | "High";
}

export default function GenomeOracle() {
    const [health, setHealth] = useState(97);
    const [confidence, setConfidence] = useState(99);
    const [insights, setInsights] = useState<OracleInsight[]>([]);

    useEffect(() => {
        setInsights([
            {
                id: 1,
                title: "Identity Risk Increasing",
                description: "Oracle AI detected abnormal authentication patterns across privileged identities.",
                confidence: 98,
                priority: "High"
            },
            {
                id: 2,
                title: "Cloud Environment Stable",
                description: "Cloud workloads remain compliant with no abnormal behavioural drift detected.",
                confidence: 96,
                priority: "Low"
            },
            {
                id: 3,
                title: "Network Segmentation Effective",
                description: "Lateral movement probability has decreased after autonomous policy enforcement.",
                confidence: 97,
                priority: "Medium"
            }
        ]);

        const timer = setInterval(() => {
            setHealth(v => v >= 99 ? 96 : v + 1);
            setConfidence(v => v >= 99 ? 98 : v + 1);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <EnterpriseCard title="Oracle AI Executive Advisor" height={2500}>
            <div className="genomeOracle">
                {/* ================= HEADER ================= */}
                <Row justify="space-between" align="middle" gutter={[16, 16]}>
                    <Col>
                        <Text className="oracleCaption">
                            ORACLE AI • EXECUTIVE CYBER ADVISOR
                        </Text>
                        <h2 className="oracleTitle">Enterprise Security Intelligence</h2>
                        <p className="oracleSubtitle">
                            Oracle AI continuously explains cyber posture, prioritizes risks, recommends defensive actions, and provides transparent reasoning for every autonomous decision.
                        </p>
                    </Col>
                    <Col>
                        <Tag color="processing">ORACLE ONLINE</Tag>
                    </Col>
                </Row>

                {/* ================= STABLE GRID MATRIX WORKSPACE ================= */}
                <div className="oracleDashboard">
                    
                    {/* TOP TIER LAYER: CONTROL TELEMETRY MAP OVERVIEW */}
                    <div className="oracleTopTierLayout">
                        
                        {/* Interactive Vector Radar Animation Core */}
                        <div className="oracleCorePanel">
                            <div className="oracleGlow" />
                            <div className="oracleCore">
                                <div className="oracleRing" />
                                <div className="oracleRing second" />
                                <div className="oracleRing third" />
                                <div className="oracleCenter">
                                    <RobotOutlined className="oracleRobot" />
                                    <div className="oracleConfidence">{confidence}%</div>
                                    <div className="oracleConfidenceLabel">AI Confidence</div>
                                </div>
                            </div>
                        </div>

                        {/* Middle Stat: Global Security Core Health Dial */}
                        <div className="enterpriseHealth">
                            <div className="healthHeader">
                                <SafetyCertificateOutlined />
                                <span>Enterprise Security Health</span>
                            </div>
                            <div className="healthScore">{health}%</div>
                            <Progress
                                percent={health}
                                showInfo={false}
                                strokeColor="#00E676"
                                trailColor="rgba(255,255,255,.08)"
                            />
                            <div className="healthStatus">
                                Infrastructure operating normally with autonomous protection enabled across all critical environments.
                            </div>
                        </div>

                        {/* Right Stat: AI Multi-Vector Decision Engine Tracks */}
                        <div className="reasoningEngine">
                            <div className="reasoningHeader">
                                <BulbOutlined />
                                <span>Oracle AI Reasoning Engine</span>
                            </div>
                            <div className="reasoningStepsStack">
                                <div className="reasoningStep">
                                    <CheckCircleOutlined className="reasonIcon success" />
                                    <div>
                                        <div className="reasonTitle">Identity Behaviour Analysis</div>
                                        <div className="reasonText">Analysed authentication and behavioural patterns.</div>
                                    </div>
                                </div>
                                <div className="reasoningStep">
                                    <CheckCircleOutlined className="reasonIcon success" />
                                    <div>
                                        <div className="reasonTitle">Threat Correlation</div>
                                        <div className="reasonText">Linked endpoint, cloud and network telemetry.</div>
                                    </div>
                                </div>
                                <div className="reasoningStep">
                                    <CheckCircleOutlined className="reasonIcon success" />
                                    <div>
                                        <div className="reasonTitle">Behaviour Modelling</div>
                                        <div className="reasonText">Compared activity against enterprise baselines.</div>
                                    </div>
                                </div>
                                <div className="reasoningStep">
                                    <CheckCircleOutlined className="reasonIcon success" />
                                    <div>
                                        <div className="reasonTitle">Autonomous Decision</div>
                                        <div className="reasonText">Generated recommended defensive actions.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* INTERMEDIARY HORIZONTAL GRID OVERVIEW METRICS PANEL */}
                    <div className="oracleMetrics">
                        <div className="oracleMetric"><div className="metricNumber">14</div><div className="metricText">AI Models</div></div>
                        <div className="oracleMetric"><div className="metricNumber">2.7M</div><div className="metricText">Events Analysed</div></div>
                        <div className="oracleMetric"><div className="metricNumber">97 ms</div><div className="metricText">Decision Time</div></div>
                        <div className="oracleMetric"><div className="metricNumber">99.7%</div><div className="metricText">Autonomous Accuracy</div></div>
                    </div>

                    {/* MAIN TWO-COLUMN BALANCED LAYOUT CONTENT GRID */}
                    <div className="oracleMainGrid">
                        
                        {/* LEFT ACTION BLOCK PANEL */}
                        <div className="oracleGridLeftColumn">
                            
                            {/* Insight Cards Table */}
                            <div className="oracleInsights">
                                <div className="insightHeader">
                                    <BulbOutlined />
                                    <span>Oracle AI Insights</span>
                                </div>
                                <div className="insightCardsWrapper">
                                    {insights.map((insight) => (
                                        <div key={insight.id} className="insightCard">
                                            <div className="insightTop">
                                                <div className="insightTitle">{insight.title}</div>
                                                <Tag color={insight.priority === "High" ? "red" : insight.priority === "Medium" ? "gold" : "green"}>
                                                    {insight.priority}
                                                </Tag>
                                            </div>
                                            <div className="insightDescription">{insight.description}</div>
                                            <div className="insightProgress">
                                                <span>AI Confidence</span>
                                                <Progress percent={insight.confidence} showInfo={false} strokeColor="#00E5FF" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Executive Reason Explanation Text Engine Block */}
                            <div className="oracleExplanation">
                                <div className="explanationHeader">Oracle AI Executive Explanation</div>
                                <p className="explanationText">
                                    Oracle AI has analysed identity behaviour, endpoint telemetry, cloud workloads, network traffic, historical incidents, vulnerability intelligence, and threat indicators.
                                </p>
                                <p className="explanationText secondaryText">
                                    Current enterprise risk remains controlled. The only notable increase is related to privileged identity behaviour, which has already triggered preventive recommendations. No active compromise has been detected, and autonomous protection continues to operate within expected confidence thresholds.
                                </p>
                            </div>

                        </div>

                        {/* RIGHT ACTION BLOCK PANEL */}
                        <div className="oracleGridRightColumn">
                            
                            {/* Priority Defensive Actions */}
                            <div className="recommendedActions">
                                <div className="actionsHeader">
                                    <ThunderboltOutlined />
                                    <span>Recommended Actions</span>
                                </div>
                                <div className="actionCard">
                                    <div className="actionPriority critical">HIGH PRIORITY</div>
                                    <div className="actionTitle">Increase Identity Protection</div>
                                    <div className="actionDescription">
                                        Enable adaptive MFA for privileged accounts and increase authentication sensitivity until abnormal login behaviour returns to baseline.
                                    </div>
                                </div>
                                <div className="actionCard">
                                    <div className="actionPriority medium">MEDIUM PRIORITY</div>
                                    <div className="actionTitle">Monitor East-West Traffic</div>
                                    <div className="actionDescription">
                                        Oracle AI recommends temporary micro-segmentation and continuous monitoring of lateral movement across production workloads.
                                    </div>
                                </div>
                            </div>

                            {/* Infrastructure Topology Footprint Metrics Table */}
                            <div className="securityPosture">
                                <div className="postureHeader">Enterprise Security Posture</div>
                                <div className="postureGrid">
                                    <div className="postureCard"><div className="postureValue">146</div><div className="postureLabel">Protected Regions</div></div>
                                    <div className="postureCard"><div className="postureValue">12,486</div><div className="postureLabel">Endpoints Protected</div></div>
                                    <div className="postureCard"><div className="postureValue">3,982</div><div className="postureLabel">Cloud Assets</div></div>
                                    <div className="postureCard"><div className="postureValue">824</div><div className="postureLabel">Critical Apps</div></div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* BOTTOM DOCK PANEL: ORACLE ASSESSMENT METRICS SCOREBOARD */}
                    <div className="oracleSummary">
                        <div className="summaryTitle">ORACLE AI FINAL ASSESSMENT</div>
                        <div className="summaryMessage">
                            Enterprise cyber resilience remains strong. Oracle AI confirms that identity, endpoint, cloud and network behaviour are operating within acceptable thresholds. Current recommendations are preventive rather than reactive, indicating no confirmed compromise.
                        </div>
                        <div className="summaryFooter">
                            <div className="summaryStatus"><CheckCircleOutlined /><span>Autonomous Protection Active</span></div>
                            <div className="summaryStatus"><RobotOutlined /><span>Oracle AI Monitoring</span></div>
                            <div className="summaryStatus"><SafetyCertificateOutlined /><span>Zero Critical Incidents</span></div>
                        </div>
                    </div>

                    {/* DOCK TERMINAL: EXECUTIVE ACCOUNTING STATS SUMMARY */}
                    <div className="oracleScoreboard">
                        <div className="scoreCard"><div className="scoreValue">99.7%</div><div className="scoreLabel">Decision Accuracy</div></div>
                        <div className="scoreCard"><div className="scoreValue">97%</div><div className="scoreLabel">Security Health</div></div>
                        <div className="scoreCard"><div className="scoreValue">2.7M</div><div className="scoreLabel">Events Processed</div></div>
                        <div className="scoreCard"><div className="scoreValue">97 ms</div><div className="scoreLabel">AI Response Time</div></div>
                    </div>

                </div>
            </div>
        </EnterpriseCard>
    );
}