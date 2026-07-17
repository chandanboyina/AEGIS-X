import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";

export default function CountryHeatmap() {

    const [option, setOption] = useState<any>({});

    const generateData = () => [

        { name: "United States", value: Math.floor(Math.random() * 100) },
        { name: "China", value: Math.floor(Math.random() * 100) },
        { name: "Russia", value: Math.floor(Math.random() * 100) },
        { name: "India", value: Math.floor(Math.random() * 100) },
        { name: "Iran", value: Math.floor(Math.random() * 100) },
        { name: "North Korea", value: Math.floor(Math.random() * 100) },
        { name: "Germany", value: Math.floor(Math.random() * 100) },
        { name: "United Kingdom", value: Math.floor(Math.random() * 100) },
        { name: "Brazil", value: Math.floor(Math.random() * 100) },
        { name: "Australia", value: Math.floor(Math.random() * 100) }

    ];

    const buildChart = () => {

        setOption({

            backgroundColor: "transparent",

            tooltip: {

                trigger: "item",

                formatter: (p: any) =>
                    `${p.name}<br/>Threat Score : ${p.value ?? 0}`

            },

            visualMap: {

                min: 0,

                max: 100,

                left: "left",

                bottom: 10,

                text: ["High", "Low"],

                calculable: true,

                textStyle: {

                    color: "#D8E6F5"

                },

                inRange: {

                    color: [
                        "#19324A",
                        "#0F7BFF",
                        "#00E676",
                        "#FADB14",
                        "#FA8C16",
                        "#FF4D4F"
                    ]

                }

            },

            series: [

                {

                    type: "map",

                    map: "world",

                    roam: true,

                    zoom: 1.15,

                    emphasis: {

                        label: {

                            color: "#FFFFFF"

                        },

                        itemStyle: {

                            areaColor: "#00E676"

                        }

                    },

                    itemStyle: {

                        borderColor: "#34495E",

                        areaColor: "#16253B"

                    },

                    data: generateData()

                }

            ]

        });

    };

    useEffect(() => {

        buildChart();

        const timer = setInterval(buildChart, 5000);

        return () => clearInterval(timer);

    }, []);

    return (

        <EnterpriseCard
            title="Global Threat Heatmap"
            height={520}
        >

            <ReactECharts
                option={option}
                style={{
                    height: 430,
                    width: "100%"
                }}
            />

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 8,
                    color: "#8EA9CC",
                    fontSize: 12
                }}
            >

                <span>● LIVE GEO ANALYTICS</span>

                <span>
                    Updated {new Date().toLocaleTimeString()}
                </span>

            </div>

        </EnterpriseCard>

    );

}