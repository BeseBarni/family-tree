import { Handle, NodeProps, NodeToolbar, Position } from "@xyflow/react";
import { NodePicture } from "./node-picture";
import type { FamilyNodeData, FamilyTreeNode } from "src/models/types";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store/store";
import { highlightAncestors } from "src/store/treeSlice";
import { TrashIcon } from "@heroicons/react/24/outline";
import { NodeContext } from "./node-context";
import { modals } from "src/utils/modal.consts";
import { setSelectedNode } from "src/store/modalSlice";

export default function FamilyTreeNode({
  id,
  data,
}: NodeProps<FamilyTreeNode>) {
  const [isToolbarVisible, setIsToolbarVisible] = useState<boolean>(false);
  const inEdit = useAppSelector((state) => state.app.inEdit);
  const hoverTimeout = useRef<number | null>(null);

  const dispatch = useAppDispatch();
  const onHover = () => {
    dispatch(highlightAncestors(id));
    setIsToolbarVisible(true);
    if (hoverTimeout.current !== null) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  };
  const onLeave = () => {
    hoverTimeout.current = window.setTimeout(() => {
      hoverTimeout.current = null;
      setIsToolbarVisible(false);
    }, 50);
    dispatch(highlightAncestors());
  };

  const onFamilyMemberClick = (data: FamilyNodeData) => {
    dispatch(setSelectedNode(data));
    (document.getElementById(modals.nodeModal) as any).showModal();
  };

  return (
    <NodeContext.Provider value={data}>
      <div
        onMouseOver={onHover}
        onMouseLeave={onLeave}
        onClick={() => onFamilyMemberClick(data)}
      >
        <Handle type="target" position={Position.Top} />
        <NodeToolbar isVisible={isToolbarVisible && inEdit}>
          <button className="bg-red-400 rounded-full aspect-square p-2">
            <TrashIcon className="size-6 text-white" />
          </button>
        </NodeToolbar>
        <div className="flex flex-col items-center p-1 gap-4">
          <div className="tooltip tooltip-right" data-tip="Datasheet">
            <NodePicture
              imageSrc={data.imageSrc}
              gender={data.gender}
              isDead={data.isDead}
              isInActive={data.isInActive}
            />
          </div>
          <p className="font-extrabold text-3xl">{data.name}</p>
          <div className="flex w-full">
            <p className="w-full flex-1/2 font-extrabold text-xl">
              {data.from}
            </p>
            <p className="w-full flex-1/2 font-extrabold text-xl">{data.to}</p>
          </div>
        </div>

        <Handle type="source" position={Position.Bottom} />
      </div>
    </NodeContext.Provider>
  );
}
