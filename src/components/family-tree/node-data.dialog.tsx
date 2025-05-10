import { NodePicture } from "./node-picture";
import NodeTitle from "./node-title";
import { useAppSelector } from "src/store/store";
import { selectRelated } from "src/store/selectors";
import { FamilyNodeData } from "src/models/types";
import { NodeContext } from "./node-context";
import NodeRelatedMembers from "./node-related-memebers";

type NodeDataDialogProps = {
  data: FamilyNodeData;
};

export default function NodeDataDialog({ data }: NodeDataDialogProps) {
  const { name, imageSrc, family, isDead } = data;

  const familyMembers = useAppSelector(selectRelated(family));

  return (
    <NodeContext.Provider value={data}>
      <div className="modal-box">
        <div className="flex flex-row">
          <div className="flex flex-col items-center flex-1/3 gap-4">
            <NodePicture
              size="8rem"
              gender="none"
              imageSrc={imageSrc}
              isDead={data.isDead}
            />
            <NodeTitle />
            <h2>{family}</h2>
            <NodeRelatedMembers familyMembers={familyMembers} />
          </div>
          <div className="flex flex-2/3">
            <h1 className="font-bold text-lg w-full text-center">{`Who ${
              isDead ? "was" : "is"
            } ${name}?`}</h1>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </NodeContext.Provider>
  );
}
