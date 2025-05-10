import { FamilyMemberPreview, FamilyNodeData } from "src/models/types";
import { setSelectedNode } from "src/store/modalSlice";
import { store, useAppDispatch } from "src/store/store";
import { NodePicture } from "./node-picture";

type NodeRelatedMembersProps = {
  familyMembers?: FamilyMemberPreview[];
};

export default function NodeRelatedMembers({
  familyMembers,
}: NodeRelatedMembersProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-wrap">
      {familyMembers?.map((p) => (
        <NodePicture
          onClick={() => {
            dispatch(
              setSelectedNode(
                store.getState().tree.present.nodes.find((n) => n.id === p.id)!
                  .data as FamilyNodeData
              )
            );
          }}
          size="3rem"
          key={p.id}
          gender="none"
          imageSrc={p.imageSrc}
          isDead={p.isDead}
        />
      ))}
    </div>
  );
}
