export interface LiveSecurityEvent{

    id:number;

    time:string;

    rawLog:string;

    event:string;

    asset:string;

    source:string;

    destination:string;

    protocol:string;

    port:number;

    severity:"LOW"|"MEDIUM"|"HIGH"|"CRITICAL";

    status:"Allowed"|"Blocked"|"Investigating"|"Monitoring";

    agent:"Oracle"|"Observer"|"Graph AI"|"Enterprise Brain"|"SOAR";

    mitre:string;

}

export const templates=[
    {
        event:"Firewall DROP",

        rawLog:"Jul 13 kernel: IPTABLES DROP SRC=185.44.22.10 DST=10.0.15.20 PROTO=TCP DPT=445",

        asset:"Gov-Web-01",

        source:"185.44.22.10",

        destination:"10.0.15.20",

        protocol:"TCP",

        srcPort:45872,

        dstPort:445,

        severity:"HIGH",

        status:"Blocked",

        agent:"SOAR",

        mitre:"T1021"
    },

    {
        event:"DNS Query",

        rawLog:"DNS education.gov.in A 172.16.5.21",

        asset:"DNS-01",

        source:"10.0.15.15",

        destination:"172.16.5.21",

        protocol:"UDP",

        srcPort:45802,

        dstPort:53,

        severity:"LOW",

        status:"Allowed",

        agent:"Observer",

        mitre:"T1071"
    },

    {
        event:"Kerberos Authentication",

        rawLog:"Windows Event 4768 Kerberos TGT Requested",

        asset:"DC-01",

        source:"10.0.0.22",

        destination:"10.0.0.10",

        protocol:"TCP",

        srcPort:46572,

        dstPort:88,

        severity:"LOW",

        status:"Monitoring",

        agent:"Observer",

        mitre:"T1558"
    },
]