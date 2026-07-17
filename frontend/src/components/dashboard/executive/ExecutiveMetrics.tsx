import { Row, Col } from "antd";

import MetricCard from "./MetricCard";

export default function ExecutiveMetrics(){

    return(

        <Row gutter={[20,20]}>

            <Col xs={24} sm={12} lg={6}>

                <MetricCard

                    title="Threat Level"

                    value="SEVERE"

                    subtitle="National Risk"

                    status="critical"

                />

            </Col>

            <Col xs={24} sm={12} lg={6}>

                <MetricCard

                    title="Active Incidents"

                    value="12"

                    subtitle="High Priority"

                    status="warning"

                />

            </Col>

            <Col xs={24} sm={12} lg={6}>

                <MetricCard

                    title="Enterprise Health"

                    value="98%"

                    subtitle="Infrastructure"

                    status="healthy"

                />

            </Col>

            <Col xs={24} sm={12} lg={6}>

                <MetricCard

                    title="AI Confidence"

                    value="96%"

                    subtitle="Council Consensus"

                    status="info"

                />

            </Col>

        </Row>

    );

}