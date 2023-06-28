import { Cell } from "./cell";

export function Row({ cellValues }: { cellValues: string[] }) {
  return cellValues.map((i) => <Cell value={i}></Cell>);
}
