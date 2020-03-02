import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Counter from "./counter";

describe("<Counter />", () => {
  it("matches snapshot", () => {
    const component = render(<Counter />);
    expect(component).toMatchSnapshot();
  });

  it("check whether initial form is OK", () => {
    const component = render(<Counter />);
    component.getByText("0");
    component.getByText("+1");
    component.getByText("-1");
  });

  it("increases", () => {
    const component = render(<Counter />);
    const cnt = component.getByTestId("cnt");
    const increaseButton = component.getByTestId("increase");

    fireEvent.click(increaseButton);
    expect(cnt).toHaveTextContent("1"); // jest-dom 의 확장 matcher 사용
    expect(cnt.textContent).toBe("1"); // textContent 를 직접 비교
  });

  it("decrease", () => {
      const component = render(<Counter />);
      const cnt = component.getByTestId("cnt");
      const decreaseButton = component.getByTestId("decrease");

      fireEvent.click(decreaseButton);
      fireEvent.click(decreaseButton);

      expect(cnt).toHaveTextContent("-2");
  })
});
