import { Row, Col } from "antd";

import KPI from "../../common/KPI/KPI";

export default function EnterpriseOverview() {

    return (

        <div
            style={{
                marginBottom:24
            }}
        >

            <div
                style={{
                    marginBottom:20
                }}
            >

                <div
                    style={{
                        color:"#FFFFFF",
                        fontSize:26,
                        fontWeight:700
                    }}
                >

                    Enterprise Security Posture

                </div>

                <div
                    style={{
                        color:"#8FA5C4",
                        marginTop:6,
                        fontSize:14
                    }}
                >

                    Real-time AI-driven enterprise cyber resilience overview

                </div>

            </div>

            <Row gutter={[20, 20]}>

                <Col xs={24} md={12} xl={6}>

                    <KPI

                        title="Threat Level"

                        value="HIGH"

                        color="#FF3B30"

                        subtitle="Oracle Assessment"

                    />

                </Col>

                <Col xs={24} md={12} xl={6}>

                    <KPI

                        title="Active Incidents"

                        value={4}

                        color="#FFC107"

                        subtitle="Enterprise"

                    />

                </Col>

                <Col xs={24} md={12} xl={6}>

                    <KPI

                        title="Enterprise Health"

                        value="98%"

                        color="#00E676"

                        subtitle="Protected Assets"

                    />

                </Col>

                <Col xs={24} md={12} xl={6}>

                    <KPI

                        title="AI Confidence"

                        value="94%"

                        color="#00D4FF"

                        subtitle="Council Consensus"

                    />

                </Col>

            </Row>

        </div>

    )

}