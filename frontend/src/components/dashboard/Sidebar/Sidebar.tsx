import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
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

    AreaChartOutlined,

    PartitionOutlined

} from "@ant-design/icons";


import "./Sidebar.css";

interface Props{

    collapsed:boolean;

}

export default function Sidebar({
    collapsed
}:Props){

    const navigate = useNavigate();
    const location = useLocation();

    return(

        <div
            style={{
                height: "100vh",
                background: "#091523",
                display: "flex",
                flexDirection: "column"
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
            selectedKeys={[location.pathname]}
            onClick={(item) => navigate(item.key)}
            style={{
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                borderRight: 0,
                background: "#091523",
                paddingTop: 10
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

                },

                {
                    key:"/ai-pipeline",
                    icon:<PartitionOutlined
                    style={{fontSize:18}}/>,
                    label:"AI Pipeline"
                },

            ]}
        />

        </div>

    );

}