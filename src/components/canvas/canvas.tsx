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
import { setEdit } from "src/store/appSlice";
import { getLayoutedElements } from "src/libs/elk.layout";
import { elkOptions } from "src/libs/elk.options";
import { setAddModal } from "src/store/modalSlice";
import { queries } from "src/utils/queries";
import { api } from "src/api/api";
import { Gender } from "src/models/gender";

export default function Canvas() {
  const { nodes, edges } = useAppSelector((state) => state.tree.present);
  const inEdit = useAppSelector((state) => state.app.inEdit);
  const dispatch = useAppDispatch();

  const datasetList = useQuery({
    ...queries.datasetList(),
  });

  const [selectedDataset, setSelectedDataset] = useState<string>("none");

  useEffect(() => {
    if (selectedDataset === "none") {
      dispatch(setTree({ nodes: [], edges: [] }));
      return;
    }

    api.FAMILY_TREE.apiFamilyTreeGetFamilyTreeGet(selectedDataset).then((p) => {
      const originalNodes = p.data.nodes.map((x) => {
        return {
          ...x,
          gender: x.data.gender as Gender,
          position: { x: 0, y: 0 },
          type: "familyNode",
        } as FamilyTreeNode;
      });
      const originalEdges = p.data.edges;
      let tree: {
        nodes: (FamilyTreeNode | RelationShipNode)[];
        edges: Edge[];
      } = {
        nodes: [...originalNodes],
        edges: [...originalEdges],
      };

      for (const node of originalNodes) {
        console.log("edges", originalNodes);
        console.log("node", node);
        const parents = originalEdges.filter((p) => p.target === node.id);
        let id = "";
        if (parents.length > 0) {
          id = parents[0].id;
          if (parent.length === 2) id = id + parents[1].id;
          if (!tree.nodes.some((p) => p.id === id + "R")) {
            tree.nodes.push({
              id: id + "R",
              ...relationNode,
            } as RelationShipNode);
          }
          tree.edges.push({
            id: node.id + +"-" + id + "R",
            source: id + "R",
            target: node.id,
          });
        }
        console.log("parents", parents);
        for (const edge of parents) {
          if (!tree.edges.some((p) => p.id === edge.id + "R")) {
            tree.edges.push({
              id: edge.id + "R",
              source: edge.source,
              target: id + "R",
            });
          }
        }
      }
      onLayout(tree);
    });
  }, [selectedDataset]);

  const onLayout = useCallback(
    (tree: { nodes: (FamilyTreeNode | RelationShipNode)[]; edges: Edge[] }) => {
      console.log("here");
      const currentNodes = tree.nodes;
      const currentEdges = tree.edges;

      getLayoutedElements(currentNodes, currentEdges, elkOptions).then(
        ({ nodes, edges }) => {
          console.log("nodess", nodes);
          console.log("edges", edges);
          dispatch(setTree({ nodes, edges }));
        }
      );
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
              onChange={(event) => setSelectedDataset(event.target.value)}
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
