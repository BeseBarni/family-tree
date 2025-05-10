import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FamilyMemberPreview, FamilyNodeData } from "src/models/types";

type ModalState = {
  selectedNodeModal?: FamilyNodeData;
  deleteModal?: {
    id: string;
    name: string;
    collateralNodes?: FamilyMemberPreview[];
  };
  addModal?: {};
  imageUploadModal?: FamilyNodeData;
  editModal?: FamilyNodeData;
};

const initialState: ModalState = {};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setAddModal(state) {
      state.addModal = state.addModal ? undefined : {};
    },
    setEditModal(state, action: PayloadAction<FamilyNodeData>) {
      state.editModal = action.payload;
    },
    setImageUploadModal(state, action: PayloadAction<FamilyNodeData>) {
      state.imageUploadModal = action.payload;
    },
    setSelectedNode(state, action: PayloadAction<FamilyNodeData>) {
      state.selectedNodeModal = action.payload;
    },
    setDeleteModal(
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        collateralNodes?: FamilyMemberPreview[];
      }>
    ) {
      state.deleteModal = action.payload;
    },
  },
});

export const {
  setSelectedNode,
  setDeleteModal,
  setAddModal,
  setEditModal,
  setImageUploadModal,
} = modalSlice.actions;

export default modalSlice.reducer;
