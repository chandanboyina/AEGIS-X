import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

import {
    Progress,
    Tag,
    Divider,
    Badge
} from "antd";

import {
    RobotOutlined,
    ThunderboltOutlined,
    ApartmentOutlined,
    GlobalOutlined,
    DeploymentUnitOutlined,
    SafetyCertificateOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined
} from "@ant-design/icons";

import {
    useEffect,
    useState
} from "react";

type Props = {

    incident: any;

};

const timelineEvents = [

    "Oracle AI detected IOC",
    "Graph AI recalculated blast radius",
    "SOAR started containment",
    "PowerShell execution blocked",
    "Firewall updated",
    "User credentials disabled",
    "Playbook PB-010 executed",
    "Threat neutralized",
    "Endpoint isolated",
    "Behaviour AI detected lateral movement"

];

export default function IncidentDetails({

    incident

}: Props) {

    const [liveIncident, setLiveIncident] = useState<any>(incident);

    const [timeline, setTimeline] = useState<string[]>([]);

    useEffect(() => {

        setLiveIncident(incident);

    }, [incident]);

    useEffect(() => {

        if (!liveIncident) return;

        const timer = setInterval(() => {

            setLiveIncident((old: any) => {

                if (!old) return old;

                return {

                    ...old,

                    ai: Math.min(
                        99,
                        Math.max(
                            90,
                            old.ai + (Math.random() > .5 ? 1 : -1)
                        )
                    ),

                    blast: Math.min(
                        100,
                        Math.max(
                            20,
                            old.blast + (Math.random() > .5 ? 2 : -2)
                        )
                    ),

                    hosts: Math.max(
                        1,
                        old.hosts + (Math.random() > .5 ? 1 : -1)
                    ),

                    users: Math.max(
                        5,
                        old.users + (Math.random() > .5 ? 2 : -2)
                    )

                };

            });

        }, 1200);

        return () => clearInterval(timer);

    }, [liveIncident?.key]);

    useEffect(() => {

        if (!liveIncident) return;

        const timer = setInterval(() => {

            setTimeline(old => {

                const event =

                    new Date().toLocaleTimeString()

                    + " • "

                    +

                    timelineEvents[

                    Math.floor(

                        Math.random()

                        *

                        timelineEvents.length

                    )

                    ];

                return [

                    event,

                    ...old

                ].slice(0,6);

            });

        },2000);

        return ()=>clearInterval(timer);

    },[liveIncident?.key]);

    if(!liveIncident){

        return(

            <EnterpriseCard
                title="AI Investigation Panel"
                height={620}
            >

                <div
                    style={{

                        height:"100%",

                        display:"flex",

                        justifyContent:"center",

                        alignItems:"center",

                        color:"#9FB4CC",

                        fontSize:16

                    }}
                >

                    Select an incident from the queue

                </div>

            </EnterpriseCard>

        );

    }

    return (

        <EnterpriseCard
            title="AI Investigation Panel"
            height={850}
        >

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                }}
            >

                {/* HEADER */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start"
                    }}
                >

                    <div>

                        <div
                            style={{
                                color: "#8EA9CC",
                                fontSize: 13
                            }}
                        >
                            Incident
                        </div>

                        <div
                            style={{
                                color: "#FFFFFF",
                                fontSize: 30,
                                fontWeight: 700,
                                marginTop: 2
                            }}
                        >
                            {liveIncident.incident}
                        </div>

                    </div>

                    <div
                        style={{
                            textAlign: "right"
                        }}
                    >

                        <Tag color={liveIncident.severity.color}>
                            {liveIncident.severity.text}
                        </Tag>

                        <div
                            style={{
                                marginTop: 10,
                                color: "#00E676",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                justifyContent: "flex-end",
                                fontWeight: 600
                            }}
                        >

                            <Badge status="processing" />

                            LIVE

                        </div>

                    </div>

                </div>

                <Divider />

                {/* SUMMARY GRID */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        rowGap: 18,
                        columnGap: 20
                    }}
                >

                    <div>

                        <RobotOutlined
                            style={{
                                color: "#40A9FF"
                            }}
                        />

                        <div
                            style={{
                                color: "#8EA9CC",
                                marginTop: 10
                            }}
                        >
                            AI Verdict
                        </div>

                        <div
                            style={{
                                color: "#FFF",
                                fontWeight: 700,
                                marginTop:5
                            }}
                        >
                            {liveIncident.verdict}
                        </div>

                    </div>

                    <div>

                        <ThunderboltOutlined
                            style={{
                                color: "#FFD54F",
                                
                            }}
                        />

                        <div
                            style={{
                                color: "#8EA9CC",
                                marginTop: 10
                            }}
                        >
                            MITRE
                        </div>

                        <div
                            style={{
                                color: "#FFF",
                                fontWeight: 700,
                                marginTop:5
                            }}
                        >
                            {liveIncident.mitre}
                        </div>

                    </div>

                    <div>

                        <ApartmentOutlined
                            style={{
                                color: "#40A9FF"
                            }}
                        />

                        <div
                            style={{
                                color: "#8EA9CC",
                                marginTop: 10
                            }}
                        >
                            Asset
                        </div>

                        <div
                            style={{
                                color: "#FFF",
                                fontWeight: 700,
                                marginTop:5
                            }}
                        >
                            {liveIncident.asset}
                        </div>

                    </div>

                    <div>

                        <GlobalOutlined
                            style={{
                                color: "#40A9FF"
                            }}
                        />

                        <div
                            style={{
                                color: "#8EA9CC",
                                marginTop: 10
                            }}
                        >
                            Origin
                        </div>

                        <div
                            style={{
                                color: "#FFF",
                                fontWeight: 700,
                                marginTop:5
                            }}
                        >
                            {liveIncident.country}
                        </div>

                    </div>

                    <div>

                        <DeploymentUnitOutlined
                            style={{
                                color: "#40A9FF"
                            }}
                        />

                        <div
                            style={{
                                color: "#8EA9CC",
                                marginTop: 10
                            }}
                        >
                            Hosts
                        </div>

                        <div
                            style={{
                                color: "#FFF",
                                fontWeight: 700,
                                marginTop:5
                            }}
                        >
                            {liveIncident.hosts}
                        </div>

                    </div>

                    <div>

                        <SafetyCertificateOutlined
                            style={{
                                color: "#40A9FF"
                            }}
                        />

                        <div
                            style={{
                                color: "#8EA9CC",
                                marginTop: 10
                            }}
                        >
                            Users
                        </div>

                        <div
                            style={{
                                color: "#FFF",
                                fontWeight: 700,
                                marginTop:5
                            }}
                        >
                            {liveIncident.users}
                        </div>

                    </div>

                </div>

                <Divider />

                {/* AI CONFIDENCE */}

                <div
                    style={{
                        color: "#8EA9CC",
                        marginBottom: 8
                    }}
                >
                    AI Confidence
                </div>

                <Progress
                    percent={liveIncident.ai}
                    strokeColor="#00E676"
                />

                <div
                    style={{
                        color: "#8EA9CC",
                        marginTop: 16,
                        marginBottom: 8
                    }}
                >
                    Graph AI Blast Radius
                </div>

                <Progress
                    percent={liveIncident.blast}
                    strokeColor="#FAAD14"
                />

                <Divider />

                {/* PLAYBOOK */}

                <div
                    style={{
                        color: "#8EA9CC"
                    }}
                >
                    Recommended Playbook
                </div>

                <Tag
                    color="blue"
                    style={{
                        marginTop: 10,
                        fontSize: 13
                    }}
                >
                    {liveIncident.playbook}
                </Tag>

                <Divider />

                <div
                    style={{
                        color: "#8EA9CC"
                    }}
                >
                    Oracle AI Recommendation
                </div>

                <div
                    style={{
                        marginTop: 12,
                        color: "#FFFFFF",
                        lineHeight: 2
                    }}
                >

                    <div>

                        <CheckCircleOutlined
                            style={{
                                color: "#00E676",
                                marginRight: 8
                            }}
                        />

                        {liveIncident.recommendation}

                    </div>

                    <div>

                        <CheckCircleOutlined
                            style={{
                                color: "#00E676",
                                marginRight: 8
                            }}
                        />

                        Monitor lateral movement

                    </div>

                    <div>

                        <CheckCircleOutlined
                            style={{
                                color: "#00E676",
                                marginRight: 8
                            }}
                        />

                        Notify SOC Team

                    </div>

                </div>

                <Divider />

                {/* LIVE TIMELINE */}

                <div
                    style={{
                        color: "#8EA9CC",
                        marginBottom: 10
                    }}
                >

                    <ClockCircleOutlined
                        style={{
                            marginRight: 8
                        }}
                    />

                    Live Investigation Timeline

                </div>

                <div
                    style={{
                        flex: 1,
                        overflowY: "auto"
                    }}
                >

                    {

                        timeline.map((item,index)=>(

                            <div
                                key={index}
                                style={{
                                    color:"#DCE8F4",
                                    padding:"6px 0",
                                    borderBottom:"1px solid #24384E",
                                    fontSize:13
                                }}
                            >

                                {item}

                            </div>

                        ))

                    }

                </div>

            </div>

        </EnterpriseCard>

    );
    }