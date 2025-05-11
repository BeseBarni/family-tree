import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppState = {
  inEdit: boolean;
  selectedFitlers: { dataset: string };
};

const initialState: AppState = {
  inEdit: false,
  selectedFitlers: { dataset: "none" },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setEdit(state, action: PayloadAction<boolean>) {
      state.inEdit = action.payload;
    },
    setSelectedDataset(state, action: PayloadAction<string>) {
      state.selectedFitlers.dataset = action.payload;
    },
  },
});

export const { setEdit, setSelectedDataset } = appSlice.actions;

export default appSlice.reducer;
