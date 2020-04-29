import React from "react";
import "./App.css";
import Profile from "./component/profile";
import Counter from "./component/counter";
import DelayedToggle from "./component/delayedToggle";
import TodoApp from "./component/todolist/todoApp";
import UserProfile from "./component/userProfile";

function App() {
  return (
    <div className="App">
      <hr />
      <Profile username="name1" name="name1" />
      <hr />
      <h3>-카운터 예제-</h3>
      <Counter />
      <hr />
      <h3>-비동기 토글 버튼 예제-</h3>
      <DelayedToggle />
      <hr />
      <TodoApp />
      <hr />
      <h3>-axios로 사용자 정보가져오는 예제-</h3>
      <UserProfile id={1} />
    </div>
  );
}

export default App;
