import { TComponentData } from "@/constants/types";
import React, { useContext, useState } from "react";

type ActiveFieldContextProps = {
  activeId: string | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
  inputData: TComponentData[];
  setInputData: React.Dispatch<React.SetStateAction<TComponentData[]>>;
  updateTextData: (id: string, content: string, height: number) => void;
  addInputData: (newItem: TComponentData) => void;
  deleteInputDataById: (id: string) => void;
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

  const updateTextData = (id: string, content: string, height: number) => {
    setInputData((prevData) =>
      prevData.map((item) =>
        item.id === id && item.type === "text"
          ? { ...item, content, height }
          : item
      )
    );
  };

  const addInputData = (newItem: TComponentData) => {
    setInputData((prevData) => [...prevData, newItem]);
  };

  const deleteInputDataById = (id: string) => {
    setInputData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <ActiveFieldContext.Provider
      value={{
        activeId,
        setActiveId,
        inputData,
        setInputData,
        updateTextData,
        addInputData,
        deleteInputDataById,
      }}
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
