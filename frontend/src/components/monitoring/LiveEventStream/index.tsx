interface Props{

    events:any[];

}

const colors={

    LOW:"#3FA7FF",

    MEDIUM:"#FFC93C",

    HIGH:"#FF7A00",

    CRITICAL:"#FF4545"

};

export default function LiveEventStream({

    events

}:Props){

    return(

        <div

            style={{

                height:"100%",

                overflow:"auto"

            }}

        >

            {

                [...events]

                .reverse()

                .map((e:any)=>

                    <div

                        key={e.id}

                        style={{

                            display:"grid",

                            gridTemplateColumns:

                            "95px 170px 170px 100px 120px",

                            padding:"10px",

                            borderBottom:

                            "1px solid #1E324A",

                            fontSize:13

                        }}

                    >

                        <div>{e.time}</div>

                        <div>{e.asset}</div>

                        <div>{e.event}</div>

                        <div

                            style={{
                                color: colors[e.severity as keyof typeof colors]
                            }}

                        >

                            {e.severity}

                        </div>

                        <div>{e.mitre}</div>

                    </div>

                )

            }

        </div>

    );

}