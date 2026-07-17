import { useEffect, useRef } from "react";

interface Props{
    events:any[];
}

export default function RawTerminalLogs({events}:Props){

    const containerRef = useRef<HTMLDivElement>(null);

    const autoScroll = useRef(true);

    useEffect(()=>{

        if(
            autoScroll.current &&
            containerRef.current
        ){

            containerRef.current.scrollTop =
                containerRef.current.scrollHeight;

        }

    },[events]);

    return(

        <div

            ref={containerRef}

            onScroll={(e)=>{

                const el=e.currentTarget;

                autoScroll.current=

                    el.scrollTop+

                    el.clientHeight

                    >=

                    el.scrollHeight-40;

            }}

            style={{

                height:"100%",

                overflowY:"auto",

                background:"#02070D",

                fontFamily:"Consolas",

                fontSize:13,

                color:"#CFCFCF",

                padding:12

            }}

        >

            {

                events.map((event:any)=>(

                    <div

                        key={event.id}

                        style={{

                            marginBottom:6,

                            whiteSpace:"pre-wrap"

                        }}

                    >

                        {event.time}

                        {" "}

                        {event.rawLog}

                    </div>

                ))

            }

        </div>

    );

}