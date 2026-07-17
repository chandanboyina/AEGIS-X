interface Props{

    title:string;

    value:string;

    subtitle:string;

    status:"critical"|"warning"|"healthy"|"info";

}

const colors={

    critical:"#FF4D4F",

    warning:"#FAAD14",

    healthy:"#52C41A",

    info:"#1677FF"

};

export default function MetricCard({

    title,

    value,

    subtitle,

    status

}:Props){

    return(

        <div

            style={{

                background:"#121E31",

                border:"1px solid #203B57",

                borderRadius:14,

                padding:24,

                height:160,

                display:"flex",

                flexDirection:"column",

                justifyContent:"space-between"

            }}

        >

            <div

                style={{

                    color:"#8FA6C4",

                    fontSize:14,

                    letterSpacing:1

                }}

            >

                {title}

            </div>

            <div

                style={{

                    color:colors[status],

                    fontSize:34,

                    fontWeight:700

                }}

            >

                {value}

            </div>

            <div

                style={{

                    color:"#7289A7"

                }}

            >

                {subtitle}

            </div>

        </div>

    );

}