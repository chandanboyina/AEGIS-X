interface Props{

    color:string;

    text:string;

}

export default function StatusChip({

    color,

    text

}:Props){

    return(

        <div

            style={{

                display:"inline-flex",

                alignItems:"center",

                gap:8,

                padding:"5px 12px",

                borderRadius:30,

                border:`1px solid ${color}`,

                color,

                fontSize:13,

                fontWeight:600

            }}

        >

            ● {text}

        </div>

    )

}