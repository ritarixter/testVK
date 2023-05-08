import { FC, useEffect, useState } from "react";
import {
  conferenceRooms,
  towers,
  floors,
  timeInterval,
  initialData,
} from "../../utils/data";
import styles from "./App.module.scss";
import { DropdownList } from "../DropdownList";
import { Label } from "../Label";
import { Calendar } from "../Calendar";
import { isToday, set, isAfter } from "date-fns";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import { TData } from "../../types";
import { formatDate } from "../../utils";

export const App: FC = () => {
  const [tower, setTower] = useState<string>(initialData.tower);
  const [conferenceRoom, setConferenceRoom] = useState<string>(
    initialData.conferenceRoom
  );
  const [date, setDate] = useState<Date>(new Date());
  const [currentDate] = useState<Date>(new Date());
  const [floor, setFloor] = useState<string>(initialData.floor);
  const [textarea, setTextarea] = useState<string>(initialData.textarea);
  const [time, setTime] = useState<string>(initialData.time);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [errorDate, setErrorDate] = useState<boolean>(false);
  const [intervals, setIntervals] = useState<Array<TData>>([]);
  const handleClear = () => {
    setTower(initialData.tower);
    setConferenceRoom(initialData.conferenceRoom);
    setDate(new Date());
    setFloor(initialData.floor);
    setTextarea(initialData.textarea);
    setTime(initialData.time);
    setDisabled(true);
  };

  useEffect(() => {
    registerLocale("en-GB", enGB);
  }, []);

  useEffect(() => {
    //Валидатор; пока обязательные поля не будут выбраны - кнопка disabled
    if (
      !(tower === "Выберите корпус") &&
      !(conferenceRoom === "Выберите переговорную") &&
      !(floor === "Выберите этаж") &&
      !(time === "Выберите время") &&
      !errorDate
    ) {
      setDisabled(false);
    }
  }, [tower, conferenceRoom, floor, time, errorDate]);

  useEffect(() => {
    let currentTime: Array<TData> = [];
    setTime("Выберите время");
    setDisabled(true);

    //Если выбранная дата - сегодня, то блокируент интервалы времени, которые уже не акутальны.
    if (isToday(date)) {
      const nowHours = currentDate.getHours();
      currentTime = timeInterval.map((item) => {
        if (nowHours < item.hour) {
          return { name: item.interval, id: item.hour };
        } else {
          return { name: item.interval + " (забронировано)", id: item.hour };
        }
      });
    } else {
      currentTime = timeInterval.map((item) => {
        return { name: item.interval, id: item.hour };
      });
    }
    setIntervals(currentTime);

    //Проверяет корректность выбранной даты. Дата должна быть не позднее сегодняшней
    if (
      isAfter(
        date,
        set(currentDate, {
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        })
      )
    ) {
      setErrorDate(false);
    } else {
      setErrorDate(true);
    }
  }, [date, currentDate]);

  const handleClick = () => {
    const booking = {
      tower: tower,
      conferenceRoom: conferenceRoom,
      date: formatDate(date),
      time: time,
      floor: floor,
      comment: textarea,
    };
    console.log(JSON.stringify(booking));
    handleClear();
  };

  return (
    <div className={styles.container}>
      <section className={styles.booking}>
        <h1 className={styles.title}>Бронирование переговорной</h1>
        <form className={styles.form}>
          <div className={styles.column}>
            <DropdownList
              data={towers}
              state={tower}
              setState={setTower}
              name={"Башня *"}
            />
            <DropdownList
              data={floors}
              state={floor}
              setState={setFloor}
              name={"Этаж *"}
            />
          </div>
          <div className={styles.column}>
            <DropdownList
              data={conferenceRooms}
              state={conferenceRoom}
              setState={setConferenceRoom}
              name={"Переговорная *"}
            />
            <label>
              <Label text={"Дата *"} />
              <Calendar
                startDate={date}
                setStartDate={setDate}
                error={errorDate}
              />
            </label>
          </div>
          <DropdownList
            data={intervals}
            state={time}
            setState={setTime}
            name={"Время *"}
            size={"big"}
          />
          <div>
            <Label text="Комментарий" />
            <textarea
              className={styles.textarea}
              value={textarea}
              onChange={(e) => setTextarea(e.target.value)}
              name="comments"
              id="comments"
              placeholder="Комментарий"
            ></textarea>
          </div>
          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.button}
              onClick={handleClick}
              disabled={disabled}
            >
              Отправить
            </button>
            <button
              onClick={handleClear}
              type="button"
              className={`${styles.button} ${styles.cancel}`}
            >
              Очистить
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
