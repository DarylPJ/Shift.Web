import styles from "./page.module.css";
import { IShiftSettings, ShiftTable } from "@/components/shiftTable";

const defaultSettings: IShiftSettings = {
  enabledShifts: ["blue", "green", "purple", "red", "yellow"],
};

export default function Home() {
  return (
    <main className={styles.main}>
      <ShiftTable settings={defaultSettings} />
    </main>
  );
}
