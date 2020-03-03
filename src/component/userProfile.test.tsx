import React from "react";
import { render, waitForElement } from "@testing-library/react";
import UserProfile from "./userProfile";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("<UserProfile />", () => {
  const axiosMock = new MockAdapter(
    axios.create({
      headers: {
        //Do something...
      }
    }),
    { delayResponse: 200 }
  ); // 200ms 가짜 딜레이 설정

  it("calls getUser API loads userData properly", async () => {
    // 해당 API 요청이 오면 응답결과를 미리 정함
    axiosMock.onGet("https://jsonplaceholder.typicode.com/users/1").reply(200, {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496"
        }
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets"
      }
    });

    const { getByText } = render(<UserProfile id={1} />);
    await waitForElement(() => getByText("로딩중..")); // 로딩중.. 문구 보여줘야함
    await waitForElement(() => getByText("Bret")); // Bret (username) 을 보여줘야함

    axiosMock.restore();
  });
});
