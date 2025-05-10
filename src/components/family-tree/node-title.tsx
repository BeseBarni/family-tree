import { useContext } from "react";
import { NodeContext } from "./node-context";

export default function NodeTitle() {
  const { name, from, to } = useContext(NodeContext)!;
  return (
    <>
      <p className="font-extrabold text-2xl text-center">{name}</p>
      <div className="flex w-full">
        <p className="w-full flex-1/2 font-extrabold">{from}</p>
        <p className="w-full flex-1/2 font-extrabold text-right">{to}</p>
      </div>
    </>
  );
}

export function NodeTitleTyped({
  name,
  from,
  to,
}: {
  name: string;
  from: string;
  to?: string;
}) {
  return (
    <>
      <p className="font-extrabold text-2xl text-center">{name}</p>
      <div className="flex w-full">
        <p className="w-full flex-1/2 font-extrabold">{from}</p>
        <p className="w-full flex-1/2 font-extrabold text-right">{to}</p>
      </div>
    </>
  );
}
