import { FamilyNodeData } from "src/models/types";
import { NodePicture } from "../family-tree/node-picture";
import { NodeTitleTyped } from "../family-tree/node-title";
import { uploadImage } from "src/libs/image.uploader";
import { useState } from "react";

type DeleteDialogProps = {
  data: FamilyNodeData;
};
async function getBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result?.toString()!);
    };

    reader.onerror = reject;
  });
}

export default function ImageUploadDialog({ data }: DeleteDialogProps) {
  const { name, imageSrc, from, to } = data;
  const [imgUrl, setImgUrl] = useState<string | undefined>();
  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const newUrl = await uploadImage(file, name);
      setImgUrl(newUrl);
    }
  }

  return (
    <>
      <div className="modal-box flex flex-col items-center">
        <div className="w-fit">
          <NodeTitleTyped name={name} from={from} to={to} />
        </div>
        <NodePicture size="250px" gender="none" imageSrc={imgUrl ?? imageSrc} />
        <input
          type="file"
          className="file-input file-input-primary"
          onChange={onFileChange}
        />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </div>
    </>
  );
}
