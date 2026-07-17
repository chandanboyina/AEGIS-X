import DecisionNode from "./DecisionNode";

import ConsensusCard from "./ConsensusCard";

export default function AICouncil(){

    return(

        <>

            <DecisionNode

                title="Observer"

                confidence={92}

                color="#00D4FF"

            />

            <DecisionNode

                title="Oracle"

                confidence={95}

                color="#00E676"

            />

            <DecisionNode

                title="Enterprise Brain"

                confidence={89}

                color="#7C5CFC"

            />

            <DecisionNode

                title="Graph Intelligence"

                confidence={84}

                color="#00D4FF"

            />

            <DecisionNode

                title="Cyber DNA"

                confidence={91}

                color="#FF9800"

            />

            <DecisionNode

                title="Digital Twin"

                confidence={96}

                color="#FFC107"

            />

            <DecisionNode

                title="Enterprise Risk"

                confidence={82}

                color="#FF5252"

            />

            <DecisionNode

                title="Business AI"

                confidence={78}

                color="#00BCD4"

            />

            <ConsensusCard/>

        </>

    )

}