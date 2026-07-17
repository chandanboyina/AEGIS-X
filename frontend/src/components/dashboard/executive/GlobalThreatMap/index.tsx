import ReactECharts from "echarts-for-react";
import { useEffect, useMemo, useState } from "react";
import { attackPool } from "../../../../data/worldAttackPool";

export default function GlobalThreatMap() {

    const [lines, setLines] = useState(
        attackPool.slice(0, 8)
    );

    useEffect(() => {

        const timer = setInterval(() => {

            setLines(old => {

                const updated = [...old];

                const random =
                    attackPool[
                    Math.floor(Math.random() * attackPool.length)
                    ];

                const index =
                    Math.floor(Math.random() * updated.length);

                updated[index] = random;

                return updated;

            });

        }, 1500);

        return () => clearInterval(timer);

    }, []);

    const option = useMemo(() => ({

        backgroundColor: "#16253B",

        animationDurationUpdate: 800,

        tooltip: {

            trigger: "item",

            backgroundColor: "#0F172A",

            borderColor: "#1E90FF",

            borderWidth: 1,

            textStyle: {

                color: "#EAF4FF"

            },

            formatter: (params: any) => {

                const attack = lines[params.dataIndex];

                if (!attack)
                    return "";

                return `

<div style="padding:8px">

<b style="color:#4FC3F7">Origin</b><br/>

${attack.fromName}

<br/><br/>

<b style="color:#00E676">Target</b><br/>

${attack.toName}

<br/><br/>

<b>Severity</b> : ${attack.severity}

<br/>

<b>MITRE</b> : ${attack.technique}

<br/>

<b>Protocol</b> : ${attack.protocol}

<br/>

<b>Asset</b> : ${attack.asset}

</div>

`;

            }

        },

        geo: {

            map: "world",

            roam: false,

            zoom: 1.15,

            itemStyle: {

                areaColor: "#1D314B",

                borderColor: "#3B5B78"

            },

            emphasis: {

                itemStyle: {

                    areaColor: "#355D87"

                }

            }

        },

        series: [

            //------------------------------------------------
            // Animated Lines
            //------------------------------------------------

            {

                type: "lines",

                coordinateSystem: "geo",

                zlevel: 2,

                effect: {

                    show: true,

                    constantSpeed: 70,

                    trailLength: 0.55,

                    symbol: "arrow",

                    symbolSize: 6

                },

                lineStyle: {

                    width: 2,

                    opacity: 0.9,

                    curveness: 0.35,

                    color: (params: any) => {

                        const severity =
                            lines[params.dataIndex].severity;

                        switch (severity) {

                            case "critical":
                                return "#FF3B30";

                            case "high":
                                return "#FF9800";

                            case "medium":
                                return "#FFD54F";

                            case "low":
                                return "#00E676";

                            default:
                                return "#4FC3F7";

                        }

                    }

                },

                data:

                    lines.map(line => ({

                        coords: line.coords

                    }))

            },

            //------------------------------------------------
            // Source countries
            //------------------------------------------------

            {

                type: "effectScatter",

                coordinateSystem: "geo",

                rippleEffect: {

                    brushType: "stroke"

                },

                symbolSize: 9,

                itemStyle: {

                    color: "#FF4D4F"

                },

                label: {

                    show: true,

                    formatter: "{b}",

                    color: "#EAF4FF",

                    fontSize: 11,

                    position: "right"

                },

                data:

                    lines.map(line => ({

                        name: line.fromName,

                        value: line.coords[0]

                    }))

            },

            //------------------------------------------------
            // Destination countries
            //------------------------------------------------

            {

                type: "scatter",

                coordinateSystem: "geo",

                symbolSize: 7,

                itemStyle: {

                    color: "#00E676"

                },

                label: {

                    show: false

                },

                data:

                    lines.map(line => ({

                        name: line.toName,

                        value: line.coords[1]

                    }))

            },

            //------------------------------------------------
            // India
            //------------------------------------------------

            {

                type: "effectScatter",

                coordinateSystem: "geo",

                symbolSize: 22,

                rippleEffect: {

                    scale: 8,

                    period: 3,

                    brushType: "stroke"

                },

                itemStyle: {

                    color: "#00E5FF"

                },

                label: {

                    show: true,

                    formatter: "INDIA",

                    position: "bottom",

                    color: "#00E5FF",

                    fontSize: 14,

                    fontWeight: "bold"

                },

                data: [

                    {

                        name: "India",

                        value: [77.2090, 28.6139]

                    }

                ]

            }

        ]

    }), [lines]);

    return (

        <ReactECharts

            option={option}

            style={{

                height: "100%",

                width: "100%"

            }}

            notMerge={false}

            replaceMerge={["series"]}

            lazyUpdate={true}

        />

    );

}