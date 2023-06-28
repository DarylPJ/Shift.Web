import { Row } from "./row";

export function Grid({ rows }: { rows: string[][] }) {
  const rowElements = [];

  for (const row of rows) {
    rowElements.push(<Row cellValues={row}></Row>);
  }

  return rowElements;
}
