import { useList } from "../../stateManagement/state";
import { SubmitButton } from "./submitButton";
import { TemplateInput } from "./templateInput";
import { VariablesInput } from "./variablesInput";
import { ServerResponse } from "../../types/responseType";

export const Form = () => {
  const {
    template,
    payloadObj,
    showSubmitButton,
    setPreview,
    setErrorMessage,
    setLoading
  } = useList();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPreview("");

    try {
      const response = await fetch("http://localhost:8080/server", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payloadObj, template })
      });

      const responseJson: ServerResponse = await response.json();

      if (!responseJson.ok) {
        setErrorMessage(responseJson.message);
        return;
      }

      setPreview(responseJson.message);
      console.log(responseJson);
    } catch (err) {
      setErrorMessage("Error communicating with server, please try again");
    } finally {
      setLoading(false);
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
