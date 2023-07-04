import styles from "./shiftCell.module.css";

import { PropsWithChildren } from "react";

interface ICellProps {
  header?: string;
  hidden?: boolean;
}

export function ShiftCell(props: PropsWithChildren<ICellProps>) {
  return (
    <th className={styles.cell}>
      <div className={styles["cell-container"]}>
        <div hidden={!props.header}>{props.header}</div>
        {props.children}
      </div>
    </th>
  );
}
