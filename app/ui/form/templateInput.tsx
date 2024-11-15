import { useList } from "../../stateManagement/state";

export const TemplateInput = () => {
  const {
    template,
    setTemplate,
    setVariables,
    setPayloadObj,
    setShowSubmitButton
  } = useList();

  const extractVariables = () => {
    const variablePattern: RegExp = /{{(.*?)}}/g;
    const matches = template.matchAll(variablePattern);

    // each match is an array such that match[0] is the whole string, while match[1] is the matched word itself
    const matchesArr = [...matches].map((match) => match[1]);
    setVariables(matchesArr);
    initializePayload(matchesArr);
  };

  // an object is created with the keys being the variables and the values being empty strings, it is this object will eventually be sent to the server (after being updated with user's input)
  const initializePayload = (variables: string[]) => {
    const initialObj = variables.reduce((accumulator, variable) => {
      accumulator[variable] = "";
      return accumulator;
    }, {} as { [key: string]: string });

    setPayloadObj(initialObj);
  };

  return (
    <>
      <label htmlFor="template">Template: </label>
      <input
        id="template"
        className="border outline-none p-2"
        value={template}
        onChange={(e) => {
          setTemplate(e.target.value);
        }}
      />

      <button
        className="bg-blue-300 rounded-md p-3 text-sm ml-2"
        onClick={(e) => {
          e.preventDefault();
          extractVariables();
          setShowSubmitButton(true);
        }}>
        Set template
      </button>
    </>
  );
};
