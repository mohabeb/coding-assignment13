import { render, screen } from "@testing-library/react";
import Input from "./Input";

test("connects the visible label to the input", () => {
  render(
    <Input id="student-name" label="Student name" value="Mohamed" onChange={() => {}} />,
  );

  expect(screen.getByLabelText(/student name/i)).toHaveValue("Mohamed");
});
