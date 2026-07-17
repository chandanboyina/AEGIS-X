interface Props{

    title:string;

    subtitle:string;

}

export default function PageHeader({

    title,

    subtitle

}:Props){

    return(

        <div
            style={{

                marginBottom:28

            }}
        >

            <h1
                style={{

                    color:"white",

                    fontSize:34,

                    marginBottom:4,

                    fontWeight:700

                }}
            >

                {title}

            </h1>

            <div
                style={{

                    color:"#7F93AF",

                    fontSize:16

                }}
            >

                {subtitle}

            </div>

        </div>

    );

}