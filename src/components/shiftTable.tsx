import { Grid } from "./grid";
import { Row } from "./row";

const daysOfTheWeek: ReadonlyArray<string> = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

type shift = "blue" | "green" | "red" | "purple" | "yellow";

export interface IShiftSettings {
  enabledShifts: shift[];
}

export function ShiftTable({ settings }: { settings: IShiftSettings }) {
  const date = new Date().toISOString();

  const rows = [[...daysOfTheWeek]];

  return <Grid rows={rows}></Grid>;
}
