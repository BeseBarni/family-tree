import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { FamilyMemberPreview, FamilyTreeNode } from "src/models/types";

export const selectNodes = (state: RootState) => state.tree.present.nodes;

export const selectRelated = (family: string) =>
  createSelector([selectNodes], (nodes) =>
    nodes
      .filter((p) => p.type === "familyNode")
      .map((p) => p as FamilyTreeNode)
      .filter((p) => p.data.family === family)
      .map((p) => {
        return {
          imageSrc: p.data.imageSrc,
          id: p.id,
          isDead: p.data.isDead,
        } as FamilyMemberPreview;
      })
  );
