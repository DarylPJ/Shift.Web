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
  enabledShifts: ReadonlyArray<Shift>;
  onEnabledShiftsChanged: (enabledShifts: ReadonlyArray<Shift>) => void;
}

export function ShiftSettings(props: IShiftSettingsProps) {
  const onEnabledShiftsChanged = (
    ev: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const element = ev.currentTarget.closest<HTMLElement>("[data-shift]");
    const shift = element?.dataset.shift as Shift;

    if (!shift) {
      return;
    }

    let shifts = [...props.enabledShifts];

    if (checked) {
      shifts.push(shift);
    } else {
      shifts = shifts.filter((i) => i !== shift);
    }

    props.onEnabledShiftsChanged(shifts);
  };

  const shiftSettings = allShifts.map((i) => (
    <section key={i}>
      <div>{i}</div>
      <Switch
        data-shift={i}
        checked={props.enabledShifts.includes(i)}
        onChange={onEnabledShiftsChanged}
      />
    </section>
  ));

  return shiftSettings;
}
