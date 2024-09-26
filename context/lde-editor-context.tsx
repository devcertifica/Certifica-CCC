import { TComponentData } from "@/constants/types";
import React, { useContext, useState } from "react";

type ActiveFieldContextProps = {
  activeId: string | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
  inputData: TComponentData[];
  setInputData: React.Dispatch<React.SetStateAction<TComponentData[]>>;
};

export const ActiveFieldContext = React.createContext<
  ActiveFieldContextProps | undefined
>(undefined);

export const ActiveFieldProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [inputData, setInputData] = useState<TComponentData[]>([]);

  return (
    <ActiveFieldContext.Provider
      value={{ activeId, setActiveId, inputData, setInputData }}
    >
      {children}
    </ActiveFieldContext.Provider>
  );
};

export const useActiveField = () => {
  const context = useContext(ActiveFieldContext);
  if (!context) {
    throw new Error(
      "useActiveField must be used within an ActiveFieldProvider"
    );
  }
  return context;
};
