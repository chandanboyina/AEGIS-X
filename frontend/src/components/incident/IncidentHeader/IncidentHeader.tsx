import { Row, Col } from "antd";

export default function IncidentHeader() {

    return (

        <Row
            justify="space-between"
            align="middle"
            style={{
                marginBottom: 25
            }}
        >

            <Col>

                <div
                    style={{
                        fontSize: 32,
                        color: "white",
                        fontWeight: 700
                    }}
                >
                    Live Incidents
                </div>

                <div
                    style={{
                        color: "#8FA7C6",
                        fontSize: 15,
                        marginTop: 6
                    }}
                >
                    Real-time AI Investigation Console
                </div>

            </Col>

            <Col>

                <Row gutter={18}>

                    <Col>

                        <Metric
                            title="Active"
                            value="14"
                        />

                    </Col>

                    <Col>

                        <Metric
                            title="Critical"
                            value="4"
                        />

                    </Col>

                    <Col>

                        <Metric
                            title="AI Accuracy"
                            value="96%"
                        />

                    </Col>

                </Row>

            </Col>

        </Row>

    );

}

function Metric({

    title,

    value

}:{

    title:string;

    value:string;

}){

    return(

        <div
            style={{

                background:"#101B2D",

                border:"1px solid #23476A",

                borderRadius:12,

                padding:"14px 22px",

                minWidth:110,

                textAlign:"center"

            }}
        >

            <div
                style={{

                    color:"#7E95B5",

                    fontSize:13

                }}
            >

                {title}

            </div>

            <div
                style={{

                    color:"white",

                    fontSize:24,

                    fontWeight:700,

                    marginTop:4

                }}
            >

                {value}

            </div>

        </div>

    );

}