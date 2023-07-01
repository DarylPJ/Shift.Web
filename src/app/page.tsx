"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Shift, ShiftTable } from "@/components/shiftTable";
import { ShiftSettings, allShifts } from "@/components/shiftSettings";

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
      <button
        onClick={onPreviousButtonClick}
        disabled={oneMonthPreviousDate < minimumDate}
      >
        Previous
      </button>
      <button onClick={onNextButtonClick}>Next</button>
      <button onClick={onSettingsButtonClick}>Settings</button>
      <ShiftTable enabledShifts={enabledShifts} date={date} />
      {showSettings ? (
        <ShiftSettings
          enabledShifts={enabledShifts}
          onEnabledShiftsChanged={onEnabledShiftsChanged}
        ></ShiftSettings>
      ) : null}
    </main>
  );
}
