import { TData } from "./TData";

export type TDropdownList = {
  data: Array<TData>;
  state: string;
  setState: (value: string) => void;
  name: string;
  size?: "big" | "small";
};
