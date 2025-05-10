import { Handle, NodeProps, Position } from "@xyflow/react";

import type { RelationShipNode } from "src/models/types";

export default function RelationShipNode({}: NodeProps<RelationShipNode>) {
  return (
    <>
      <Handle
        type="source"
        position={Position.Top}
        className="hidden w-0 h-0  opacity-0"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        className="hidden w-0 h-0 opacity-0"
      />
      <div className="h-0 w-0  opacity-0 hidden"></div>
    </>
  );
}
