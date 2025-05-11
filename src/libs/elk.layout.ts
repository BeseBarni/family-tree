import { Edge } from "@xyflow/react";
import {
  FamilyTreeNode,
  relationNode,
  RelationShipNode,
} from "src/models/types";
import ELK, { ElkNode } from "elkjs/lib/elk.bundled.js";
import { getDummyEdges, getDummyNodes, invisibleNode } from "./react.flow";
import { relationShipNodeStyle } from "src/store/treeSlice";

const elk = new ELK();

export const getLayoutedElements = (
  nodes: (FamilyTreeNode | RelationShipNode)[],
  edges: Edge[],
  options: { [key: string]: any } = {}
) => {
  // Map from ID to original node so we can restore `data`, `type`, etc.
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  // Prepare nodes for layout, ensuring correct dimensions
  const layoutNodes: ElkNode[] = nodes.map((node) => ({
    id: node.id,
    width: node.type === "relationshipNode" ? 1 : 224,
    height: node.type === "relationshipNode" ? 1 : 224,
    targetPosition: "top",
    sourcePosition: "bottom",
  }));

  let layoutEdges = edges.map((edge) => ({
    id: edge.id,
    sources: [edge.source],
    targets: [edge.target],
  }));

  let originalEdges = [...layoutEdges];

  for (let node of nodes
    .filter((p) => p.type === "relationshipNode")
    .map((p) => p as RelationShipNode)) {
    const parents = edges
      .filter((e) => e.target === node.id)
      .map((e) => {
        return { id: e.id, source: e.source };
      });

    if (parents.length === 2) {
      layoutNodes.push(...getDummyNodes(parents[0].source, parents[1].source));

      layoutEdges.push(
        ...getDummyEdges(parents[0].source, parents[1].source, node.id)
      );
      layoutEdges = layoutEdges.filter(
        (p) => !parents.map((x) => x.id).includes(p.id)
      );
    }
    // for (let id of ["1", "3", "4", "13"]) {
    //   layoutNodes.push({
    //     id: id + "dchildren",
    //     width: 224,
    //     height: 224,
    //   });
    //   layoutNodes.push({
    //     id: id + "dchildren-relationchildren",
    //     ...invisibleNode,
    //   });

    //   layoutEdges.push({
    //     id: id + "dchildren-edge",
    //     sources: [id],
    //     targets: [id + "dchildren-relationchildren"],
    //   });

    //   layoutEdges.push({
    //     id: id + "dchildren-edge",
    //     sources: [id + "dchildren-relationchildren"],
    //     targets: [id + "dchildren"],
    //   });

    //   console.log("lynodes", layoutNodes);
    // }
  }

  const graph: ElkNode = {
    id: "root",
    layoutOptions: options,
    children: layoutNodes,
    edges: layoutEdges,
  };
  console.log("Input Graph to ELK:", JSON.stringify(graph, null, 2));
  return elk
    .layout(graph)
    .then((layoutedGraph) => {
      // Apply layout positions to original nodes
      console.log("layoutedGraph", layoutedGraph);
      const transformedNodes: (FamilyTreeNode | RelationShipNode)[] =
        layoutedGraph?.children
          ?.map((node) => {
            const original = nodeMap.get(node.id);
            if (!original) {
              return;
              // if (node.id.includes("dchildren"))
              //   return {
              //     id: node.id,
              //     type: "familyNode",
              //     data: {
              //       name: "Titkos mikkentyű",
              //       family: "",
              //       gender: "none",
              //       from: "-",
              //       imageSrc: "",
              //       isInActive: false,
              //       isDead: false,
              //     },
              //     position: { x: node.x ?? 0, y: node.y ?? 0 },
              //   } as FamilyTreeNode;
              // else if (node.id.includes("relationchildren")) {
              //   return {
              //     ...relationNode,
              //     id: node.id,
              //   } as RelationShipNode;
              // }
            }
            const res: FamilyTreeNode | RelationShipNode = {
              ...original!,
              position: { x: node.x ?? 0, y: node.y ?? 0 },
            };
            return res;
          })
          .filter((p) => p)
          .map((p) => p!) ?? [];

      console.log("transfNodes", JSON.stringify(transformedNodes, null, 2));
      // Apply edge layout
      const transformedEdges: Edge[] = originalEdges.map((edge) => ({
        id: edge.id,
        source: edge.sources[0],
        target: edge.targets[0],
        type: "smoothstep", // Using smoothstep for better curves
      }));
      console.log("transfEdges", JSON.stringify(transformedEdges, null, 2));

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
