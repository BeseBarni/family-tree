export default function DeleteDialog() {
  return (
    <>
      <div className="modal-box">
        <h1>Are you sure you want to delete the node?</h1>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </>
  );
}
