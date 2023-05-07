export type TDropdownList = {
  data: Array<string>;
  state: string;
  setState: (value: string) => void;
  name: string;
  size?: "big" | "small";
};
