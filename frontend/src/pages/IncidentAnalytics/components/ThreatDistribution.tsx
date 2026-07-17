import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";
import ReactECharts from "echarts-for-react";
import { useEffect, useMemo, useState } from "react";

function generateData() {

    return [

        {
            name: "Critical",
            value: 10 + Math.floor(Math.random() * 8)
        },

        {
            name: "High",
            value: 20 + Math.floor(Math.random() * 10)
        },

        {
            name: "Medium",
            value: 28 + Math.floor(Math.random() * 15)
        },

        {
            name: "Low",
            value: 18 + Math.floor(Math.random() * 12)
        }

    ];

}

export default function ThreatDistribution() {

    const [data, setData] = useState(generateData());

    useEffect(() => {

        const timer = setInterval(() => {

            setData(generateData());

        }, 3000);

        return () => clearInterval(timer);

    }, []);

    const total = data.reduce(

        (sum, item) => sum + item.value,

        0

    );

    const option = useMemo(() => ({

        backgroundColor: "transparent",

        tooltip: {

            trigger: "item",

            backgroundColor: "#132238",

            borderColor: "#305D88",

            textStyle: {

                color: "#FFF"

            }

        },

        legend: {

            bottom: 0,

            textStyle: {

                color: "#AFC5DE"

            }

        },

        series: [

            {

                type: "pie",

                radius: [

                    "58%",

                    "78%"

                ],

                avoidLabelOverlap: false,

                itemStyle: {

                    borderColor: "#16253B",

                    borderWidth: 3

                },

                label: {

                    show: false

                },

                emphasis: {

                    scale: true,

                    scaleSize: 8

                },

                data: [

                    {

                        value: data[0].value,

                        name: "Critical",

                        itemStyle: {

                            color: "#FF4D4F"

                        }

                    },

                    {

                        value: data[1].value,

                        name: "High",

                        itemStyle: {

                            color: "#FA8C16"

                        }

                    },

                    {

                        value: data[2].value,

                        name: "Medium",

                        itemStyle: {

                            color: "#FFD666"

                        }

                    },

                    {

                        value: data[3].value,

                        name: "Low",

                        itemStyle: {

                            color: "#00E676"

                        }

                    }

                ]

            }

        ]

    }), [data]);

    return (

        <EnterpriseCard
            title="Threat Distribution"
            height={450}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 15
                }}
            >

                <div>

                    <div
                        style={{
                            color: "#8EA9CC",
                            fontSize: 13
                        }}
                    >
                        Total Threats
                    </div>

                    <div
                        style={{
                            color: "#FFF",
                            fontSize: 28,
                            fontWeight: 700
                        }}
                    >
                        {total}
                    </div>

                </div>

                <div
                    style={{
                        color: "#00E676",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                    }}
                >

                    <div
                        style={{
                            width: 9,
                            height: 9,
                            borderRadius: "50%",
                            background: "#00E676",
                            boxShadow: "0 0 10px #00E676"
                        }}
                    />

                    LIVE

                </div>

            </div>

            <ReactECharts

                option={option}

                style={{

                    width: "100%",

                    height: 250

                }}

            />

        </EnterpriseCard>

    );

}