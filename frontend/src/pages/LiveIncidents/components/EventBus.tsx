import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";
import { useEffect, useState } from "react";

const events = [
    "Sysmon → PowerShell execution detected",
    "Firewall → Malicious IP blocked",
    "CrowdStrike → Endpoint isolated",
    "Oracle AI → Credential abuse detected",
    "Behaviour AI → Lateral movement predicted",
    "Threat Intelligence → IOC matched",
    "Digital Twin → Risk score updated",
    "Graph AI → Blast radius recalculated",
    "SOAR → Playbook PB-010 executed",
    "Enterprise Brain → Similar incident found"
];

export default function EventBus(){

    const [feed,setFeed]=useState(events);

    useEffect(()=>{

        const timer=setInterval(()=>{

            const shuffled=[...events]
                .sort(()=>Math.random()-0.5);

            setFeed(shuffled);

        },2500);

        return()=>clearInterval(timer);

    },[]);

    return(

        <EnterpriseCard
            title="Enterprise Event Bus"
            height={400}
        >

            <div
                style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:12
                }}
            >

                {

                    feed.map((item,index)=>(

                        <div
                            key={index}
                            style={{
                                display:"flex",
                                justifyContent:"space-between",
                                borderBottom:"1px solid #243C58",
                                paddingBottom:8
                            }}
                        >

                            <span
                                style={{
                                    color:"#D7E6F5"
                                }}
                            >
                                {item}
                            </span>

                            <span
                                style={{
                                    color:"#40A9FF",
                                    fontSize:12
                                }}
                            >
                                {new Date().toLocaleTimeString()}
                            </span>

                        </div>

                    ))

                }

            </div>

        </EnterpriseCard>

    );

}