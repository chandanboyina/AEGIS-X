import { Row, Col } from "antd";

import CouncilKPIs from "./components/CouncilKPIs";
import CouncilMembers from "./components/CouncilMembers";
import LiveDiscussion from "./components/LiveDiscussion";
import ConsensusMeter from "./components/ConsensusMeter";
import FinalDecision from "./components/FinalDecision";
import ExecutiveApproval from "./components/ExecutiveApproval";
import CouncilExecutionPlan from "./components/CouncilExecutionPlan";

export default function AICouncil() {

    return (

        <div
            style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 24
            }}
        >

            {/* ===========================
                    AI COUNCIL KPIs
            =========================== */}

            <CouncilKPIs />

            {/* ===========================
                  COUNCIL MEMBERS
            =========================== */}

            <CouncilMembers />

            {/* ===========================
            DISCUSSION + CONSENSUS
            =========================== */}

            <Row gutter={[24,24]}>

            <Col xs={24} xl={16}>

                <LiveDiscussion />

                <div style={{ marginTop:24 }}>
                    <CouncilExecutionPlan />
                </div>

            </Col>

            <Col xs={24} xl={8}>
                <ConsensusMeter />
            </Col>

        </Row>

            {/* ===========================
            FINAL DECISION
            =========================== */}

            <FinalDecision />

            {/* ===========================
            EXECUTIVE APPROVAL
            =========================== */}

            <ExecutiveApproval />

        </div>

    );

}