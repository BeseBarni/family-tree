import { FamilyMemberPreview } from "src/models/types";
import NodeRelatedMembers from "../family-tree/node-related-memebers";

type DeleteDialogProps = {
  data: {
    id: string;
    name: string;
    collateralNodes?: FamilyMemberPreview[];
  };
};

export default function DeleteDialog({ data }: DeleteDialogProps) {
  const { id, collateralNodes, name } = data;
  return (
    <>
      <div className="modal-box flex flex-col gap-8">
        <h1 className="text-center text-2xl font-extrabold">{`Are you sure you want to delete ${name}?`}</h1>
        {collateralNodes && (
          <>
            <p>The following members will be also deleted</p>
            <NodeRelatedMembers familyMembers={collateralNodes} />
          </>
        )}
        <form method="dialog" className="flex justify-center w-full gap-4">
          <button className="btn btn-lg btn-soft btn-error">Delete</button>
          <button className="btn btn-lg btn-soft">Close</button>
        </form>
      </div>
    </>
  );
}
