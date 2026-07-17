interface Props{

    name:string;

    confidence:number;

    color:string;

}

export default function AgentVote({

    name,

    confidence,

    color

}:Props){

    return(

        <div
            style={{

                background:"#132238",

                border:"1px solid #27486B",

                borderRadius:14,

                padding:14,

                width:120,

                textAlign:"center"

            }}
        >

            <div
                style={{
                    color:"#9FB4CF",
                    fontSize:13
                }}
            >

                {name}

            </div>

            <div
                style={{

                    color,

                    fontSize:26,

                    fontWeight:700,

                    marginTop:10

                }}
            >

                {confidence}%

            </div>

            <div
                style={{

                    height:6,

                    marginTop:12,

                    borderRadius:10,

                    background:"#0C1626"

                }}
            >

                <div
                    style={{

                        width:`${confidence}%`,

                        height:"100%",

                        borderRadius:10,

                        background:color

                    }}
                />

            </div>

        </div>

    )

}