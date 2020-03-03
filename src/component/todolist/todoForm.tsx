import React, { useState, useCallback } from "react";

export interface TodoFormProps {
  onInsert?: (value: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onInsert }) => {
  const [value, setValue] = useState("");
  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);
  const onSubmit = useCallback(
    e => {
      if (onInsert) onInsert(value);
      setValue("");
      e.preventDefault(); // 새로고침을 방지함
    },
    [onInsert, value]
  );

  return (
    <form onSubmit={onSubmit}>
      <input placeholder="할 일을 입력하세용~" value={value} onChange={onChange} />
      <button data-testid="sumitButton" type="submit">
        등록
      </button>
    </form>
  );
};

export default TodoForm;
