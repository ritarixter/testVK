import { FC, useState } from "react";
import styles from "./DropdownList.module.scss";
import arrow from "../../images/icons/arrow.svg";
import { TDropdownList } from "../../types";
import { Label } from "../Label";

export const DropdownList: FC<TDropdownList> = ({
  data,
  state,
  setState,
  name,
  size,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handlerClick = (index: number) => {
    setState(data[index].name);
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
                  item.name.includes("забронировано") && styles.disabled
                }`}
                key={item.id}
                onClick={() => {
                  if (!item.name.includes("забронировано")) {
                    handlerClick(index);
                  }
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
