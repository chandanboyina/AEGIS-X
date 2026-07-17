interface Props{

    title:string;

    confidence:number;

    color:string;

}

export default function DecisionNode({

    title,

    confidence,

    color

}:Props){

    return(

        <div

            style={{

                width:260,

                margin:"0 auto",

                marginBottom:20

            }}

        >

            <div

                style={{

                    display:"flex",

                    justifyContent:"space-between",

                    marginBottom:8

                }}

            >

                <span>{title}</span>

                <span>{confidence}%</span>

            </div>

            <div

                style={{

                    height:8,

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