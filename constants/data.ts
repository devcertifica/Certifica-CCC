// Data Defined for types returned from server

export type TFarm = {
  id: number;
  name: string;
  address: string;
};

export type TSeason = {
  id: number;
  active: boolean;
  calendarYear: string;
  farm: TFarm;
  laws: TLaw[];
  raFileSource: string;
};

export type TLaw = {
  id: number;
  number: string;
  requirement: string;
  type: "CORE" | "OTHER"; // Assuming "CORE" could have other values
  status: boolean;
  action?: string | null;
  deadline?: Date | null;
  detailPdfSource?: string | null;
  findings?: string | null;
  lastUpdate?: Date | null;
  responsible?: string | null;
};
