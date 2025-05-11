import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { FamilyMemberPreview, FamilyTreeNode } from "src/models/types";

export const selectNodes = (state: RootState) => state.tree.present.nodes;

export const selectFamilyNodes = (state: RootState) =>
  state.tree.present.nodes
    .filter((p) => p.type === "familyNode")
    .map((p) => p as FamilyTreeNode);

export const selectRelated = (family: string) =>
  createSelector([selectFamilyNodes], (nodes) =>
    nodes
      .filter((p) => p.data.family === family)
      .map((p) => {
        return {
          imageSrc: p.data.imageSrc,
          id: p.id,
          isDead: p.data.isDead,
        } as FamilyMemberPreview;
      })
  );

export const selectMales = () =>
  createSelector([selectFamilyNodes], (nodes) => {
    return nodes.filter((p) => p.data.gender === "male");
  });

export const selectFemales = () =>
  createSelector([selectFamilyNodes], (nodes) => {
    return nodes.filter((p) => p.data.gender === "female");
  });
