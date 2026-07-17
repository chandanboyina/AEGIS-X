import { Row, Col } from "antd";

import TwinKPIs from "./components/TwinKPIs";
import EnterpriseTwinView from "./components/EnterpriseTwinView";
import AssetStateEngine from "./components/AssetStateEngine";
import FailureSimulation from "./components/FailureSimulation";
import AttackSimulation from "./components/AttackSimulation";
import RecoveryPlanner from "./components/RecoveryPlanner";
import TwinPredictions from "./components/TwinPredictions";
import OracleTwinSummary from "./components/OracleTwinSummary";
import TwinIntegrity from "./components/TwinIntegrity";

export default function DigitalTwin(){

    return(

        <div
            style={{
                padding:24,
                display:"flex",
                flexDirection:"column",
                gap:24
            }}
        >

            {/* ======================================
                    DIGITAL TWIN KPIs
            ======================================= */}

            <TwinKPIs/>

            {/* ======================================
                DIGITAL TWIN + STATE ENGINE
            ======================================= */}

            <Row
                gutter={[24,24]}
                align="top"
            >

                <Col
                    xs={24}
                    xl={15}
                >

                    <EnterpriseTwinView/>

                </Col>

                <Col
                    xs={24}
                    xl={9}
                >

                    <AssetStateEngine/>

                </Col>

            </Row>

            {/* ======================================
            FAILURE + ATTACK SIMULATION
            ======================================= */}

            <Row gutter={[24,24]}>

            <Col xs={24} xl={12}>

                <div
                    style={{
                        display:"flex",
                        flexDirection:"column",
                        gap:24
                    }}
                >

                    <FailureSimulation/>

                    <TwinIntegrity/>

                </div>

            </Col>

            <Col xs={24} xl={12}>

                <AttackSimulation/>

            </Col>

        </Row>
            {/* ======================================
            RECOVERY + PREDICTIONS
            ======================================= */}

            <Row
                gutter={[24,24]}
                align="top"
            >

                <Col
                    xs={24}
                    xl={12}
                >

                    <RecoveryPlanner/>

                </Col>

                <Col
                    xs={24}
                    xl={12}
                >

                    <TwinPredictions/>

                </Col>

            </Row>

            {/* ======================================
                ORACLE AI EXECUTIVE SUMMARY
            ======================================= */}

            <OracleTwinSummary/>

        </div>

    );

}