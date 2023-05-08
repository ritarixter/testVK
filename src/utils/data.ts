import { TData } from "../types";

export const initialData = {
  floor: "Выберите этаж",
  time: "Выберите время",
  tower: "Выберите корпус",
  conferenceRoom: "Выберите переговорную",
  textarea: ""
}

export const towers: Array<TData> = [
  { id: 823281, name: "A" },
  { id: 823282, name: "B" },
];
export const conferenceRooms: Array<TData> = [
  { id: 427320, name: "Переговорная 1" },
  { id: 427321, name: "Переговорная 2" },
  { id: 427322, name: "Переговорная 3" },
  { id: 427323, name: "Переговорная 4" },
  { id: 427324, name: "Переговорная 5" },
  { id: 427325, name: "Переговорная 6" },
  { id: 427326, name: "Переговорная 7" },
  { id: 427327, name: "Переговорная 8" },
  { id: 427328, name: "Переговорная 9" },
  { id: 427329, name: "Переговорная 10" },
];

export const floors: Array<TData> = Array.from({ length: 27 }, (_, index) => ({
  name: String(index + 1),
  id: 283887 + index,
}));
export const timeInterval = [
  { interval: "05:00-07:00", hour: 5 },
  { interval: "07:00-09:00", hour: 7 },
  { interval: "09:00-11:00", hour: 9 },
  { interval: "11:00-13:00", hour: 11 },
  { interval: "13:00-15:00", hour: 13 },
  { interval: "15:00-17:00", hour: 15 },
  { interval: "17:00-19:00", hour: 17 },
  { interval: "19:00-21:00", hour: 19 },
  { interval: "21:00-23:00", hour: 21 },
  { interval: "23:00-01:00", hour: 23 },
];
