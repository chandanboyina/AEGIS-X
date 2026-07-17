import { Row, Col } from "antd";

import TopologyKPIs from "./components/TopologyKPIs";
import EnterpriseNetworkMap from "./components/EnterpriseNetworkMap";
import CriticalAssets from "./components/CriticalAssets";
import TrustZones from "./components/TrustZones";
import AttackPathExplorer from "./components/AttackPathExplorer";
import AssetInventory from "./components/AssetInventory";
import NetworkHealth from "./components/NetworkHealth";
import AIInfrastructureSummary from "./components/AIInfrastructureSummary";

export default function EnterpriseTopology(){

    return(

        <div
            style={{
                padding:24,
                display:"flex",
                flexDirection:"column",
                gap:24
            }}
        >

            {/* =====================================
                    KPI ROW
            ====================================== */}

            <TopologyKPIs/>

            {/* =====================================
             NETWORK MAP + CRITICAL ASSETS
            ====================================== */}

            <Row gutter={[24,24]} align="top">

                <Col xs={24} xl={16}>

                    <EnterpriseNetworkMap/>

                </Col>

                <Col xs={24} xl={8}>

                    <CriticalAssets/>

                </Col>

            </Row>

            {/* =====================================
              TRUST ZONES + ATTACK PATH
            ====================================== */}

            <Row gutter={[24,24]} align="top">

                <Col xs={24} xl={10}>

                    <TrustZones/>

                </Col>

                <Col xs={24} xl={14}>

                    <AttackPathExplorer/>

                </Col>

            </Row>

            {/* =====================================
            ASSET INVENTORY + NETWORK HEALTH
            ====================================== */}

            <Row gutter={[24,24]} align="top">

                <Col xs={24} xl={15}>

                    <AssetInventory/>

                </Col>

                <Col xs={24} xl={9}>

                    <NetworkHealth/>

                </Col>

            </Row>

            {/* =====================================
                ORACLE AI SUMMARY
            ====================================== */}

            <AIInfrastructureSummary/>

        </div>

    );

}