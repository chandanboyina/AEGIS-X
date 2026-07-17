import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";
import ReactECharts from "echarts-for-react";
import { useEffect, useMemo, useState } from "react";

function generateData() {

    const now = new Date();

    const labels: string[] = [];

    const values: number[] = [];

    for (let i = 11; i >= 0; i--) {

        const d = new Date(now.getTime() - i * 60000);

        labels.push(

            d.toLocaleTimeString([], {

                hour: "2-digit",
                minute: "2-digit"

            })

        );

        values.push(

            40 +

            Math.floor(Math.random() * 60)

        );

    }

    return {

        labels,

        values

    };

}

export default function IncidentTrend() {

    const [chartData, setChartData] = useState(

        generateData()

    );

    useEffect(() => {

        const timer = setInterval(() => {

            setChartData(old => {

                const labels = [...old.labels];

                const values = [...old.values];

                labels.shift();

                values.shift();

                labels.push(

                    new Date().toLocaleTimeString([], {

                        hour: "2-digit",
                        minute: "2-digit"

                    })

                );

                const previous =

                    values[values.length - 1];

                const next =

                    Math.max(

                        25,

                        Math.min(

                            120,

                            previous +

                            Math.floor(Math.random() * 15) - 7

                        )

                    );

                values.push(next);

                return {

                    labels,

                    values

                };

            });

        }, 2500);

        return () => clearInterval(timer);

    }, []);

    const option = useMemo(() => ({

        backgroundColor: "transparent",

        animationDuration: 1200,

        tooltip: {

            trigger: "axis",

            backgroundColor: "#132238",

            borderColor: "#2E5C86",

            textStyle: {

                color: "#FFFFFF"

            }

        },

        grid: {

            top: 30,

            left: 45,

            right: 20,

            bottom: 35

        },

        xAxis: {

            type: "category",

            boundaryGap: false,

            data: chartData.labels,

            axisLine: {

                lineStyle: {

                    color: "#35516D"

                }

            },

            axisLabel: {

                color: "#8EA9CC"

            }

        },

        yAxis: {

            type: "value",

            splitLine: {

                lineStyle: {

                    color: "#23384F"

                }

            },

            axisLabel: {

                color: "#8EA9CC"

            }

        },

        series: [

            {

                name: "Incidents",

                type: "line",

                smooth: true,

                symbol: "circle",

                symbolSize: 7,

                lineStyle: {

                    width: 3,

                    color: "#40A9FF"

                },

                areaStyle: {

                    color: {

                        type: "linear",

                        x: 0,

                        y: 0,

                        x2: 0,

                        y2: 1,

                        colorStops: [

                            {

                                offset: 0,

                                color: "rgba(64,169,255,.45)"

                            },

                            {

                                offset: 1,

                                color: "rgba(64,169,255,0)"

                            }

                        ]

                    }

                },

                itemStyle: {

                    color: "#40A9FF",

                    borderColor: "#FFFFFF",

                    borderWidth: 2

                },

                data: chartData.values

            }

        ]

    }), [chartData]);

    // ===========================
    // PART 2 STARTS HERE
    // ===========================
    const current =
    chartData.values[
        chartData.values.length - 1
    ];

const peak =
    Math.max(...chartData.values);

const average =
    Math.round(

        chartData.values.reduce(

            (a, b) => a + b,

            0

        ) / chartData.values.length

    );

return (

    <EnterpriseCard
        title="Incident Trend"
        height={450}
    >

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%"
            }}
        >

            {/* TOP KPI */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 18
                }}
            >

                <div>

                    <div
                        style={{
                            color: "#8EA9CC",
                            fontSize: 13
                        }}
                    >
                        Current
                    </div>

                    <div
                        style={{
                            color: "#40A9FF",
                            fontSize: 28,
                            fontWeight: 700
                        }}
                    >
                        {current}
                    </div>

                </div>

                <div>

                    <div
                        style={{
                            color: "#8EA9CC",
                            fontSize: 13
                        }}
                    >
                        Peak
                    </div>

                    <div
                        style={{
                            color: "#FF9800",
                            fontSize: 28,
                            fontWeight: 700
                        }}
                    >
                        {peak}
                    </div>

                </div>

                <div>

                    <div
                        style={{
                            color: "#8EA9CC",
                            fontSize: 13
                        }}
                    >
                        Average
                    </div>

                    <div
                        style={{
                            color: "#00E676",
                            fontSize: 28,
                            fontWeight: 700
                        }}
                    >
                        {average}
                    </div>

                </div>

            </div>

            {/* CHART */}

            <div
                style={{
                    flex: 1
                }}
            >

                <ReactECharts

                    option={option}

                    style={{

                        width: "100%",

                        height: "100%"

                    }}

                />

            </div>

            {/* LIVE STATUS */}

            <div
                style={{
                    marginTop: 10,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#00E676",
                        fontWeight: 600,
                        fontSize: 13
                    }}
                >

                    <div
                        style={{
                            width: 9,
                            height: 9,
                            borderRadius: "50%",
                            background: "#00E676",
                            boxShadow: "0 0 10px #00E676",
                            animation: "pulse 1.2s infinite"
                        }}
                    />

                    LIVE ANALYTICS

                </div>

                <div
                    style={{
                        color: "#8EA9CC",
                        fontSize: 12
                    }}
                >

                    Last Updated

                    {" "}

                    {new Date().toLocaleTimeString()}

                </div>

            </div>

            <style>

                {`

@keyframes pulse{

0%{

transform:scale(.9);

opacity:.5;

}

50%{

transform:scale(1.3);

opacity:1;

}

100%{

transform:scale(.9);

opacity:.5;

}

}

`}

            </style>

        </div>

    </EnterpriseCard>

);

}