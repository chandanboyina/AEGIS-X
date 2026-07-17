import { useEffect, useState } from "react";
import { Tag } from "antd";
import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

const sources = [

    "EDR",

    "SIEM",

    "Firewall",

    "IDS / IPS",

    "Threat Intel",

    "Email Security",

    "Cloud Logs",

    "Network Sensor"

];

function random(min: number, max: number) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function generateData() {

    return sources.map(source => ({

        source,

        detections: random(120, 1200),

        contribution: random(20, 100),

        confidence: random(86, 99)

    }));

}

function SegmentedBar({

    value,

    color

}: {

    value: number;

    color: string;

}) {

    const total = 20;

    const active = Math.round(value / 5);

    return (

        <div

            style={{

                display: "grid",

                gridTemplateColumns: "repeat(20,1fr)",

                gap: 1,

                marginTop: 8

            }}

        >

            {

                Array.from({

                    length: total

                }).map((_, i) => (

                    <div

                        key={i}

                        style={{

                            height: 12,

                            borderRadius: 1,

                            background:

                                i < active

                                    ? color

                                    : "#324760"

                        }}

                    />

                ))

            }

        </div>

    );

}

export default function DetectionSources() {

    const [rows, setRows] = useState(generateData());

    useEffect(() => {

        const timer = setInterval(() => {

            setRows(generateData());

        }, 4000);

        return () => clearInterval(timer);

    }, []);

    return (

        <EnterpriseCard

            title="Detection Sources"

            height={1100}

        >

            <div

                style={{

                    display: "flex",

                    flexDirection: "column",

                    gap: 18

                }}

            >

                {

                    rows.map(item => {

                        let color = "#00E676";

                        if (item.contribution > 80)

                            color = "#FF4D4F";

                        else if (item.contribution > 60)

                            color = "#FA8C16";

                        else if (item.contribution > 40)

                            color = "#FADB14";

                        return (

                            <div

                                key={item.source}

                                style={{

                                    borderBottom: "1px solid #263D57",

                                    paddingBottom: 14

                                }}

                            >

                                <div

                                    style={{

                                        display: "flex",

                                        justifyContent: "space-between",

                                        alignItems: "center"

                                    }}

                                >

                                    <div>

                                        <div

                                            style={{

                                                color: "#FFFFFF",

                                                fontWeight: 700,

                                                fontSize: 18

                                            }}

                                        >

                                            {item.source}

                                        </div>

                                        <div

                                            style={{

                                                color: "#8EA9CC",

                                                marginTop: 2,

                                                fontSize: 13

                                            }}

                                        >

                                            {item.detections.toLocaleString()} Events

                                        </div>

                                    </div>

                                    <Tag

                                        color={color}

                                        style={{

                                            fontSize: 15,

                                            padding: "4px 12px"

                                        }}

                                    >

                                        {item.contribution}% Share

                                    </Tag>

                                </div>

                                <SegmentedBar

                                    value={item.contribution}

                                    color={color}

                                />

                                <div

                                    style={{

                                        display: "flex",

                                        justifyContent: "space-between",

                                        alignItems: "center",

                                        marginTop: 10

                                    }}

                                >

                                    <span

                                        style={{

                                            color: "#8EA9CC",

                                            fontSize: 13

                                        }}

                                    >

                                        Detection Confidence

                                    </span>

                                    <span

                                        style={{

                                            color: "#FFFFFF",

                                            fontWeight: 700

                                        }}

                                    >

                                        {item.confidence}%

                                    </span>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

            <div

                style={{

                    display: "flex",

                    justifyContent: "space-between",

                    marginTop: 18,

                    color: "#8EA9CC",

                    fontSize: 12

                }}

            >

                <span

                    style={{

                        color: "#00E676",

                        fontWeight: 600

                    }}

                >

                    ● LIVE DETECTION PIPELINE

                </span>

                <span>

                    Updated {new Date().toLocaleTimeString()}

                </span>

            </div>

        </EnterpriseCard>

    );

}