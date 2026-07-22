import type { PipelineStage } from "../../../../types/pipeline";

interface Props {
    stage: PipelineStage;
}

export default function PipelineNode({ stage }: Props) {

    return (

        <div className={`pipeline-node ${stage.status}`}>

            <div className="pipeline-node-left">

                <div className={`pipeline-circle ${stage.status}`}>

                    {
                        stage.status === "completed"
                            ? "✓"
                            : stage.status === "running"
                                ? "▶"
                                : ""
                    }

                </div>

                <div className="pipeline-line"></div>

            </div>

            <div className="pipeline-node-body">

                <div className="pipeline-title-row">

                    <div className="pipeline-title">

                        {stage.title}

                    </div>

                    <div className={`status-badge ${stage.status}`}>

                        {stage.status.toUpperCase()}

                    </div>

                </div>

                <div className="pipeline-description">

                    {stage.description}

                </div>

                {

                    stage.duration && (

                        <div className="pipeline-duration">

                            {stage.duration} ms

                        </div>

                    )

                }

            </div>

        </div>

    );

}