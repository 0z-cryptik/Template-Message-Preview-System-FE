"use client";

import { Dispatch, SetStateAction } from "react";

export type PayLoad = {
  [key: string]: string;
};

export interface StateContext {
  template: string;
  variables: string[];
  payloadObj: PayLoad;
  showSubmitButton: boolean;
  setTemplate: Dispatch<SetStateAction<string>>;
  setVariables: Dispatch<SetStateAction<string[]>>;
  setPayloadObj: Dispatch<SetStateAction<PayLoad>>;
  setShowSubmitButton: Dispatch<SetStateAction<boolean>>;
}

export interface GlobalState {
  children: React.ReactNode;
}
