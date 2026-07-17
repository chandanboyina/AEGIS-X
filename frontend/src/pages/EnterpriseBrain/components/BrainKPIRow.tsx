import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import {
    RobotOutlined,
    ThunderboltOutlined,
    RadarChartOutlined,
    DeploymentUnitOutlined,
    ClockCircleOutlined,
    SafetyCertificateOutlined
} from "@ant-design/icons";
import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate() {
    return {
        models: 6,
        inference: random(2200, 3400),
        confidence: random(94, 99),
        latency: random(82, 180),
        queue: random(120, 420),
        forecast: ["LOW", "MODERATE", "HIGH"][random(0, 2)]
    };
}

export default function BrainKPIRow() {

    const [data, setData] = useState(generate());

    useEffect(() => {

        const timer = setInterval(() => {
            setData(generate());
        }, 4000);

        return () => clearInterval(timer);

    }, []);

    const cards = [

        {
            title: "AI Models",
            value: data.models,
            icon: <RobotOutlined />,
            color: "#00E676",
            suffix: "Online"
        },

        {
            title: "Inference / Sec",
            value: data.inference,
            icon: <ThunderboltOutlined />,
            color: "#2D7CFF",
            suffix: "Requests"
        },

        {
            title: "Avg Confidence",
            value: `${data.confidence}%`,
            icon: <SafetyCertificateOutlined />,
            color: "#00E676",
            suffix: ""
        },

        {
            title: "Prediction Queue",
            value: data.queue,
            icon: <DeploymentUnitOutlined />,
            color: "#FA8C16",
            suffix: "Tasks"
        },

        {
            title: "Latency",
            value: `${data.latency} ms`,
            icon: <ClockCircleOutlined />,
            color: "#A855F7",
            suffix: ""
        },

        {
            title: "Threat Forecast",
            value: data.forecast,
            icon: <RadarChartOutlined />,
            color:
                data.forecast === "HIGH"
                    ? "#FF4D4F"
                    : data.forecast === "MODERATE"
                    ? "#FA8C16"
                    : "#00E676",
            suffix: ""
        }

    ];

    return (

        <Row gutter={[20, 20]}>

            {cards.map((card) => (

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                    lg={4}
                    key={card.title}
                >

                    <EnterpriseCard title="" height={200}>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                height: "100%"
                            }}
                        >

                            <div>

                                <div
                                    style={{
                                        color: "#8EA9CC",
                                        fontSize: 12
                                    }}
                                >
                                    {card.title}
                                </div>

                                <div
                                    style={{
                                        fontSize: 26,
                                        fontWeight: 700,
                                        color: "#FFFFFF",
                                        marginTop: 8
                                    }}
                                >
                                    {card.value}
                                </div>

                                {card.suffix && (

                                    <div
                                        style={{
                                            marginTop: 6,
                                            color: "#8EA9CC",
                                            fontSize: 12
                                        }}
                                    >
                                        {card.suffix}
                                    </div>

                                )}

                            </div>

                            <div
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 12,
                                    background: card.color + "20",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: card.color,
                                    fontSize: 24
                                }}
                            >
                                {card.icon}
                            </div>

                        </div>

                    </EnterpriseCard>

                </Col>

            ))}

        </Row>

    );

}