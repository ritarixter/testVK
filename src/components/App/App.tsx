import { FC, useEffect, useState } from "react";
import {
  conferenceRooms,
  towers,
  floors,
  timeInterval,
} from "../../utils/data";
import styles from "./App.module.scss";
import { DropdownList } from "../DropdownList";
import { Label } from "../Label";
import { Calendar } from "../Calendar";
import { isFutureDate } from "../../utils/utils";
import { isToday } from "date-fns";

export const App: FC = () => {
  const [tower, setTower] = useState<string>("Выберите корпус");
  const [conferenceRoom, setConferenceRoom] = useState<string>(
    "Выберите переговорную"
  );
  const [date, setDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [floor, setFloor] = useState<string>("Выберите этаж");
  const [textarea, setTextarea] = useState<string>("");
  const [time, setTime] = useState<string>("Выберите время");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [errorDate, setErrorDate] = useState<boolean>(false);
  const [intervals, setIntervals] = useState<Array<string>>([]);

  const handleClear = () => {
    setTower("Выберите корпус");
    setConferenceRoom("Выберите переговорную");
    setDate(new Date());
    setFloor("Выберите этаж");
    setTextarea("");
    setTime("Выберите время");
    setDisabled(true);
  };

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
    let currentTime: Array<string> = [];
    setTime("Выберите время");
    setDisabled(true);

    //Если выбранная дата - сегодня, то блокируент интервалы времени, которые уже не акутальны.
    if (isToday(date)) {
      const nowHours = currentDate.getHours();
      currentTime = timeInterval.map((item) => {
        if (nowHours < item.hour) {
          return item.interval;
        } else {
          return item.interval + " (забронировано)";
        }
      });
    } else {
      currentTime = timeInterval.map((item) => {
        return item.interval;
      });
    }
    setIntervals(currentTime);

    //Проверяет корректность выбранной даты. Дата должна быть не позднее сегодняшней
    if (isFutureDate({ date, currentDate })) {
      setErrorDate(false);
    } else {
      setErrorDate(true);
    }
  }, [date]);

  const handleClick = () => {
    const booking = {
      tower: tower,
      conferenceRoom: conferenceRoom,
      date: date.toISOString().slice(0, 10),
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
