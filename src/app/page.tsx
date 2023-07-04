"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Shift, ShiftTable } from "@/components/shiftTable";
import { ShiftSettings, allShifts } from "@/components/shiftSettings";
import Button from "@mui/material/Button";

const key = "enabledShifts";
const minimumDate = new Date(2021, 10, 1);

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);
  const [enabledShifts, setEnabledShifts] = useState(allShifts);
  const [localStorageReady, setLocalStorageReady] = useState(false);

  useEffect(() => {
    setLocalStorageReady(true);

    if (typeof window === "undefined") {
      setEnabledShifts(allShifts);
      return;
    }

    const shiftsToDisplay = localStorage.getItem(key)?.split(",") as Shift[];

    if (!shiftsToDisplay || !shiftsToDisplay.length) {
      setEnabledShifts(allShifts);
      return;
    }

    setEnabledShifts(shiftsToDisplay);
  }, []);

  useEffect(() => {
    localStorage.setItem(key, enabledShifts.join(","));
  }, [enabledShifts]);

  const onNextButtonClick = () => {
    const workingDate = new Date(date);
    workingDate.setMonth(workingDate.getMonth() + 1);
    setDate(workingDate);
  };

  const onPreviousButtonClick = () => {
    const workingDate = new Date(date);
    workingDate.setMonth(workingDate.getMonth() - 1);

    if (workingDate < minimumDate) {
      return;
    }

    setDate(workingDate);
  };

  const onEnabledShiftsChanged = (enabledShifts: ReadonlyArray<Shift>) =>
    setEnabledShifts(enabledShifts);

  const onSettingsButtonClick = () => setShowSettings(!showSettings);

  const oneMonthPreviousDate = new Date(date);
  oneMonthPreviousDate.setMonth(oneMonthPreviousDate.getMonth() - 1);

  if (!localStorageReady) {
    return <div></div>;
  }

  return (
    <main className={styles.main}>
      <div className={styles["button-container"]}>
        <Button
          color="inherit"
          variant="outlined"
          onClick={onPreviousButtonClick}
          disabled={oneMonthPreviousDate < minimumDate}
        >
          Previous
        </Button>
        <Button color="inherit" variant="outlined" onClick={onNextButtonClick}>
          Next
        </Button>
        <Button
          color="inherit"
          variant="outlined"
          onClick={onSettingsButtonClick}
        >
          Settings
        </Button>
      </div>
      <ShiftTable enabledShifts={enabledShifts} date={date} />
      {showSettings ? (
        <div className={styles["shift-container"]}>
          <ShiftSettings
            enabledShifts={enabledShifts}
            onEnabledShiftsChange={onEnabledShiftsChanged}
            onCloseClick={onSettingsButtonClick}
          ></ShiftSettings>
        </div>
      ) : null}
    </main>
  );
}
