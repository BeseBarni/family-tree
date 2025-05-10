import { PropsWithChildren, useEffect } from "react";
import AddDialog from "src/components/dialogs/add.dialog";
import DeleteDialog from "src/components/dialogs/delete.dialog";
import EditDialog from "src/components/dialogs/edit.dialog";
import ImageUploadDialog from "src/components/dialogs/image.upload.dialog";
import NodeDataDialog from "src/components/family-tree/node-data.dialog";
import { useAppSelector } from "src/store/store";
import { modals } from "src/utils/modal.consts";

export default function DialogProvider({ children }: PropsWithChildren) {
  const selectedNodeModal = useAppSelector(
    (state) => state.modal.selectedNodeModal
  );

  const deleteModal = useAppSelector((state) => state.modal.deleteModal);

  const editModal = useAppSelector((state) => state.modal.editModal);
  const imageUploadModal = useAppSelector(
    (state) => state.modal.imageUploadModal
  );
  const addModal = useAppSelector((state) => state.modal.addModal);

  useEffect(() => {
    if (deleteModal) {
      (document.getElementById(modals.deleteModal) as any).showModal();
    }
  }, [deleteModal]);

  useEffect(() => {
    if (editModal) {
      (document.getElementById(modals.editModal) as any).showModal();
    }
  }, [editModal]);

  useEffect(() => {
    if (imageUploadModal) {
      (document.getElementById(modals.imageUploadModal) as any).showModal();
    }
  }, [imageUploadModal]);

  useEffect(() => {
    if (addModal) {
      (document.getElementById(modals.addModal) as any).showModal();
    }
  }, [addModal]);

  return (
    <>
      <dialog id={modals.nodeModal} className="modal">
        {selectedNodeModal && <NodeDataDialog data={selectedNodeModal} />}
      </dialog>
      <dialog id={modals.deleteModal} className="modal">
        {deleteModal && <DeleteDialog data={deleteModal} />}
      </dialog>
      <dialog id={modals.addModal} className="modal">
        {addModal && <AddDialog />}
      </dialog>
      <dialog id={modals.imageUploadModal} className="modal">
        {imageUploadModal && <ImageUploadDialog data={imageUploadModal} />}
      </dialog>
      <dialog id={modals.editModal} className="modal">
        {editModal && <EditDialog data={editModal} />}
      </dialog>
      {children}
    </>
  );
}
