import { useEffect, useState } from "react";
import { Progress, Row, Col, Tag } from "antd";
import {
    SafetyCertificateOutlined,
    RadarChartOutlined,
    ApartmentOutlined,
    DeploymentUnitOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

function rand(min:number,max:number){
    return Math.floor(Math.random()*(max-min+1))+min;
}

export default function AIConfidenceBreakdown(){

    const [overall,setOverall]=useState(97);

    const [mitre,setMitre]=useState(98);

    const [intel,setIntel]=useState(95);

    const [behavior,setBehavior]=useState(96);

    const [graph,setGraph]=useState(99);

    const [digitalTwin,setDigitalTwin]=useState(94);

    useEffect(()=>{

        const timer=setInterval(()=>{

            setOverall(rand(95,99));
            setMitre(rand(95,99));
            setIntel(rand(93,99));
            setBehavior(rand(94,99));
            setGraph(rand(96,100));
            setDigitalTwin(rand(92,98));

        },5000);

        return()=>clearInterval(timer);

    },[]);

    return(

        <EnterpriseCard
            title="Oracle AI Confidence Breakdown"
            height={880}
        >

            <div
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}
            >

                <span
                    style={{
                        color:"#8EA9CC",
                        fontSize:18
                    }}
                >
                    Overall AI Confidence
                </span>

                <b
                    style={{
                        color:"#00E676",
                        fontSize:28
                    }}
                >
                    {overall}%
                </b>

            </div>

            <Progress
                percent={overall}
                showInfo={false}
                strokeColor="#00E676"
                style={{marginTop:12}}
            />

            <div style={{marginTop:30}}>

                <Row gutter={[16,16]}>

                    <Col span={12}>

                        <div
                            style={{
                                background:"#16253B",
                                padding:16,
                                borderRadius:10,
                                border:"1px solid #2A415D"
                            }}
                        >

                            <SafetyCertificateOutlined
                                style={{
                                    color:"#00E676",
                                    fontSize:22
                                }}
                            />

                            <div
                                style={{
                                    marginTop:10,
                                    color:"#8EA9CC"
                                }}
                            >
                                MITRE Match
                            </div>

                            <div
                                style={{
                                    color:"#FFF",
                                    fontSize:28,
                                    fontWeight:700
                                }}
                            >
                                {mitre}%
                            </div>

                        </div>

                    </Col>

                    <Col span={12}>

                        <div
                            style={{
                                background:"#16253B",
                                padding:16,
                                borderRadius:10,
                                border:"1px solid #2A415D"
                            }}
                        >

                            <RadarChartOutlined
                                style={{
                                    color:"#FA8C16",
                                    fontSize:22
                                }}
                            />

                            <div
                                style={{
                                    marginTop:10,
                                    color:"#8EA9CC"
                                }}
                            >
                                Threat Intel
                            </div>

                            <div
                                style={{
                                    color:"#FFF",
                                    fontSize:28,
                                    fontWeight:700
                                }}
                            >
                                {intel}%
                            </div>

                        </div>

                    </Col>

                    <Col span={12}>

                        <div
                            style={{
                                background:"#16253B",
                                padding:16,
                                borderRadius:10,
                                border:"1px solid #2A415D"
                            }}
                        >

                            <ApartmentOutlined
                                style={{
                                    color:"#2D7CFF",
                                    fontSize:22
                                }}
                            />

                            <div
                                style={{
                                    marginTop:10,
                                    color:"#8EA9CC"
                                }}
                            >
                                Behavior Analytics
                            </div>

                            <div
                                style={{
                                    color:"#FFF",
                                    fontSize:28,
                                    fontWeight:700
                                }}
                            >
                                {behavior}%
                            </div>

                        </div>

                    </Col>

                    <Col span={12}>

                        <div
                            style={{
                                background:"#16253B",
                                padding:16,
                                borderRadius:10,
                                border:"1px solid #2A415D"
                            }}
                        >

                            <DeploymentUnitOutlined
                                style={{
                                    color:"#A855F7",
                                    fontSize:22
                                }}
                            />

                            <div
                                style={{
                                    marginTop:10,
                                    color:"#8EA9CC"
                                }}
                            >
                                Graph AI
                            </div>

                            <div
                                style={{
                                    color:"#FFF",
                                    fontSize:28,
                                    fontWeight:700
                                }}
                            >
                                {graph}%
                            </div>

                        </div>

                    </Col>

                </Row>

            </div>

            <div
                style={{
                    marginTop:28,
                    padding:18,
                    borderRadius:12,
                    background:"#102033",
                    borderLeft:"4px solid #00E676"
                }}
            >

                <div
                    style={{
                        color:"#00E676",
                        fontWeight:700,
                        marginBottom:10
                    }}
                >
                    Explainability
                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8
                    }}
                >
                    Oracle AI assigned a confidence of <b>{overall}%</b> by
                    correlating MITRE ATT&CK techniques, enterprise telemetry,
                    behavioral analytics, Graph AI attack-path analysis and
                    Digital Twin simulations. The recommendation is considered
                    highly reliable and suitable for automated execution.
                </div>

            </div>

            <div
                style={{
                    marginTop:18,
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}
            >

                <Tag color="green">
                    LIVE AI ENGINE
                </Tag>

                <div
                    style={{
                        color:"#8EA9CC"
                    }}
                >
                    Digital Twin Confidence : {digitalTwin}%
                </div>

            </div>

        </EnterpriseCard>

    );

}