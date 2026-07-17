interface Props{

    title:string;

    children:React.ReactNode;

}

export default function Section({

    title,

    children

}:Props){

    return(

        <div
            style={{

                marginTop:30

            }}
        >

            <h2
                style={{

                    color:"white",

                    fontSize:22,

                    marginBottom:18

                }}
            >

                {title}

            </h2>

            {children}

        </div>

    );

}