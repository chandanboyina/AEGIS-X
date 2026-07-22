import React from "react";
import type { PipelineStage } from "../../../../types/pipeline";

interface StageCardProps {
    stage: PipelineStage;
}

const StageCard: React.FC<StageCardProps> = ({ stage }) => {

    const getStatusClass = () => {
        switch (stage.status) {
            case "completed":
                return "completed";

            case "running":
                return "running";

            default:
                return "waiting";
        }
    };

    const getStatusIcon = () => {
        switch (stage.status) {

            case "completed":
                return "✅";

            case "running":
                return "⏳";

            default:
                return "⚪";
        }
    };

    return (

        <div className={`pipeline-card ${getStatusClass()}`}>

            <div className="pipeline-card-title">

                {stage.title}

            </div>

            <div className="pipeline-card-description">

                {stage.description}

            </div>

            <div className="pipeline-card-footer">

                <span>

                    {getStatusIcon()} {stage.status.toUpperCase()}

                </span>

                {stage.duration && (

                    <span>

                        {stage.duration} ms

                    </span>

                )}

            </div>

        </div>

    );

};

export default StageCard;