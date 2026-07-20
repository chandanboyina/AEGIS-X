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

interface KPIItem {
    title: string;
    value: number;
    display: string;
    color: string;
    icon: React.ReactNode;
}

function AnimatedValue({
    title,
    value,
}: {
    title: string;
    value: number;
}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let current = 0;

        const target = typeof value === "number" ? value : 0;

        const step = Math.max(1, Math.ceil(target / 60));

        const timer = setInterval(() => {
            current += step;

            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            setCount(current);
        }, 18);

        return () => clearInterval(timer);
    }, [value]);

    if (title === "Global Security Score") return <>{count}/100</>;

    if (title === "AI Confidence") return <>{count}%</>;

    if (title === "Compliance") return <>{count}%</>;

    if (title === "Protected Assets")
        return <>{count.toLocaleString()}</>;

    return <>{count}</>;
}

export default function ExecutiveKPIRow({
    data,
}: {
    data?: any;
}) {
    const [cards, setCards] = useState<KPIItem[]>([
        {
            title: "Global Security Score",
            value: 92,
            display: "92/100",
            color: "#00E676",
            icon: <SafetyCertificateOutlined />,
        },
        {
            title: "Active Threats",
            value: 0,
            display: "0",
            color: "#FF9800",
            icon: <WarningOutlined />,
        },
        {
            title: "AI Confidence",
            value: 95,
            display: "95%",
            color: "#40A9FF",
            icon: <RobotOutlined />,
        },
        {
            title: "Protected Assets",
            value: 4500,
            display: "4,500",
            color: "#00E676",
            icon: <ClusterOutlined />,
        },
        {
            title: "Critical Servers",
            value: 3801,
            display: "3801",
            color: "#FFD54F",
            icon: <CloudServerOutlined />,
        },
        {
            title: "Compliance",
            value: 98,
            display: "98%",
            color: "#00E676",
            icon: <CheckCircleOutlined />,
        },
    ]);

    useEffect(() => {
        if (!data) return;

        console.log("👉 KPI ROW RECEIVED STREAM DATA:", data);

        const globalSecurityScore =
            data.commander?.forecast?.forecast?.enterprise_risk
                ?.enterprise_score ??
            data.enterprise_intelligence?.enterprise?.enterprise_score ??
            92;

        const activeThreats =
            data.incident?.status === "OPEN" ? 1 : 0;

        const aiConfidence =
            data.oracle?.confidence ??
            data.commander?.decision?.probability ??
            95;

        const protectedAssets =
            data.metrics?.protected_assets ??
            4500;

        const criticalServers =
            data.commander?.forecast?.forecast?.business_impact
                ?.affected_servers ??
            3801;

        const compliance =
            data.commander?.strategic_analysis?.recommended
                ?.compliance_score ??
            98;

        setCards([
            {
                title: "Global Security Score",
                value: globalSecurityScore,
                display: `${globalSecurityScore}/100`,
                color: "#00E676",
                icon: <SafetyCertificateOutlined />,
            },
            {
                title: "Active Threats",
                value: activeThreats,
                display: String(activeThreats),
                color: "#FF9800",
                icon: <WarningOutlined />,
            },
            {
                title: "AI Confidence",
                value: aiConfidence,
                display: `${aiConfidence}%`,
                color: "#40A9FF",
                icon: <RobotOutlined />,
            },
            {
                title: "Protected Assets",
                value: protectedAssets,
                display: protectedAssets.toLocaleString(),
                color: "#00E676",
                icon: <ClusterOutlined />,
            },
            {
                title: "Critical Servers",
                value: criticalServers,
                display: String(criticalServers),
                color: "#FFD54F",
                icon: <CloudServerOutlined />,
            },
            {
                title: "Compliance",
                value: compliance,
                display: `${compliance}%`,
                color: "#00E676",
                icon: <CheckCircleOutlined />,
            },
        ]);
    }, [data]);

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
                        <div
                            style={{
                                fontSize: 30,
                                color: card.color,
                            }}
                        >
                            {card.icon}
                        </div>

                        <div
                            style={{
                                marginTop: 8,
                                fontSize: 13,
                                color: "#8DA6BF",
                            }}
                        >
                            {card.title}
                        </div>

                        <div
                            style={{
                                fontSize: 30,
                                fontWeight: 700,
                                marginTop: 6,
                                color: "#FFF",
                            }}
                        >
                            <AnimatedValue
                                title={card.title}
                                value={card.value}
                            />
                        </div>

                        <Progress
                            percent={90}
                            showInfo={false}
                            strokeColor={card.color}
                        />
                    </div>
                </Col>
            ))}
        </Row>
    );
}