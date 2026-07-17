import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";
import {
    Table,
    Tag,
    Progress,
    Badge
} from "antd";

import { useEffect, useState } from "react";


type Props = {

    selectedIncident: any | null;

    setSelectedIncident: React.Dispatch<React.SetStateAction<any>>;

};

const severities = [

    {
        text: "Critical",
        color: "red"
    },

    {
        text: "High",
        color: "orange"
    },

    {
        text: "Medium",
        color: "gold"
    },

    {
        text: "Low",
        color: "green"
    }

];

const statuses = [

    "Investigating",

    "Contained",

    "Mitigating",

    "Escalated",

    "Monitoring"

];

const owners = [

    "Oracle AI",

    "SOAR",

    "SOC L1",

    "SOC L2"

];

const assets = [

    "Government Cloud",

    "Power Grid",

    "Banking",

    "Healthcare",

    "Railways",

    "Telecom"

];

const mitre = [

    "T1190",

    "T1078",

    "T1059",

    "T1021",

    "T1046",

    "T1110"

];

const countries = [

    "China",

    "Russia",

    "Iran",

    "North Korea",

    "Pakistan",

    "Unknown"

];

const playbooks = [

    "PB-010 Aggressive",

    "PB-021 Hunt",

    "PB-006 Isolation",

    "PB-008 Containment"

];

const verdicts = [

    "Credential Abuse",

    "PowerShell Execution",

    "Lateral Movement",

    "Remote Code Execution",

    "Privilege Escalation"

];

const recommendations = [

    "Isolate Endpoint Immediately",

    "Execute PB-010 Playbook",

    "Block External IP",

    "Reset User Credentials",

    "Contain Affected Hosts"

];

function randomItem(arr: any[]) {

    return arr[Math.floor(Math.random() * arr.length)];

}

function createIncident(id: number) {

    const sev = randomItem(severities);

    return {

        key: id,

        incident: "INC-" + (10000 + id),

        severity: sev,

        asset: randomItem(assets),

        mitre: randomItem(mitre),

        ai: 90 + Math.floor(Math.random() * 10),

        status: randomItem(statuses),

        owner: randomItem(owners),

        time: new Date().toLocaleTimeString(),

        country: randomItem(countries),

        hosts: 8 + Math.floor(Math.random() * 25),

        users: 20 + Math.floor(Math.random() * 180),

        blast: 30 + Math.floor(Math.random() * 60),

        playbook: randomItem(playbooks),

        verdict: randomItem(verdicts),

        recommendation: randomItem(recommendations)

    };

}

export default function IncidentTable({

    selectedIncident,

    setSelectedIncident

}: Props) {

    const [rows, setRows] = useState<any[]>([]);

    const [latestIncident, setLatestIncident] = useState<number | null>(null);

    useEffect(() => {

        const initial: any[] = [];

        for (let i = 0; i < 12; i++) {

            initial.push(createIncident(i + 1));

        }

        setRows(initial);

        setSelectedIncident(initial[0]);

    }, []);

    useEffect(() => {

        const timer = setInterval(() => {

            setRows(old => {

                const updated = [...old];

                const newIncident = createIncident(Date.now());

                updated.unshift(newIncident);

                updated.pop();

                setLatestIncident(newIncident.key);

                return updated;

            });

        }, 4000);

        return () => clearInterval(timer);

    }, []);

    useEffect(() => {

        if (latestIncident == null) return;

        const timer = setTimeout(() => {

            setLatestIncident(null);

        }, 2500);

        return () => clearTimeout(timer);

    }, [latestIncident]);

    // ===== PART 2 STARTS FROM HERE =====

    const columns = [

        {
            title: "",
            width: 40,
            render: () => (
                <Badge status="processing" />
            )
        },

        {
            title: "Incident",
            dataIndex: "incident",
            width: 130,
            render: (value: string) => (
                <span
                    style={{
                        color: "#FFFFFF",
                        fontWeight: 700
                    }}
                >
                    {value}
                </span>
            )
        },

        {
            title: "Severity",
            dataIndex: "severity",
            width: 110,
            render: (value: any) => (
                <Tag color={value.color}>
                    {value.text}
                </Tag>
            )
        },

        {
            title: "Asset",
            dataIndex: "asset",
            width: 150
        },

        {
            title: "MITRE",
            dataIndex: "mitre",
            width: 90
        },

        {
            title: "AI",
            dataIndex: "ai",
            width: 150,
            render: (value: number) => (

                <Progress

                    percent={value}

                    showInfo={false}

                    size="small"

                    strokeColor="#00E676"

                />

            )
        },

        {
            title: "Status",
            dataIndex: "status",
            width: 130,
            render: (value: string) => {

                let color = "#1677FF";

                if (value === "Contained")
                    color = "#00E676";

                if (value === "Escalated")
                    color = "#FF4D4F";

                if (value === "Mitigating")
                    color = "#FAAD14";

                return (

                    <Tag color={color}>

                        {value}

                    </Tag>

                );

            }
        },

        {
            title: "Owner",
            dataIndex: "owner",
            width: 120
        },

        {
            title: "Time",
            dataIndex: "time",
            width: 110
        }

    ];

    return (

        <EnterpriseCard
            title="Live Incident Queue"
            height={700}
        >

            <Table

                columns={columns}

                dataSource={rows}

                pagination={false}

                size="middle"

                scroll={{

                    x: 1100,

                    y: 470

                }}

                onRow={(record) => ({

                    onClick: () => {

                        setSelectedIncident(record);

                    }

                })}

                rowClassName={(record) => {

                    if (latestIncident === record.key)
                        return "latestIncident";

                    if (selectedIncident?.key === record.key)
                        return "selectedIncident";

                    return "";

                }}

            />

            <style>

                {`

.ant-table{

background:#16253B !important;

}

.ant-table-container{

border:none !important;

}

.ant-table-thead>tr>th{

background:#1A2C44 !important;

color:#EAF4FF !important;

font-size:13px;

font-weight:700;

border-bottom:none !important;

}

.ant-table-tbody>tr>td{

background:#16253B !important;

color:#DCE8F4 !important;

border-bottom:1px solid #263D57 !important;

transition:0.3s;

}

.ant-table-tbody>tr:hover>td{

background:#20344D !important;

cursor:pointer;

}

.selectedIncident td{

background:#24496C !important;

}

.latestIncident td{

animation:newIncidentGlow 2.5s ease;

}

@keyframes newIncidentGlow{

0%{

background:#00E67655;

}

100%{

background:#16253B;

}

}

.ant-progress-inner{

background:#31485E !important;

}

.ant-tag{

font-weight:600;

}

`}

            </style>

        </EnterpriseCard>

    );

}