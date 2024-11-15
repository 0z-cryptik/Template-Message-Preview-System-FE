import { useList } from "../../stateManagement/state";
import { SubmitButton } from "./submitButton";
import { TemplateInput } from "./templateInput";
import { VariablesInput } from "./variablesInput";

export const Form = () => {
  const { template, payloadObj, showSubmitButton } = useList();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/server", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payloadObj, template })
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
      <TemplateInput />
      <VariablesInput />
      {showSubmitButton && <SubmitButton />}
    </form>
  );
};
