
Jest and React-testing-library test coverage

```
 PASS  src/component/counter.test.js
 PASS  src/component/profile.test.js
 PASS  src/component/todolist/todoApp.test.tsx
 PASS  src/component/userProfile.test.tsx
 PASS  src/component/delayedToggle.test.tsx (7.018s)
------------------------|----------|----------|----------|----------|-------------------|
File                    |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
------------------------|----------|----------|----------|----------|-------------------|
All files               |    92.86 |    88.89 |     96.3 |    93.75 |                   |
 src                    |        0 |      100 |        0 |        0 |                   |
  App.tsx               |        0 |      100 |        0 |        0 |                11 |
  index.tsx             |        0 |      100 |      100 |        0 |              7,12 |
  react-app-env.d.ts    |        0 |        0 |        0 |        0 |                   |
 src/component          |    94.44 |     87.5 |      100 |    96.97 |                   |
  counter.tsx           |      100 |      100 |      100 |      100 |                   |
  delayedToggle.tsx     |      100 |      100 |      100 |      100 |                   |
  profile.tsx           |      100 |      100 |      100 |      100 |                   |
  simpleButton.tsx      |      100 |      100 |      100 |      100 |                   |
  userProfile.tsx       |    88.89 |       75 |      100 |    93.75 |                18 |
 src/component/todolist |      100 |       90 |      100 |      100 |                   |
  todoApp.tsx           |      100 |      100 |      100 |      100 |                   |
  todoForm.tsx          |      100 |       50 |      100 |      100 |                14 |
  todoItem.tsx          |      100 |      100 |      100 |      100 |                   |
  todoList.tsx          |      100 |      100 |      100 |      100 |                   |
------------------------|----------|----------|----------|----------|-------------------|

Test Suites: 8 passed, 8 total
Tests:       27 passed, 27 total
Snapshots:   2 passed, 2 total
Time:        9.644s
Ran all test suites.
Done in 10.79s.

```

  

Cypress test coverage

```
Configure is not all set.
Move to: coverage/lcov-report/stc/component

=============================== Coverage summary ===============================
Statements   : Unknown% ( 0/0 )
Branches     : Unknown% ( 0/0 )
Functions    : Unknown% ( 0/0 )
Lines        : Unknown% ( 0/0 )
================================================================================
```

  

# 테스트 라이브러리/프레임워크 조사

저자: [qkreltms](https://github.com/qkreltms)

  

## 개요

점점 커지는 프로젝트를 진행하면서 유닛 테스트의 중요성이 주목받고 있다. 매 순간 코드를 수정할 때 예상치 못한 사이드 이펙트와 버그가 무엇이 있으며 이것을 알아보기 위해 결과물을 확인한다. 이것의 비용은 프로젝트의 규모에 비례해 증가하고 있으며 어느 순간부터는 개발 속도가 급격히 느려진다.  [참고](https://stackoverflow.com/questions/67299/is-unit-testing-worth-the-effort)
이것의 한 가지 강력한 대비책은 테스트 자동화를 통해 개발에 집중할 수 있는 환경을 만드는 것이다.

이 글에서는 테스트 라이브러리에서 사용되는 용어를 알아본 후 추세의 선두에 있는 테스트 라이브러리 Mocha, Enzyme, Jest, React-testing-library(이하 RTL로 지칭), Cypress를 알아본다.

또한, 이 중 두 조합 Jest + RTL, Cypress를 예제를 통해 진행하며 비교한 후 최종적으로 어떤 테스트 라이브러리를 사용하면 좋은지 결과를 도출한다

## 용어설명:

1. **Out of box**: 별도의 설정, 설치 없이 바로 설정 가능
테스트 프레임워크 Mocha는 별도의 Mocking, Spy library를 골라 설치해 사용해 사용자가 자유롭게 선택할 수 있다는 장점이 있는 반면 번거로운 환경 설정과 개발 환경 파편화는 사용자를 골치 아프게 한다.
반면 Jest의 경우 따로 설치할 필요 없이 모든 라이브러리가 내장되어있다(Out of box).
또한, Jest와 RTL의 경우 CRA에 내장되어있어 별도의 설치, 환경 설정 없이 바로 진행할 수 있다.

2. **Snapshot testing**: 사전에 특정 컴포넌트, 페이지 등의 랜더링된 결과물을 찍어 놓고 이후에 새로운 랜더링 결과물과 차이가 있는지 비교한다.
```js
// src/component/counter.test.js
it("matches snapshot", () => {
  const component = render(<Counter />);
  expect(component).toMatchSnapshot();
});
```

위의 코드가 최초 작성 시에 Counter 컴포넌트의 Snapshot을 특정 폴더에 자동으로 저장해 놓고 테스트가 실행될 때마다 미리 저장된 Snapshot과 다른 점이 있는지 비교한다.

만약 Counter 컴포넌트가 변경되었고 Snapshot을 업데이트하고 싶다면 특정 명령어를 입력해 업데이트한다.
Jest의 경우에는 다음의 명령어로 가능하다: ```jest --updateSnapshot```

추가로 RTL의 창시자인 [Kent C. Dodds](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering)에 따르면 매번 컴포넌트를 하다 보면 Snapshot이 달라지기 때문에 사람들이 snapshot 업데이트를 걱정 없이 하므로 Snapshot 테스트를 거의 사용하지 않는다고 한다.

1. **Full Rendering**: 실제 DOM을 갖고 랜더링한다. 이로인해서 유저가 실제로 확인하는 DOM을 갖고 테스트가 가능하다. [참고](https://github.com/enzymejs/enzyme/blob/master/docs/api/mount.md)
   
2. **Shallow Rendering**: 컴포넌트 내부에 또다른 리액트 컴포넌트가 있다면 이를 렌더링하지 않는다. [참고](https://velog.io/@velopert/react-testing-with-enzyme)

만약 아래의 컴포넌트가 있을 때
```js
// https://velog.io/@velopert/react-testing-with-enzyme
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    number: 0 || this.props.number
  };
  handleIncrease = () => {
    this.setState({
      number: this.state.number + 1
    });
  };
  handleDecrease = () => {
    this.setState({
      number: this.state.number - 1
    });
  };
  render() {
    return (
      <div>
        <h2>{this.state.number}</h2>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
      </div>
    );
  }
}
```

아래와 같이 테스트를 진행한다면
```js
import React from 'react';
import { shallow } from 'enzyme';
import Counter from './Counter';

describe('<Counter />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<Counter />);
    expect(wrapper).toMatchSnapshot();
  });
  // test는 it과 동일한 역할을 수행한다.
  test('has initial props', () => {
    const wrapper = shallow(<Counter />);
    expect(wrapper.props().number).toBe(0);
  });
  it('has initial number', () => {
    const wrapper = shallow(<Counter />);
    expect(wrapper.state().number).toBe(0);
  });
  it('increases', () => {
    const wrapper = shallow(<Counter />);
    wrapper.instance().handleIncrease();
    expect(wrapper.state().number).toBe(1);
  });
  it('decreases', () => {
    const wrapper = shallow(<Counter />);
    wrapper.instance().handleDecrease();
    expect(wrapper.state().number).toBe(-1);
  });
  it('calls handleIncrease', () => {
     // 클릭이벤트를 시뮬레이트하고, state 를 확인
    const wrapper = shallow(<Counter />);
    const plusButton = wrapper.findWhere(
      node => node.type() === 'button' && node.text() === '+1'
     );
    plusButton.simulate('click');
    expect(wrapper.state().number).toBe(1);
   });
});
```

실제 랜더링되는 ```<Counter/>```는 다음과 같다.
```js
   // Jest Snapshot v1, https://goo.gl/fbAQLP

   exports[`<Counter /> matches snapshot 1`] = `
   <div>
     <h2>
       0
     </h2>
     <button
       onClick={[Function]}
     >
       +1
     </button>
     <button
       onClick={[Function]}
     >
       -1
     </button>
     <Profile
       name="김민준"
       username="velopert"
     />
 // Full Rendering의 경우에는 하위까지 보여짐  
 //   <Profile
 //   name="김민준"
 //   username="velopert"
 // >
 //   <div>
 //     <b>
 //       velopert
 //     </b>
      
 //     <span>
 //       (
 //       김민준
 //       )
 //     </span>
 //   </div>
 // </Profile>
   </div>
   `;
```

**장점**
1. 컴포넌트 안의 함수를 호출해 테스트가 가능하다.
2. 모든 DOM을 렌더링 하지 않아서 빠르다.
3. 하위 component는 랜더링 되지 않기 때문에 어떠한 의존성 없이 테스트가 가능하다. 예: ```하위 컴포넌트에서 componentWillRerecieve를 통한 상위 컴포넌트 state 변경``` 
   
**단점**
1. 실제 렌더링 결과에는 영향을 끼치지 않는 리펙토링 과정에서 함수의 이름이 변경될 때마다 테스트 코드를 수정해야하며 예를 들어 ```props.isShow```가 true가 될 때 특정한 DOM이 보여지고 isShow 값이 제대로 나왔는지 판별한다고 가정했을 때 값이 true인 것은 확인할 수 있으나 실제로 DOM이 보여지는 상태인지 확인 할 수 없다.
2. Milliseconds 단위로 빨라지기 때문에 무시할 만한 수준이다.
3. 하위 컴포넌트를 포함한 렌더링이 이뤄져야 실제로 유저가 볼 수 있는 모든 작동을 확인하고 검증이 가능하다. 

추가적으로 Shallow rendering의 경우 [RTL에서는 권장하지 않는 방법이다.](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering)


5. **Mock**: 모의 객체라는 뜻이 있으며 실제 사용하는 모듈을 사용하지 않고 그것을 흉내내는 가짜 모듈을 작성하여 테스트의 효용성을 높이는데 사용한다. [참고](https://ko.wikipedia.org/wiki/%EB%AA%A8%EC%9D%98_%EA%B0%9D%EC%B2%B4)
   
6. **Spy**: 함수 추적.

위의 2가지를 사용해 항상 원하는 값을 반환하도록 할 수 있으며 API call에 사용된다면 함수와 동일하게 특정한 URL에 대해서 항상 동일한 결과물을 반환하도록 할 수 있다.
또한, **어떤 일들이 발생했는지를 기억할 수 있기 때문에 내부적으로 어떻게 사용되는지 검증할 수 있다.** [참고](https://www.daleseo.com/jest-fn-spy-on/)

```js
// https://jestjs.io/docs/en/mock-functions.html

// mockImplementation을 어디에 사용하면 좋을지 곰곰히 생각해본 결과
// 만약 어떤 함수에 인자로 콜백함수가 있고 그 콜백함수를 추적 및 원하는 값을 반환하도록 하고 싶을때 

// foo is a mock function
foo.mockImplementation(() => 42);
foo();
```
```js
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2);

// The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[0][0]).toBe(0);

// The first argument of the second call to the function was 1
expect(mockCallback.mock.calls[1][0]).toBe(1);

// The return value of the first call to the function was 42
expect(mockCallback.mock.results[0].value).toBe(42);
```

```js
// https://github.com/ctimmerm/axios-mock-adapter
// 만약 어떤 함수 또는 컴포넌트가 있고 api 요청을 통해 값을 받는다면 그 요청을 mock이 대신할 수 있다.
// 이것의 장점은 실제 api를 사용하지 않고, 항상 예측가능한, 일관된 데이터를 반환한다는 점.

var mock = new MockAdapter(axios);
// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet('/users').reply(200, {
users: [
    { id: 1, name: 'John Smith' }
  ]
});
axios.get('/users')
  .then(function(response) {
    console.log(response.data);
});
```

```js
// https://jestjs.io/docs/en/es6-class-mocks#spying-on-the-constructor
import SoundPlayer from './sound-player';
jest.mock('./sound-player');
// 이제 ./sound-player 를 추적할 수 있다.
```

이메일과 문자를 보낼 때 사용하는 messageService라는 자바스크립트 모듈이 있다고 가정해보겠습니다.
이렇게 외부 매체를 통해 메세지를 보내는 작업은 어플리케이션에서 수시로 일어날 수 있지만, 단위 테스트 측며에서는 모킹 기법 없이는 처리가 매우 끼다로운 대표적인 케이스 중 하나입니다.
왜냐하면, 일반적으로 이메일과 문자는 외부 서비스를 이용하는 경우가 많아서 테스트 실행 시 마다 불필요한 과금 발생할 수 있고, 해당 외부 서비스에 장애가 발생하면 관련 테스트가 모두 깨지는 불상사가 발생할 수 있기 때문입니다. [참고](https://www.daleseo.com/jest-mock-modules/)
```js
// messageService.js
export function sendEmail(email, message) {
  /* 이메일 보내는 코드 */
}

export function sendSMS(phone, message) {
  /* 문자를 보내는 코드 */
}
//////////////////////
// userService.js
import { sendEmail, sendSMS } from './messageService';

export function register(user) {
  /* DB에 회원 추가 */
  const message = '회원 가입을 환영합니다!';
  sendEmail(user.email, message);
  sendSMS(user.phone, message);
}

export function deregister(user) {
  /* DB에 회원 삭제 */
  const message = '탈퇴 처리 되었습니다.';
  sendEmail(user.email, message);
  sendSMS(user.phone, message);
}
//////////////////////


import { register, deregister } from './userService';
import * as messageService from './messageService';

// 이제 messageService 오브젝트안의 함수를 추적한다.
messageService.sendEmail = jest.fn();
messageService.sendSMS = jest.fn();

const sendEmail = messageService.sendEmail;
const sendSMS = messageService.sendSMS;

describe("", () => {
   beforeEach(() => {
     sendEmail.mockClear();
     sendSMS.mockClear();
   });

   const user = {
     email: 'test@email.com',
     phone: '012-345-6789'
   };

   it('register sends messeges', () => {
     // register 함수를 실행한다. 
     // register 안에서 sendEmail, sendSMS 함수를 호출하고 이 두 함수는 위에서 추적이 가능하게 했으므로 추적해 값을 테스트한다.
     register(user);

     expect(sendEmail).toBeCalledTimes(1);
     expect(sendEmail).toBeCalledWith(user.email, '회원 가입을 환영합니다!');

     expect(sendSMS).toBeCalledTimes(1);
     expect(sendSMS).toBeCalledWith(user.phone, '회원 가입을 환영합니다!');
   });

   it('deregister sends messaes', () => {
     deregister(user);

     expect(sendEmail).toBeCalledTimes(1);
     expect(sendEmail).toBeCalledWith(user.email, '탈퇴 처리 되었습니다.');

     expect(sendSMS).toBeCalledTimes(1);
     expect(sendSMS).toBeCalledWith(user.phone, '탈퇴 처리 되었습니다.');
   });
});
```

```js
describe("Test! mocks", () => {

   const myObj = {
     doSomething() {
       console.log('does something');
     }
   };

   it('stub .toBeCalled()', () => {
     const stub = jest.fn();
     stub();
     expect(stub).toBeCalled();
   });
   it('spyOn .toBeCalled()', () => {
     const somethingSpy = jest.spyOn(myObj, 'doSomething');
     myObj.doSomething();
     expect(somethingSpy).toBeCalled();
   });
});
```

**장점**
함수에 사용한다면 항상 원하는 값을 반환하도록 할 수 있으며 API call에 사용된다면 함수와 동일하게 특정한 URL에 대해서 항상 동일한 결과물을 반환하도록 할 수 있다.
또한, **어떤 일들이 발생했는지를 기억할 수 있기 때문에 내부적으로 어떻게 사용되는지 검증할 수 있다.** [참고](https://www.daleseo.com/jest-fn-spy-on/)

**단점**
(?)


### 인기있는 테스트 프레임워크/라이브러리

#### 1. Mocha

⭐19.1k(20-03-05 기준)

과거 수년간 가장 인기 많았던 테스트 프레임워크 모카는 사용자가 원하는 Assertion, Snapshot, Mocking, Spy library를 선택할 수 있다는 유연함이 있다는 반면 초심자에게는 까다로울 수 있는 환경 설정, 다양한 라이브러리의 사용으로 인해 유저 마다 다른 라이브러리 선택으로 인한 파편화의 단점이 있다.

설계 특성상 각각의 테스트 케이스는 동기적(Synchronouse)으로 작동하고 독립적인 환경을 구성하지 않고 있으며 이에 따라 원치않는 사이드이펙트 문제가 발생할 수도 있다.
```js
// https://heropy.blog/2018/03/16/mocha/
const should = require('chai').should();
const app = require('../app');

describe('Testing 1', function () {
  it('should return hello', function () {
    app.sayHello().should.equal('hello');
  });
});
```

**장점**
1. Assertion, Snapshot 등 원하는 라이브러리 선택해 사용가능
2. 수년간 가장 인기 많은 테스트 프레임워크 

**단점**
1. 각 테스트 케이스 마다 독립적인 환경이 아니어서 원치않는 사이드이펙트 문제가 발생할 수 있음

#### 2. Jest

⭐ 29.9k

기본적으로 Out of box이며 Mocha와 다르게 각 테스트 케이스는 병렬적으로 작동하므로 어느정도 속도의 향상을 가져올 수 있다.

또한 각 테스트 케이스를 독립적으로 돌리기 위해서 Virtual machine을 사용한다. 독립적이라는 장점을 가져올 수 있는 반면 테스트 매 사용시마다 모듈을 새로 Import 다시 하므로 테스트 속도가 느려질 수 있는 것으로 보이지만 Jest에서 추가적으로 제공하는 기능(setupTests.js에서 모듈을 불러오면 Global로 사용함)을 통해 해결할 수 있는 것으로 보인다.

```js
describe('Testing 1', () => {
  it('Test case title: HelloWorld', () => {
    expect(str).toBe('Hello World');
  });
});
```

**장점**
1. 각 테스트 케이스는 독립적 (VM 사용)
2. 각 테스트 케이스는 병렬적으로 작동해 어느정도 속도 향상이 있을 수 있음
3. 현재 가장 인기 많은 테스트 프레임워크
4. 기본적으로 Out of Box이므로 따로 환경설정이 필요하지 않음
5. Facebook에서 유지보수

**단점**
1. 각 테스트 케이스가 독립적이므로 매번 모듈을 새로 가져와서 속도가 느릴수 있음
  

#### 3. Enzyme

⭐ 18.5k

가상의 환경 JDOM에서 컴포넌트를 렌더링할 수 있는 기능을 제공하며 DOM과 상호작용이 정상적인지 테스트가 가능하며 주로 컴포넌트에서 어떤 값이 오가는지 판별할 때 사용되는 것으로 보인다.

```js
// https://enzymejs.github.io/enzyme/
// 컴포넌트의 props에 접근해 값을 판별한다.
describe('<Foo />', () => {
  it('allows us to set props', () => {
    const wrapper = mount(<Foo bar="baz" />);
    expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({ bar: 'foo' });
    expect(wrapper.props().bar).to.equal('foo');
  });
});
```

**장점** 
1. 컴포넌트를 테스트하는데 가장 많은 기능을 지원하는 라이브러리
2. 그 중 인기가 가장 많음
3. AirBnB에서 지원함
   
**단점**
1. 기능이 많은 만큼 RTL에 비해 러닝커브가 있음
  

#### 4. RTL

⭐ 10.9k

유저 관점의 보여지는 결과에 초점을 맞춤.

일반적으로 Enzyme보다 쉽다고 여겨짐.

> RTL 에서는 Enzyme 과 달리 모든 테스트를 DOM 위주로 진행합니다. 그리고, 컴포넌트의 props 나 state 를 조회하는 일은 없습니다. 컴포넌트를 리팩토링하게 될 때에는, 주로 내부 구조 및 네이밍은
> 많이 바뀔 수 있어도 실제 작동 방식은 크게 바뀌지 않습니다. 
RTL는 이 점을 중요시 여겨서, 컴포넌트의 기능이 똑같이 작동한다면 컴포넌트의 내부 구현 방식이 많이 바뀌어도 테스트가 실패하지 않도록 설계되었습니다.
 추가적으로, Enzyme 은 엄청나게 다양한 기능을 제공하는 반면, RTL 에는 정말 필요한 기능들만 지원을 해줘서 매우 가볍고, 개발자들이 일관성 있고 좋은 관습을 따르는 테스트 코드를
> 작성 할 수 있도록 유도해줍니다. [참고](https://velog.io/@velopert/react-testing-library)
```js
// https://velog.io/@velopert/react-testing-library
Profile = ({ username, name }) => {
  return (
    <div>
    <b>{username}</b>&nbsp;
    <span>({name})</span>
    </div>
  );
};
////////////////////////////////////
import React from 'react';
import { render } from 'react-testing-library';
import Profile from './Profile';

describe('<Profile />', () => {
  it('matches snapshot', () => {
    const utils = render(<Profile username="velopert" name="김민준" />);
    expect(utils.container).toMatchSnapshot();
  });

  it('shows the props correctly', () => {
    const utils = render(<Profile username="velopert" name="김민준" />);
    utils.getByText('velopert'); // velopert 라는 텍스트를 가진 엘리먼트가 있는지 확인
    utils.getByText('(김민준)'); // (김민준) 이라는 텍스트를 가진 엘리먼트가 있는지 확인
    utils.getByText(/김/); // 정규식 /김/ 을 통과하는 엘리먼트가 있는지 확인
  });
});
```

**장점**
1. 유저의 관점에서 작성된 라이브러리 
2. Enzyme에 비해 낮은 러닝커브
3. 정말 필요한 것만 포함하여 가벼운 라이브러리

**단점**
1. 가볍다는 것은 기능이 많지 않다는 것을 의미함

#### 5. Cypress

⭐ 18.8k

기본적으로 RTL과 비슷하며 이것 또한 사용자의 입장에서 테스트 진행.
가장 좋은 점은 각각의 테스트 케이스가 어떻게 진행됐는지 눈으로 확인이 가능하다.
한 파일 안의 테스트 케이스들은 동기적으로 실행되지만 각 페이지 별로 실행함으로써 병렬적으로 실행 가능하다.
DOM을 get할 때 4초간 기다림 및 자동적으로 Retry 하며 Mocha를 사용한다.
Mocha를 사용한다.

```js
describe("<Button />", function() {
  it("click", function() {
    cy.get("button").click();
  })

  it("get Text", function() {
    cy.get("button").should("have.text", "클릭!");
  })
})
```

**장점**
1. 읽기 쉬운 테스트 코드 - 각 테스트 케이스는 동기적으로 실행되며, chaning 패턴을 사용함
2. 어렵지 않은 난이도 - 기본적으로 DOM을 가져올 때 자동적으로 4초간 기다림, 마지막 줄이 실패시 자동적으로 4초간 Retry함 
3. 문서가 잘 작성되어있음
4. 유저의 관점에서 작성된 라이브러리 

**단점**
1. 실제로 TodoApp 테스트 케이스 작성시에도 발견할 수 있는 [버그](https://github.com/cypress-io/cypress/issues/6636)가 존재
2. 완벽하지 않은 Typescript 지원
3. Jest + RTL에 비해 많지 않은 예제
4. Typescript, React, Test coverage를 지원시 환경 설정의 까다로움이 존재

## 트랜드

![trand1](./trand%20horizontal.png)

![trand2](./trand%20quadrant.png)


## 최종 선택

1. **Cypress**
2. **Jest + RTL**
  

**선택의 우선순위**
 
1. 테스트가 메인은 아님으로 쉬우면서 빠르게 작성가능 하면 좋겠다.
2. Stackoverflow에 질문하면 답변이 잘 되는, 대부분이 사용하는 테스트 라이브러리이면 좋겠다.
3. 실제 DOM이 어떻게 작동되는지 테스트 하고 싶다.

### 조합 1. Cypress

**선택의 이유**

1. DOM 위주의 테스트
2. 최근 뜨겁게 떠오르고 있음
4. 단점에도 불구하고 위의 나열된 테스트 프레임워크/라이브러리 중 가장 쉽게 익힐수 있으며 일반적으로 가장 짧은 코드로 사용이 가능하다.
5. ```cy.get(...).should(...).and(...).should(...)``` 와 같이 체이닝 패턴으로 쉽게 이해가 가능하며 각각의 케이스는 동기적으로 실행되 코드를 읽고 쉽게 이해가 가능하다.
6. 어떤 DOM을 선택하고 이벤트가 이뤄졌는지 쉽게 확인이 가능하다.

Cypress를 설치하면 자동적으로 폴더가 생성되는데 이 폴더의 구조를 설명한다.

```
/cypress
  /fixtures - Asset을 저장하는 공간. 여기에 저장할 경우 cy.fixture(filePath)와 같은 형식으로 불러올수 있음
    - example.json

  /integration - 실제 테스트 코드가 위치하는 공간
  /plugins
  /support - 각 테스트 코드가 실행되기전 거치는 공간. Global로 무언가를 실행 시키고 싶을때 사용.
```

#### 실사용 예제
**예제 위치** /cypress
**실행**: ```yarn cypress 또는 yarn cypress:runCli```

### 조합 2. Jest + RTL

**선택의 이유**

1. DOM위주의 테스트 진행시 가장 일반적으로 사용되는 조합.
2. Enzyme 보다는 RTL이 일반적으로 더 쉽다고 여겨지므로.

#### 실사용 예제
**예제**: src/component

**실행**: ```yarn test```


## 결론

### **Cypress**

여러 단점이 있음에도 불구하고 우선순위의 첫 번째인

1. **테스트가 메인은 아님으로 쉬우면서 빠르게 작성가능 하면 좋겠다.**

에 가장 알맞다고 생각되며 우선순의 두 번째인

2. **Stackoverflow에 질문하면 답변이 잘 되는, 대부분이 사용하는 테스트 라이브러리이면 좋겠다.**

를 알아봤을 때 실제 필자가 Github를 통해 해당 라이브러리에 질문을 했을 때 하루안에 답변을 빠르게 얻을 수 있었으며 Stackoverflow에 Cypress, Mocha, Jest, React-testing-library를 검색해서 결과 숫자를 봤을 때 Cypress, Mocha가 가장 많았다. 

그 외에 테스트 케이스를 작성하면서 약간의 즐거움이 있었음.
