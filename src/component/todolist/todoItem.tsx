import React from "react";

export interface TodoItemProps {
  todo: { id: number; text: string; done: boolean };
  onToggle?: (id: number) => void;
  onRemove?: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onRemove }) => {
  const { id, text, done } = todo;

  return (
    <li>
      <span
        data-testid="todoItem-span"
        style={{
          textDecoration: done ? "line-through" : "none",
        }}
        onClick={() => onToggle && onToggle(id)}
      >
        {text}
      </span>

      <button onClick={() => onRemove && onRemove(id)}>삭제</button>
    </li>
  );
};

export default TodoItem;
