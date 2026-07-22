
import { Row, Col } from "antd";
//import { DashboardAPI } from "../../api/dashboard";
import { useDashboard } from "../../context/DashboardContext";

// Component Imports
import ExecutiveRecommendation from "../../components/dashboard/executive/ExecutiveRecommendation";
import ExecutiveTimeline from "../../components/dashboard/executive/ExecutiveTimeline";
import AICouncilSummary from "../../components/dashboard/executive/AICouncilSummary/AICouncilSummary";
import ExecutiveKPIRow from "../../components/dashboard/executive/ExecutiveKPIRow";
import EnterpriseCard from "../../components/common/EnterpriseCard/EnterpriseCard";
import GlobalThreatMap from "../../components/dashboard/executive/GlobalThreatMap";
import GlobalThreatSummary from "../../components/dashboard/executive/GlobalThreatSummary";
import ThreatOriginRanking from "../../components/dashboard/executive/ThreatOriginRanking";
import ThreatLegend from "../../components/dashboard/executive/ThreatLegend";
import NationalInfrastructure from "../../components/dashboard/executive/NationalInfrastructure";
import ThreatFeed from "../../components/dashboard/executive/ThreatFeed";
import ThreatIntelTicker from "../../components/dashboard/executive/ThreatIntelTicker";
import ExecutiveAlerts from "../../components/dashboard/executive/ExecutiveAlerts";

export default function Dashboard() {
    const { securityData, loading, error } = useDashboard();

    if (loading) {

        return <div>Loading Dashboard...</div>;

    }

    if (error) {

        return <div>{error}</div>;

    }

    

    return (
        <div
            style={{
                padding: 20,
                background: "#07111F",
                minHeight: "100vh"
            }}
        >
            {/* Ticker Row */}
            <Row gutter={[20, 20]} style={{ marginBottom: 20 }}>
                <ThreatIntelTicker {...{ data: securityData?.commander } as any} />
            </Row>

            {/* Core Metrics & Panels Grid */}
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <ExecutiveKPIRow {...{ data: securityData } as any} />
                </Col>

                <Col span={24}>
                    <GlobalThreatSummary {...{ data: securityData?.forecast } as any} />
                </Col>

                <Col span={16}>
                    <EnterpriseCard title="Global Threat Landscape (Real-Time)" height={560}>
                        <GlobalThreatMap {...{ data: securityData?.strategic_analysis } as any} />
                    </EnterpriseCard>
                </Col>

                <Col span={8}>
                    <EnterpriseCard title="National Infrastructure" height={560}>
                        <NationalInfrastructure {...{ data: securityData?.sentinel?.business_impact } as any} />
                    </EnterpriseCard>
                </Col>

                <Col xs={24} lg={8}>
                    <EnterpriseCard title="Threat Feed" height={450}>
                        <ThreatFeed {...{ data: securityData?.brain?.history } as any} />
                    </EnterpriseCard>
                </Col>

                <Col xs={24} lg={10}>
                    <EnterpriseCard title="Threat Origin Ranking" height={450}>
                        <ThreatOriginRanking {...{ data: securityData?.strategic_analysis } as any} />
                    </EnterpriseCard>
                </Col>

                <Col xs={24} lg={6}>
                    <EnterpriseCard title="Threat Legend" height={450}>
                        <ThreatLegend />
                    </EnterpriseCard>
                </Col>

                <Col span={24}>
                    <ExecutiveRecommendation {...{ data: securityData?.oracle } as any} />
                </Col>

                <Col xs={24} lg={12}>
                    <AICouncilSummary {...{ data: securityData?.council } as any} />
                </Col>

                <Col xs={24} lg={12}>
                    <ExecutiveTimeline {...{ data: securityData?.sentinel?.workflow } as any} />
                </Col>
            </Row>

            {/* Alerts Row */}
            <Row gutter={[20, 20]} style={{ marginTop: 20, marginLeft: 1 }}>
                <ExecutiveAlerts {...{ data: securityData?.incident } as any} />
            </Row>
        </div>
    );
}