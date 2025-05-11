import { useCallback, useState } from "react";
import { selectFemales, selectMales } from "src/store/selectors";
import { useAppSelector } from "src/store/store";
import { addNode } from "src/utils/tree.utils";

export default function AddDialog() {
  const selectedDataset = useAppSelector(
    (state) => state.app.selectedFitlers.dataset
  );
  const females = useAppSelector(selectFemales());
  const males = useAppSelector(selectMales());
  const [name, setName] = useState<string | undefined>(undefined);
  const [gender, setGender] = useState<string>("male");
  const [from, setFrom] = useState<string | undefined>(undefined);
  const [to, setTo] = useState<string | undefined>(undefined);

  const [father, setFather] = useState<string>("none");
  const [mother, setMother] = useState<string>("none");

  const isFormValid = (name || name !== "") && gender && from;

  const onAdd = () => {
    const parents = [];
    if (father !== "none") parents.push(+father);
    if (mother !== "none") parents.push(+mother);

    let family: string = "";

    if (father !== "none") {
      family = males.find((p) => p.id === father)?.data.family!;
    } else if (mother !== "none") {
      family = females.find((p) => p.id === mother)?.data.family!;
    } else {
      const names = name?.split(" ");
      if (names && names?.length > 1) {
        family = names.pop()!;
      } else {
        family = name!;
      }
    }

    const addData = {
      name: name!,
      gender: gender!,
      from: from!,
      to,
      dataset: selectedDataset,
      parentIds: parents,
      family,
    };
    addNode(addData);
  };

  return (
    <>
      <div className="modal-box flex flex-col gap-8">
        <h1 className="text-center text-2xl font-extrabold">{`Are you sure you want to add ${
          name ?? ""
        }?`}</h1>
        <div className="flex justify-center w-full">
          <fieldset className="fieldset w-full gap-6">
            <label className="floating-label">
              <span>Name *</span>
              <input
                type="text"
                placeholder="Name *"
                className={`input ${
                  !name || name === "" ? "input-error" : "input-primary"
                } input-md w-full`}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label className="select w-full select-primary">
              <span className="label">Gender</span>
              <select onChange={(event) => setGender(event.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>

            <label className="floating-label">
              <span>From date *</span>
              <input
                type="text"
                placeholder="From date *"
                className={`input ${
                  !name || name === "" ? "input-error" : "input-primary"
                } input-md w-full`}
                onChange={(event) => setFrom(event.target.value)}
              />
            </label>

            <label className="floating-label">
              <span>To date</span>
              <input
                type="text"
                placeholder="To date"
                className="input input-primary input-md w-full"
                onChange={(event) => setTo(event.target.value)}
              />
            </label>
            <div className="flex flex-row gap-2">
              <label className="select flex-1/2 select-primary">
                <span className="label">Father</span>
                <select onChange={(event) => setFather(event.target.value)}>
                  <option value="none">No father</option>

                  {males.map((p) => (
                    <option value={p.id}>{p.data.name}</option>
                  ))}
                </select>
              </label>
              <label className="select flex-1/2 select-primary">
                <span className="label">Mother</span>
                <select onChange={(event) => setMother(event.target.value)}>
                  <option value="none">No mother</option>

                  {females.map((p) => (
                    <option value={p.id}>{p.data.name}</option>
                  ))}
                </select>
              </label>
            </div>
          </fieldset>
        </div>
        <form method="dialog" className="flex justify-center w-full gap-4">
          <button
            onClick={() => onAdd()}
            disabled={!isFormValid}
            className={`btn btn-lg btn-soft ${
              isFormValid ? "btn-primary" : "btn-error"
            }`}
          >
            Add
          </button>
          <button className="btn btn-lg btn-soft">Close</button>
        </form>
      </div>
    </>
  );
}
