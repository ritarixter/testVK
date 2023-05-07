export const towers: Array<string> = ["A", "B"];
export const conferenceRooms: Array<string> = [
  "Переговорная 1",
  "Переговорная 2",
  "Переговорная 3",
  "Переговорная 4",
  "Переговорная 5",
  "Переговорная 6",
  "Переговорная 7",
  "Переговорная 8",
  "Переговорная 9",
  "Переговорная 10",
];

export const floors = Array.from({ length: 27 }, (_, index) =>
  String(index + 1)
);
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
  { interval: "23:00-01:00", hour: 21 },
];
