import { render, screen } from "@testing-library/react";
import Alert from "./Alert";

test("announces its message using a status role", () => {
  render(<Alert title="Build status">All checks passed.</Alert>);

  expect(screen.getByRole("status")).toHaveTextContent("All checks passed.");
});
