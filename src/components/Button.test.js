import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

test("renders its label and handles a click", () => {
  const handleClick = jest.fn();

  render(<Button onClick={handleClick}>Save changes</Button>);
  userEvent.click(screen.getByRole("button", { name: /save changes/i }));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("uses the selected visual variant", () => {
  render(<Button variant="danger">Delete</Button>);

  expect(screen.getByRole("button", { name: /delete/i })).toHaveClass(
    "ui-button--danger",
  );
});
