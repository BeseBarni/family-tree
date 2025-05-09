import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FamilyNodeData } from "src/models/types";

type ModalState = {
  selectedNodeModal?: FamilyNodeData;
};

const initialState: ModalState = {};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setSelectedNode(state, action: PayloadAction<FamilyNodeData>) {
      state.selectedNodeModal = action.payload;
    },
  },
});

export const { setSelectedNode } = modalSlice.actions;

export default modalSlice.reducer;
