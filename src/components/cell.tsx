import { PropsWithChildren } from "react";

interface ICellProps {
  header?: string;
}

export function Cell(props: PropsWithChildren<ICellProps>) {
  return (
    <div>
      <div hidden={!props.header}>{props.header}</div>
      {props.children}
    </div>
  );
}
