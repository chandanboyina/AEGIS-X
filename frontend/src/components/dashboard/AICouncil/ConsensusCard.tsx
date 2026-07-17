export default function ConsensusCard(){

    return(

        <div

            style={{

                marginTop:30,

                borderRadius:18,

                padding:25,

                background:"#122239",

                border:"1px solid #27486B"

            }}

        >

            <div

                style={{

                    color:"#8FA5C4",

                    fontSize:14

                }}

            >

                CONSENSUS ENGINE

            </div>

            <div

                style={{

                    marginTop:10,

                    fontSize:26,

                    fontWeight:700,

                    color:"#00E676"

                }}

            >

                PB-010 Aggressive

            </div>

            <div

                style={{

                    marginTop:15,

                    color:"#A8BCD5"

                }}

            >

                Agreement

                <b>

                    {" "}7 / 8

                </b>

            </div>

            <div

                style={{

                    color:"#A8BCD5"

                }}

            >

                Confidence

                <b>

                    {" "}96%

                </b>

            </div>

        </div>

    )

}