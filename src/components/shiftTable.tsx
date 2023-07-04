import { ShiftCell } from "./shiftCell";
import styles from "./shiftTable.module.css";

const daysOfTheWeek: ReadonlyArray<string> = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type Shift = "blue" | "green" | "red" | "purple" | "yellow";
type ShiftType = "D" | "N" | "";

const zeroDays = new Map<Shift, number>([
  ["blue", new Date(2021, 10, 1).getTime()],
  ["green", new Date(2021, 8, 6).getTime()],
  ["red", new Date(2021, 9, 18).getTime()],
  ["purple", new Date(2021, 9, 4).getTime()],
  ["yellow", new Date(2021, 8, 20).getTime()],
]);

interface IShiftSettings {
  enabledShifts: ReadonlyArray<Shift>;
  date: Date;
}

interface IShiftResult {
  shift: Shift;
  type: ShiftType;
}

function calculateShiftValue(date: Date, zeroDate: number): ShiftType {
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

function renderShiftsForDay(settings: IShiftSettings): JSX.Element[] {
  const results: IShiftResult[] = [];

  for (const shift of settings.enabledShifts) {
    const zeroDay = zeroDays.get(shift);

    if (!zeroDay) {
      continue;
    }

    const shiftValue = calculateShiftValue(settings.date, zeroDay);

    if (shiftValue === "") {
      continue;
    }

    results.push({ type: shiftValue, shift });
  }

  return results
    .sort((i, j) => i.type.localeCompare(j.type))
    .map((result) => (
      <div
        key={result.type}
        className={`${styles[result.shift]} ${styles.result}`}
      >
        {result.type}
      </div>
    ));
}

function renderDaysOfTheWeek(): JSX.Element {
  const cells = daysOfTheWeek.map((i) => (
    <ShiftCell key={i} header={i}></ShiftCell>
  ));

  return (
    <tr className={styles.cell} key={"days"}>
      {cells}
    </tr>
  );
}

function renderShiftsForMonth(settings: IShiftSettings): JSX.Element[] {
  const daysInMonth = new Date(
    settings.date.getFullYear(),
    settings.date.getMonth() + 1,
    0
  ).getDate();

  let firstDay =
    new Date(
      settings.date.getFullYear(),
      settings.date.getMonth(),
      1
    ).getDay() - 1;
  if (firstDay < 0) {
    firstDay = 6;
  }

  const rows = [];

  for (let row = 0; row < 6; row++) {
    const week = [];

    const firstDayOfWeek = row * 7 + 1 - firstDay;
    const emptyRow = firstDayOfWeek > daysInMonth;

    if (emptyRow) {
      continue;
    }

    for (let dayOfTheWeek = 0; dayOfTheWeek < 7; dayOfTheWeek++) {
      const day = row * 7 + dayOfTheWeek + 1 - firstDay;

      if (day < 1 || day > daysInMonth) {
        week.push(<ShiftCell key={day} />);
        continue;
      }

      const shiftResult = renderShiftsForDay({
        date: new Date(
          settings.date.getFullYear(),
          settings.date.getMonth(),
          day
        ),
        enabledShifts: settings.enabledShifts,
      });

      week.push(
        <ShiftCell key={day} header={day.toString()}>
          <div className={styles["result-container"]}>{shiftResult}</div>
        </ShiftCell>
      );
    }

    rows.push(
      <tr className={styles.cell} key={row}>
        {week}
      </tr>
    );
  }

  return rows;
}

export function ShiftTable(settings: IShiftSettings) {
  const rows = [renderDaysOfTheWeek(), ...renderShiftsForMonth(settings)];

  return (
    <div className={styles.content}>
      <h3 className={styles.title}>
        {monthNames[settings.date.getMonth()]} {settings.date.getFullYear()}
      </h3>
      <table className={styles.table}>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
