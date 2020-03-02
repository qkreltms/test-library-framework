import React, { useState, useCallback } from "react";
import SimpleButton from "./simpleButton";

interface CounterProps {}

const Counter: React.FC<CounterProps> = () => {
  const [cnt, setCnt] = useState(0);

  const onIncrease = useCallback(() => {
    setCnt(cnt + 1);
  }, [cnt]);

  const onDecrease = useCallback(() => {
    setCnt(cnt - 1);
  }, [cnt]);

  return (
    <div>
      <h2 data-testid="cnt">{cnt}</h2>
      <SimpleButton data-testid="increase" onClick={onIncrease}>+1</SimpleButton>
      <SimpleButton data-testid="decrease" onClick={onDecrease}>-1</SimpleButton>
    </div>
  );
};

export default Counter;
