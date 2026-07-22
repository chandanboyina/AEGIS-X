import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import LiveIncidents from "../pages/LiveIncidents";
import Council from "../pages/AICouncil";
import Behavior from "../pages/BehaviourAnalytics";
import Topology from "../pages/EnterpriseTopology";
import DigitalTwin from "../pages/DigitalTwin";
import Graph from "../pages/graph/Graph";
import Brain from "../pages/EnterpriseBrain";
import DNA from "../pages/CyberDNA";
import Intelligence from "../pages/ThreatIntelligence";
import SOAR from "../pages/soar/SOAR";
import Audit from "../pages/audit/audit";
import Monitoring from "../pages/Monitoring/Monitoring";
import IncidentAnalytics from "../pages/IncidentAnalytics";
import AIProcessing from "../pages/AIProcessing";


export default function AppRouter(){

    return(

        <Routes>

            <Route path="/" element={<Dashboard/>}/>

            <Route path="/incidents" element={<LiveIncidents/>}
/>

            <Route path="/council" element={<Council/>}/>

            <Route path="/analytics" element={<Behavior/>}/>

            <Route path="/topology" element={<Topology/>}/>

            <Route path="/twin" element={<DigitalTwin/>}/>

            <Route path="/graph" element={<Graph/>}/>

            <Route path="/brain" element={<Brain/>}/>

            <Route path="/dna" element={<DNA/>}/>

            <Route path="/intel" element={<Intelligence/>}/>

            <Route path="/soar" element={<SOAR/>}/>

            <Route path="/audit" element={<Audit/>}/>

            <Route path="/monitoring" element={<Monitoring/>}/>

            <Route path="incident-analytics" element={<IncidentAnalytics/>}/>

            <Route path="/ai-pipeline" element={<AIProcessing />}
/>


        </Routes>

    );

}