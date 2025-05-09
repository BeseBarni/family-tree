import { NodeChange, applyNodeChanges } from "@xyflow/react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FamilyTreeNode } from "src/models/types";
import { RootState } from "src/store/store";
import { setNodes } from "src/store/treeSlice";

export function useReactFlowHandlers() {
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.tree.present.nodes);

  const onNodesChange = useCallback(
    (changes: NodeChange<FamilyTreeNode>[]) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      dispatch(setNodes(updatedNodes));
    },
    [dispatch, nodes]
  );

  return { onNodesChange };
}
