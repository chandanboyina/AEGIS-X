import { Row, Col } from "antd";

import BrainKPIRow from "./components/BrainKPIRow";
import OracleCopilot from "./components/OracleCopilot";
import AttackPathPrediction from "./components/AttackPathPrediction";
import WhatIfSimulation from "./components/WhatIfSimulation";
import AIRecommendations from "./components/AIRecommendations";
import DecisionTimeline from "./components/DecisionTimeline";
import AIKnowledgeGraph from "./components/AIKnowledgeGraph";
import Explainability from "./components/Explainability";
import AIConfidenceBreakdown from "./components/AIConfidenceBreakdown";

export default function EnterpriseBrain() {

    return (

        <div
            style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 24
            }}
        >

            {/* ================================
                    AI ENGINE KPIs
            ================================= */}

            <BrainKPIRow />

            {/* ================================
                  ORACLE AI COPILOT
            ================================= */}

            <OracleCopilot />

            {/* ================================
                ATTACK PATH PREDICTION
            ================================= */}

            <AttackPathPrediction />

            {/* ================================
                WHAT-IF + RECOMMENDATIONS
            ================================= */}

            <Row gutter={[24,24]} align="stretch">

                {/* LEFT SIDE */}

                <Col xs={24} xl={12}>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                            height: "100%"
                        }}
                    >

                        <WhatIfSimulation />

                        <AIConfidenceBreakdown />

                    </div>

                </Col>

                {/* RIGHT SIDE */}

                <Col xs={24} xl={12}>

                    <AIRecommendations />

                </Col>

            </Row>

            {/* ================================
                  DECISION TIMELINE
            ================================= */}

            <DecisionTimeline />

            {/* ================================
                  KNOWLEDGE GRAPH
            ================================= */}

            <AIKnowledgeGraph />

            {/* ================================
                   AI EXPLAINABILITY
            ================================= */}

            <Explainability />

        </div>

    );

}