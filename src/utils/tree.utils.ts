import { getRandomFemale, getRandomMale } from "./image.utils";
import { Gender } from "src/models/gender";
import {
  FamilyTreeNode,
  relationNode,
  RelationShipNode,
} from "src/models/types";
import { api } from "src/api/api";
import { getLayoutedElements } from "src/libs/elk.layout";
import { elkOptions } from "src/libs/elk.options";
import { store } from "src/store/store";
import { setTree } from "src/store/treeSlice";
import { CreatePersonWithRelationDto } from "src/api/generated";

const setNewTree = async () => {
  const state = store.getState();
  const dataset = state.app.selectedFitlers.dataset;
  const tree = await getFlowTree(dataset);
  store.dispatch(setTree(tree));
};

export const getFlowTree = async (selectedDataset: string) => {
  const result = await api.FAMILY_TREE.apiFamilyTreeGetFamilyTreeGet(
    selectedDataset
  );
  const originalNodes = result.data.nodes.map((x) => {
    if (x.data) {
      return {
        ...x,
        data: {
          ...x.data,
          imageSrc:
            x.data.imageSrc ?? x.data.gender === "female"
              ? getRandomFemale()
              : getRandomMale(),
          gender: x.data.gender.toLowerCase() as Gender,
        },
        position: { x: 0, y: 0 },
        type: "familyNode",
      } as FamilyTreeNode;
    } else {
      return {
        ...x,
        ...relationNode,
      } as RelationShipNode;
    }
  });
  const originalEdges = result.data.edges;

  const layoutedTree = await getLayoutedElements(
    originalNodes,
    originalEdges,
    elkOptions
  );
  return layoutedTree;
};

export const deleteNode = async (id: string) => {
  await api.PERSON.apiPersonDeletePersonPersonIdLongDelete(+id).catch(
    (error) => {
      console.error(error);
    }
  );
  await setNewTree();
};

export const addNode = async (data: CreatePersonWithRelationDto) => {
  await api.PERSON.apiPersonAddPersonWithRelationPost(data);

  await setNewTree();
};
