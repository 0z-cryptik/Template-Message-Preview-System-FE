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

  let server: string =
    process.env.NEXT_PUBLIC_SERVER ?? "http://localhost:8080/server";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPreview("");

    try {
      const response = await fetch(server, {
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
    } catch (err) {
      setErrorMessage("Error communicating with server, please try again");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-2 sm:p-6 max-sm:w-[90%]">
      <TemplateInput />
      <VariablesInput />
      {showSubmitButton && <SubmitButton />}
    </form>
  );
};
