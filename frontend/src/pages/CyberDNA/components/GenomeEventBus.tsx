import "./GenomeEventBus.css";
import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Tag,
    Typography
} from "antd";
import {
    GlobalOutlined,
    SafetyCertificateOutlined,
    ApartmentOutlined,
    NodeIndexOutlined,
    RadarChartOutlined,
    ThunderboltOutlined
} from "@ant-design/icons";
import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

const { Text } = Typography;

interface EventNode {
    id: number;
    title: string;
    icon: React.ReactNode;
    status: string;
    color: string;
}

export default function GenomeEventBus() {
    const [events, setEvents] = useState<EventNode[]>([]);

    function refresh() {
        setEvents([
            {
                id: 1,
                title: "Internet",
                icon: <GlobalOutlined />,
                status: "Receiving",
                color: "#00E5FF"
            },
            {
                id: 2,
                title: "Firewall",
                icon: <SafetyCertificateOutlined />,
                status: "Inspecting",
                color: "#00E676"
            },
            {
                id: 3,
                title: "Identity AI",
                icon: <ApartmentOutlined />,
                status: "Verifying",
                color: "#FFC107"
            },
            {
                id: 4,
                title: "Correlation",
                icon: <NodeIndexOutlined />,
                status: "Linking",
                color: "#FF7043"
            },
            {
                id: 5,
                title: "Oracle AI",
                icon: <RadarChartOutlined />,
                status: "Learning",
                color: "#7B61FF"
            },
            {
                id: 6,
                title: "Response",
                icon: <ThunderboltOutlined />,
                status: "Protected",
                color: "#00E676"
            }
        ]);
    }

    useEffect(() => {
        refresh();
    }, []);

    return (
        <EnterpriseCard title="Enterprise Event Bus" height={1350}>
            <div className="genomeEventBus">
                {/* ================= HEADER ================= */}
                <Row justify="space-between" align="middle" gutter={[16, 16]}>
                    <Col>
                        <Text className="eventCaption">
                            ORACLE AI • REAL TIME EVENT PIPELINE
                        </Text>
                        <h2 className="eventTitle">Autonomous Event Correlation</h2>
                        <p className="eventSubtitle">
                            Every packet, identity, workload and application event flows through Oracle AI before autonomous response.
                        </p>
                    </Col>
                    <Col>
                        <Tag color="processing">LIVE PIPELINE</Tag>
                    </Col>
                </Row>

                {/* ================= CONTENT STACKS ================= */}
                <Row gutter={[28, 28]} className="pipelineContentGrid">
                    
                    {/* LEFT CANVAS WRAPPER SECTION */}
                    <Col xs={24} lg={15}>
                        <div className="pipelineCanvasContainer">
                            
                            {/* The Flowing Bus Pipeline map */}
                            <div className="pipelineTrackArea">
                                <div className="pipelineLine" />
                                
                                <div className="packetLayer">
                                    {Array.from({ length: 18 }).map((_, index) => (
                                        <span
                                            key={index}
                                            className="dataPacket"
                                            style={{ animationDelay: `${index * 0.4}s` }}
                                        />
                                    ))}
                                </div>

                                <div className="pipelineNodesList">
                                    {events.map((event) => (
                                        <div key={event.id} className="pipelineNode">
                                            <div className="pipelineGlow" style={{ background: event.color }} />
                                            <div className="pipelineCircle" style={{ borderColor: event.color }}>
                                                <div className="pipelineIcon" style={{ color: event.color }}>
                                                    {event.icon}
                                                </div>
                                            </div>
                                            <div className="pipelineInfo">
                                                <div className="pipelineTitle">{event.title}</div>
                                                <div className="pipelineStatus">{event.status}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Center Floating Oracle Hub Core */}
                            <div className="oracleBusDock">
                                <div className="oracleGlow" />
                                <div className="oracleCore">
                                    <RadarChartOutlined className="oracleIcon" />
                                    <div className="oracleTitle">ORACLE AI</div>
                                    <div className="oracleValue">99.7%</div>
                                    <div className="oracleLabel">Correlation Accuracy</div>
                                </div>
                            </div>

                            {/* Floating Telemetry Stats */}
                            <div className="pipelineStatusPanel">
                                <div className="statusCard"><div className="statusValue">8.4K</div><div className="statusLabel">Events / Min</div></div>
                                <div className="statusCard"><div className="statusValue">97ms</div><div className="statusLabel">AI Decision</div></div>
                                <div className="statusCard"><div className="statusValue">99%</div><div className="statusLabel">Success Rate</div></div>
                            </div>
                        </div>

                        {/* BOTTOM TIER 1: Decision Map Timeline Component */}
                        <div className="decisionTimeline">
                            <div className="timelineHeader">ORACLE AI DECISION PIPELINE</div>
                            <div className="timelineFlowWrapper">
                                <div className="timelineStep"><div className="timelineCircle" /><div className="timelineText">Event Ingested</div></div>
                                <div className="timelineConnector" />
                                <div className="timelineStep"><div className="timelineCircle" /><div className="timelineText">Identity Verified</div></div>
                                <div className="timelineConnector" />
                                <div className="timelineStep"><div className="timelineCircle" /><div className="timelineText">Threat Correlated</div></div>
                                <div className="timelineConnector" />
                                <div className="timelineStep"><div className="timelineCircle" /><div className="timelineText">AI Risk Scored</div></div>
                                <div className="timelineConnector" />
                                <div className="timelineStep"><div className="timelineCircle active" /><div className="timelineText">Autonomous Response</div></div>
                            </div>
                        </div>

                        {/* BOTTOM TIER 2: Left Business Executive Breakdown */}
                        <div className="executiveSummary">
                            <div className="summaryHeader">ORACLE AI EXECUTIVE SUMMARY</div>
                            <p className="summaryDescription">
                                Oracle AI successfully analysed incoming events, correlated endpoint behaviour, verified user identity, and automatically initiated protection workflows.
                            </p>
                            <div className="summaryGrid">
                                <div className="summaryBox"><div className="summaryNumber">99.7%</div><div className="summaryText">AI Confidence</div></div>
                                <div className="summaryBox"><div className="summaryNumber">97 ms</div><div className="summaryText">Decision Time</div></div>
                                <div className="summaryBox"><div className="summaryNumber">8.4K</div><div className="summaryText">Events / Min</div></div>
                                <div className="summaryBox"><div className="summaryNumber">146</div><div className="summaryText">Protected Regions</div></div>
                            </div>
                        </div>
                    </Col>

                    {/* RIGHT RIGID DISPLAY COLUMN SECTION */}
                    <Col xs={24} lg={9}>
                        <div className="rightControlPanelStack">
                            
                            {/* Response Engine Card */}
                            <div className="responsePanel">
                                <div className="responseHeader">
                                    <ThunderboltOutlined />
                                    <span>Autonomous Response Engine</span>
                                </div>
                                <div className="responseItem"><span>Compromised Session</span><strong className="success">Isolated</strong></div>
                                <div className="responseItem"><span>Endpoint Protection</span><strong className="success">Enabled</strong></div>
                                <div className="responseItem"><span>Network Segmentation</span><strong className="success">Applied</strong></div>
                                <div className="responseItem"><span>Credential Reset</span><strong className="warning">Pending</strong></div>
                            </div>

                            {/* Live Intel Activity Feeds */}
                            <div className="eventStream">
                                <div className="streamHeader">LIVE EVENT STREAM</div>
                                <div className="streamItem">
                                    <span className="streamDot green" />
                                    <div className="streamContent">
                                        <div className="streamTitle">Firewall accepted inbound HTTPS traffic</div>
                                        <div className="streamTime">2 sec ago</div>
                                    </div>
                                </div>
                                <div className="streamItem">
                                    <span className="streamDot blue" />
                                    <div className="streamContent">
                                        <div className="streamTitle">Identity verified using adaptive trust</div>
                                        <div className="streamTime">5 sec ago</div>
                                    </div>
                                </div>
                                <div className="streamItem">
                                    <span className="streamDot orange" />
                                    <div className="streamContent">
                                        <div className="streamTitle">AI correlated endpoint behaviour</div>
                                        <div className="streamTime">9 sec ago</div>
                                    </div>
                                </div>
                                <div className="streamItem">
                                    <span className="streamDot purple" />
                                    <div className="streamContent">
                                        <div className="streamTitle">Threat graph updated successfully</div>
                                        <div className="streamTime">14 sec ago</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Col>
                </Row>
            </div>
        </EnterpriseCard>
    );
}