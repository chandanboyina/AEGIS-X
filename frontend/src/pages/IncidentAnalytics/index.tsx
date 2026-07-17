import { Row, Col } from "antd";

import AnalyticsKPIRow from "./components/AnalyticsKPIRow";
import IncidentTrend from "./components/IncidentTrend";
import ThreatDistribution from "./components/ThreatDistribution";
import AttackTimeline from "./components/AttackTimeline";
import MITREHeatmap from "./components/MITREHeatmap";
import CountryHeatmap from "./components/CountryHeatmap";
import AssetDistribution from "./components/AssetDistribution";
import DetectionSources from "./components/DetectionSources";
import AIModelAccuracy from "./components/AIModelAccuracy";
import AnalystPerformance from "./components/AnalystPerformance";
import ResponseTimeline from "./components/ResponseTimeline";
import AIExecutiveSummary from "./components/AIExecutiveSummary";


export default function IncidentAnalytics() {

    return (

        <div
            style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 24
            }}
        >

            

            {/* KPI */}

            

            <AnalyticsKPIRow />
            


            {/* Incident Trend + Threat Distribution */}

            <Row gutter={[24, 24]}>

                <Col xs={24} lg={16}>
                    <IncidentTrend />
                </Col>

                <Col xs={24} lg={8}>
                    <ThreatDistribution />
                </Col>

            </Row>

            {/* MITRE */}

            <Row gutter={[24, 24]}>

                <Col span={24}>
                    <MITREHeatmap />
                </Col>

            </Row>

            {/* Attack Timeline + Country Heatmap */}

            <Row gutter={[24, 24]}>

                <Col xs={24} lg={13}>
                    <AttackTimeline />
                </Col>

                <Col xs={24} lg={11}>
                    <CountryHeatmap />
                </Col>

            </Row>

            {/* Assets + Detection */}

            <Row gutter={[24, 24]}>

                <Col xs={24} lg={12}>
                    <AssetDistribution />
                </Col>

                <Col xs={24} lg={12}>
                    <DetectionSources />
                </Col>

            </Row>

            {/* AI */}

            <Row gutter={[24, 24]}>

                <Col xs={24} lg={12}>
                    <AIModelAccuracy />
                </Col>

                <Col xs={24} lg={12}>
                    <AnalystPerformance />
                </Col>

            </Row>

            {/* Response Timeline */}

            <Row gutter={[24, 24]}>

                <Col span={24}>
                    <ResponseTimeline />
                </Col>

            </Row>
            <Row gutter={[24,24]}>
                <Col span={24}>
                    <AIExecutiveSummary/>
                </Col>
            </Row>
            

        </div>

    );

}