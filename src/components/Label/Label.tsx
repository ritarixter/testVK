import { FC } from "react";
import styles from "./Label.module.scss";
import { TLabel } from "../../types";

export const Label: FC<TLabel> = ({ text }) => {
  return <p className={styles.label}>{text}</p>;
};

export default Label;
