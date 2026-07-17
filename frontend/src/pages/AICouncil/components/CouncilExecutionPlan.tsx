import {
    Row,
    Col,
    Tag
} from "antd";

import {
    CheckCircleOutlined,
    SafetyCertificateOutlined,
    DatabaseOutlined,
    ApartmentOutlined,
    BellOutlined,
    RocketOutlined
} from "@ant-design/icons";

import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

const steps=[
{
title:"Initial Containment",
icon:<SafetyCertificateOutlined/>,
desc:"Automatically isolate affected assets using SOAR playbooks."
},
{
title:"Credential Rotation",
icon:<CheckCircleOutlined/>,
desc:"Reset privileged identities and invalidate compromised sessions."
},
{
title:"Government Cloud Isolation",
icon:<ApartmentOutlined/>,
desc:"Disconnect east-west traffic using adaptive segmentation."
},
{
title:"IOC Hunt",
icon:<DatabaseOutlined/>,
desc:"Search enterprise-wide indicators using Graph AI."
},
{
title:"Executive Notification",
icon:<BellOutlined/>,
desc:"Generate compliance reports and notify executives."
},
{
title:"Autonomous Execution",
icon:<RocketOutlined/>,
desc:"Launch approved response after Oracle AI authorization."
}
];

export default function CouncilExecutionPlan(){

return(

<EnterpriseCard
title="Oracle AI Council Execution Plan"
height={780}
>

<Row gutter={[18,18]}>

{
steps.map((item,index)=>(

<Col
xs={24}
md={12}
key={index}
>

<div
style={{
display:"flex",
gap:16,
padding:16,
background:"#16253B",
border:"1px solid #2A415D",
borderRadius:10,
height:110
}}
>

<div
style={{
width:42,
height:42,
borderRadius:50,
background:"#0E3B2A",
display:"flex",
alignItems:"center",
justifyContent:"center",
color:"#00E676",
fontSize:18,
fontWeight:700
}}
>

{index+1}

</div>

<div>

<div
style={{
fontSize:17,
fontWeight:700,
color:"#FFFFFF"
}}
>

{item.title}

</div>

<div
style={{
marginTop:8,
color:"#8EA9CC",
lineHeight:1.6
}}
>

{item.desc}

</div>

</div>

</div>

</Col>

))
}

</Row>

<div
style={{
marginTop:24,
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<Tag color="green">

EXECUTION READY

</Tag>

<div
style={{
color:"#00E676",
fontWeight:700
}}
>

6 Step Automated Response Plan

</div>

</div>

</EnterpriseCard>

);

}