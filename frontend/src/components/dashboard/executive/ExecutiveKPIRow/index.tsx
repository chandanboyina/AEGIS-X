import { Row, Col, Progress } from "antd";
import {
    SafetyCertificateOutlined,
    WarningOutlined,
    RobotOutlined,
    ClusterOutlined,
    CloudServerOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { DashboardAPI } from "../../../../api/dashboard";

interface KPIItem {
    title: string;
    value: number;
    display: string;
    color: string;
    icon: React.ReactNode;
}

function AnimatedValue({ title, value }: { title: string; value: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let current = 0;
        const targetValue = typeof value === "number" ? value : 0;
        const step = Math.max(1, Math.ceil(targetValue / 60));
        
        const timer = setInterval(() => {
            current += step;
            if (current >= targetValue) {
                current = targetValue;
                clearInterval(timer);
            }
            setCount(current);
        }, 18);
        return () => clearInterval(timer);
    }, [value]);

    if (title === "Global Security Score") return <>{count} /100</>;
    if (title === "AI Confidence" || title === "Compliance") return <>{count}%</>;
    if (title === "Protected Assets") return <>{count.toLocaleString()}</>;
    return <>{count}</>;
}

export default function ExecutiveKPIRow({ data }: { data?: any }) {
    // Initial baseline state matching layout parameters
    const [cards, setCards] = useState<KPIItem[]>([
        { title: "Global Security Score", value: 92, display: "92/100", color: "#00E676", icon: <SafetyCertificateOutlined /> },
        { title: "Active Threats", value: 2, display: "2", color: "#FF9800", icon: <WarningOutlined /> },
        { title: "AI Confidence", value: 95, display: "95%", color: "#40A9FF", icon: <RobotOutlined /> },
        { title: "Protected Assets", value: 4500000, display: "4,500,000", color: "#00E676", icon: <ClusterOutlined /> },
        { title: "Critical Servers", value: 3801, display: "3,801", color: "#FFD54F", icon: <CloudServerOutlined /> },
        { title: "Compliance", value: 98, display: "98%", color: "#00E676", icon: <CheckCircleOutlined /> },
    ]);

    useEffect(() => {
        try {
            if (data && typeof data === "object" && Object.keys(data).length > 0) {
                // Corrected deeply nested properties to map the live simulation payload
                console.log("👉 KPI ROW RECEIVED STREAM DATA:", data);
                const score = data.commander?.forecast?.enterprise_risk?.enterprise_score ?? 92; 
                const activeThreats = data.incident?.status === "OPEN" ? 1 : 0; 
                const confidence = data.oracle?.confidence ?? 95; 
                const servers = data.commander?.forecast?.business_impact?.affected_servers ?? 3801; 
                const compliance = data.commander?.strategic_analysis?.recommended?.compliance_score ?? 98;

                setCards([
                    { title: "Global Security Score", value: score, display: `${score}/100`, color: "#00E676", icon: <SafetyCertificateOutlined /> },
                    { title: "Active Threats", value: activeThreats, display: String(activeThreats), color: "#FF9800", icon: <WarningOutlined /> },
                    { title: "AI Confidence", value: confidence, display: `${confidence}%`, color: "#40A9FF", icon: <RobotOutlined /> },
                    { title: "Protected Assets", value: 4500000, display: "4,500,000", color: "#00E676", icon: <ClusterOutlined /> },
                    { title: "Critical Servers", value: servers, display: String(servers), color: "#FFD54F", icon: <CloudServerOutlined /> },
                    { title: "Compliance", value: compliance, display: `${compliance}%`, color: "#00E676", icon: <CheckCircleOutlined /> },
                ]);
            } else {
                loadKPIs();
            }
        } catch (err) {
            console.error("Error processing stream data in KPI Row:", err);
            loadKPIs(); 
        }
    }, [data]);

    async function loadKPIs() {
        try {
            const summary = await DashboardAPI.summary();
            if (summary) {
                setCards([
                    { title: "Global Security Score", value: summary.global_security_score ?? 92, display: `${summary.global_security_score ?? 92}/100`, color: "#00E676", icon: <SafetyCertificateOutlined /> },
                    { title: "Active Threats", value: summary.active_threats ?? 2, display: String(summary.active_threats ?? 2), color: "#FF9800", icon: <WarningOutlined /> },
                    { title: "AI Confidence", value: summary.ai_confidence ?? 95, display: `${summary.ai_confidence ?? 95}%`, color: "#40A9FF", icon: <RobotOutlined /> },
                    { title: "Protected Assets", value: summary.protected_assets ?? 4500000, display: (summary.protected_assets ?? 4500000).toLocaleString(), color: "#00E676", icon: <ClusterOutlined /> },
                    { title: "Critical Servers", value: summary.critical_servers ?? 3801, display: String(summary.critical_servers ?? 3801), color: "#FFD54F", icon: <CloudServerOutlined /> },
                    { title: "Compliance", value: summary.compliance ?? 98, display: `${summary.compliance ?? 98}%`, color: "#00E676", icon: <CheckCircleOutlined /> },
                ]);
            }
        } catch (err) {
            console.error("Failed to load static baseline dashboard summaries:", err);
        }
    }

    return (
        <Row gutter={[16, 16]}>
            {cards.map((card) => (
                <Col span={4} key={card.title}>
                    <div
                        style={{
                            background: "#16253B",
                            border: "1px solid #24425F",
                            padding: 18,
                            borderRadius: 8,
                            height: 150,
                        }}
                    >
                        <div style={{ fontSize: 30, color: card.color }}>{card.icon}</div>
                        <div style={{ marginTop: 8, fontSize: 13, color: "#8DA6BF" }}>{card.title}</div>
                        <div style={{ fontSize: 30, fontWeight: 700, marginTop: 6, color: "#FFF" }}>
                            <AnimatedValue title={card.title} value={card.value} />
                        </div>
                        <Progress percent={90} showInfo={false} strokeColor={card.color} />
                    </div>
                </Col>
            ))}
        </Row>
    );
}