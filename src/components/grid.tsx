import { PropsWithChildren } from "react";
import { Row } from "./row";

export function Grid(props: PropsWithChildren) {
  return <div>{props.children}</div>;
}
