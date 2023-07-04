import styles from "./shiftSettings.module.css";

import Switch from "@mui/material/Switch";
import { Shift } from "./shiftTable";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const allShifts: ReadonlyArray<Shift> = [
  "blue",
  "green",
  "purple",
  "red",
  "yellow",
];

interface IShiftSettingsProps {
  enabledShifts: ReadonlyArray<Shift>;
  onEnabledShiftsChange: (enabledShifts: ReadonlyArray<Shift>) => void;
  onCloseClick: () => void;
}

function capitalise(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1, word.length);
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

    props.onEnabledShiftsChange(shifts);
  };

  const shiftSettings = allShifts.map((i) => (
    <section key={i} className={styles["shift-setting"]}>
      <div>{capitalise(i)}</div>
      <Switch
        data-shift={i}
        checked={props.enabledShifts.includes(i)}
        onChange={onEnabledShiftsChanged}
      />
    </section>
  ));

  return (
    <div>
      <div className={styles["close-button-container"]}>
        <Button
          variant="outlined"
          color="inherit"
          className={styles["close-button"]}
          onClick={props.onCloseClick}
          endIcon={<CloseIcon></CloseIcon>}
        >
          Close
        </Button>
      </div>
      <div className={styles["shift-settings-container"]}>{shiftSettings}</div>
    </div>
  );
}
