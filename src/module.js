import { createExtension } from "@cognigy/extension-tools";
import { ApiConnection } from "./connections/con_mametis";
// import { getEntityNode } from "./nodes/getEntity";
// import { getEntitByIdyNode } from "./nodes/getEntityById";
// import { getLocationsByFiltersNode } from "./nodes/getLocationsByFilter";
// import { CreateLocationNode } from "./nodes/createLocation";


export default createExtension({
    nodes: [
        // getEntityNode,
        // getEntitByIdyNode,
        // getLocationsByFiltersNode,
        // CreateLocationNode
    ],
    connections: [
        ApiConnection
    ]
});