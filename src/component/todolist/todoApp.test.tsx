import React from "react";
import TodoApp from "./todoApp";
import { render, fireEvent } from "@testing-library/react";

describe("<TodoApp />", () => {
  it("renders TodoForm and TodoList", () => {
    const { getByText, getByTestId } = render(<TodoApp />);
    getByText("등록");
    getByTestId("TodoList");
  });

  it("renders two defaults todos", () => {
    const { getByText } = render(<TodoApp />);
    getByText("TDD 배우기");
    getByText("react-testing-library 사용하기");
  });

  test("add todo", () => {
    const component = render(<TodoApp />);
    const todoText = "Do nothing...";

    // 1. 입력
    fireEvent.change(component.getByPlaceholderText("할 일을 입력하세용~"), {
      target: {
        value: todoText,
      },
    });

    // 2. 버튼 클릭으로 todo 추가
    fireEvent.click(component.getByTestId("sumitButton"));

    // 3. 추가 됐는지 확인
    component.getByText(todoText);
  });

  it("excutes toggle", () => {
    const component = render(<TodoApp />);

    // 1. 이미 초기값으로 있는 DOM 가져오기
    const todoText = component.getByText("TDD 배우기");
    // 2. 초기 상태 확인
    expect(todoText).toHaveStyle("text-decoration: line-through;");
    // 3. 가져온 DOM 클릭
    fireEvent.click(todoText);
    // 4. 가운데 선이 없는지 확인
    expect(todoText).not.toHaveStyle("text-decoration: line-through;");
    // 5. 한번더 클릭
    fireEvent.click(todoText);
    // 6. 줄이 그어졌는지 확인
    expect(todoText).toHaveStyle("text-decoration: line-through;");
  });

  it("removes todo", () => {
    const { getByText } = render(<TodoApp />);
    const todoText = getByText("TDD 배우기");

    const removeButton = todoText.nextSibling;
    expect(removeButton).toBeDefined();

    if (removeButton) {
      fireEvent.click(removeButton);
      expect(todoText).not.toBeInTheDocument(); // 페이지에서 사라졌음을 의미함
      // OR You can also use these
      /**
       * const removedText = queryByText('TDD 배우기');
       * expect(removedText).toBeNull();
       **/
    }
  });

  test("delete todo", () => {});
});
