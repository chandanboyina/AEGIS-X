import { useEffect, useState } from "react";

import {
    Row,
    Col,
    Tag,
    Progress
} from "antd";

import {
    SafetyCertificateOutlined,
    UserOutlined,
    TeamOutlined,
    CheckCircleOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function IdentityCorrelation(){

    const [sessions,setSessions]=useState(186);

    const [privileged,setPrivileged]=useState(24);

    const [mfa,setMfa]=useState(98);

    const [trust,setTrust]=useState(94);

    useEffect(()=>{

        const timer=setInterval(()=>{

            setSessions(random(170,220));

            setPrivileged(random(18,30));

            setMfa(random(96,100));

            setTrust(random(91,99));

        },5000);

        return()=>clearInterval(timer);

    },[]);

    return(

        <EnterpriseCard
            title="Oracle AI Identity Correlation"
            height={470}
        >

            <Row gutter={[20,20]}>

                <Col span={12}>

                    <div style={{color:"#8EA9CC"}}>

                        Active Sessions

                    </div>

                    <div
                        style={{
                            color:"#FFFFFF",
                            fontSize:30,
                            fontWeight:700,
                            marginTop:6
                        }}
                    >
                        {sessions}
                    </div>

                </Col>

                <Col span={12}>

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"flex-end"
                        }}
                    >

                        <div
                            style={{
                                width:58,
                                height:58,
                                borderRadius:16,
                                background:"#00E67622",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                color:"#00E676",
                                fontSize:28
                            }}
                        >

                            <SafetyCertificateOutlined/>

                        </div>

                    </div>

                </Col>

            </Row>

            <div
                style={{
                    marginTop:18,
                    display:"flex",
                    flexDirection:"column",
                    gap:14
                }}
            >

                <Row>

                    <Col span={18}>

                        <div
                            style={{
                                display:"flex",
                                alignItems:"center",
                                gap:10,
                                color:"#8EA9CC"
                            }}
                        >

                            <UserOutlined/>

                            Privileged Accounts

                        </div>

                    </Col>

                    <Col
                        span={6}
                        style={{
                            textAlign:"right",
                            color:"#FFFFFF",
                            fontWeight:700
                        }}
                    >

                        {privileged}

                    </Col>

                </Row>

                <Row>

                    <Col span={18}>

                        <div
                            style={{
                                display:"flex",
                                alignItems:"center",
                                gap:10,
                                color:"#8EA9CC"
                            }}
                        >

                            <TeamOutlined/>

                            MFA Protected

                        </div>

                    </Col>

                    <Col
                        span={6}
                        style={{
                            textAlign:"right",
                            color:"#00E676",
                            fontWeight:700
                        }}
                    >

                        {mfa}%

                    </Col>

                </Row>

                <Row>

                    <Col span={18}>

                        <div
                            style={{
                                display:"flex",
                                alignItems:"center",
                                gap:10,
                                color:"#8EA9CC"
                            }}
                        >

                            <CheckCircleOutlined/>

                            Identity Trust

                        </div>

                    </Col>

                    <Col
                        span={6}
                        style={{
                            textAlign:"right",
                            color:"#1677FF",
                            fontWeight:700
                        }}
                    >

                        {trust}%

                    </Col>

                </Row>

            </div>

            <Progress
                percent={trust}
                showInfo={false}
                strokeColor="#00E676"
                trailColor="#203249"
                style={{
                    marginTop:18
                }}
            />

            <div
                style={{
                    marginTop:18,
                    background:"#102033",
                    borderLeft:"4px solid #00E676",
                    borderRadius:10,
                    padding:14
                }}
            >

                <div
                    style={{
                        color:"#00E676",
                        fontWeight:700,
                        marginBottom:8
                    }}
                >

                    Oracle AI Insight

                </div>

                <div
                    style={{
                        color:"#DCE8F4",
                        lineHeight:1.8,
                        fontSize:13
                    }}
                >

                    Oracle AI continuously correlates authentication,
                    privileged identities, session behaviour and UEBA
                    models. Two privileged identities require adaptive
                    verification while the overall enterprise identity
                    posture remains healthy.

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

                <div
                    style={{
                        color:"#00E676",
                        fontWeight:700
                    }}
                >

                    Executive Identity Intelligence

                </div>

                <Tag
                    color="success"
                    style={{
                        padding:"4px 12px",
                        fontWeight:700
                    }}
                >

                    ● LIVE

                </Tag>

            </div>

        </EnterpriseCard>

    );

}