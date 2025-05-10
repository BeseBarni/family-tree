import { api } from "src/api/api";

export const queries = {
  datasetList: () => {
    return {
      queryKey: ["datasetList"],
      queryFn: () =>
        api.FAMILY_TREE.apiFamilyTreeGetDatasetsGet().then((p) => p.data),
    };
  },
};
