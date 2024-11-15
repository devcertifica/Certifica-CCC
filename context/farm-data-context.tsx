import { TLaw } from "@/constants/data";
import React, { useContext, useState } from "react";

type FarmDataContextProps = {
  laws: TLaw[];
  setLaws: React.Dispatch<React.SetStateAction<TLaw[]>>;
};

const FarmDataContext = React.createContext<FarmDataContextProps | undefined>(
  undefined
);

export const FarmDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [laws, setLaws] = useState<TLaw[]>([]);

  return (
    <FarmDataContext.Provider value={{ laws, setLaws }}>
      {children}
    </FarmDataContext.Provider>
  );
};

export const useFarmData = () => {
  const context = useContext(FarmDataContext);
  if (!context) {
    throw new Error(
      "useFarmDataContext must be used within an FoeEditorProvider"
    );
  }
  return context;
};
