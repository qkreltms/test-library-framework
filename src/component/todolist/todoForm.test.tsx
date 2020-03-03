import React from "react";
import TodoForm, { TodoFormProps } from "./todoForm";
import { fireEvent, render } from "@testing-library/react";

describe("<TodoForm />", () => {
  // https://jestjs.io/docs/en/setup-teardown#one-time-setup
  // 최초 한번만 작업후 이후 돌려쓰기 가능한 함수(beforeAll, afterAll);
  beforeAll(() => {
    console.log("beforeAll");
  });
  afterAll(() => {
    console.log("afterAll");
  });

  // 각 테스트 케이스 실행전, 후 실행됨(beforeEach, afterEach)
  beforeEach(() => {
    console.log("beforeEach");
  });
  afterEach(() => {
    console.log("afterEach");
  });

  const setup = (props: TodoFormProps = {}) => {
    const utils = render(<TodoForm {...props} />);
    const { getByText, getByPlaceholderText } = utils;
    const input = getByPlaceholderText("할 일을 입력하세용~"); // input 이 있는지 확인
    const button = getByText("등록"); // button이 있는지 확인
    return {
      ...utils,
      input,
      button
    };
  };

  it("has input and a button", () => {
    const { input, button } = setup();
    expect(input).toBeTruthy(); // 해당 값이 truthy 한 값인지 확인
    expect(button).toBeTruthy();
  });

  it("changes input", () => {
    const { input } = setup();
    fireEvent.change(input, {
      target: {
        value: "숨쉬기"
      }
    });

    expect(input).toHaveAttribute("value", "숨쉬기");
  });

  it("calls onInsert and clears input", () => {
    const onInsert = jest.fn();
    const { input, button } = setup({ onInsert });

    fireEvent.change(input, { target: { value: "숨쉬기" } });
    fireEvent.click(button);

    expect(onInsert).toBeCalledWith("숨쉬기");
    expect(input).toHaveAttribute("value", "");
  });
});
