import { Row, Col, Progress } from "antd";
import {
    WarningOutlined,
    CheckCircleOutlined,
    RobotOutlined,
    ThunderboltOutlined,
    ClockCircleOutlined,
    SafetyCertificateOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const initialCards = [

    {
        title: "Total Incidents",
        value: 1248,
        suffix: "",
        color: "#40A9FF",
        icon: <WarningOutlined />,
        trend: "+12%"
    },

    {
        title: "Critical Incidents",
        value: 34,
        suffix: "",
        color: "#FF4D4F",
        icon: <ThunderboltOutlined />,
        trend: "-3%"
    },

    {
        title: "Containment Rate",
        value: 96,
        suffix: "%",
        color: "#00E676",
        icon: <CheckCircleOutlined />,
        trend: "+2%"
    },

    {
        title: "AI Accuracy",
        value: 98,
        suffix: "%",
        color: "#40A9FF",
        icon: <RobotOutlined />,
        trend: "+1%"
    },

    {
        title: "Mean Response",
        value: 18,
        suffix: "m",
        color: "#FFD54F",
        icon: <ClockCircleOutlined />,
        trend: "-5%"
    },

    {
        title: "False Positives",
        value: 2,
        suffix: "%",
        color: "#A78BFA",
        icon: <SafetyCertificateOutlined />,
        trend: "-1%"
    }

];

export default function AnalyticsKPIRow() {

    const [cards, setCards] = useState(initialCards);

    useEffect(() => {

        const timer = setInterval(() => {

            setCards(old =>

                old.map(card => {

                    let value = card.value;

                    switch (card.title) {

                        case "Total Incidents":
                            value += Math.floor(Math.random() * 5);
                            break;

                        case "Critical Incidents":
                            value = Math.max(
                                20,
                                value + Math.floor(Math.random() * 5) - 2
                            );
                            break;

                        case "Containment Rate":
                            value = Math.min(
                                99,
                                Math.max(
                                    90,
                                    value + (Math.random() > .5 ? 1 : -1)
                                )
                            );
                            break;

                        case "AI Accuracy":
                            value = Math.min(
                                99,
                                Math.max(
                                    95,
                                    value + (Math.random() > .5 ? 1 : -1)
                                )
                            );
                            break;

                        case "Mean Response":
                            value = Math.max(
                                10,
                                Math.min(
                                    30,
                                    value + (Math.random() > .5 ? 1 : -1)
                                )
                            );
                            break;

                        case "False Positives":
                            value = Math.max(
                                1,
                                Math.min(
                                    5,
                                    value + (Math.random() > .5 ? 1 : -1)
                                )
                            );
                            break;

                    }

                    return {
                        ...card,
                        value
                    };

                })

            );

        }, 2500);

        return () => clearInterval(timer);

    }, []);

    return (

        <Row gutter={[16, 16]}>

            {

                cards.map(card => (

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                        lg={4}
                        key={card.title}
                    >

                        <div
                            style={{
                                background: "#16253B",
                                border: "1px solid #223A55",
                                borderRadius: 10,
                                padding: 16,
                                height: 145
                            }}
                        >

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >

                                <div
                                    style={{
                                        color: card.color,
                                        fontSize: 24
                                    }}
                                >
                                    {card.icon}
                                </div>

                                <div
                                    style={{
                                        fontSize: 12,
                                        color:
                                            card.trend.startsWith("+")
                                                ? "#00E676"
                                                : "#FF9800"
                                    }}
                                >
                                    {card.trend}
                                </div>

                            </div>

                            <div
                                style={{
                                    color: "#8EA9CC",
                                    marginTop: 10,
                                    fontSize: 13
                                }}
                            >
                                {card.title}
                            </div>

                            <div
                                style={{
                                    color: "#FFFFFF",
                                    fontSize: 30,
                                    fontWeight: 700,
                                    marginTop: 6
                                }}
                            >
                                {card.value}
                                {card.suffix}
                            </div>

                            <Progress
                                percent={
                                    card.suffix === "%"
                                        ? card.value
                                        : 100
                                }
                                showInfo={false}
                                strokeColor={card.color}
                                railColor="#223A55"
                                size="small"
                            />

                        </div>

                    </Col>

                ))

            }

        </Row>

    );

}