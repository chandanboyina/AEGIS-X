import { Menu } from "antd";

import {

    DashboardOutlined,

    WarningOutlined,

    ApartmentOutlined,

    ClusterOutlined,

    RobotOutlined,

    DeploymentUnitOutlined,

    SafetyCertificateOutlined,

    ThunderboltOutlined,

    GlobalOutlined,

    FileSearchOutlined,

    BulbOutlined,

    RadarChartOutlined,

    AreaChartOutlined

} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import "./Sidebar.css";

interface Props{

    collapsed:boolean;

}

export default function Sidebar({
    collapsed
}:Props){

    const navigate = useNavigate();

    return(

        <div
            style={{
                height:"100%",
                background:"#091523"
            }}
        >

            <div
                style={{

                    height:70,

                    display:"flex",

                    alignItems:"center",

                    justifyContent:

                        collapsed

                            ? "center"

                            : "flex-start",

                    paddingLeft:

                        collapsed

                            ? 0

                            : 22,

                    borderBottom:"1px solid #26364A",

                    color:"white",

                    fontWeight:700,

                    fontSize:20

                }}
            >

                {

                    collapsed

                        ? "AX"

                        : "AEGIS-X"

                }

            </div>

        <Menu

            theme="dark"

            mode="inline"

            inlineCollapsed={collapsed}

            defaultSelectedKeys={["/"]}

            onClick={(item)=>navigate(item.key)}

            style={{
                height:"calc(100vh - 70px)",
                borderRight:0,
                background:"#091523",
                paddingTop:10
            }}

            items={[

                {

                    key:"/",

                    icon:

                    <DashboardOutlined

                    style={{

                        fontSize:18

                    }}

                    />,

                    label:"Executive Dashboard"

                },

                {

                    key:"/incidents",

                    icon:

                    <WarningOutlined

                    style={{

                        fontSize:18

                    }}

                    />,

                    label:"Live Incidents"

                },

                {
                    key:"/incident-analytics",
                    icon:<AreaChartOutlined
                    style={{fontSize:18}}/>,
                    label:"Incident Analytics"
                },

                {

                    key:"/council",

                    icon:

                    <RobotOutlined

                    style={{

                        fontSize:18

                    }}

                    />,

                    label:"AI Council"

                },

                {

                    key:"/analytics",

                    icon:

                    <ClusterOutlined

                    style={{

                        fontSize:18

                    }}

                    />,

                    label:"Behaviour Analytics"

                },

                {

                    key:"/monitoring",

                    icon:<RadarChartOutlined/>,

                    label:"Live Monitoring"

                },

                {

                    key:"/topology",

                    icon:

                    <ApartmentOutlined

                    style={{

                        fontSize:18

                    }}

                    />,

                    label:"Enterprise Topology"

                },

                {

                    key:"/twin",

                    icon:

                    <DeploymentUnitOutlined

                    style={{

                        fontSize:18

                    }}

                    />,

                    label:"Digital Twin"

                },

                {

                    key:"/brain",

                    icon:

                    <BulbOutlined

                    style={{

                        fontSize:18

                    }}

                    />,

                    label:"Enterprise Brain"

                },

                {

                    key:"/dna",

                    icon:

                    <SafetyCertificateOutlined

                    style={{

                        fontSize:18

                    }}

                    />,

                    label:"Cyber DNA"

                },

                {

                    key:"/intel",

                    icon:

                    <GlobalOutlined

                    style={{

                        fontSize:18

                    }}

                    />,

                    label:"Threat Intelligence"

                },

                {

                    key:"/soar",

                    icon:

                    <ThunderboltOutlined

                    style={{

                        fontSize:18

                    }}

                    />,

                    label:"SOAR Automation"

                },

                {

                    key:"/audit",

                    icon:

                    <FileSearchOutlined

                    style={{

                        fontSize:18

                    }}

                    />,

                    label:"Audit"

                }

            ]}
        />

        </div>

    );

}