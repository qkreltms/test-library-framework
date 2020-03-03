import React from "react";
import TodoItem, { TodoItemProps } from "./todoItem";

export interface TodoListProps {
  todos: TodoItemProps["todo"][];
  onToggle?: (id: number) => void;
  onRemove?: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onRemove }) => {
  return (
    <ul data-testid="TodoList">
      {todos.map(todo => {
        return <TodoItem todo={todo} key={todo.id} onToggle={onToggle} onRemove={onRemove} />;
      })}
    </ul>
  );
};

export default TodoList;
