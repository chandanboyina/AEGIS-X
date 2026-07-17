import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";

const tactics = [

    "Initial Access",

    "Execution",

    "Persistence",

    "Privilege Esc.",

    "Defense Evasion",

    "Credential",

    "Discovery",

    "Lateral Move",

    "Impact"

];

const techniques = [

    {
        id:"T1190",
        name:"Exploit Public App"
    },

    {
        id:"T1078",
        name:"Valid Accounts"
    },

    {
        id:"T1059",
        name:"PowerShell"
    },

    {
        id:"T1110",
        name:"Brute Force"
    },

    {
        id:"T1021",
        name:"Remote Services"
    },

    {
        id:"T1046",
        name:"Network Discovery"
    },

    {
        id:"T1003",
        name:"Credential Dumping"
    },

    {
        id:"T1486",
        name:"Data Encryption"
    }

];

function random(min:number,max:number){

    return Math.floor(

        Math.random()*(max-min+1)

    )+min;

}

function generateHeatmap(){

    return techniques.map(t=>({

        ...t,

        cells:

            tactics.map(()=>({

                active:

                    Math.random()>.55,

                score:

                    random(10,100),

                incidents:

                    random(1,45),

                confidence:

                    random(82,99),

                updated:

                    new Date()

                    .toLocaleTimeString()

            }))

    }));

}

export default function MITREHeatmap(){

    const [

        matrix,

        setMatrix

    ]=useState(

        generateHeatmap()

    );

    useEffect(()=>{

        const timer=setInterval(()=>{

            setMatrix(

                generateHeatmap()

            );

        },3000);

        return()=>clearInterval(timer);

    },[]);

    function getColor(score:number){

        if(score>=85)

            return "#FF4D4F";

        if(score>=65)

            return "#FA8C16";

        if(score>=45)

            return "#FADB14";

        return "#00E676";

    }

    // ============================
    // PART 2 STARTS HERE
    // ============================
    return (

    <EnterpriseCard
        title="MITRE ATT&CK Heatmap"
        height={620}
    >

        <div
            style={{
                overflowX: "auto",
                overflowY: "hidden"
            }}
        >

            {/* HEADER */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:"190px repeat(9,1fr)",
                    gap: 8,
                    marginBottom: 10
                }}
            >

                <div />

                {

                    tactics.map(t => (

                        <div
                            key={t}
                            style={{

                                color: "#8EA9CC",

                                fontSize: 11,

                                textAlign: "center",

                                fontWeight: 600

                            }}
                        >

                            {t}

                        </div>

                    ))

                }

            </div>

            {/* MATRIX */}

            {

                matrix.map(row => (

                    <div

                        key={row.id}

                        style={{

                            display: "grid",

                            gridTemplateColumns:
                                "170px repeat(9,70px)",

                            gap: 8,

                            marginBottom: 8,

                            alignItems: "center"

                        }}

                    >

                        {/* Technique */}

                        <div>

                            <div
                                style={{
                                    color: "#FFF",
                                    fontWeight: 700,
                                    fontSize: 13
                                }}
                            >

                                {row.id}

                            </div>

                            <div
                                style={{
                                    color: "#8EA9CC",
                                    fontSize: 11
                                }}
                            >

                                {row.name}

                            </div>

                        </div>

                        {/* Cells */}

                        {

                            row.cells.map((cell:any,index:number)=>(

                                <Tooltip

                                    key={index}

                                    title={

                                        <div>

                                            <div>

                                                <b>{row.id}</b>

                                            </div>

                                            <div>

                                                {tactics[index]}

                                            </div>

                                            <hr/>

                                            <div>

                                                Threat Score :

                                                {" "}

                                                {cell.score}

                                            </div>

                                            <div>

                                                Incidents :

                                                {" "}

                                                {cell.incidents}

                                            </div>

                                            <div>

                                                AI Confidence :

                                                {" "}

                                                {cell.confidence}%

                                            </div>

                                            <div>

                                                Updated :

                                                {" "}

                                                {cell.updated}

                                            </div>

                                        </div>

                                    }

                                >

                                    <div

                                        style={{

                                            width: 58,

                                            height: 42,

                                            borderRadius: 6,

                                            background:

                                                cell.active

                                                ? getColor(cell.score)

                                                : "#20344D",

                                            display: "flex",

                                            alignItems: "center",

                                            justifyContent: "center",

                                            color: "#FFF",

                                            fontWeight: 700,

                                            cursor: "pointer",

                                            transition: ".35s",

                                            boxShadow:

                                                cell.active

                                                ? `0 0 10px ${getColor(cell.score)}55`

                                                : "none"

                                        }}

                                    >

                                        {

                                            cell.active

                                            ? cell.score

                                            : "-"

                                        }

                                    </div>

                                </Tooltip>

                            ))

                        }

                    </div>

                ))

            }

        </div>

        {/* =========================
             PART 3 STARTS HERE
        ========================== */}
                <div
            style={{
                marginTop: 22,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #263D57",
                paddingTop: 14
            }}
        >

            {/* Legend */}

            <div
                style={{
                    display: "flex",
                    gap: 18,
                    alignItems: "center",
                    flexWrap: "wrap"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6
                    }}
                >

                    <div
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: 4,
                            background: "#00E676"
                        }}
                    />

                    <span
                        style={{
                            color: "#AFC5DE",
                            fontSize: 12
                        }}
                    >
                        Low
                    </span>

                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6
                    }}
                >

                    <div
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: 4,
                            background: "#FADB14"
                        }}
                    />

                    <span
                        style={{
                            color: "#AFC5DE",
                            fontSize: 12
                        }}
                    >
                        Medium
                    </span>

                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6
                    }}
                >

                    <div
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: 4,
                            background: "#FA8C16"
                        }}
                    />

                    <span
                        style={{
                            color: "#AFC5DE",
                            fontSize: 12
                        }}
                    >
                        High
                    </span>

                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6
                    }}
                >

                    <div
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: 4,
                            background: "#FF4D4F"
                        }}
                    />

                    <span
                        style={{
                            color: "#AFC5DE",
                            fontSize: 12
                        }}
                    >
                        Critical
                    </span>

                </div>

            </div>

            {/* Live Status */}

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 18
                }}
            >

                <div
                    style={{
                        color: "#8EA9CC",
                        fontSize: 12
                    }}
                >

                    Active Techniques

                    <span
                        style={{
                            color: "#FFFFFF",
                            marginLeft: 6,
                            fontWeight: 700
                        }}
                    >

                        {

                            matrix.reduce(

                                (count, row) =>

                                    count +

                                    row.cells.filter(

                                        (c: any) => c.active

                                    ).length,

                                0

                            )

                        }

                    </span>

                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#00E676",
                        fontWeight: 700,
                        fontSize: 13
                    }}
                >

                    <div
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: "#00E676",
                            animation: "pulseHeatmap 1.4s infinite",
                            boxShadow: "0 0 10px #00E676"
                        }}
                    />

                    LIVE MATRIX

                </div>

            </div>

        </div>

        <style>

            {`

@keyframes pulseHeatmap{

0%{

transform:scale(.85);

opacity:.5;

}

50%{

transform:scale(1.35);

opacity:1;

}

100%{

transform:scale(.85);

opacity:.5;

}

}

`}

        </style>

    </EnterpriseCard>

);

}
