import Switch from "@mui/material/Switch";
import { Shift } from "./shiftTable";

export const allShifts: ReadonlyArray<Shift> = [
  "blue",
  "green",
  "purple",
  "red",
  "yellow",
];

interface IShiftSettingsProps {
  enabledShifts: ReadonlyArray<string>;
}

export function ShiftSettings({ enabledShifts }: IShiftSettingsProps) {
  const shiftSettings = allShifts.map((i) => (
    <section key={i}>
      <div>{i}</div>
      <Switch defaultChecked={enabledShifts.includes(i)} />
    </section>
  ));

  return shiftSettings;
}
