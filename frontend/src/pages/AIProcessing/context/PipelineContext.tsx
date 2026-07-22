import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

import {
    DEFAULT_PIPELINE,
} from "../../../types/pipeline";

import type { PipelineStage } from "../../../types/pipeline";

interface PipelineContextType {

    stages: PipelineStage[];

    currentStage: number;

    completed: number;

    progress: number;

    resetPipeline: () => void;

}

const PipelineContext =
    createContext<PipelineContextType | undefined>(undefined);

export const PipelineProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [stages, setStages] =
        useState<PipelineStage[]>(DEFAULT_PIPELINE);

    const [currentStage, setCurrentStage] =
        useState(0);

    const completed = useMemo(() => {

        return stages.filter(

            stage => stage.status === "completed"

        ).length;

    }, [stages]);

    const progress = useMemo(() => {

        return Math.round(

            (completed / stages.length) * 100

        );

    }, [completed, stages.length]);

    useEffect(() => {

        const socket = new WebSocket(
            "ws://localhost:8000/ws/dashboard"
        );

        socket.onopen = () => {

            console.log("Pipeline Connected");

            socket.send("ping");

        };

        socket.onmessage = (event) => {

            const message = JSON.parse(event.data);

            console.log(message);

            if (message.type !== "pipeline")
                return;

            setStages(previous => {

                const updated = [...previous];

                const index = updated.findIndex(

                    stage =>

                        stage.title === message.stage

                );

                if (index === -1)
                    return previous;

                updated[index] = {

                    ...updated[index],

                    status: message.status,

                    duration:
                        message.status === "completed"

                            ? Math.floor(Math.random() * 300) + 100

                            : undefined

                };

                return updated;

            });

        };

        socket.onclose = () => {

            console.log("Pipeline Closed");

        };

        return () => {

            socket.close();

        };

    }, []);

    const resetPipeline = () => {

        setStages(DEFAULT_PIPELINE);

        setCurrentStage(0);

    };

    return (

        <PipelineContext.Provider

            value={{

                stages,

                currentStage,

                completed,

                progress,

                resetPipeline

            }}

        >

            {children}

        </PipelineContext.Provider>

    );

};

export const usePipeline = () => {

    const context = useContext(PipelineContext);

    if (!context) {

        throw new Error(

            "usePipeline must be used inside PipelineProvider"

        );

    }

    return context;

};