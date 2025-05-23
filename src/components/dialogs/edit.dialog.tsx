import { FamilyMemberPreview, FamilyNodeData } from "src/models/types";
import NodeRelatedMembers from "../family-tree/node-related-memebers";

type DeleteDialogProps = {
  data: FamilyNodeData;
};

export default function EditDialog({ data }: DeleteDialogProps) {
  return (
    <>
      <div className="modal-box flex flex-col gap-8">
        <h1 className="text-center text-2xl font-extrabold">{`Are you sure you want to delete ?`}</h1>

        <form method="dialog" className="flex justify-center w-full gap-4">
          <button className="btn btn-lg btn-soft btn-error">Delete</button>
          <button className="btn btn-lg btn-soft">Close</button>
        </form>
      </div>
    </>
  );
}
