import { useList } from "@/app/stateManagement/state";

export const Preview = () => {
  const { preview, errorMessage, loading } = useList();

  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (preview) {
    return <section className="rounded-2xl border p-5">{preview}</section>;
  } else if (errorMessage) {
    return (
      <section className="rounded-2xl border p-5 text-red-600">
        {errorMessage}
      </section>
    );
  }
};
