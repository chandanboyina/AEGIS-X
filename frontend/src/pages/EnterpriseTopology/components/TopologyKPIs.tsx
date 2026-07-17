import { useEffect, useState } from "react";

import { Row, Col } from "antd";

import {
    ApartmentOutlined,
    ClusterOutlined,
    SafetyCertificateOutlined,
    HeartOutlined,
    ShareAltOutlined,
    RadarChartOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

interface KPI{

    title:string;

    value:string;

    icon:any;

    color:string;

}

function random(min:number,max:number){

    return Math.floor(Math.random()*(max-min+1))+min;

}

export default function TopologyKPIs(){

    const [kpis,setKpis]=useState<KPI[]>([]);

    function refresh(){

        setKpis([

            {

                title:"Enterprise Assets",

                value:String(random(1450,1560)),

                icon:<ApartmentOutlined/>,

                color:"#1677FF"

            },

            {

                title:"Connected Nodes",

                value:String(random(820,890)),

                icon:<ClusterOutlined/>,

                color:"#13C2C2"

            },

            {

                title:"Protected Zones",

                value:String(random(14,18)),

                icon:<SafetyCertificateOutlined/>,

                color:"#00E676"

            },

            {

                title:"Network Health",

                value:`${random(97,100)}%`,

                icon:<HeartOutlined/>,

                color:"#52C41A"

            },

            {

                title:"Active Links",

                value:String(random(230,280)),

                icon:<ShareAltOutlined/>,

                color:"#FAAD14"

            },

            {

                title:"AI Mapping",

                value:`${random(98,100)}%`,

                icon:<RadarChartOutlined/>,

                color:"#722ED1"

            }

        ]);

    }

    useEffect(()=>{

        refresh();

        const timer=setInterval(refresh,5000);

        return()=>clearInterval(timer);

    },[]);

    return(

        <Row gutter={[20,20]}>

            {

                kpis.map((item)=>(

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                        xl={4}
                        key={item.title}
                    >

                        <EnterpriseCard
                            title=""
                            height={260}
                        >

                            <div
                                style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    alignItems:"flex-start"
                                }}
                            >

                                <div
                                    style={{
                                        width:54,
                                        height:54,
                                        borderRadius:14,
                                        background:`${item.color}18`,
                                        display:"flex",
                                        justifyContent:"center",
                                        alignItems:"center",
                                        color:item.color,
                                        fontSize:28
                                    }}
                                >
                                    {item.icon}
                                </div>

                            </div>

                            <div
                                style={{
                                    marginTop:18,
                                    color:"#8EA9CC",
                                    fontSize:15
                                }}
                            >
                                {item.title}
                            </div>

                            <div
                                style={{
                                    color:"#FFFFFF",
                                    fontSize:30,
                                    fontWeight:800,
                                    marginTop:8
                                }}
                            >
                                {item.value}
                            </div>

                            <div
                                style={{
                                    marginTop:18,
                                    height:8,
                                    borderRadius:30,
                                    background:"#1A2B42",
                                    overflow:"hidden"
                                }}
                            >

                                <div
                                    style={{
                                        width:`${random(82,98)}%`,
                                        height:"100%",
                                        background:item.color,
                                        borderRadius:30,
                                        transition:"1s"
                                    }}
                                />

                            </div>

                        </EnterpriseCard>

                    </Col>

                ))

            }

        </Row>

    );

}