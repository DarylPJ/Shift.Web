import styles from "./shiftTable.module.css";

import { Cell } from "./cell";
import { Grid } from "./grid";
import { Row } from "./row";

const daysOfTheWeek: ReadonlyArray<string> = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

type Shift = "blue" | "green" | "red" | "purple" | "yellow";
type ShiftResults = "D" | "N" | "";

const zeroDays = new Map<Shift, number>([
  ["blue", new Date(2021, 10, 1).getTime()],
  ["green", new Date(2021, 8, 6).getTime()],
  ["red", new Date(2021, 9, 18).getTime()],
  ["purple", new Date(2021, 9, 4).getTime()],
  ["yellow", new Date(2021, 8, 20).getTime()],
]);

export interface IShiftSettings {
  enabledShifts: Shift[];
}

function calculateShiftValue(date: Date, zeroDate: number): ShiftResults {
  const diff = date.getTime() - zeroDate;

  const days = Math.round(diff / (1000 * 3600 * 24));

  const daysIntoPattern = days % 70;

  if (daysIntoPattern > 55) {
    return "";
  }

  const daysIntoEightPaten = daysIntoPattern % 8;

  if (daysIntoEightPaten < 2) {
    return "D";
  }

  if (daysIntoEightPaten < 4) {
    return "N";
  }

  return "";
}

function renderShiftsForDay(
  date: Date,
  settings: IShiftSettings
): JSX.Element[] {
  const results = [];

  for (const shift of settings.enabledShifts) {
    const zeroDay = zeroDays.get(shift);

    if (!zeroDay) {
      continue;
    }

    const shiftValue = calculateShiftValue(date, zeroDay);

    if (shiftValue === "") {
      continue;
    }

    results.push(<div className={styles[shift]}>{shiftValue}</div>);
  }

  return results;
}

function renderDaysOfTheWeek(): JSX.Element {
  const cells = daysOfTheWeek.map((i) => <Cell header={i}></Cell>);

  return <Row>{cells}</Row>;
}

function renderShiftsForMonth(
  date: Date,
  settings: IShiftSettings
): JSX.Element[] {
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  let firstDay = date.getDay() - 1;
  if (firstDay < 0) {
    firstDay = 6;
  }

  const rows = [];

  for (let row = 0; row < 6; row++) {
    const week = [];

    for (let dayOfTheWeek = 0; dayOfTheWeek < 7; dayOfTheWeek++) {
      const day = row * 7 + dayOfTheWeek + 1 - firstDay;

      if (day < 1 || day > daysInMonth) {
        week.push(<Cell></Cell>);
        continue;
      }

      const shiftResult = renderShiftsForDay(
        new Date(date.getFullYear(), date.getMonth(), day),
        settings
      );

      week.push(<Cell header={day.toString()}>{shiftResult}</Cell>);
    }

    rows.push(<Row>{week}</Row>);
  }

  return rows;
}

export function ShiftTable({ settings }: { settings: IShiftSettings }) {
  const date = new Date();

  const rows = [renderDaysOfTheWeek(), ...renderShiftsForMonth(date, settings)];

  return <Grid>{rows}</Grid>;
}
