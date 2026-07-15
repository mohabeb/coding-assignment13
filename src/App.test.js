import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the component library and quality workflow", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: /ui garden/i })).toBeInTheDocument();
  expect(screen.getByText("Prettier")).toBeInTheDocument();
  expect(screen.getByText("ESLint")).toBeInTheDocument();
  expect(screen.getByText("Jest Tests")).toBeInTheDocument();
});
