"use client";

import { Form } from "./ui/form/form";
import { StateProvider } from "./stateManagement/state";

const Home = () => {
  return (
    <StateProvider>
      <main className="flex items-center justify-center h-screen">
        <Form />
      </main>
    </StateProvider>
  );
};

export default Home;
