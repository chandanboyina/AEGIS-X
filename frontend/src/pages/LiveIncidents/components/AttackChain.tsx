import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";
import { CheckCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";

const stages = [
    "Recon",
    "Initial Access",
    "Execution",
    "Persistence",
    "Lateral",
    "Impact"
];

export default function AttackChain() {

    const [currentStage, setCurrentStage] = useState(0);

    const [contained, setContained] = useState(false);

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentStage(old => {

                if (old >= stages.length - 1) {

                    setContained(true);

                    return stages.length - 1;

                }

                return old + 1;

            });

        }, 3500);

        return () => clearInterval(timer);

    }, []);

    return (

        <EnterpriseCard
            title="Live Attack Progression"
            height={350}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 50,
                    padding: "0 10px"
                }}
            >

                {

                    stages.map((stage, index) => {

                        let color = "#324B65";

                        if (index < currentStage)
                            color = "#00E676";

                        if (index === currentStage)
                            color = "#FF9800";

                        return (

                            <div
                                key={stage}
                                style={{
                                    flex: 1,
                                    textAlign: "center",
                                    position: "relative"
                                }}
                            >

                                {

                                    index !== stages.length - 1 && (

                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 16,
                                                left: "55%",
                                                width: "90%",
                                                height: 2,
                                                background:
                                                    index < currentStage
                                                        ? "#00E676"
                                                        : "#324B65"
                                            }}
                                        />

                                    )

                                }

                                <div
                                    style={{
                                        width: 34,
                                        height: 34,
                                        borderRadius: "50%",
                                        margin: "auto",
                                        background: color,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        transition: "0.5s",
                                        boxShadow:
                                            index === currentStage
                                                ? "0 0 18px #FF9800"
                                                : "none"
                                    }}
                                >

                                    {

                                        index < currentStage ?

                                            <CheckCircleFilled
                                                style={{
                                                    color: "white"
                                                }}
                                            />

                                            :

                                            <div
                                                style={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: "50%",
                                                    background: "white"
                                                }}
                                            />

                                    }

                                </div>

                                <div
                                    style={{
                                        marginTop: 12,
                                        color:
                                            index <= currentStage
                                                ? "#FFFFFF"
                                                : "#8EA9CC",
                                        fontSize: 12,
                                        fontWeight: 600
                                    }}
                                >

                                    {stage}

                                </div>

                            </div>

                        );

                    })

                }

            </div>

            <div
                style={{
                    marginTop: 35,
                    textAlign: "center"
                }}
            >

                {

                    contained ?

                        <div
                            style={{
                                color: "#00E676",
                                fontWeight: 700,
                                fontSize: 16
                            }}
                        >

                            ✔ Threat Contained by SOAR

                        </div>

                        :

                        <div
                            style={{
                                color: "#FF9800",
                                fontWeight: 700
                            }}
                        >

                            AI Tracking Attack Progression...

                        </div>

                }

            </div>

        </EnterpriseCard>

    );

}