import FamilyTreeNode from "src/components/family-tree/node";
import { Gender } from "./gender";
import { Node } from "@xyflow/react";

export type FamilyNodeData = {
  name: string;
  gender: Gender;
  imageSrc: string;
  from: string;
  to?: string;
  family: string;
  isDead?: boolean;
  isInActive?: boolean;
};
export type FamilyTreeNode = Node<FamilyNodeData, "familyNode">;

export const nodeTypes = {
  familyNode: FamilyTreeNode, // This must match the `type` field
};

export type FamilyMemberPreview = {
  id: string;
  imageSrc: string;
  isDead: boolean;
};
