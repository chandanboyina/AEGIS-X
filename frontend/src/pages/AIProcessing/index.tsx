import "./components/Pipeline/pipeline.css";

import PipelineNode from "./components/Pipeline/PipelineNode";
import PipelineProgress from "./components/Pipeline/PipelineProgress";

import {
    PipelineProvider,
    usePipeline
} from "./context/PipelineContext";

function PipelineScreen() {

    const {

        stages,

        completed,

        currentStage

    } = usePipeline();

    return (

        <div className="pipeline-page">

            {/* Header */}

            <div className="pipeline-header">

                <div>

                    <h1>

                        AI Processing Engine

                    </h1>

                    <p>

                        Enterprise Cybersecurity AI Pipeline

                    </p>

                </div>

                <div className="pipeline-live">

                    ● LIVE

                </div>

            </div>

            {/* Main Grid */}

            <div className="pipeline-grid">

                {/* Left Panel */}

                <div className="pipeline-panel">

                    <h2>

                        AI Pipeline

                    </h2>

                    <div className="pipeline-list">

                        {

                            stages.map(stage=>(

                                <PipelineNode
                                    key={stage.id}
                                    stage={stage}
                                />

                            ))

                        }

                    </div>

                </div>

                {/* Center Panel */}

                <div className="pipeline-panel">

                    <h2>

                        Current Processing

                    </h2>

                    <PipelineProgress

                        completed={completed}

                        total={stages.length}

                    />

                    <div className="current-stage">

                        <h3>

                            {

                                currentStage < stages.length

                                    ? stages[currentStage].title

                                    : "Pipeline Complete"

                            }

                        </h3>

                        <p>

                            {

                                currentStage < stages.length

                                    ? stages[currentStage].description

                                    : "Enterprise Dashboard Updated"

                            }

                        </p>

                        <div className="stage-stats">

                            <div>

                                <span>Status</span>

                                <strong>RUNNING</strong>

                            </div>

                            <div>

                                <span>Latency</span>

                                <strong>183 ms</strong>

                            </div>

                            <div>

                                <span>Confidence</span>

                                <strong>98%</strong>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Right Panel */}

                <div className="pipeline-panel">

                    <h2>

                        Live Packet

                    </h2>

                    <div className="packet-card">

                        <div className="packet-item">

                            <span>

                                Host

                            </span>

                            <strong>

                                WIN-SRV-01

                            </strong>

                        </div>

                        <div className="packet-item">

                            <span>

                                Threat

                            </span>

                            <strong>

                                Ransomware

                            </strong>

                        </div>

                        <div className="packet-item">

                            <span>

                                Risk

                            </span>

                            <strong>

                                95

                            </strong>

                        </div>

                        <div className="packet-item">

                            <span>

                                Confidence

                            </span>

                            <strong>

                                93%

                            </strong>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default function AIProcessing() {

    return (

        <PipelineProvider>

            <PipelineScreen />

        </PipelineProvider>

    );

}