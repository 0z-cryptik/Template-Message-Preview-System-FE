import { useList } from "@/app/stateManagement/state";

export const VariablesInput = () => {
  const { variables, payloadObj, setPayloadObj } = useList();

  // here the payload object is updated with the values inputed on the browser
  const updatePayload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayloadObj((prevValues) => {
      return {
        ...prevValues,
        // the name and value of the input element that triggers the onChange event will be spread into the object
        [e.target.name]: e.target.value
      };
    });
  };

  return (
    <div className="mt-5">
      {variables.map((variable, i) => {
        return (
          <div
            key={i}
            className="mt-3 flex flex-row">
            <label htmlFor={variable}>{variable}: </label>
            <input
              className="border mb-3 text-sm bg-transparent w-full ml-2"
              name={variable}
              id={variable}
              value={payloadObj[variable]}
              onChange={updatePayload}
            />
          </div>
        );
      })}
    </div>
  );
};
