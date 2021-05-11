import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Bisection from "./Method/Bisection";

it("test Bisection", () => {
  render(<Bisection />);
  expect(screen.getByText("Bisection Method")).toBeInTheDocument();
});
