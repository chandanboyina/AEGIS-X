import { Layout } from "antd";
import Sidebar from "../components/dashboard/Sidebar/Sidebar";
import TopBar from "../components/dashboard/TopBar/TopBar";
//import Dashboard from "../pages/Dashboard/Dashboard";
import { useState } from "react";
import type { ReactNode } from "react";



const {

    Sider,

    Header,

    Content

} = Layout;

interface Props{

    children: ReactNode;

}

export default function MainLayout({ children }: Props){

    const [collapsed, setCollapsed] = useState(true);

    return(

        <Layout style={{height:"100vh"}}>

            <Sider

                collapsible={false}

                collapsed={collapsed}

                collapsedWidth={80}

                width={280}

                trigger={null}

                onMouseEnter={() => setCollapsed(false)}

                onMouseLeave={() => setCollapsed(true)}

                style={{

                    background: "#091523",

                    borderRight: "1px solid #26364A"

                }}

            >

                <Sidebar collapsed={collapsed}/>

            </Sider>

            <Layout>

                <Header
                    style={{

                        background:"#07111F",
                        padding:"0 30px",
                        display:"flex",
                        alignItems:"center",
                        boxShadow:
                        "0 3px 18px rgba(0,0,0,.35)",
                        borderBottom:
                        "1px solid #203B57",
                        zIndex:100

                    }}
                >

                    <TopBar/>

                </Header>

                <Content
                    style={{
                        margin: 0,
                        background: "#07111F",
                        overflow: "auto",
                        height: "calc(100vh - 64px)"
                    }}
                >
                    
                    {children}
                </Content>

            </Layout>

        </Layout>

    );

}