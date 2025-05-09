import { configureStore } from "@reduxjs/toolkit";
import treeReducer from "./treeSlice";
import modalReducer from "./modalSlice";
import appSlice from "./appSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    tree: treeReducer,
    modal: modalReducer,
    app: appSlice,
  },
});

// Types for TS inference
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
