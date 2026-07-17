import { Row, Col } from "antd";

import BehaviourKPIs from "./components/BehaviourKPIs";
import UserRiskHeatmap from "./components/UserRiskHeatmap";
import UEBAScoreboard from "./components/UEBAScoreboard";
import AnomalyTimeline from "./components/AnomalyTimeline";
import InsiderThreats from "./components/InsiderThreats";
import LateralMovementGraph from "./components/LateralMovementGraph";
import BehaviourPatterns from "./components/BehaviourPatterns";
import AIBehaviourSummary from "./components/AIBehaviourSummary";
import IdentityCorrelation from "./components/IdentityCorrelation";

export default function BehaviourAnalytics() {

    return (

        <div
            style={{
                padding:24,
                display:"flex",
                flexDirection:"column",
                gap:24
            }}
        >

            {/* ================================
                    KPI ROW
            ================================= */}

            <BehaviourKPIs />

            {/* ================================
                USER RISK + UEBA
            ================================= */}

            <Row gutter={[24,24]} align="top">

                <Col xs={24} xl={14}>

                    <div
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            gap:24
                        }}
                    >

                        <UserRiskHeatmap/>

                        <IdentityCorrelation/>

                    </div>

                </Col>

                <Col xs={24} xl={10}>

                    <UEBAScoreboard/>

                </Col>

            </Row>
            {/* ================================
              TIMELINE + INSIDER THREATS
            ================================= */}

            <Row gutter={[24,24]}>

                <Col xs={24} xl={14}>
                    <AnomalyTimeline />
                </Col>

                <Col xs={24} xl={10}>
                    <InsiderThreats />
                </Col>

            </Row>

            {/* ================================
              GRAPH + AI SUMMARY
            ================================= */}

            <Row gutter={[24,24]}>

                <Col xs={24} xl={15}>
                    <LateralMovementGraph />
                </Col>

                <Col xs={24} xl={9}>
                    <AIBehaviourSummary />
                </Col>

            </Row>

            {/* ================================
                PATTERN ANALYSIS
            ================================= */}

            <BehaviourPatterns />

        </div>

    );

}