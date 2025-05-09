import { Background, Controls, Edge, Panel, ReactFlow } from "@xyflow/react";
import { store, useAppDispatch, useAppSelector } from "src/store/store";
import { FamilyTreeNode, nodeTypes } from "src/models/types";
import ELK, { ElkNode } from "elkjs/lib/elk.bundled.js";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  breakingBadDataset,
  gotDataset,
  setNodes,
  setTree,
} from "src/store/treeSlice";
import { useQuery } from "@tanstack/react-query";
import { SunIcon } from "@heroicons/react/24/solid";
import { MoonIcon } from "@heroicons/react/24/solid";
import { setEdit } from "src/store/appSlice";

const elk = new ELK();

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  "elk.algorithm": "mrtree",
  "elk.layered.spacing.nodeNodeBetweenLayers": "150",
  "elk.spacing.nodeNode": "150",
  "elk.layered.considerModelOrder.strategy": "NODES_AND_EDGES",
};

const getLayoutedElements = (
  nodes: FamilyTreeNode[],
  edges: Edge[],
  options: { [key: string]: string } = {}
) => {
  const isHorizontal = options?.["elk.direction"] === "RIGHT";

  // Map from ID to original node so we can restore `data`, `type`, etc.
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  const graph: ElkNode = {
    id: "root",
    layoutOptions: options,
    children:
      nodes?.map((node) => ({
        id: node.id,
        width: 150,
        height: 150,
        targetPosition: isHorizontal ? "left" : "top",
        sourcePosition: isHorizontal ? "right" : "bottom",
        priority:
          node.id === "ned" ||
          node.id === "cat" ||
          node.id === "lyanna" ||
          node.id === "rhaegar"
            ? 1
            : 0,
      })) ?? [],
    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
    })),
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => {
      const transformedNodes: FamilyTreeNode[] =
        layoutedGraph?.children?.map((node) => {
          const original = nodeMap.get(node.id);
          if (!original) {
            console.warn(`Node ${node.id} missing in original nodeMap`);
          }
          return {
            ...original!,
            position: { x: node.x ?? 0, y: node.y ?? 0 },
          };
        }) ?? [];

      const transformedEdges: Edge[] =
        layoutedGraph?.edges?.map((edge) => ({
          id: edge.id,
          source: edge.sources[0],
          target: edge.targets[0],
          type: "default",
        })) ?? [];

      return {
        nodes: transformedNodes,
        edges: transformedEdges,
      };
    })
    .catch((err) => {
      console.error("ELK layout error", err);
      return { nodes: [] as FamilyTreeNode[], edges: [] as Edge[] };
    });
};

export default function Canvas() {
  const { nodes, edges } = useAppSelector((state) => state.tree.present);
  const inEdit = useAppSelector((state) => state.app.inEdit);
  const dispatch = useAppDispatch();

  const datasetList = useQuery({
    queryKey: ["datasetList"],
    queryFn: () => [
      { label: "Game Of Thrones", value: "GOT" },
      { label: "Breaking Bad", value: "BRBA" },
    ],
  });

  const [selectedDataset, setSelectedDataset] = useState<string>("GOT");

  useEffect(() => {
    if (selectedDataset === "GOT") {
      dispatch(setTree(gotDataset));
    }
    if (selectedDataset === "BRBA") {
      dispatch(setTree(breakingBadDataset));
    }

    onLayout({ direction: "DOWN" });
  }, [selectedDataset]);

  const onLayout = useCallback(
    ({ direction }: { direction: string }) => {
      const currentNodes = store.getState().tree.present.nodes;
      const currentEdges = store.getState().tree.present.edges;
      const opts = { "elk.direction": direction, ...elkOptions };

      getLayoutedElements(currentNodes, currentEdges, opts).then(
        ({ nodes }) => {
          console.log("nodess", nodes);
          dispatch(setNodes(nodes));
        }
      );
    },
    [] // <- empty dependency array
  );

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    console.log("layoutShitf", nodes, edges);
    onLayout({ direction: "DOWN" });
  }, []);
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
              {datasetList.data?.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </Panel>
        <Panel position="bottom-right">
          {inEdit && (
            <div className="flex items-center gap-2">
              <p>Add</p>
              <button className="bg-emerald-300 rounded-full aspect-square p-2">
                <PlusIcon className="size-6 text-white" />
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
