import React from "react";
import "./App.css";
import SimpleButton from "./component/simpleButton";
import Profile from "./component/profile";
import Counter from "./component/counter";
import DelayedToggle from "./component/delayedToggle";
import TodoApp from "./component/todolist/todoApp";

function App() {
  return (
    <div className="App">
      <Profile username="name1" name="name1" />
      <SimpleButton>{"Click it!!"}</SimpleButton>
      <Counter />
      <DelayedToggle />
      <TodoApp />
    </div>
  );
}

export default App;
