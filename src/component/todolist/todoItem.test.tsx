import React from "react";
import TodoItem, { TodoItemProps } from "./todoItem";
import { fireEvent, render } from "@testing-library/react";

describe("<TodoItem/>", () => {
  const todoItemData = {
    id: 1,
    text: "TDD 배우기",
    done: false
  };

  const setup = (props: TodoItemProps = { todo: todoItemData }) => {
    const component = render(<TodoItem {...props} />);
    const { getByText } = component;
    const span = getByText(props.todo.text);
    const button = getByText("삭제");
    return {
      ...component,
      span,
      button
    };
  };

  it("has span and button", () => {
    const { span, button } = setup();
    expect(span).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it("shows line-through on span when done is true", () => {
    const { span } = setup({ todo: { ...todoItemData, done: true } });
    expect(span).toHaveStyle("text-decoration: line-through;");
  });

  it("does not show line-through on span when done is false", () => {
    const { span } = setup({ todo: { ...todoItemData, done: false } });
    expect(span).not.toHaveStyle("text-decoration: line-through;");
  });

  it("calls onToggle", () => {
    const onToggle = jest.fn();
    const { span } = setup({ todo: todoItemData, onToggle });
    fireEvent.click(span);

    // 전달된 함수 (onToggle)에 인자를 넣어준다.
    expect(onToggle).toBeCalledWith(todoItemData.id);
  });

  it("calls onRemove", () => {
    const onRemove = jest.fn();
    const { button } = setup({ todo: todoItemData, onRemove });
    fireEvent.click(button);
    expect(onRemove).toBeCalledWith(todoItemData.id);
  });
});
