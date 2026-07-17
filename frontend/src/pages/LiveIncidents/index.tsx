import { Row, Col } from "antd";
import { useState } from "react";
import IncidentKPIRow from "./components/IncidentKPIRow";
import IncidentTable from "./components/IncidentTable";
import IncidentDetails from "./components/IncidentDetails";
import AttackChain from "./components/AttackChain";
import ResponseActions from "./components/ResponseActions";
import ActivityStream from "./components/ActivityStream";
import EventBus from "./components/EventBus";
import AIConsensus from "./components/AIConsensus";
import BlastRadiusPrediction from "./components/BlastRadiusPrediction";

export default function LiveIncidents() {

    const [selectedIncident, setSelectedIncident] = useState<any | null>(null);
    
    return (

        <div
            style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 24,
                width: "100%",
                boxSizing: "border-box"
            }}
        >

            {/* KPI ROW */}

            <IncidentKPIRow />

            {/* INCIDENT TABLE + DETAILS */}

            <Row gutter={[24, 24]}>

                <Col xs={24} lg={16}>

                    <IncidentTable
                        selectedIncident={selectedIncident}
                        setSelectedIncident={setSelectedIncident}
                    />

                </Col>

                <Col xs={24} lg={8}>

                    <IncidentDetails
                        incident={selectedIncident}
                    />

                </Col>

            </Row>

            {/* ATTACK CHAIN + RESPONSE */}

            <Row gutter={[24, 24]}>

                <Col xs={24} lg={16}>

                    <AttackChain />

                </Col>

                <Col xs={24} lg={8}>

                    <ResponseActions />

                </Col>

            </Row>


            <Row gutter={[24, 24]}>

                <Col xs={24} lg={12}>
                    <ActivityStream />
                </Col>

                <Col xs={24} lg={12}>
                    <EventBus />
                </Col>

            </Row>

            

            <Row gutter={[24,24]}>

                <Col xs={24} lg={12}>
                    <AIConsensus />
                </Col>

                <Col xs={24} lg={12}>
                    <BlastRadiusPrediction />
                </Col>

            </Row>

        </div>

    );
}