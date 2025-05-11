import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import undoable from "redux-undo";
import { FamilyTreeNode, RelationShipNode } from "src/models/types";
import AryaSrc from "src/assets/arya.png";
import BreakingBadSrc from "src/assets/brba.jpg";
import { Edge } from "@xyflow/react";
type TreeState = {
  nodes: (FamilyTreeNode | RelationShipNode)[];
  edges: Edge[];
};

export const strokeStyle = {
  strokeWidth: 5,
};

const highlightedStroke = {
  strokeWidth: 5,
  stroke: "green",
  zIndex: 1,
};

export const relationShipNodeStyle = {
  width: 1,
  height: 1,
  padding: 0.5,
  border: "none",
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

export const breakingBadDataset: {
  nodes: (RelationShipNode | FamilyTreeNode)[];
  edges: Edge[];
} = {
  nodes: [
    {
      id: "walter",
      data: {
        family: "Walter Family",
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
        family: "Walter Family",
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
        family: "Walter Family",
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
        family: "Walter Family",
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
        family: "Walter Family",
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
        family: "Walter Family",
        name: "Hank Schrader",
        imageSrc: BreakingBadSrc,
        gender: "male",
        from: "1966",
        to: "2010",
      },
      position: { x: 600, y: 0 },
      type: "familyNode",
    },
    // Relationship Nodes:
    {
      id: "walter-skyler",
      data: {},
      width: 0,
      height: 0,
      style: relationShipNodeStyle,
      position: { x: 100, y: 50 }, //  Position between Walter and Skyler
      type: "relationshipNode",
    },
    {
      id: "marie-hank",
      data: {},
      width: 0,
      height: 0,
      style: relationShipNodeStyle,
      position: { x: 500, y: 50 }, // Position between Marie and Hank
      type: "relationshipNode",
    },
  ],
  edges: [
    // Walter + Skyler children
    // Walter and Skyler Relationship
    {
      id: "walter-skyler",
      source: "walter",
      target: "walter-skyler",
      type: "smoothstep",
    },
    {
      id: "skyler-walter",
      source: "skyler",
      target: "walter-skyler",
      type: "smoothstep",
    },

    {
      id: "walter-skyler-holly",
      source: "walter-skyler",
      target: "holly",
      type: "smoothstep",
    },
    {
      id: "walter-skyler-waltjr",
      source: "walter-skyler",
      target: "waltjr",
      type: "smoothstep",
    },

    // Marie and Hank Relationship
    {
      id: "marie-hank-edge",
      source: "marie",
      target: "marie-hank",
      type: "smoothstep",
    },
    {
      id: "hank-marie-edge",
      source: "hank",
      target: "marie-hank",
      type: "smoothstep",
    },
  ] as Edge[],
};

export const potterDataset: {
  nodes: (FamilyTreeNode | RelationShipNode)[];
  edges: Edge[];
} = {
  nodes: [
    // Generation 1
    {
      id: "linfred",
      data: {
        name: "Linfred of Stinchcombe",
        imageSrc:
          "https://static.wikia.nocookie.net/harrypotter/images/1/1e/Linfred_of_Stinchcombe.jpg",
        gender: "male",
        from: "1200",
        family: "House Potter",
      },
      position: { x: 0, y: 0 },
      type: "familyNode",
    },
    {
      id: "iolanthe",
      data: {
        name: "Iolanthe Peverell",
        imageSrc:
          "https://static.wikia.nocookie.net/harrypotter/images/2/2e/Iolanthe_Peverell.jpg",
        gender: "female",
        from: "1205",
        family: "House Peverell",
      },
      position: { x: 200, y: 0 },
      type: "familyNode",
    },
    {
      id: "linfred_iolanthe_union",
      data: {},
      type: "relationshipNode",
      width: 0,
      height: 0,
      style: relationShipNodeStyle,
      position: { x: 100, y: 100 },
    },
    {
      id: "hardwin",
      data: {
        name: "Hardwin Potter",
        imageSrc:
          "https://static.wikia.nocookie.net/harrypotter/images/3/3e/Hardwin_Potter.jpg",
        gender: "male",
        from: "1230",
        family: "House Potter",
      },
      position: { x: 100, y: 200 },
      type: "familyNode",
    },

    // Generation 2
    {
      id: "fleamont",
      data: {
        name: "Fleamont Potter",
        imageSrc:
          "https://static.wikia.nocookie.net/harrypotter/images/4/4e/Fleamont_Potter.jpg",
        gender: "male",
        from: "1909",
        family: "House Potter",
      },
      position: { x: 0, y: 300 },
      type: "familyNode",
    },
    {
      id: "euphemia",
      data: {
        name: "Euphemia Potter",
        imageSrc:
          "https://static.wikia.nocookie.net/harrypotter/images/5/5e/Euphemia_Potter.jpg",
        gender: "female",
        from: "1915",
        family: "House Potter",
      },
      position: { x: 200, y: 300 },
      type: "familyNode",
    },
    {
      id: "fleamont_euphemia_union",
      data: {},
      width: 0,
      height: 0,
      style: relationShipNodeStyle,
      type: "relationshipNode",
      position: { x: 100, y: 400 },
    },
    {
      id: "james",
      data: {
        name: "James Potter",
        imageSrc:
          "https://static.wikia.nocookie.net/harrypotter/images/6/6e/James_Potter.jpg",
        gender: "male",
        from: "1960",
        family: "House Potter",
      },
      position: { x: 100, y: 500 },
      type: "familyNode",
    },

    // Generation 3
    {
      id: "lily",
      data: {
        name: "Lily Evans",
        imageSrc:
          "https://static.wikia.nocookie.net/harrypotter/images/7/7e/Lily_Evans.jpg",
        gender: "female",
        from: "1960",
        family: "House Evans",
      },
      position: { x: 300, y: 500 },
      type: "familyNode",
    },
    {
      id: "james_lily_union",
      type: "relationshipNode",
      style: relationShipNodeStyle,
      data: {},
      width: 0,
      height: 0,
      position: { x: 200, y: 600 },
    },
    {
      id: "harry",
      data: {
        name: "Harry Potter",
        imageSrc:
          "https://static.wikia.nocookie.net/harrypotter/images/8/8e/Harry_Potter.jpg",
        gender: "male",
        from: "1980",
        family: "House Potter",
      },
      position: { x: 200, y: 700 },
      type: "familyNode",
    },

    // Generation 4
    {
      id: "ginny",
      data: {
        name: "Ginny Weasley",
        imageSrc:
          "https://static.wikia.nocookie.net/harrypotter/images/9/9e/Ginny_Weasley.jpg",
        gender: "female",
        from: "1981",
        family: "House Weasley",
      },
      position: { x: 400, y: 700 },
      type: "familyNode",
    },
    {
      id: "harry_ginny_union",
      type: "relationshipNode",
      style: relationShipNodeStyle,
      data: {},
      width: 0,
      height: 0,
      position: { x: 300, y: 800 },
    },
    {
      id: "james_sirius",
      data: {
        name: "James Sirius Potter",
        imageSrc:
          "https://static.wikia.nocookie.net/harrypotter/images/a/a0/James_Sirius_Potter.jpg",
        gender: "male",
        from: "2003",
        family: "House Potter",
      },
      position: { x: 100, y: 900 },
      type: "familyNode",
    },
    {
      id: "albus_severus",
      data: {
        name: "Albus Severus Potter",
        imageSrc:
          "https://static.wikia.nocookie.net/harrypotter/images/b/b0/Albus_Severus_Potter.jpg",
        gender: "male",
        from: "2006",
        family: "House Potter",
      },
      position: { x: 300, y: 900 },
      type: "familyNode",
    },
    {
      id: "lily_luna",
      data: {
        name: "Lily Luna Potter",
        imageSrc:
          "https://static.wikia.nocookie.net/harrypotter/images/c/c0/Lily_Luna_Potter.jpg",
        gender: "female",
        from: "2008",
        family: "House Potter",
      },
      position: { x: 500, y: 900 },
      type: "familyNode",
    },
  ],
  edges: [
    // Linfred and Iolanthe to their union
    {
      id: "linfred_to_union",
      source: "linfred",
      target: "linfred_iolanthe_union",
      type: "smoothstep",
      style: strokeStyle,
    },
    {
      id: "iolanthe_to_union",
      source: "iolanthe",
      target: "linfred_iolanthe_union",
      type: "smoothstep",
      style: strokeStyle,
    },
    // Union to Hardwin
    {
      id: "union_to_hardwin",
      source: "linfred_iolanthe_union",
      target: "hardwin",
      type: "smoothstep",
      style: strokeStyle,
    },

    // Fleamont and Euphemia to their union
    {
      id: "fleamont_to_union",
      source: "fleamont",
      target: "fleamont_euphemia_union",
      type: "smoothstep",
      style: strokeStyle,
    },
    {
      id: "euphemia_to_union",
      source: "euphemia",
      target: "fleamont_euphemia_union",
      type: "smoothstep",
      style: strokeStyle,
    },
    // Union to James
    {
      id: "union_to_james",
      source: "fleamont_euphemia_union",
      target: "james",
      type: "smoothstep",
      style: strokeStyle,
    },

    // James and Lily to their union
    {
      id: "james_to_union",
      source: "james",
      target: "james_lily_union",
      type: "smoothstep",
      style: strokeStyle,
    },
    {
      id: "lily_to_union",
      source: "lily",
      target: "james_lily_union",
      type: "smoothstep",
      style: strokeStyle,
    },
    // Union to Harry
    {
      id: "union_to_harry",
      source: "james_lily_union",
      target: "harry",
      type: "smoothstep",
      style: strokeStyle,
    },

    // Harry and Ginny to their union
    {
      id: "harry_to_union",
      source: "harry",
      target: "harry_ginny_union",
      type: "smoothstep",
      style: strokeStyle,
    },
    {
      id: "ginny_to_union",
      source: "ginny",
      target: "harry_ginny_union",
      type: "smoothstep",
      style: strokeStyle,
    },
    // Union to their children
    {
      id: "union_to_james_sirius",
      source: "harry_ginny_union",
      target: "james_sirius",
      type: "smoothstep",
      style: strokeStyle,
    },
    {
      id: "union_to_albus_severus",
      source: "harry_ginny_union",
      target: "albus_severus",
      type: "smoothstep",
      style: strokeStyle,
    },
    {
      id: "union_to_lily_luna",
      source: "harry_ginny_union",
      target: "lily_luna",
      type: "smoothstep",
      style: strokeStyle,
    },
  ],
};
const initialState: TreeState = {
  nodes: potterDataset.nodes,
  edges: potterDataset.edges,
};
const getAncestry = (id: string, edges: Edge[]): string[] => {
  let ancestry: string[] = [id];
  function getAncestryRecursive(id: string) {
    const ancestors = edges.filter((p) => p.target === id || p.source === id);

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
    setNodes(
      state,
      action: PayloadAction<(FamilyTreeNode | RelationShipNode)[]>
    ) {
      state.nodes = action.payload;
    },
    setEgdes(state, action: PayloadAction<Edge[]>) {
      state.edges = action.payload;
    },
    setTree(
      state,
      action: PayloadAction<{
        nodes: (FamilyTreeNode | RelationShipNode)[];
        edges: Edge[];
      }>
    ) {
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
    },

    highlightAncestors(state, action: PayloadAction<string | undefined>) {
      if (!action.payload) {
        for (let node of state.nodes) {
          if (node.type === "relationshipNode") continue;

          (node as FamilyTreeNode).data.isInActive = false;
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
        if (node.type === "relationshipNode") continue;
        (node as FamilyTreeNode).data.isInActive = true;
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

export const { setNodes, highlightAncestors, setTree, setEgdes } =
  treeSlice.actions;

export default undoable(treeSlice.reducer);
