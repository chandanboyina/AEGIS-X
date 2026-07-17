import { Row, Col } from "antd";

//import ExecutiveMetrics from "../../components/dashboard/executive/ExecutiveMetrics";
//import ExecutiveIncident from "../../components/dashboard/executive/ExecutiveIncident";
import ExecutiveRecommendation from "../../components/dashboard/executive/ExecutiveRecommendation";
import ExecutiveTimeline from "../../components/dashboard/executive/ExecutiveTimeline";
import AICouncilSummary from "../../components/dashboard/executive/AICouncilSummary/AICouncilSummary";
import ExecutiveKPIRow from "../../components/dashboard/executive/ExecutiveKPIRow";
import EnterpriseCard from "../../components/common/EnterpriseCard/EnterpriseCard";
import GlobalThreatMap from "../../components/dashboard/executive/GlobalThreatMap";
import GlobalThreatSummary from "../../components/dashboard/executive/GlobalThreatSummary";
import ThreatOriginRanking from "../../components/dashboard/executive/ThreatOriginRanking";
import ThreatLegend from "../../components/dashboard/executive/ThreatLegend";
import NationalInfrastructure from "../../components/dashboard/executive/NationalInfrastructure";
import ThreatFeed from "../../components/dashboard/executive/ThreatFeed";
import ThreatIntelTicker from "../../components/dashboard/executive/ThreatIntelTicker";
import ExecutiveAlerts from "../../components/dashboard/executive/ExecutiveAlerts";


export default function Dashboard(){

    return(

        <div
            style={{
                padding:20,
                background:"#07111F",
                minHeight:"100%"
            }}
        >

            <Row gutter={[20,20]} style={{ marginBottom: 20 }}>

                <ThreatIntelTicker />

            </Row>
            

            <Row gutter={[20,20]}>

                <Col span={24}>

                    <ExecutiveKPIRow/>

                </Col>

                <Col span={24}>
                    <GlobalThreatSummary/>
                </Col>

                

                <Col span={16}>

                <EnterpriseCard title="Global Threat Landscape (Real-Time)"
                height={560}
                >

                <GlobalThreatMap/>

                </EnterpriseCard>

                </Col>

                <Col span={8}>

                <EnterpriseCard title="National Infrastructure"
                height={560}
                >

                <NationalInfrastructure/>

                </EnterpriseCard>

                </Col>

                <Col xs={24} lg={8}>

                <EnterpriseCard title="Threat Feed"
                height={450}
                >

                <ThreatFeed/>

                </EnterpriseCard>

                </Col>

                <Col xs={24} lg={10}>

                <EnterpriseCard title="Threat Origin Ranking"
                height={450}
                >

                <ThreatOriginRanking/>

                </EnterpriseCard>

                </Col>

                <Col xs={24} lg={6}>

                <EnterpriseCard title="Threat Legend"
                height={450}
                >

                <ThreatLegend/>

                </EnterpriseCard>

                </Col>


                <Col span={24}>

                    <ExecutiveRecommendation/>

                </Col>

                <Col xs={24} lg={12}>
                    <AICouncilSummary/>
                </Col>

                <Col xs={24} lg={12}>
                
                    <ExecutiveTimeline/>
                </Col>

            </Row>
            <Row gutter={[20,20]} style={{ marginTop: 20, marginLeft:1 }}>
                <ExecutiveAlerts/>
            </Row>

        </div>

    );

}