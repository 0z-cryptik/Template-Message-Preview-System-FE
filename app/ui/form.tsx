import { useState } from "react";

export const Form = () => {
  const [template, setTemplate] = useState("");
  const [variables, setVariables] = useState<string[]>([]);
  const [templateIsSet, setTemplateIsSet] = useState(false);

  const extractVariables = () => {
    const variablePattern: RegExp = /{{(.*?)}}/g;
    const matches = template.matchAll(variablePattern);

    // each match is an array such that match[0] is the whole string, while match[1] is the matched word itself
    const matchesArr = [...matches].map((match) => match[1]);
    setVariables(matchesArr);
  };

  if (templateIsSet) {
    extractVariables();
  }

  return (
    <form>
      <label htmlFor="template">Template: </label>
      <input
        id="template"
        className="border outline-none p-2"
        value={template}
        onChange={(e) => {
          setTemplate(e.target.value);
        }}
      />
      <button className="bg-blue-300 rounded-md p-3 text-sm ml-2"
        onClick={() => {
          setTemplateIsSet(true);
        }}>
        Set template
      </button>
    </form>
  );
};
