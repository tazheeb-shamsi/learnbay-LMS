import { store } from "../redux/store";
import React,{ ReactNode } from "react";
import { Provider } from "react-redux";

interface ProviderProps {
  children: ReactNode;
}

export function Providers({ children }: ProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
