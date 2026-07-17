import EnterpriseCard from "../../common/EnterpriseCard/EnterpriseCard";

export default function ExecutiveIncident(){

    return(

        <EnterpriseCard
            title="Current Critical Incident"
            height={280}
        >

            <div style={{fontSize:28,fontWeight:700,color:"#FF4D4F"}}>

                Reconnaissance Attack

            </div>

            <br/>

            <div>

                Target

                <b> Government Education Cloud</b>

            </div>

            <br/>

            <div>

                Status

                <b> AI Council Investigating</b>

            </div>

            <br/>

            <div>

                Recommended Playbook

                <b> PB-010 Aggressive</b>

            </div>

        </EnterpriseCard>

    );

}