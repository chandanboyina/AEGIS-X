import EnterpriseCard from "../../common/EnterpriseCard/EnterpriseCard";

import { Row, Col, Tag } from "antd";

export default function CurrentIncident() {

    return (

        <EnterpriseCard
            title="Current Critical Incident"
            height={410}
        >

            <Row gutter={32}>

                <Col span={14}>

                    <div
                        style={{
                            fontSize:36,
                            color:"#FF5A5F",
                            fontWeight:700
                        }}
                    >

                        Reconnaissance Attack

                    </div>

                    <br/>

                    <div>

                        <b>Severity</b>

                        <br/>

                        Critical

                    </div>

                    <br/>

                    <div>

                        <b>Target</b>

                        <br/>

                        Government Education Cloud

                    </div>

                    <br/>

                    <div>

                        <b>Playbook</b>

                        <br/>

                        PB-010 Aggressive

                    </div>

                </Col>

                <Col span={10}>

                    <Tag color="red">

                        TA0001

                    </Tag>

                    <Tag color="orange">

                        TA0002

                    </Tag>

                    <Tag color="blue">

                        TA0008

                    </Tag>

                    <br/><br/>

                    <b>Confidence</b>

                    <br/>

                    96%

                    <br/><br/>

                    <b>MTTD</b>

                    <br/>

                    43 sec

                    <br/><br/>

                    <b>Predicted MTTR</b>

                    <br/>

                    5 min

                </Col>

            </Row>

        </EnterpriseCard>

    );

}