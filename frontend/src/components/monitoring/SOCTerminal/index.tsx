import { useEffect, useRef } from "react";

interface Props{
    events:any[];
}

export default function SOCTerminal({events}:Props){

    const terminalRef=useRef<HTMLDivElement>(null);

    const autoScroll=useRef(true);

    useEffect(()=>{

        if(autoScroll.current){

            terminalRef.current?.scrollTo({

                top:terminalRef.current.scrollHeight,

                behavior:"smooth"

            });

        }

    },[events]);

    return(

        <div

            ref={terminalRef}

            onScroll={(e)=>{

                const el=e.currentTarget;

                autoScroll.current=

                    el.scrollTop+el.clientHeight>=

                    el.scrollHeight-30;

            }}

            style={{

                height:"100%",

                width:"100%",

                background:"#000000",

                overflowY:"auto",

                padding:"14px 18px",

                fontFamily:"Consolas",

                fontSize:14,

                color:"#EAEAEA",

                lineHeight:"24px",

                borderRadius:4

            }}

        >

            {

                events.map((log:any)=>(

                    <div

                        key={log.id}

                        style={{

                            whiteSpace:"pre-wrap",

                            padding:"3px 0"

                        }}

                    >

                        <span style={{color:"#6FB3FF"}}>

                            [{log.time}]

                        </span>

                        {" "}

                        {log.rawLog}

                    </div>

                ))

            }

            <div

                style={{

                    color:"#00FF88",

                    marginTop:10,

                    animation:"blink 1s infinite"

                }}

            >

                <span style={{color:"#00FF66"}}>

                root@AEGIS-X:/soc#

                </span>

                <span>

                _

                </span>


            </div>

        </div>

    );

}