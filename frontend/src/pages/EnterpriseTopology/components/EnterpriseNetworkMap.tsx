import { useEffect, useState } from "react";

import {
    Tag,
    Badge
} from "antd";

import {
    CloudOutlined,
    SafetyCertificateOutlined,
    DatabaseOutlined,
    DesktopOutlined,
    ApiOutlined,
    GlobalOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface Node{

    id:number;

    title:string;

    subtitle:string;

    icon:any;

    color:string;

    health:number;

    traffic:string;

}

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function EnterpriseNetworkMap(){

    const [health,setHealth]=useState(99);

    const [traffic,setTraffic]=useState("8.6 Gbps");

    const [nodes,setNodes]=useState<Node[]>([]);

    function refresh(){

        setHealth(random(96,100));

        setTraffic(`${random(7,12)}.${random(0,9)} Gbps`);

        setNodes([

            {

                id:1,

                title:"Internet",

                subtitle:"External Network",

                icon:<GlobalOutlined/>,

                color:"#1677FF",

                health:100,

                traffic:"2.1 Gbps"

            },

            {

                id:2,

                title:"Edge Firewall",

                subtitle:"Perimeter",

                icon:<SafetyCertificateOutlined/>,

                color:"#FAAD14",

                health:99,

                traffic:"5.8 Gbps"

            },

            {

                id:3,

                title:"DMZ",

                subtitle:"Public Services",

                icon:<CloudOutlined/>,

                color:"#13C2C2",

                health:98,

                traffic:"3.2 Gbps"

            },

            {

                id:4,

                title:"Corporate LAN",

                subtitle:"Internal",

                icon:<DesktopOutlined/>,

                color:"#00E676",

                health:97,

                traffic:"6.5 Gbps"

            },

            {

                id:5,

                title:"Database Cluster",

                subtitle:"Critical",

                icon:<DatabaseOutlined/>,

                color:"#722ED1",

                health:99,

                traffic:"1.6 Gbps"

            },

            {

                id:6,

                title:"Azure Cloud",

                subtitle:"Hybrid",

                icon:<ApiOutlined/>,

                color:"#1677FF",

                health:98,

                traffic:"4.4 Gbps"

            }

        ]);

    }

    useEffect(()=>{

        refresh();

        const timer=setInterval(refresh,5000);

        return()=>clearInterval(timer);

    },[]);
        return(

        <EnterpriseCard
            title="Enterprise Network Topology"
            height={1400}
        >

            {/* Header */}

            <div
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    marginBottom:30
                }}
            >

                <div>

                    <div
                        style={{
                            color:"#00E676",
                            fontSize:18,
                            fontWeight:700
                        }}
                    >
                        Oracle AI Infrastructure Graph
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6
                        }}
                    >
                        Live discovery of enterprise assets, trust zones and
                        network relationships.
                    </div>

                </div>

                <div
                    style={{
                        display:"flex",
                        gap:14
                    }}
                >

                    <Tag color="green">
                        Health {health}%
                    </Tag>

                    <Tag color="blue">
                        {traffic}
                    </Tag>

                </div>

            </div>

            {/* Topology */}

            <div
                className="topologyContainer"
            >

                {/* INTERNET */}

                <div className="topologyRow">

                    <div className="node">

                        <Badge status="processing"/>

                        <div
                            className="nodeIcon"
                            style={{
                                background:"#1677FF22",
                                color:"#1677FF"
                            }}
                        >

                            {nodes[0]?.icon}

                        </div>

                        <div className="nodeTitle">

                            {nodes[0]?.title}

                        </div>

                        <div className="nodeSub">

                            {nodes[0]?.subtitle}

                        </div>

                        <div className="nodeTraffic">

                            {nodes[0]?.traffic}

                        </div>

                    </div>

                </div>

                <div className="verticalLine"/>

                {/* FIREWALL */}

                <div className="topologyRow">

                    <div className="node">

                        <Badge status="processing"/>

                        <div
                            className="nodeIcon"
                            style={{
                                background:"#FAAD1422",
                                color:"#FAAD14"
                            }}
                        >

                            {nodes[1]?.icon}

                        </div>

                        <div className="nodeTitle">

                            {nodes[1]?.title}

                        </div>

                        <div className="nodeSub">

                            {nodes[1]?.subtitle}

                        </div>

                        <div className="nodeTraffic">

                            {nodes[1]?.traffic}

                        </div>

                    </div>

                </div>

                <div className="verticalLine"/>

                {/* SPLIT */}

                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"flex-start",
                        marginTop:10
                    }}
                >

                    {/* LEFT */}

                    <div
                        style={{
                            width:"42%"
                        }}
                    >

                        <div className="horizontalLine"/>

                        <div
                            style={{
                                display:"flex",
                                justifyContent:"center"
                            }}
                        >

                            <div className="node">

                                <Badge status="processing"/>

                                <div
                                    className="nodeIcon"
                                    style={{
                                        background:"#13C2C222",
                                        color:"#13C2C2"
                                    }}
                                >

                                    {nodes[2]?.icon}

                                </div>

                                <div className="nodeTitle">

                                    {nodes[2]?.title}

                                </div>

                                <div className="nodeSub">

                                    {nodes[2]?.subtitle}

                                </div>

                                <div className="nodeTraffic">

                                    {nodes[2]?.traffic}

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div
                        style={{
                            width:"42%"
                        }}
                    >

                        <div className="horizontalLine"/>

                        <div
                            style={{
                                display:"flex",
                                justifyContent:"center"
                            }}
                        >

                            <div className="node">

                                <Badge status="processing"/>

                                <div
                                    className="nodeIcon"
                                    style={{
                                        background:"#00E67622",
                                        color:"#00E676"
                                    }}
                                >

                                    {nodes[3]?.icon}

                                </div>

                                <div className="nodeTitle">

                                    {nodes[3]?.title}

                                </div>

                                <div className="nodeSub">

                                    {nodes[3]?.subtitle}

                                </div>

                                <div className="nodeTraffic">

                                    {nodes[3]?.traffic}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between",
                        marginTop:55
                    }}
                >

                    <div className="node">

                        <Badge status="processing"/>

                        <div
                            className="nodeIcon"
                            style={{
                                background:"#722ED122",
                                color:"#722ED1"
                            }}
                        >

                            {nodes[4]?.icon}

                        </div>

                        <div className="nodeTitle">

                            {nodes[4]?.title}

                        </div>

                        <div className="nodeSub">

                            {nodes[4]?.subtitle}

                        </div>

                        <div className="nodeTraffic">

                            {nodes[4]?.traffic}

                        </div>

                    </div>

                    <div className="node">

                        <Badge status="processing"/>

                        <div
                            className="nodeIcon"
                            style={{
                                background:"#1677FF22",
                                color:"#1677FF"
                            }}
                        >

                            {nodes[5]?.icon}

                        </div>

                        <div className="nodeTitle">

                            {nodes[5]?.title}

                        </div>

                        <div className="nodeSub">

                            {nodes[5]?.subtitle}

                        </div>

                        <div className="nodeTraffic">

                            {nodes[5]?.traffic}

                        </div>

                    </div>

                </div>
                            </div>

            {/* Footer */}

            <div
                style={{
                    marginTop:28,
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}
            >

                <div>

                    <div
                        style={{
                            color:"#00E676",
                            fontWeight:700,
                            fontSize:17
                        }}
                    >
                        Oracle AI Topology Engine
                    </div>

                    <div
                        style={{
                            color:"#8EA9CC",
                            marginTop:6
                        }}
                    >
                        Continuously discovering enterprise assets,
                        monitoring topology changes and mapping
                        infrastructure relationships in real time.
                    </div>

                </div>

                <Tag
                    color="success"
                    style={{
                        fontWeight:700,
                        padding:"4px 12px"
                    }}
                >
                    ● LIVE
                </Tag>

            </div>

            <style>

{`

.topologyContainer{

display:flex;

flex-direction:column;

align-items:center;

position:relative;

}

.topologyRow{

display:flex;

justify-content:center;

width:100%;

}

.node{

width:170px;

background:#18273C;

border:1px solid #29425E;

border-radius:16px;

padding:18px;

display:flex;

flex-direction:column;

align-items:center;

position:relative;

transition:.35s;

animation:floatNode 4s ease-in-out infinite;

}

.node:hover{

transform:translateY(-6px);

box-shadow:0 12px 28px rgba(0,0,0,.35);

border-color:#1677FF;

}

.nodeIcon{

width:64px;

height:64px;

border-radius:18px;

display:flex;

justify-content:center;

align-items:center;

font-size:30px;

margin:12px 0;

}

.nodeTitle{

color:#FFFFFF;

font-size:17px;

font-weight:700;

text-align:center;

}

.nodeSub{

color:#8EA9CC;

font-size:13px;

margin-top:4px;

text-align:center;

}

.nodeTraffic{

margin-top:10px;

font-size:13px;

font-weight:700;

color:#00E676;

}

.verticalLine{

width:3px;

height:55px;

background:linear-gradient(

180deg,

#00E676,

#1677FF

);

margin:8px 0;

position:relative;

overflow:hidden;

}

.verticalLine::after{

content:"";

position:absolute;

left:-3px;

top:-20px;

width:8px;

height:20px;

border-radius:20px;

background:#FFFFFF;

box-shadow:0 0 12px #00E676;

animation:dataFlowVertical 2s linear infinite;

}

.horizontalLine{

height:3px;

width:100%;

margin-bottom:22px;

background:linear-gradient(

90deg,

#00E676,

#1677FF

);

position:relative;

overflow:hidden;

}

.horizontalLine::after{

content:"";

position:absolute;

left:-25px;

top:-3px;

width:24px;

height:8px;

border-radius:20px;

background:#FFFFFF;

box-shadow:0 0 12px #00E676;

animation:dataFlowHorizontal 2.2s linear infinite;

}

@keyframes dataFlowVertical{

0%{

top:-20px;

opacity:0;

}

20%{

opacity:1;

}

100%{

top:100%;

opacity:0;

}

}

@keyframes dataFlowHorizontal{

0%{

left:-25px;

opacity:0;

}

20%{

opacity:1;

}

100%{

left:100%;

opacity:0;

}

}

@keyframes floatNode{

0%{

transform:translateY(0px);

}

50%{

transform:translateY(-6px);

}

100%{

transform:translateY(0px);

}

}

`}

            </style>

        </EnterpriseCard>

    );

}