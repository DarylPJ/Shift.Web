"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { ShiftTable } from "@/components/shiftTable";
import { ShiftSettings, allShifts } from "@/components/shiftSettings";

const minimumDate = new Date(2021, 10, 1);

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);
  const [enabledShifts, setEnabledShifts] = useState(allShifts);

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

  const onSettingsButtonClick = () => setShowSettings(!showSettings);

  const oneMonthPreviousDate = new Date(date);
  oneMonthPreviousDate.setMonth(oneMonthPreviousDate.getMonth() - 1);

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
        <ShiftSettings enabledShifts={enabledShifts}></ShiftSettings>
      ) : null}
    </main>
  );
}
