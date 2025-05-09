import { PropsWithChildren } from "react";
import NodeDataDialog from "src/components/family-tree/node-data.dialog";
import { useAppSelector } from "src/store/store";
import { modals } from "src/utils/modal.consts";

export default function DialogProvider({ children }: PropsWithChildren) {
  const selectedNodeModal = useAppSelector(
    (state) => state.modal.selectedNodeModal
  );
  return (
    <>
      <dialog id={modals.nodeModal} className="modal">
        {selectedNodeModal && <NodeDataDialog data={selectedNodeModal} />}
      </dialog>
      {children}
    </>
  );
}
