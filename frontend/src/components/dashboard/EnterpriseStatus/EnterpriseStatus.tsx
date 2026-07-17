import EnterpriseCard from "../../common/EnterpriseCard/EnterpriseCard";

export default function EnterpriseStatus(){

    return(

        <EnterpriseCard

            title="Enterprise Status"

            height={430}

        >

            <div style={{color:"#00E676"}}>

                ● Enterprise Healthy

            </div>

            <br/>

            <div>

                Connected Assets : 124

            </div>

            <br/>

            <div>

                Active Agents : 18

            </div>

            <br/>

            <div>

                Protected Users : 5,241

            </div>

            <br/>

            <div>

                Last Update : Just Now

            </div>

        </EnterpriseCard>

    );

}