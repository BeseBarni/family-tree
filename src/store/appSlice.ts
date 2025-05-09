import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppState = {
  inEdit: boolean;
};

const initialState: AppState = {
  inEdit: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setEdit(state, action: PayloadAction<boolean>) {
      state.inEdit = action.payload;
    },
  },
});

export const { setEdit } = appSlice.actions;

export default appSlice.reducer;
