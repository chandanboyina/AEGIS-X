import EnterpriseCard from "../../common/EnterpriseCard/EnterpriseCard";

export default function InfrastructureHealth(){

    return(

        <EnterpriseCard
            title="National Infrastructure"
            height={280}
        >

            <div>🟢 Power Grid</div>

            <br/>

            <div>🟢 Banking</div>

            <br/>

            <div>🟢 Healthcare</div>

            <br/>

            <div>🟡 Education</div>

            <br/>

            <div>🟢 Railways</div>

            <br/>

            <div>🟢 Telecom</div>

        </EnterpriseCard>

    );

}