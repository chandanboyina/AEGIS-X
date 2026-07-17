import { Row, Col } from "antd";

import EnterpriseCard from "../../components/common/EnterpriseCard/EnterpriseCard";

import LiveLogConsole from "../../components/monitoring/LiveLogConsole";

import LiveEventStream from "../../components/monitoring/LiveEventStream";

import AgentStatus from "../../components/monitoring/AgentStatus";

import NetworkTraffic from "../../components/monitoring/NetworkTraffic";

import SystemMetrics from "../../components/monitoring/SystemMetrics";

import {useState,useEffect} from "react";

import {generateEvent} from "../../utils/liveGenerator";

import SOCTerminal from "../../components/monitoring/SOCTerminal";

export default function Monitoring(){

    const [events,setEvents]= useState<any[]>([]);

    useEffect(()=>{

        const timer=

        setInterval(()=>{

            setEvents(v=>[

                ...v,

                generateEvent()

            ].slice(-250));

        },850);

        return()=>clearInterval(timer);

    },[]);
    

    return(

        <div
            style={{
                padding:20,
                background:"#07111F",
                minHeight:"100%"
            }}
        >

            <Row gutter={[20,20]}>

                <Col span={24}>

                    <EnterpriseCard

                        title="SOC TELEMETRY CONSOLE"

                        height={500}

                    >

                        <SOCTerminal

                            events={events}

                        />

                    </EnterpriseCard>

                </Col>

                <Col span={18}>

                    <EnterpriseCard

                        title="Security Summary"

                        height={520}

                    >

                        <LiveLogConsole

                            events={events}

                        />

                    </EnterpriseCard>

                </Col>

                <Col span={6}>

                    <EnterpriseCard

                        title="AI Agent Status"

                        height={520}

                    >

                        <AgentStatus

                            events={events}

                        />

                    </EnterpriseCard>

                </Col>

                <Col span={8}>

                    <EnterpriseCard

                        title="Network Traffic"

                        height={360}

                    >

                        <NetworkTraffic

                            events={events}

                        />

                    </EnterpriseCard>

                </Col>

                <Col span={16}>

                    <EnterpriseCard

                        title="Live Event Stream"

                        height={360}

                    >

                        <LiveEventStream

                            events={events}

                        />

                    </EnterpriseCard>

                </Col>

                <Col span={24}>

                    <EnterpriseCard

                        title="Infrastructure Metrics"

                        height={320}

                    >

                        <SystemMetrics

                            events={events}

                        />

                    </EnterpriseCard>

                </Col>

            </Row>

        </div>

    );

}

