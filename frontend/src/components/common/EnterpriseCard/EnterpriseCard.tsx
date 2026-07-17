import "./EnterpriseCard.css";

interface Props{

    title:string;

    children:React.ReactNode;

    height?:number;

}

export default function EnterpriseCard({

    title,

    children,

    height=300

}:Props){

    return(

        <div

            className="enterprise-panel"

            style={{

                height

            }}

        >

            <div className="panel-header">

                {title}

            </div>

            <div className="panel-body">

                {children}

            </div>

        </div>

    )

}