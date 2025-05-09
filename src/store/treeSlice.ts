import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import undoable from "redux-undo";
import { FamilyTreeNode } from "src/models/types";
import AryaSrc from "src/assets/arya.png";
import BreakingBadSrc from "src/assets/brba.jpg";
import { Edge } from "@xyflow/react";
type TreeState = {
  nodes: FamilyTreeNode[];
  edges: Edge[];
};

const strokeStyle = {
  strokeWidth: 5,
};

const highlightedStroke = {
  strokeWidth: 5,
  stroke: "green",
  zIndex: 1,
};

export const gotDataset = {
  nodes: [
    {
      id: "ned",
      data: {
        name: "Eddard (Ned) Stark",
        imageSrc: AryaSrc,
        gender: "male",
        from: "263 AC",
        to: "299 AC",
        family: "House Stark",
        isDead: true,
      },
      position: { x: 0, y: 0 },
      type: "familyNode",
    },
    {
      id: "cat",
      data: {
        name: "Catelyn Stark",
        imageSrc: AryaSrc,
        gender: "female",
        from: "264 AC",
        to: "299 AC",
        isDead: true,
        family: "House Stark",
      },
      position: { x: 200, y: 0 },
      type: "familyNode",
    },
    {
      id: "rob",
      data: {
        name: "Robb Stark",
        imageSrc: AryaSrc,
        gender: "male",
        from: "283 AC",
        to: "299 AC",
        isDead: true,
        family: "House Stark",
      },
      position: { x: 100, y: 150 },
      type: "familyNode",
    },
    {
      id: "sansa",
      data: {
        name: "Sansa Stark",
        imageSrc: AryaSrc,
        gender: "female",
        from: "286 AC",
        family: "House Stark",
      },
      position: { x: 300, y: 150 },
      type: "familyNode",
    },
    {
      id: "arya",
      data: {
        name: "Arya Stark",
        imageSrc: AryaSrc,
        gender: "female",
        from: "289 AC",
        family: "House Stark",
      },
      position: { x: 500, y: 150 },
      type: "familyNode",
    },
    {
      id: "bran",
      data: {
        name: "Bran Stark",
        imageSrc: AryaSrc,
        gender: "male",
        from: "290 AC",
        family: "House Stark",
      },
      position: { x: 700, y: 150 },
      type: "familyNode",
    },
    {
      id: "rickon",
      data: {
        name: "Rickon Stark",
        imageSrc: AryaSrc,
        gender: "male",
        from: "295 AC",
        to: "303 AC",
        isDead: true,
        family: "House Stark",
      },
      position: { x: 900, y: 150 },
      type: "familyNode",
    },
    {
      id: "jon",
      data: {
        name: "Jon Snow (Aegon Targaryen)",
        imageSrc: AryaSrc,
        gender: "male",
        from: "283 AC",
        family: "House Targaryen",
      },
      position: { x: 100, y: 350 },
      type: "familyNode",
    },
    {
      id: "lyanna",
      data: {
        name: "Lyanna Stark",
        imageSrc: AryaSrc,
        gender: "female",
        from: "266 AC",
        to: "283 AC",
        isDead: true,
        family: "House Targaryen",
      },
      position: { x: -200, y: 0 },
      type: "familyNode",
    },
    {
      id: "rhaegar",
      data: {
        name: "Rhaegar Targaryen",
        imageSrc: AryaSrc,
        gender: "male",
        from: "259 AC",
        to: "283 AC",
        isDead: true,
        family: "House Targaryen",
      },
      position: { x: -400, y: 0 },
      type: "familyNode",
    },
  ] as FamilyTreeNode[],
  edges: [
    // Ned + Catelyn children
    {
      id: "ned-cat-robb",
      source: "ned",
      target: "rob",
      type: "smoothstep",
      style: strokeStyle,
    },
    {
      id: "cat-robb",
      source: "cat",
      target: "rob",
      type: "smoothstep",
      style: strokeStyle,
    },
    {
      id: "ned-cat-sansa",
      source: "ned",
      target: "sansa",
      type: "smoothstep",
      style: strokeStyle,
    },
    {
      id: "cat-sansa",
      source: "cat",
      target: "sansa",
      type: "smoothstep",
      style: strokeStyle,
    },
    {
      id: "ned-cat-arya",
      source: "ned",
      target: "arya",
      type: "smoothstep",
      style: strokeStyle,
    },
    {
      id: "cat-arya",
      source: "cat",
      target: "arya",
      type: "smoothstep",
      style: strokeStyle,
    },
    {
      id: "ned-cat-bran",
      source: "ned",
      target: "bran",
      type: "smoothstep",
      style: strokeStyle,
    },
    {
      id: "cat-bran",
      source: "cat",
      target: "bran",
      type: "smoothstep",
      style: strokeStyle,
    },
    {
      id: "ned-cat-rickon",
      source: "ned",
      target: "rickon",
      type: "smoothstep",
      style: strokeStyle,
    },
    {
      id: "cat-rickon",
      source: "cat",
      target: "rickon",
      type: "smoothstep",
      style: strokeStyle,
    },

    // Jon Snow's true parents
    {
      id: "lyanna-jon",
      source: "lyanna",
      target: "jon",
      type: "smoothstep",
      style: strokeStyle,
    },
    {
      id: "rhaegar-jon",
      source: "rhaegar",
      target: "jon",
      type: "smoothstep",
      style: strokeStyle,
    },
  ] as Edge[],
};

export const breakingBadDataset = {
  nodes: [
    {
      id: "walter",
      data: {
        name: "Walter White",
        imageSrc: BreakingBadSrc,
        gender: "male",
        from: "1958",
        to: "2010",
      },
      position: { x: 0, y: 0 },
      type: "familyNode",
    },
    {
      id: "skyler",
      data: {
        name: "Skyler White",
        imageSrc: BreakingBadSrc,
        gender: "female",
        from: "1970",
      },
      position: { x: 200, y: 0 },
      type: "familyNode",
    },
    {
      id: "waltjr",
      data: {
        name: "Walter White Jr.",
        imageSrc: BreakingBadSrc,
        gender: "male",
        from: "1993",
      },
      position: { x: 100, y: 150 },
      type: "familyNode",
    },
    {
      id: "holly",
      data: {
        name: "Holly White",
        imageSrc: BreakingBadSrc,
        gender: "female",
        from: "2009",
      },
      position: { x: 300, y: 150 },
      type: "familyNode",
    },
    {
      id: "marie",
      data: {
        name: "Marie Schrader",
        imageSrc: BreakingBadSrc,
        gender: "female",
        from: "1974",
      },
      position: { x: 400, y: 0 },
      type: "familyNode",
    },
    {
      id: "hank",
      data: {
        name: "Hank Schrader",
        imageSrc: BreakingBadSrc,
        gender: "male",
        from: "1966",
        to: "2010",
      },
      position: { x: 600, y: 0 },
      type: "familyNode",
    },
  ] as FamilyTreeNode[],
  edges: [
    // Walter + Skyler children
    {
      id: "walter-waltjr",
      source: "walter",
      target: "waltjr",
      type: "smoothstep",
    },
    {
      id: "skyler-waltjr",
      source: "skyler",
      target: "waltjr",
      type: "smoothstep",
    },
    {
      id: "walter-holly",
      source: "walter",
      target: "holly",
      type: "smoothstep",
    },
    {
      id: "skyler-holly",
      source: "skyler",
      target: "holly",
      type: "smoothstep",
    },

    // Marie and Hank marriage (no children shown in series)
    { id: "marie-hank", source: "marie", target: "hank", type: "smoothstep" },
  ] as Edge[],
};

const initialState: TreeState = {
  ...gotDataset,
};

const getAncestry = (id: string, edges: Edge[]): string[] => {
  let ancestry: string[] = [id];
  function getAncestryRecursive(id: string) {
    const ancestors = edges.filter((p) => p.target === id);

    if (ancestors.length === 0) return;
    ancestry = ancestry.concat(ancestors.map((p) => p.source));
    ancestors.forEach((p) => {
      return getAncestryRecursive(p.id);
    });
  }
  getAncestryRecursive(id);

  return ancestry;
};

const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    setNodes(state, action: PayloadAction<FamilyTreeNode[]>) {
      console.log("inSetNodes", action);
      state.nodes = action.payload;
    },
    setTree(
      state,
      action: PayloadAction<{ nodes: FamilyTreeNode[]; edges: Edge[] }>
    ) {
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
    },
    highlightAncestors(state, action: PayloadAction<string | undefined>) {
      if (!action.payload) {
        for (let node of state.nodes) {
          node.data.isInActive = false;
        }
        for (let edge of state.edges) {
          edge.style = strokeStyle;
        }
        return;
      }
      const ancestors = state.edges
        .filter((p) => p.target === action.payload)
        .map((p) => p.id);
      const ancestry = getAncestry(action.payload, state.edges);
      for (let node of state.nodes.filter((p) => !ancestry.includes(p.id))) {
        node.data.isInActive = true;
      }
      state.edges = state.edges
        .map((edge) => ({
          ...edge,
          style: ancestors.includes(edge.id) ? highlightedStroke : strokeStyle,
        }))
        .sort((a, b) => {
          const aHighlighted = ancestors.includes(a.id);
          const bHighlighted = ancestors.includes(b.id);
          return aHighlighted === bHighlighted ? 0 : aHighlighted ? 1 : -1;
        });
    },
  },
});

export const { setNodes, highlightAncestors, setTree } = treeSlice.actions;

export default undoable(treeSlice.reducer);
