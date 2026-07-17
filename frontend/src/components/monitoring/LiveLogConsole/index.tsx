import { useEffect, useRef, useState } from "react";
import { liveLogs } from "../../../data/liveLogs";

interface Props{
    events:any[];
}

export default function LiveLogConsole({events: _events}:Props){

    const [logs, setLogs] = useState<string[]>([]);

    const logRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        setLogs(liveLogs);

        const timer = setInterval(() => {

            const random =

                liveLogs[Math.floor(Math.random() * liveLogs.length)];

            const time =

                new Date().toLocaleTimeString();

            setLogs(old => [

                ...old,

                `${time}  ${random}`

            ].slice(-150));

        }, 900);

        return () => clearInterval(timer);

    }, []);

    useEffect(() => {

        if (logRef.current) {

            logRef.current.scrollTop =

                logRef.current.scrollHeight;

        }

    }, [logs]);

    return (

        <div

            ref={logRef}

            style={{

                height: "100%",

                overflowY: "auto",

                fontFamily: "Consolas",

                fontSize: 13,

                color: "#C7D3E0"

            }}

        >

            {

                logs.map((log, index) => {

                    let color = "#C7D3E0";

                    if (log.includes("MITRE"))

                        color = "#FFD166";

                    if (log.includes("PowerShell"))

                        color = "#FF5B5B";

                    if (log.includes("AI"))

                        color = "#00E676";

                    if (log.includes("SOAR"))

                        color = "#40A9FF";

                    return (

                        <div

                            key={index}

                            style={{

                                padding: "8px 0",

                                borderBottom: "1px solid #13253C",

                                color

                            }}

                        >

                            {log}

                        </div>

                    );

                })

            }

            <div

                style={{

                    color: "#00E676",

                    marginTop: 12,

                    animation: "blink 1s infinite"

                }}

            >

                █

            </div>

        </div>

    );

}