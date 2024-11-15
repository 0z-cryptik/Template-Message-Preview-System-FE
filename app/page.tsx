"use client";

import { Form } from "./ui/form/form";
import { Preview } from "./ui/preview/preview";
import { StateProvider } from "./stateManagement/state";

const Home = () => {
  return (
    <StateProvider>
      <main className="flex flex-col gap-[1.5rem] max-sm:text-sm bg-black text-white items-center justify-center h-screen">
        <Form />
        <Preview />
      </main>
    </StateProvider>
  );
};

export default Home;
