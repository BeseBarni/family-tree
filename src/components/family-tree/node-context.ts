import { createContext } from "react";
import { FamilyNodeData } from "src/models/types";

export const NodeContext = createContext<FamilyNodeData | undefined>(undefined);
