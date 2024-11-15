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
    <div className="flex flex-col [@media(width>=380px)]:flex-row [@media(width<380px)]:gap-2">
      <div className="flex flex-row flex-grow">
        <label
          htmlFor="template"
          className="mt-1 sm:mt-2">
          Template:
        </label>
        <input
          id="template"
          className="border outline-none p-1 sm:p-2 bg-transparent w-full ml-2"
          value={template}
          onChange={(e) => {
            setTemplate(e.target.value);
          }}
        />
      </div>

      <button
        className="bg-blue-300 rounded-md p-2 sm:p-3 text-sm ml-2 max-sm:text-xs [@media(width<380px)]:w-fit [@media(width<380px)]:mx-auto"
        onClick={(e) => {
          e.preventDefault();
          if (template !== "") {
            extractVariables();
            setShowSubmitButton(true);
          }
        }}>
        Set template
      </button>
    </div>
  );
};
