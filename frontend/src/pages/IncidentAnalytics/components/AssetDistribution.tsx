import { useEffect, useState } from "react";
import { Tag } from "antd";
import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

const assets = [
    "Government Cloud",
    "Power Grid",
    "Banking",
    "Healthcare",
    "Railways",
    "Telecom",
    "Manufacturing",
    "Data Center"
];

function random(min: number, max: number) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function generateAssets() {

    return assets.map(asset => ({

        asset,

        incidents: random(8, 140),

        risk: random(20, 98),

        confidence: random(88, 99)

    }));

}

function SegmentedBar({

    value,

    color

}: {

    value: number;

    color: string;

}) {

    const totalBlocks = 20;

    const activeBlocks = Math.round(value / 5);

    return (

        <div

            style={{

                display: "grid",

                gridTemplateColumns: "repeat(20,1fr)",

                gap: 1,

                marginTop: 10

            }}

        >

            {

                Array.from({

                    length: totalBlocks

                }).map((_, index) => (

                    <div

                        key={index}

                        style={{

                            height: 20,

                            borderRadius: 3,

                            background:

                                index < activeBlocks

                                    ? color

                                    : "#324760",

                            transition: "0.35s"

                        }}

                    />

                ))

            }

        </div>

    );

}

export default function AssetDistribution() {

    const [rows, setRows] = useState(generateAssets());

    useEffect(() => {

        const timer = setInterval(() => {

            setRows(generateAssets());

        }, 4000);

        return () => clearInterval(timer);

    }, []);

    return (

        <EnterpriseCard

            title="Asset Risk Distribution"

            height={1100}

        >

            <div

                style={{

                    display: "flex",

                    flexDirection: "column",

                    gap: 10

                }}

            >

                {

                    rows.map(item => {

                        let color = "#00E676";

                        if (item.risk > 80)

                            color = "#FF4D4F";

                        else if (item.risk > 60)

                            color = "#FA8C16";

                        else if (item.risk > 40)

                            color = "#FADB14";

                        return (

                            <div

                                key={item.asset}

                                style={{

                                    borderBottom: "1px solid #263D57",

                                    paddingBottom: 10

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

                                            {item.asset}

                                        </div>

                                        <div

                                            style={{

                                                color: "#8EA9CC",

                                                marginTop: 2,

                                                fontSize: 13

                                            }}

                                        >

                                            {item.incidents} Active Incidents

                                        </div>

                                    </div>

                                    <Tag

                                        color={color}

                                        style={{

                                            fontSize: 15,

                                            padding: "4px 12px"

                                        }}

                                    >

                                        {item.risk}% Risk

                                    </Tag>

                                </div>

                                <SegmentedBar

                                    value={item.risk}

                                    color={color}

                                />

                                <div

                                    style={{

                                        display: "flex",

                                        justifyContent: "space-between",

                                        alignItems: "center",

                                        marginTop: 12

                                    }}

                                >

                                    <span

                                        style={{

                                            color: "#8EA9CC",

                                            fontSize: 13

                                        }}

                                    >

                                        AI Confidence

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

                <span>

                    ● LIVE ASSET TELEMETRY

                </span>

                <span>

                    Updated {new Date().toLocaleTimeString()}

                </span>

            </div>

        </EnterpriseCard>

    );

}