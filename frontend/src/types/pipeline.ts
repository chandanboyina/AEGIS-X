export type PipelineStatus =
    | "waiting"
    | "running"
    | "completed";

export interface PipelineStage {

    id: number;

    title: string;

    description: string;

    status: PipelineStatus;

    duration?: number;

}
export const DEFAULT_PIPELINE: PipelineStage[] = [

{
id:1,
title:"Evidence Builder",
description:"Building cyber evidence packet",
status:"waiting"
},

{
id:2,
title:"Context Engine",
description:"Enriching enterprise context",
status:"waiting"
},

{
id:3,
title:"Feature Extraction",
description:"Extracting AI features",
status:"waiting"
},

{
id:4,
title:"Observer AI",
description:"Behaviour analysis",
status:"waiting"
},

{
id:5,
title:"Behaviour Engine",
description:"Behaviour intelligence",
status:"waiting"
},

{
id:6,
title:"Correlation Engine",
description:"Threat correlation",
status:"waiting"
},

{
id:7,
title:"Incident Manager",
description:"Incident lifecycle",
status:"waiting"
},

{
id:8,
title:"Enterprise Brain",
description:"Enterprise learning",
status:"waiting"
},

{
id:9,
title:"Cyber DNA",
description:"DNA generation",
status:"waiting"
},

{
id:10,
title:"Digital Twin",
description:"Simulation",
status:"waiting"
},

{
id:11,
title:"Dashboard Updated",
description:"Publishing dashboard",
status:"waiting"
}

];