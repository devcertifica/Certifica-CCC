export type FarmDataType = {
  id: number;
  name: string;
  location: string;
  type: string;
};

export const farmData: FarmDataType[] = [
  { id: 1, name: "Sunny Farm", location: "California", type: "Organic" },
  { id: 2, name: "Green Valley", location: "Texas", type: "Dairy" },
  { id: 3, name: "Happy Farm", location: "New York", type: "Poultry" },
  { id: 4, name: "Blue Sky Ranch", location: "Florida", type: "Cattle" },
  { id: 5, name: "Riverbend Farm", location: "Oregon", type: "Fruit" },
  {
    id: 6,
    name: "Mountain View Farm",
    location: "Colorado",
    type: "Grape",
  },
  { id: 7, name: "Sunny Meadow", location: "California", type: "Herbs" },
  { id: 8, name: "Golden Harvest", location: "Nebraska", type: "Grain" },
  { id: 9, name: "Green Acres", location: "Kentucky", type: "Poultry" },
  { id: 10, name: "Prairie Farm", location: "Kansas", type: "Grain" },
  { id: 11, name: "Happy Harvest", location: "Georgia", type: "Vegetable" },
  { id: 12, name: "Golden Valley", location: "California", type: "Dairy" },
  { id: 13, name: "Sunset Farm", location: "Texas", type: "Cattle" },
  { id: 14, name: "Silver Creek Farm", location: "Idaho", type: "Dairy" },
  { id: 15, name: "Maple Leaf Farm", location: "Vermont", type: "Maple Syrup" },
];
