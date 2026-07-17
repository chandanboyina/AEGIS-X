import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Tag,
    Statistic,
    Progress
} from "antd";

import {
    RobotOutlined,
    ApartmentOutlined,
    DatabaseOutlined,
    GlobalOutlined,
    SafetyCertificateOutlined,
    UserOutlined,
    BugOutlined,
    NodeIndexOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface GraphNode{

    id:number;

    label:string;

    type:string;

    risk:"LOW"|"MEDIUM"|"HIGH"|"CRITICAL";

}

const templates=[

    {

        label:"Oracle AI",

        type:"AI",

        icon:<RobotOutlined/>

    },

    {

        label:"Government Cloud",

        type:"Asset",

        icon:<ApartmentOutlined/>

    },

    {

        label:"Power Grid",

        type:"Asset",

        icon:<ApartmentOutlined/>

    },

    {

        label:"Database",

        type:"Database",

        icon:<DatabaseOutlined/>

    },

    {

        label:"Firewall",

        type:"Security",

        icon:<SafetyCertificateOutlined/>

    },

    {

        label:"Domain Controller",

        type:"Server",

        icon:<GlobalOutlined/>

    },

    {

        label:"Privileged User",

        type:"Identity",

        icon:<UserOutlined/>

    },

    {

        label:"MITRE T1078",

        type:"MITRE",

        icon:<NodeIndexOutlined/>

    },

    {

        label:"Zero-Day",

        type:"Threat",

        icon:<BugOutlined/>

    }

];

const risks=[

    "LOW",

    "MEDIUM",

    "HIGH",

    "CRITICAL"

] as const;

function random(min:number,max:number){

    return Math.floor(

        Math.random()*(max-min+1)

    )+min;

}

function randomRisk(){

    return risks[

        random(0,risks.length-1)

    ];

}

function generateNodes():GraphNode[]{

    return templates.map(

        (item,index)=>({

            id:index,

            label:item.label,

            type:item.type,

            risk:randomRisk()

        })

    );

}

export default function AIKnowledgeGraph(){

    const [nodes,setNodes]=useState<GraphNode[]>(

        generateNodes()

    );

    const [selected,setSelected]=useState<GraphNode>(

        generateNodes()[0]

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            const next=generateNodes();

            setNodes(next);

            setSelected(

                next[random(0,next.length-1)]

            );

        },5000);

        return()=>clearInterval(timer);

    },[]);
        function riskColor(risk:string){

        switch(risk){

            case "CRITICAL":
                return "#FF4D4F";

            case "HIGH":
                return "#FA8C16";

            case "MEDIUM":
                return "#FADB14";

            default:
                return "#00E676";

        }

    }

    return(

        <EnterpriseCard
            title="Oracle AI Knowledge Graph"
            height={1100}
        >

            <Row gutter={[24,24]}>

                {/* GRAPH */}

                <Col xs={24} lg={15}>

                    <div
                        style={{
                            position:"relative",
                            height:640,
                            background:"#122235",
                            borderRadius:12,
                            overflow:"hidden",
                            border:"1px solid #2A415D"
                        }}
                    >

                        {/* Connection Lines */}

                        <svg
                            width="100%"
                            height="100%"
                            style={{
                                position:"absolute",
                                inset:0
                            }}
                        >

                            <line
                                x1="350"
                                y1="70"
                                x2="180"
                                y2="170"
                                stroke="#3A5575"
                                strokeWidth="2"
                            />

                            <line
                                x1="350"
                                y1="70"
                                x2="350"
                                y2="170"
                                stroke="#3A5575"
                                strokeWidth="2"
                            />

                            <line
                                x1="350"
                                y1="70"
                                x2="520"
                                y2="170"
                                stroke="#3A5575"
                                strokeWidth="2"
                            />

                            <line
                                x1="180"
                                y1="170"
                                x2="180"
                                y2="330"
                                stroke="#3A5575"
                                strokeWidth="2"
                            />

                            <line
                                x1="350"
                                y1="170"
                                x2="350"
                                y2="330"
                                stroke="#3A5575"
                                strokeWidth="2"
                            />

                            <line
                                x1="520"
                                y1="170"
                                x2="520"
                                y2="330"
                                stroke="#3A5575"
                                strokeWidth="2"
                            />

                            <line
                                x1="350"
                                y1="330"
                                x2="350"
                                y2="510"
                                stroke="#3A5575"
                                strokeWidth="2"
                            />

                        </svg>

                        {/* Nodes */}

                        <div
                            style={{
                                position:"absolute",
                                inset:0
                            }}
                        >

                            {[
                                {node:nodes[0],left:300,top:30},
                                {node:nodes[1],left:120,top:150},
                                {node:nodes[7],left:300,top:150},
                                {node:nodes[4],left:480,top:150},
                                {node:nodes[6],left:120,top:310},
                                {node:nodes[3],left:300,top:310},
                                {node:nodes[8],left:480,top:310},
                                {node:nodes[2],left:300,top:490}
                            ].map(item=>(

                                <div
                                    key={item.node.id}
                                    onClick={()=>setSelected(item.node)}
                                    style={{
                                        position:"absolute",
                                        left:item.left,
                                        top:item.top,
                                        width:120,
                                        padding:14,
                                        borderRadius:12,
                                        background:"#16253B",
                                        border:`2px solid ${riskColor(item.node.risk)}`,
                                        textAlign:"center",
                                        cursor:"pointer",
                                        transition:"0.35s",
                                        boxShadow:`0 0 18px ${riskColor(item.node.risk)}40`
                                    }}
                                >

                                    <div
                                        style={{
                                            fontSize:26,
                                            color:riskColor(item.node.risk)
                                        }}
                                    >

                                        {
                                            templates[item.node.id].icon
                                        }

                                    </div>

                                    <div
                                        style={{
                                            marginTop:10,
                                            color:"#FFFFFF",
                                            fontSize:13,
                                            fontWeight:700
                                        }}
                                    >

                                        {item.node.label}

                                    </div>

                                    <Tag
                                        color={
                                            item.node.risk==="CRITICAL"

                                            ?"red"

                                            :item.node.risk==="HIGH"

                                            ?"orange"

                                            :item.node.risk==="MEDIUM"

                                            ?"gold"

                                            :"green"
                                        }
                                        style={{
                                            marginTop:10
                                        }}
                                    >

                                        {item.node.risk}

                                    </Tag>

                                </div>

                            ))}

                        </div>

                    </div>

                </Col>

                {/* RIGHT PANEL */}

                <Col xs={24} lg={9}>
                                    <div
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            gap:20,
                            height:"100%"
                        }}
                    >

                        {/* Selected Node */}

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:22
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
                                        fontSize:20,
                                        fontWeight:700,
                                        color:"#FFFFFF"
                                    }}
                                >
                                    Selected Entity
                                </div>

                                <Tag
                                    color={
                                        selected.risk==="CRITICAL"

                                        ?"red"

                                        :selected.risk==="HIGH"

                                        ?"orange"

                                        :selected.risk==="MEDIUM"

                                        ?"gold"

                                        :"green"
                                    }
                                >
                                    {selected.risk}
                                </Tag>

                            </div>

                            <Statistic
                                title="Entity"
                                value={selected.label}
                                valueStyle={{
                                    color:"#00E676",
                                    fontSize:28
                                }}
                            />

                            <Statistic
                                title="Category"
                                value={selected.type}
                                valueStyle={{
                                    color:"#2D7CFF",
                                    fontSize:20
                                }}
                                style={{
                                    marginTop:18
                                }}
                            />

                        </div>

                        {/* AI Analysis */}

                        <div
                            style={{
                                background:"#16253B",
                                borderLeft:"4px solid #00E676",
                                borderRadius:12,
                                padding:22
                            }}
                        >

                            <div
                                style={{
                                    color:"#00E676",
                                    fontWeight:700,
                                    fontSize:18,
                                    marginBottom:14
                                }}
                            >
                                Oracle AI Analysis
                            </div>

                            <div
                                style={{
                                    color:"#DCE8F4",
                                    lineHeight:1.9
                                }}
                            >

                                Oracle AI identified

                                <b
                                    style={{
                                        color:"#FFFFFF"
                                    }}
                                >
                                    {" "}
                                    {selected.label}
                                    {" "}
                                </b>

                                as a key entity within the current attack
                                relationship graph.

                                Multiple graph correlations indicate
                                increased interaction with privileged
                                identities and critical infrastructure.

                            </div>

                        </div>

                        {/* Relationships */}

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:22
                            }}
                        >

                            <div
                                style={{
                                    color:"#FFFFFF",
                                    fontWeight:700,
                                    fontSize:18,
                                    marginBottom:18
                                }}
                            >
                                Connected Relationships
                            </div>

                            <div
                                style={{
                                    display:"flex",
                                    flexWrap:"wrap",
                                    gap:10
                                }}
                            >

                                <Tag color="processing">
                                    Oracle AI
                                </Tag>

                                <Tag color="blue">
                                    MITRE ATT&CK
                                </Tag>

                                <Tag color="purple">
                                    Identity
                                </Tag>

                                <Tag color="orange">
                                    Attack Path
                                </Tag>

                                <Tag color="green">
                                    Digital Twin
                                </Tag>

                                <Tag color="cyan">
                                    Threat Intel
                                </Tag>

                            </div>

                        </div>

                        {/* Risk Score */}

                        <div
                            style={{
                                background:"#16253B",
                                border:"1px solid #2A415D",
                                borderRadius:12,
                                padding:22
                            }}
                        >

                            <div
                                style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    marginBottom:12
                                }}
                            >

                                <span
                                    style={{
                                        color:"#8EA9CC"
                                    }}
                                >
                                    Enterprise Risk Score
                                </span>

                                <b
                                    style={{
                                        color:"#FF4D4F"
                                    }}
                                >
                                    92%
                                </b>

                            </div>

                            <Progress
                                percent={92}
                                strokeColor="#FF4D4F"
                                showInfo={false}
                            />

                        </div>

                        {/* Recommendation */}

                        <div
                            style={{
                                background:"#102033",
                                borderLeft:"4px solid #2D7CFF",
                                borderRadius:12,
                                padding:22
                            }}
                        >

                            <div
                                style={{
                                    color:"#2D7CFF",
                                    fontWeight:700,
                                    fontSize:18,
                                    marginBottom:14
                                }}
                            >
                                Oracle Recommendation
                            </div>

                            <div
                                style={{
                                    color:"#DCE8F4",
                                    lineHeight:1.9
                                }}
                            >

                                Continue monitoring this entity,
                                isolate connected assets if additional
                                anomalies appear,
                                and execute the recommended SOAR
                                playbook before the predicted attack path
                                reaches critical infrastructure.

                            </div>

                        </div>

                        <div
                            style={{
                                marginTop:"auto",
                                display:"flex",
                                justifyContent:"space-between",
                                alignItems:"center"
                            }}
                        >

                            <Tag color="processing">
                                Knowledge Graph Engine
                            </Tag>

                            <div
                                style={{
                                    color:"#00E676",
                                    fontWeight:700
                                }}
                            >
                                LIVE
                            </div>

                        </div>

                    </div>

                </Col>

            </Row>

        </EnterpriseCard>

    );

}