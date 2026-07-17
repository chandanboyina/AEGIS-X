import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Tag,
    Statistic
} from "antd";

import {
    CheckCircleOutlined,
    SafetyCertificateOutlined,
    AuditOutlined,
    BankOutlined,
    RobotOutlined,
    ClockCircleOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Approval{

    status:string;

    executive:string;

    compliance:string;

    board:string;

    approvalId:string;

    confidence:number;

    timestamp:string;

}

const executives=[

    "CISO Approved",

    "SOC Director Approved",

    "Security Council Approved",

    "Executive Committee Approved"

];

const compliance=[

    "ISO 27001 Verified",

    "NIST CSF Verified",

    "PCI-DSS Validated",

    "Government Policy Verified"

];

const board=[

    "Board Notification Sent",

    "Executive Dashboard Updated",

    "Audit Trail Generated",

    "Digital Signature Recorded"

];

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function randomItem(arr:string[]){

    return arr[random(0,arr.length-1)];

}

function generateApproval():Approval{

    return{

        status:"APPROVED",

        executive:randomItem(executives),

        compliance:randomItem(compliance),

        board:randomItem(board),

        approvalId:

            "ORA-"

            +random(100000,999999),

        confidence:random(95,99),

        timestamp:new Date().toLocaleTimeString()

    };

}

export default function ExecutiveApproval(){

    const [approval,setApproval]=useState<Approval>(

        generateApproval()

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            setApproval(

                generateApproval()

            );

        },6000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Executive Approval & Governance"
            height={920}
        >

            <Row gutter={[24,24]}>

                {/* Left Panel */}

                <Col xs={24} lg={16}>

                    <div
                        style={{
                            background:"#102033",
                            borderLeft:"5px solid #00E676",
                            borderRadius:12,
                            padding:24
                        }}
                    >

                        <div
                            style={{
                                display:"flex",
                                justifyContent:"space-between",
                                alignItems:"center",
                                marginBottom:18
                            }}
                        >

                            <div
                                style={{
                                    color:"#FFFFFF",
                                    fontSize:28,
                                    fontWeight:700
                                }}
                            >
                                Oracle AI Authorization
                            </div>

                            <Tag
                                color="success"
                                style={{
                                    padding:"6px 14px"
                                }}
                            >
                                {approval.status}
                            </Tag>

                        </div>

                        <div
                            style={{
                                color:"#DCE8F4",
                                lineHeight:1.9,
                                fontSize:15
                            }}
                        >
                            Oracle AI Council has completed collective reasoning,
                            achieved enterprise consensus, verified compliance,
                            and approved automated execution of the recommended
                            incident response strategy.
                        </div>

                        <div
                            style={{
                                marginTop:28,
                                display:"flex",
                                flexDirection:"column",
                                gap:18
                            }}
                        >

                            <div
                                style={{
                                    display:"flex",
                                    alignItems:"center",
                                    gap:12
                                }}
                            >

                                <SafetyCertificateOutlined
                                    style={{
                                        color:"#00E676",
                                        fontSize:22
                                    }}
                                />

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Executive Approval
                                    </div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            fontWeight:600
                                        }}
                                    >
                                        {approval.executive}
                                    </div>

                                </div>

                            </div>

                            <div
                                style={{
                                    display:"flex",
                                    alignItems:"center",
                                    gap:12
                                }}
                            >

                                <AuditOutlined
                                    style={{
                                        color:"#2D7CFF",
                                        fontSize:22
                                    }}
                                />

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Compliance Validation
                                    </div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            fontWeight:600
                                        }}
                                    >
                                        {approval.compliance}
                                    </div>

                                </div>

                            </div>

                            <div
                                style={{
                                    display:"flex",
                                    alignItems:"center",
                                    gap:12
                                }}
                            >

                                <BankOutlined
                                    style={{
                                        color:"#FA8C16",
                                        fontSize:22
                                    }}
                                />

                                <div>

                                    <div
                                        style={{
                                            color:"#8EA9CC",
                                            fontSize:12
                                        }}
                                    >
                                        Board Status
                                    </div>

                                    <div
                                        style={{
                                            color:"#FFFFFF",
                                            fontWeight:600
                                        }}
                                    >
                                        {approval.board}
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </Col>

                {/* Right Panel */}

                <Col xs={24} lg={8}>

                    <div
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            gap:18
                        }}
                    >

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:18
                            }}
                        >

                            <Statistic
                                title="AI Confidence"
                                value={approval.confidence}
                                suffix="%"
                                prefix={<RobotOutlined/>}
                                valueStyle={{
                                    color:"#00E676"
                                }}
                            />

                        </div>

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:18
                            }}
                        >

                            <Statistic
                                title="Approval ID"
                                value={approval.approvalId}
                                valueStyle={{
                                    color:"#2D7CFF",
                                    fontSize:22
                                }}
                            />

                        </div>

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:18
                            }}
                        >

                            <Statistic
                                title="Timestamp"
                                value={approval.timestamp}
                                prefix={<ClockCircleOutlined/>}
                                valueStyle={{
                                    color:"#FA8C16",
                                    fontSize:20
                                }}
                            />

                        </div>

                        <div
                            style={{
                                background:"#102033",
                                borderLeft:"4px solid #00E676",
                                borderRadius:12,
                                padding:18
                            }}
                        >

                            <div
                                style={{
                                    display:"flex",
                                    alignItems:"center",
                                    gap:10,
                                    marginBottom:12
                                }}
                            >

                                <CheckCircleOutlined
                                    style={{
                                        color:"#00E676",
                                        fontSize:22
                                    }}
                                />

                                <span
                                    style={{
                                        color:"#FFFFFF",
                                        fontWeight:700
                                    }}
                                >
                                    Execution Status
                                </span>

                            </div>

                            <div
                                style={{
                                    color:"#DCE8F4",
                                    lineHeight:1.8
                                }}
                            >
                                All governance checks completed successfully.
                                Oracle AI has authorized automated execution
                                and generated a complete audit trail for
                                executive review.

                            </div>

                        </div>

                    </div>

                </Col>
                            </Row>

            {/* Executive Authorization Banner */}

            <div
                style={{
                    marginTop:24,
                    background:"#102033",
                    borderLeft:"5px solid #00E676",
                    borderRadius:12,
                    padding:22
                }}
            >

                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center",
                        flexWrap:"wrap",
                        gap:12
                    }}
                >

                    <div>

                        <div
                            style={{
                                color:"#00E676",
                                fontSize:20,
                                fontWeight:700
                            }}
                        >
                            Enterprise Execution Authorized
                        </div>

                        <div
                            style={{
                                marginTop:8,
                                color:"#DCE8F4",
                                lineHeight:1.8
                            }}
                        >
                            Oracle AI Council has completed governance,
                            executive validation, compliance verification,
                            and digital authorization. Automated response
                            execution has been approved.

                        </div>

                    </div>

                    <Tag
                        color="success"
                        style={{
                            fontSize:15,
                            padding:"6px 14px"
                        }}
                    >
                        AUTHORIZED
                    </Tag>

                </div>

            </div>

            {/* Oracle Digital Signature */}

            <div
                style={{
                    marginTop:22,
                    background:"#16253B",
                    border:"1px solid #2A415D",
                    borderRadius:12,
                    padding:20
                }}
            >

                <Row gutter={[24,24]}>

                    <Col xs={24} md={12}>

                        <div
                            style={{
                                color:"#8EA9CC",
                                fontSize:12
                            }}
                        >
                            Oracle Digital Signature
                        </div>

                        <div
                            style={{
                                color:"#FFFFFF",
                                fontWeight:700,
                                marginTop:8,
                                fontSize:18
                            }}
                        >
                            ORACLE-AI-EXEC-2048
                        </div>

                    </Col>

                    <Col xs={24} md={12}>

                        <div
                            style={{
                                color:"#8EA9CC",
                                fontSize:12
                            }}
                        >
                            Audit Reference
                        </div>

                        <div
                            style={{
                                color:"#2D7CFF",
                                fontWeight:700,
                                marginTop:8,
                                fontSize:18
                            }}
                        >
                            {approval.approvalId}
                        </div>

                    </Col>

                </Row>

            </div>

            {/* Footer */}

            <div
                style={{
                    marginTop:22,
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}
            >

                <Tag
                    color="processing"
                    style={{
                        padding:"4px 12px"
                    }}
                >
                    Oracle Governance Engine
                </Tag>

                <div
                    style={{
                        display:"flex",
                        alignItems:"center",
                        gap:8,
                        color:"#00E676",
                        fontWeight:700
                    }}
                >

                    <CheckCircleOutlined/>

                    EXECUTION READY

                </div>

            </div>

        </EnterpriseCard>

    );

}