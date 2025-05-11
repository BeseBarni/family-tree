import { apiClient } from "src/libs/axios.client";
import { FamilyTreeApi, PersonApi } from "./generated";

export const api = {
  FAMILY_TREE: new FamilyTreeApi(
    undefined,
    import.meta.env.VITE_API_URL,
    apiClient
  ),
  PERSON: new PersonApi(undefined, import.meta.env.VITE_API_URL, apiClient),
};
