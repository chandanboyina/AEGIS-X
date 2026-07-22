import ProgressBar from "./ProgressBar";

interface Props {

    completed: number;

    total: number;

}

export default function PipelineProgress({

    completed,

    total

}: Props) {

    const progress = Math.round(

        (completed / total) * 100

    );

    return (

        <div className="pipeline-progress">

            <div className="pipeline-progress-header">

                <span>

                    Overall Progress

                </span>

                <strong>

                    {progress}%

                </strong>

            </div>

            <ProgressBar

                progress={progress}

            />

            <div className="pipeline-progress-footer">

                {completed}

                {" / "}

                {total}

                {" Modules Completed"}

            </div>

        </div>

    );

}