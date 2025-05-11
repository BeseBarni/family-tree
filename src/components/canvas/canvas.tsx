import { Background, Controls, Edge, Panel, ReactFlow } from "@xyflow/react";
import { store, useAppDispatch, useAppSelector } from "src/store/store";
import {
  FamilyTreeNode,
  nodeTypes,
  relationNode,
  RelationShipNode,
} from "src/models/types";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import {
  breakingBadDataset,
  gotDataset,
  potterDataset,
  setNodes,
  setTree,
} from "src/store/treeSlice";
import { useQuery } from "@tanstack/react-query";
import { SunIcon } from "@heroicons/react/24/solid";
import { MoonIcon } from "@heroicons/react/24/solid";
import { setEdit, setSelectedDataset } from "src/store/appSlice";

import { setAddModal } from "src/store/modalSlice";
import { queries } from "src/utils/queries";

import { getFlowTree } from "src/utils/tree.utils";

export default function Canvas() {
  const { nodes, edges } = useAppSelector((state) => state.tree.present);
  const inEdit = useAppSelector((state) => state.app.inEdit);
  const dispatch = useAppDispatch();

  const datasetList = useQuery({
    ...queries.datasetList(),
  });

  const selectedDataset = useAppSelector(
    (state) => state.app.selectedFitlers.dataset
  );

  useEffect(() => {
    if (selectedDataset === "none") {
      // dispatch(setTree({ nodes: [], edges: [] }));
      onLayout({ nodes, edges });
      return;
    }
    getFlowTree(selectedDataset).then((tree) => {
      onLayout(tree);
    });
  }, [selectedDataset]);

  const onLayout = useCallback(
    (tree: { nodes: (FamilyTreeNode | RelationShipNode)[]; edges: Edge[] }) => {
      dispatch(setTree(tree));
    },
    [] // <- empty dependency array
  );

  return (
    <div className="w-full h-full">
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <Panel position="top-left">
          <label className="toggle text-base-content">
            <input
              type="checkbox"
              value="synthwave"
              className="theme-controller"
            />
            <SunIcon className=" stroke-yellow-500" />
            <MoonIcon className=" stroke-violet-700" />
          </label>
        </Panel>
        <Panel position="top-right">
          <div className="flex items-center gap-4">
            <label className="label">
              <input
                type="checkbox"
                className="toggle"
                value={inEdit ? "true" : "false"}
                onChange={(event) => dispatch(setEdit(event.target.checked))}
              />
              Edit
            </label>

            <select
              id="countries"
              className="select  select-md"
              value={selectedDataset}
              onChange={(event) =>
                dispatch(setSelectedDataset(event.target.value))
              }
            >
              <option value="none">Choose a dataset</option>
              {!datasetList.isLoading &&
                datasetList.data?.map((option) => (
                  <option value={option}>{option}</option>
                ))}
            </select>
          </div>
        </Panel>
        <Panel position="bottom-right">
          {inEdit && (
            <div className="flex items-center gap-2 mb-6 mr-6">
              <button
                data-tip="Add new"
                className="tooltip tooltip-left btn btn-accent rounded-full aspect-square p-2 h-12 w-12"
                onClick={() => dispatch(setAddModal())}
              >
                <PlusIcon className="size-8 text-white" />
              </button>
            </div>
          )}
        </Panel>
        <Background />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
