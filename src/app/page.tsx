"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { Shift, ShiftTable } from "@/components/shiftTable";

const defaultShifts: ReadonlyArray<Shift> = [
  "blue",
  "green",
  "purple",
  "red",
  "yellow",
];

const minimumDate = new Date(2021, 10, 1);

export default function Home() {
  const [date, setDate] = useState(new Date());

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
      <ShiftTable enabledShifts={[...defaultShifts]} date={date} />
    </main>
  );
}
