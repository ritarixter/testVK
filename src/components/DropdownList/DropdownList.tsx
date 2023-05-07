import { FC, useState } from "react";
import styles from "./DropdownList.module.scss";
import arrow from "../../images/icons/arrow.svg";
import { TDropdownList } from "../../types";
import { Label } from "../Label";
import { v4 as uuidv4 } from "uuid";

export const DropdownList: FC<TDropdownList> = ({
  data,
  state,
  setState,
  name,
  size,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handlerClick = (index: number) => {
    setState(data[index]);
    setOpen(false);
  };

  return (
    <div className={styles.dropdownList}>
      <Label text={name} />

      <div
        className={`${styles.select} ${open && styles.select_open}`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span className={styles.title}>{state}</span>
        <img
          src={arrow}
          className={`${styles.arrow} ${open && styles.arrow_open}`}
          alt="Стрелка выпадающего списка"
        />
        {open && (
          <ul
            className={`${styles.menu} ${data.length > 5 && styles.bigHeight} ${
              size === "big" && styles.bigWidth
            }`}
          >
            {data.map((item, index) => (
              <li
                className={`${styles.option} ${
                  item.includes("забронировано") && styles.disabled
                }`}
                key={uuidv4()}
                onClick={() => {
                  if (!item.includes("забронировано")) {
                    handlerClick(index);
                  }
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
