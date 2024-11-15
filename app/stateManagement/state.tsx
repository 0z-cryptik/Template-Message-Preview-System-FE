"use client";

import { useContext, createContext, useState } from "react";

import { StateContext, GlobalState, PayLoad } from "./types";

const stateContext = createContext<StateContext | undefined>(undefined);

export const useList = () => {
  const context = useContext(stateContext);

  if (!context) {
    throw new Error("must be used within a state provider");
  }

  return context;
};

export const StateProvider: React.FC<GlobalState> = ({ children }) => {
  const [template, setTemplate] = useState("");
  const [variables, setVariables] = useState<string[]>([]);
  const [payloadObj, setPayloadObj] = useState<PayLoad>({});
  const [showSubmitButton, setShowSubmitButton] = useState(false)

  const stateObj = {
    template,
    variables,
    payloadObj,
    showSubmitButton,
    setTemplate,
    setVariables,
    setPayloadObj,
    setShowSubmitButton
  };

  return (
    <stateContext.Provider value={stateObj}>
      {children}
    </stateContext.Provider>
  );
};
