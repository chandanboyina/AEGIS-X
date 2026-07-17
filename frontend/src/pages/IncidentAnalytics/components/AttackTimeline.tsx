import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";
import ReactECharts from "echarts-for-react";
import { useEffect, useMemo, useState } from "react";

function randomValue(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min));
}

function generateTimeline() {

    const labels: string[] = [];

    const malware: number[] = [];
    const phishing: number[] = [];
    const lateral: number[] = [];

    for (let i = 11; i >= 0; i--) {

        const d = new Date(Date.now() - i * 60000);

        labels.push(

            d.toLocaleTimeString([], {

                hour: "2-digit",
                minute: "2-digit"

            })

        );

        malware.push(randomValue(8, 20));
        phishing.push(randomValue(4, 15));
        lateral.push(randomValue(2, 10));

    }

    return {

        labels,

        malware,

        phishing,

        lateral

    };

}

export default function AttackTimeline() {

    const [timeline, setTimeline] = useState(generateTimeline());

    useEffect(() => {

        const timer = setInterval(() => {

            setTimeline(old => {

                const labels = [...old.labels];
                const malware = [...old.malware];
                const phishing = [...old.phishing];
                const lateral = [...old.lateral];

                labels.shift();
                malware.shift();
                phishing.shift();
                lateral.shift();

                labels.push(

                    new Date().toLocaleTimeString([], {

                        hour: "2-digit",
                        minute: "2-digit"

                    })

                );

                malware.push(randomValue(8,20));
                phishing.push(randomValue(4,15));
                lateral.push(randomValue(2,10));

                return {

                    labels,
                    malware,
                    phishing,
                    lateral

                };

            });

        },2500);

        return ()=>clearInterval(timer);

    },[]);

    const option = useMemo(()=>({

        backgroundColor:"transparent",

        tooltip:{
            trigger:"axis",
            backgroundColor:"#132238",
            borderColor:"#315D86",
            textStyle:{
                color:"#FFF"
            }
        },

        legend:{
            top:0,
            textStyle:{
                color:"#AFC5DE"
            }
        },

        grid:{
            top:40,
            left:45,
            right:20,
            bottom:30
        },

        xAxis:{
            type:"category",
            boundaryGap:false,
            data:timeline.labels,
            axisLine:{
                lineStyle:{
                    color:"#35516D"
                }
            },
            axisLabel:{
                color:"#8EA9CC"
            }
        },

        yAxis:{
            type:"value",
            splitLine:{
                lineStyle:{
                    color:"#23384F"
                }
            },
            axisLabel:{
                color:"#8EA9CC"
            }
        },

        series:[

            {

                name:"Malware",

                type:"line",

                smooth:true,

                stack:"total",

                areaStyle:{},

                lineStyle:{
                    width:2
                },

                itemStyle:{
                    color:"#FF4D4F"
                },

                data:timeline.malware

            },

            {

                name:"Phishing",

                type:"line",

                smooth:true,

                stack:"total",

                areaStyle:{},

                lineStyle:{
                    width:2
                },

                itemStyle:{
                    color:"#FAAD14"
                },

                data:timeline.phishing

            },

            {

                name:"Lateral Movement",

                type:"line",

                smooth:true,

                stack:"total",

                areaStyle:{},

                lineStyle:{
                    width:2
                },

                itemStyle:{
                    color:"#40A9FF"
                },

                data:timeline.lateral

            }

        ]

    }),[timeline]);

    return(

        <EnterpriseCard
            title="Attack Timeline"
            height={520}
        >

            <ReactECharts

                option={option}

                style={{

                    width:"100%",

                    height:290

                }}

            />

        </EnterpriseCard>

    );

}