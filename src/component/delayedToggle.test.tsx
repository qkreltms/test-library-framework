import React from "react";
import DelayedToggle from "./delayedToggle";
import {
  render,
  fireEvent,
  wait,
  waitForElement,
  waitForDomChange,
  waitForElementToBeRemoved
} from "@testing-library/react";

describe("<DelayedToggle />", () => {
  /**
   * NOTE: 각 기다리는 함수는 timeout이 default 값 4500ms로 설정되어있음
   */
  it("reveals text when toggle is ON", async () => {
    const { getByText } = render(<DelayedToggle />);
    const toggleButton = getByText("토글");
    fireEvent.click(toggleButton);
    // wait함수는 콜백 안의 함수가 에러가 발생시키지 않을 때 까지 기다림
    await wait(() => getByText("야호!!"));
  });

  it("toggles text ON/OFF", async () => {
    const { getByText } = render(<DelayedToggle />);
    const toggleButton = getByText("토글");
    fireEvent.click(toggleButton);
    // waitForElement 함수는 특정 엘리먼트가, 나타났거나, 바뀌었거나, 사라질때까지 대기
    const text = await waitForElement(() => getByText("ON"));
    expect(text).toHaveTextContent("ON");
  });

  it("changes something when button is clicked", async () => {
    const { getByText, container } = render(<DelayedToggle />);
    const toggleButton = getByText("토글");
    fireEvent.click(toggleButton);
    // waitForDomChange의 특징은, 콜백함수가 아니라 검사하고 싶은 엘리먼트를 넣어주면 해당 엘리먼트에서 변화가 발생 할 때 까지 기다려줌.
    const mutations = await waitForDomChange({ container });
  });

  it("removes text when toggle is OFF", async () => {
    const { getByText, container } = render(<DelayedToggle />);
    const toggleButton = getByText("토글");
    fireEvent.click(toggleButton);
    await waitForDomChange({ container }); // ON 이 됨
    getByText("야호!!");
    fireEvent.click(toggleButton);
    // waitForElementToBeRemove는 특정 엘리먼트가 화면에서 사라질때까지 기다리는 함수.
    await waitForElementToBeRemoved(() => getByText("야호!!"));
  });
});
