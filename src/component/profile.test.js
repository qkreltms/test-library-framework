// https://testing-library.com/docs/guide-which-query
// https://testing-library.com/docs/dom-testing-library/cheatsheet#queries

import React from "react";
import { render } from "@testing-library/react";
import Profile from "./profile";

describe("<Profile />", () => {
  it("matches snapshot", () => {
    // 컴포넌트 렌더링 할때 render함수 사용
    const component = render(<Profile username="username1" name="name1" />);
    // container는 해당 컴포넌트의 최상위 DOM을 가리킴
    expect(component.container).toMatchSnapshot();
  });

  it("shows the props correctly", () => {
    const component = render(<Profile username="username1" name="name1" />);
    component.getByText("username1"); // username1 이라는 텍스트를 가진 엘리먼트가 있는지 확인: <b>{username}</b>&nbsp;
    component.getByText("(name1)");
    component.getAllByText(/na/); // 정규식 /na/를 통과하는 엘리먼트가 있는지 확인
  });
});
