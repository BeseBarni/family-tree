export const queries = {
  datasetList: () => {
    return {
      queryKey: ["datasetList"],
      queryFn: () => [
        { label: "Game Of Thrones", value: "GOT" },
        { label: "Breaking Bad", value: "BRBA" },
      ],
    };
  },
};
