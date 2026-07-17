import { Row, Col } from "antd";

import ThreatKPIs from "./components/ThreatKPIs";
import GlobalThreatMap from "./components/GlobalThreatMap";
import CVEFeed from "./components/CVEFeed";
import IOCFeed from "./components/IOCFeed";
import MITRECoverage from "./components/MITRECoverage";
import ThreatActors from "./components/ThreatActors";
import MalwareFamilies from "./components/MalwareFamilies";
import VulnerabilityRadar from "./components/VulnerabilityRadar";

export default function ThreatIntelligence() {

    return (

        <div
            style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 24
            }}
        >

            {/* =====================================
                    THREAT INTELLIGENCE KPIs
            ====================================== */}

            <ThreatKPIs />

            {/* =====================================
                  GLOBAL MAP + CVE FEED
            ====================================== */}

            <Row gutter={[24, 24]}>

                <Col xs={24} xl={16}>
                    <GlobalThreatMap />
                </Col>

                <Col xs={24} xl={8}>
                    <CVEFeed />
                </Col>

            </Row>

            {/* =====================================
                  IOC FEED + MITRE COVERAGE
            ====================================== */}

            <Row gutter={[24, 24]}>

                <Col xs={24} xl={12}>
                    <IOCFeed />
                </Col>

                <Col xs={24} xl={12}>
                    <MITRECoverage />
                </Col>

            </Row>

            {/* =====================================
               THREAT ACTORS + MALWARE FAMILIES
            ====================================== */}

            <Row gutter={[24, 24]}>

                <Col xs={24} xl={12}>
                    <ThreatActors />
                </Col>

                <Col xs={24} xl={12}>
                    <MalwareFamilies />
                </Col>

            </Row>

            {/* =====================================
                  VULNERABILITY RADAR
            ====================================== */}

            <VulnerabilityRadar />

        </div>

    );

}