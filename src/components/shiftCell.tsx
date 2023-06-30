import { PropsWithChildren } from "react";

interface ICellProps {
  header?: string;
}

export function ShiftCell(props: PropsWithChildren<ICellProps>) {
  return (
    <th>
      <div hidden={!props.header}>{props.header}</div>
      {props.children}
    </th>
  );
}
