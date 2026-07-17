import { templates } from "../data/liveData";

export function generateEvent(){

    const sample =
        templates[
            Math.floor(
                Math.random() * templates.length
            )
        ];

    return{

        id:Date.now(),

        time:new Date().toLocaleTimeString("en-US",{hour12:false}),

        rawLog:sample.rawLog,

        event:sample.event,

        severity:sample.severity,

        mitre:sample.mitre,

        asset:sample.asset,

        source:sample.source,

        destination:sample.destination,

        protocol:sample.protocol,


        srcPort:sample.srcPort,

        dstPort:sample.dstPort,

        cpu:35+Math.floor(Math.random()*45),

        ram:40+Math.floor(Math.random()*45),

        disk:25+Math.floor(Math.random()*55),

        bandwidth:350+Math.floor(Math.random()*700),

        packets:1800+Math.floor(Math.random()*2000),

        alerts:Math.floor(Math.random()*18),

        dropped:Math.floor(Math.random()*6),

        temperature:42+Math.floor(Math.random()*20),

        power:8+Math.random()*2

    };

}