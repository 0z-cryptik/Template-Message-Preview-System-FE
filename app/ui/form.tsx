import React, { useState } from "react";

export const Form = () => {
  const [template, setTemplate] = useState("");
  const [variables, setVariables] = useState<string[]>([]);
  const [payloadObj, setPayloadObj] = useState<{
    [key: string]: string;
  }>({});

  const extractVariables = () => {
    const variablePattern: RegExp = /{{(.*?)}}/g;
    const matches = template.matchAll(variablePattern);

    // each match is an array such that match[0] is the whole string, while match[1] is the matched word itself
    const matchesArr = [...matches].map((match) => match[1]);
    setVariables(matchesArr);
    initializePayload(matchesArr);
  };

  // an object is created with the keys being the variables and the values being empty strings, it is this object will eventually be sent to the server
  const initializePayload = (variables: string[]) => {
    const initialObj = variables.reduce((accumulator, variable) => {
      accumulator[variable] = "";
      return accumulator;
    }, {} as { [key: string]: string });

    setPayloadObj(initialObj);
  };

  // here the object is updated with the values inputed on the browser
  const updatePayload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayloadObj((prevValues) => {
      return {
        ...prevValues,
        // the name and value of the input element that triggers the onChange event will be spread into the object
        [e.target.name]: e.target.value
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("someURL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadObj)
      });

      const responseJson = await response.json();
      console.log(responseJson);
    } catch (err) {
      console.error("error submitting form", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-6">
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
        }}>
        Set template
      </button>

      <>
        {variables.map((variable, i) => {
          return (
            <div
              key={i}
              className="mt-3">
              <label htmlFor={variable}>{variable}: </label>
              <input
                className="border mb-3"
                name={variable}
                id={variable}
                onChange={updatePayload}
              />
            </div>
          );
        })}
      </>

      <center>
        <button
          type="submit"
          className="mx-auto bg-blue-300 rounded-md p-3">
          Submit
        </button>
      </center>
    </form>
  );
};
