import { incidents } from "../../../data/incidents";

export default function IncidentTable(){

    return(

        <div>

            {incidents.map((incident)=>(

                <IncidentRow

                    key={incident.id}

                    incident={incident}

                />

            ))}

        </div>

    );


}
function IncidentRow({

    incident

}:any){

    return(

        <div

            style={{

                display:"grid",

                gridTemplateColumns:

                "120px 120px 1fr 120px 90px 160px",

                padding:"18px",

                borderBottom:

                "1px solid #20364D",

                cursor:"pointer",

                transition:".2s"

            }}

        >

            <div>{incident.id}</div>

            <div>{incident.severity}</div>

            <div>{incident.title}</div>

            <div>{incident.mitre}</div>

            <div>{incident.confidence}%</div>

            <div>{incident.status}</div>

        </div>

    );

}