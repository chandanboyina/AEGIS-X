import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import {
    WarningOutlined,
    BugOutlined,
    RadarChartOutlined,
    GlobalOutlined,
    SecurityScanOutlined,
    SafetyCertificateOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface KPI {

    title: string;

    value: string | number;

    subtitle: string;

    color: string;

    icon: any;

}

export default function ThreatKPIs() {

    const [kpis, setKpis] = useState<KPI[]>([
        {
            title: "Active Threats",
            value: 148,
            subtitle: "Global Campaigns",
            color: "#FF4D4F",
            icon: <WarningOutlined />
        },
        {
            title: "Critical CVEs",
            value: 31,
            subtitle: "Requires Immediate Patch",
            color: "#FA8C16",
            icon: <BugOutlined />
        },
        {
            title: "Threat Actors",
            value: 18,
            subtitle: "Being Tracked",
            color: "#9254DE",
            icon: <GlobalOutlined />
        },
        {
            title: "MITRE Coverage",
            value: "97%",
            subtitle: "Technique Visibility",
            color: "#00E676",
            icon: <SecurityScanOutlined />
        },
        {
            title: "IOCs Today",
            value: "4,286",
            subtitle: "Indicators Correlated",
            color: "#1677FF",
            icon: <RadarChartOutlined />
        },
        {
            title: "Enterprise Risk",
            value: "HIGH",
            subtitle: "Oracle AI Assessment",
            color: "#00E676",
            icon: <SafetyCertificateOutlined />
        }
    ]);

    useEffect(() => {

        const timer = setInterval(() => {

            setKpis([
                {
                    title: "Active Threats",
                    value: 140 + Math.floor(Math.random() * 20),
                    subtitle: "Global Campaigns",
                    color: "#FF4D4F",
                    icon: <WarningOutlined />
                },
                {
                    title: "Critical CVEs",
                    value: 28 + Math.floor(Math.random() * 8),
                    subtitle: "Requires Immediate Patch",
                    color: "#FA8C16",
                    icon: <BugOutlined />
                },
                {
                    title: "Threat Actors",
                    value: 15 + Math.floor(Math.random() * 8),
                    subtitle: "Being Tracked",
                    color: "#9254DE",
                    icon: <GlobalOutlined />
                },
                {
                    title: "MITRE Coverage",
                    value: `${95 + Math.floor(Math.random() * 5)}%`,
                    subtitle: "Technique Visibility",
                    color: "#00E676",
                    icon: <SecurityScanOutlined />
                },
                {
                    title: "IOCs Today",
                    value: (4200 + Math.floor(Math.random() * 250)).toLocaleString(),
                    subtitle: "Indicators Correlated",
                    color: "#1677FF",
                    icon: <RadarChartOutlined />
                },
                {
                    title: "Enterprise Risk",
                    value: Math.random() > 0.5 ? "HIGH" : "MEDIUM",
                    subtitle: "Oracle AI Assessment",
                    color: "#00E676",
                    icon: <SafetyCertificateOutlined />
                }
            ]);

        }, 6000);

        return () => clearInterval(timer);

    }, []);

    return (

        <Row gutter={[24, 24]}>

            {

                kpis.map((item) => (

                    <Col
                        xs={24}
                        sm={12}
                        lg={8}
                        xl={4}
                        key={item.title}
                    >

                        <EnterpriseCard 
                        title=""
                        height={250}>

                            <div
                                style={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}
                            >

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >

                                    <div>

                                        <div
                                            style={{
                                                color: "#8EA9CC",
                                                fontSize: 17
                                            }}
                                        >
                                            {item.title}
                                        </div>

                                        <div
                                            style={{
                                                marginTop: 10,
                                                fontSize: 25,
                                                fontWeight: 700,
                                                color: "#FFFFFF"
                                            }}
                                        >
                                            {item.value}
                                        </div>

                                    </div>

                                    <div
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 18,
                                            background: `${item.color}22`,
                                            color: item.color,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: 30
                                        }}
                                    >
                                        {item.icon}
                                    </div>

                                </div>

                                <div>

                                    <div
                                        style={{
                                            color: "#8EA9CC",
                                            marginBottom: 10
                                        }}
                                    >
                                        {item.subtitle}
                                    </div>

                                    <div
                                        style={{
                                            width: "100%",
                                            height: 8,
                                            background: "#1A2A3F",
                                            borderRadius: 50,
                                            overflow: "hidden"
                                        }}
                                    >

                                        <div
                                            style={{
                                                width: `${92 + Math.floor(Math.random() * 8)}%`,
                                                height: "100%",
                                                background: item.color,
                                                borderRadius: 50,
                                                transition: "0.6s"
                                            }}
                                        />

                                    </div>

                                </div>

                            </div>

                        </EnterpriseCard>

                    </Col>

                ))

            }

        </Row>

    );

}