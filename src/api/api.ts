import { apiClient } from "src/libs/axios.client";
import { FamilyTreeApi } from "./generated";

export const api = {
  FAMILY_TREE: new FamilyTreeApi(
    undefined,
    import.meta.env.VITE_API_URL,
    apiClient
  ),
};
