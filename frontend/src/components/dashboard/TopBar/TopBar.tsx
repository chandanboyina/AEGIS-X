import { Space, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;

export default function TopBar() {

    const [visible, setVisible] = useState(true);

    useEffect(() => {

        const timer = setInterval(() => {

            setVisible(v => !v);

        }, 800);

        return () => clearInterval(timer);

    }, []);

    const [time, setTime] = useState("");

    useEffect(() => {

        const timer = setInterval(() => {

            setTime(

                new Date().toLocaleTimeString()

            );

        },1000);

        return ()=>clearInterval(timer);

    },[]);

    return (

        <Space
            style={{
                width: "100%",
                justifyContent: "space-between"
            }}
        >

            <Title
                level={3}
                style={{
                    color: "white",
                    margin: 0
                }}
            >

                AEGIS-X Enterprise SOC

            </Title>

            <div
                style={{

                    display: "flex",

                    alignItems: "center",

                    gap: 24,

                    color: "white",

                    fontWeight: 600

                }}
            >

                <div
                    style={{

                        color: "#8FA5C4",

                        fontSize: 14

                    }}
                >

                    {time}

                </div>

                <div
                    style={{

                        display: "flex",

                        alignItems: "center",

                        gap: 10

                    }}
                >

                    <div
                        style={{

                            width: 10,

                            height: 10,

                            borderRadius: "50%",

                            background: visible
                                ? "#00E676"
                                : "#1B5E20",

                            boxShadow: visible
                                ? "0 0 12px #00E676"
                                : "none",

                            transition: "0.3s"

                        }}
                    />

                    LIVE

                </div>

            </div>

        </Space>

    );

}