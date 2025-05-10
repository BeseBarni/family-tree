import { ElkNode, LayoutOptions } from "elkjs";

export const invisibleNodeStyle: LayoutOptions = {
  "elk.nodeShape": "ellipse",
  "elk.fill": "transparent",
  "elk.borderWidth": "0",
};

export const invisibleNode = {
  width: 1,
  height: 1,
  layoutOptions: invisibleNodeStyle,
};

export const getDummyNodes = (parent1: string, parent2: string): ElkNode[] => {
  return [
    { id: getDummyId(parent1), ...invisibleNode },
    { id: getDummyId(parent2), ...invisibleNode },
  ];
};

export const getDummyEdges = (p1: string, p2: string, r: string) => {
  const d1 = getDummyId(p1);
  const d2 = getDummyId(p2);
  return [
    {
      id: p1 + d1,
      sources: [p1],
      targets: [d1],
      sourcePort: "center",
    },
    {
      id: p2 + d2,
      sources: [p2],
      targets: [d2],
      sourcePort: "center",
    },
    {
      id: d1 + r,
      sources: [d1],
      targets: [r],
      targetPort: "center",
    },
    {
      id: d2 + r,
      sources: [d2],
      targets: [r],
      targetPort: "center",
    },
  ];
};

function getDummyId(parentId: string): string {
  return `${parentId}_DUMMY`;
}
