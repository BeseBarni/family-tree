// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
export const elkOptions = {
  "elk.algorithm": "layered",
  "elk.direction": "DOWN",
  "elk.layered.spacing.nodeNodeBetweenLayers": 48,
  "elk.spacing.nodeNode": 48,
  // "elk.layered.layering.strategy": "LONGEST_PATH",
  // "elk.edgeRouting": "ORTHOGONAL", // Force orthogonal routing
  // "elk.layered.crossingMinimization.strategy": "SIMPLE",
  "elk.layered.nodePlacement.strategy": "SIMPLE", // Reverting to original
  "elk.layered.nodePlacement.favorStraightEdges": "true",
  // "elk.layered.considerModelOrder.strategy": "NODES_AND_EDGES",
  "elk.layered.layerUnzipping.strategy": "NONE",
};
