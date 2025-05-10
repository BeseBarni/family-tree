import { Handle, NodeProps, NodeToolbar, Position } from "@xyflow/react";
import { NodePicture } from "./node-picture";
import type { FamilyNodeData, FamilyTreeNode } from "src/models/types";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store/store";
import { highlightAncestors } from "src/store/treeSlice";
import { TrashIcon } from "@heroicons/react/24/outline";
import { NodeContext } from "./node-context";
import { modals } from "src/utils/modal.consts";
import {
  setDeleteModal,
  setEditModal,
  setImageUploadModal,
  setSelectedNode,
} from "src/store/modalSlice";
import { PencilIcon, PhotoIcon } from "@heroicons/react/20/solid";

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
        className="aspect-square w-56 h-56"
      >
        <Handle type="target" position={Position.Top} />
        <NodeToolbar isVisible={isToolbarVisible && inEdit}>
          <div className="flex gap-2">
            <button
              className="btn btn-accent aspect-square rounded-full p-0 h-8 w-8"
              onClick={() => {
                dispatch(setEditModal(data));
              }}
            >
              <PencilIcon className="size-5 text-white" />
            </button>
            <button
              className="btn btn-primary aspect-square rounded-full p-0 h-8 w-8"
              onClick={() => {
                dispatch(setImageUploadModal(data));
              }}
            >
              <PhotoIcon className="size-5 text-white" />
            </button>
            <button
              className="btn btn-error rounded-full aspect-square h-8 w-8 p-0"
              onClick={() => dispatch(setDeleteModal({ id, name: data.name }))}
            >
              <TrashIcon className="size-5 text-white" />
            </button>
          </div>
        </NodeToolbar>
        <div
          className="flex flex-col items-center p-1 gap-4 aspect-square"
          onClick={() => onFamilyMemberClick(data)}
        >
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
