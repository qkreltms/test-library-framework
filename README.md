
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

이 문서의 주소는: https://github.com/qkreltms/testingLibrary-playground
  

## 개요:sunny:
점점 커지는 프로젝트를 진행하면서 유닛 테스트의 중요성이 주목받고 있습니다. 

매 순간 코드를 수정할 때 예상치 못한 사이드 이펙트와 버그가 무엇이 있으며 이것을 알아보기 위해 결과물을 확인합니다. [이것의 비용은 프로젝트의 규모에 비례해 증가하고 있으며 어느 순간부터는 개발 속도가 급격히 느려집니다.](https://stackoverflow.com/questions/67299/is-unit-testing-worth-the-effort) 

한 가지 강력한 대비책은 테스트 자동화를 통해 개발에 집중할 수 있는 환경을 만드는 것입니다.

다음의 목차에 따라 진행하며 결론 부분에서는 최종적으로 어떤 툴을 사용하는게 좋을지 도출하겠습니다.
## 목차
1. 용어설명
2. 인기있는 테스트 프레임워크/라이브러리
3. 트렌드
4. 테스트 툴 조합
5. 결론

## 용어설명:

### 1. **Out of box**
:cherry_blossom: 별도의 설정, 설치 없이 바로 설정 가능합니다.
  
테스트 프레임워크 Mocha는 별도의 Mocking, Spy library를 골라 설치해 사용해 사용자가 자유롭게 선택할 수 있다는 장점이 있는 반면 번거로운 환경 설정과 개발 환경 파편화는 사용자를 골치 아프게 합니다. 

반면 Jest의 경우 따로 설치할 필요 없이 모든 라이브러리가 내장되어 있습니다.(Out of box).


더 나아가 Jest와 RTL의 경우 CRA에 내장되어있어 별도의 설치, 환경 설정 없이 바로 진행할 수 있습니다.

### 2. **Snapshot testing**
사전에 특정 컴포넌트, 페이지 등의 렌더링된 결과물을 찍어 놓고 이후에 새로운 렌더링 결과물과 차이가 있는지 비교합니다.
```js
// src/component/counter.test.js
it("matches snapshot", () => {
  const component = render(<Counter />);
  expect(component).toMatchSnapshot();
});
```

위의 코드가 최초 작성 시에 Counter 컴포넌트의 Snapshot을 특정 폴더 아래에 자동으로 저장해 놓고 테스트가 실행될 때마다 미리 저장된 Snapshot과 다른 점이 있는지 비교합니다.

만약 Counter 컴포넌트가 변경되었고 Snapshot을 업데이트하고 싶다면 특정 명령어를 입력해 업데이트 가능합니다.
Jest의 경우에는 다음의 명령어로 가능합니다: ```jest --updateSnapshot```

추가로 RTL의 창시자인 [Kent C. Dodds](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering)에 따르면 매번 컴포넌트를 하다 보면 Snapshot이 달라지기 때문에 사람들이 snapshot 업데이트를 걱정 없이 하므로 Snapshot 테스트를 거의 사용하지 않는다고 합니다.

### 3. **Full Rendering**
가상의  DOM에서 컴포넌트를 렌더링 할 때 하위 컴포넌트 모두를 렌더링합니다.
   
### 4. **Shallow Rendering**
가상의  DOM에서 대상 컴포넌트만 렌더링 하며 하위 컴포넌트는 렌더링 하지 않습니다. [참고](https://velog.io/@velopert/react-testing-with-enzyme)

만약 아래의 컴포넌트가 있을 때
```js
import React from 'react';

const Profile = ({ username, name }) => {
  return (
    <div>
      <b>{username}</b>&nbsp;
      <span>({name})</span>
    </div>
  );
};
```

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
        <Profile /> // Profile 컴포넌트 위치
      </div>
    );
  }
}
```

아래와 같이 테스트를 진행한다면
```js
import React from 'react';
// enzyme을 사용한다.
import { shallow } from 'enzyme';
import Counter from './Counter';

describe('<Counter />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<Counter />);
    // 현재의 스냅샷이 이전 스냅샷과 같은지 확인한다.
    expect(wrapper).toMatchSnapshot();
  });
  
  // jest에서 test는 it과 동일한 역할을 수행한다.
  test('has initial props', () => {
    const wrapper = shallow(<Counter />);
    컴포넌트의 number prop이 0과 같은지 확인한다.
    expect(wrapper.props().number).toBe(0);
  });
  
  it('has initial number', () => {
    const wrapper = shallow(<Counter />);
    컴포넌트의 number state가 0과 같은지 확인한다.
    expect(wrapper.state().number).toBe(0);
  });
  
  it('increases', () => {
    const wrapper = shallow(<Counter />);
    // 컴포넌트의 ```handleIncrease()``` 함수를 호출했을 때 number state가 1이 되는지 확인한다.
    wrapper.instance().handleIncrease();
    expect(wrapper.state().number).toBe(1);
  });
  
  it('decreases', () => {
    const wrapper = shallow(<Counter />);
    // 컴포넌트의 ```handleDecrease()``` 함수를 호출했을 때 number state가 -1이 되는지 확인한다.
    wrapper.instance().handleDecrease();
    expect(wrapper.state().number).toBe(-1);
  });
  
  it('calls handleIncrease', () => {
    const wrapper = shallow(<Counter />);
    // 컴포넌트에서 button이고 이 안의 텍스트가 +1인 DOM을 찾는다.
    const plusButton = wrapper.findWhere(
      node => node.type() === 'button' && node.text() === '+1'
     );
    // 위에서 찾은 버튼을 클릭한다.
    plusButton.simulate('click');
    // number state가 1이 됐는지 확인한다.
    expect(wrapper.state().number).toBe(1);
   });
});
```

```shallow(<Counter />)```에서 실제 렌더링되는 ```<Counter/>```는 다음과 같습니다.
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
     // Profile의 하위 DOM은 렌더링 되지 않음
     <Profile
       name="김민준"
       username="velopert"
     />
   `;

 // Full Rendering을 했을 때 표시되는 Profile 컴포넌트  
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
```

**장점**
1. 모든 DOM을 렌더링 하지 않아서 빠릅니다. (그러나 Milliseconds 단위로 빨라지기 때문에 무시할 만한 수준이다.)
2. 하위 component는 렌더링 되지 않기 때문에 어떠한 의존성 없이 테스트가 가능합니다. 예: 하위 컴포넌트에서 ```componentWillRerecieve()```를 통한 상위 컴포넌트 변경 
   
**단점**
1. 하위 컴포넌트를 포함한 렌더링이 이뤄져야 실제로 유저가 볼 수 있는 모든 작동을 확인하고 검증이 가능하지만 shallow 렌더링으로는 할 수 없습니다. 

추가적으로 Shallow rendering의 경우 [RTL에서는 권장하지 않는 방법입니다.](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering)

### 5. **Mock**
구현된 함수 아래에 **가짜 함수**를 만들며 함수의 매개 변수나 호출을 추적하거나 원하는 값을 반환하도록 할 수 있습니다.  
간단한 함수에 mock을 달아주는 예제부터 실사용 예제까지 알아보겠습니다.

```js
// https://jestjs.io/docs/en/mock-functions.html
// x => 42 + x 함수를 Mocking하는 것을 보여주는 예제

// 인자 items의 개수만큼 반복하며 callback함수에 items[index] 인자를 넣어준다.
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

// x라는 인자가 들어올 때 42를 더하는 함수에 mock을 달아준다.
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

**또 다른 mock의 사용처는 API 통신 모듈**이 있습니다.

API를 호출하면 실제 서버에 접근에 데이터를 조작하므로 매번 테스트를 실행시 값이 달라질 수 있고 자칫하면 Production 레벨까지 영향을 끼칠수 있습니다. 

원하는 값이 계속 반환되게 하려면 API 모듈에 mock을 달아 특정한 경우에 항상 원하는 결과값이 나오도록 할 수 있습니다.
```js
// https://github.com/ctimmerm/axios-mock-adapter
// 만약 어떤 함수 또는 컴포넌트가 있고 api 요청을 통해 값을 받는다면 그 요청을 mock이 대신할 수 있습니다.
// 이것의 장점은 실제 API를 사용하지 않고, 항상 예측가능한, 일관된 데이터를 반환한다는 점.

var mock = new MockAdapter(axios);
// Mock any GET request to /users
// arguments for reply are (status, data, headers)
// 이제 GET: users를 호출할 때마다 status: 200과 함께 data: { users: [ { id: 1, name: 'John Smith' } ] } 가 반환된다.
mock.onGet('/users').reply(200, {
users: [
    { id: 1, name: 'John Smith' }
  ]
});

// 해당 API를 호출했을 때 항상 일정한 값을 반환한다.
axios.get('/users')
  .then(function(response) {
    console.log(response.data); // { users: [ { id: 1, name: 'John Smith' } ] }
});
```
이제 실제 예제로 알아보겠습니다.
> 이메일과 문자를 보낼 때 사용하는 messageService라는 자바스크립트 모듈이 있다고 가정해보겠습니다.

> 이렇게 외부 매체를 통해 메세지를 보내는 작업은 어플리케이션에서 수시로 일어날 수 있지만, 단위 테스트 측며에서는 모킹 기법 없이는 처리가 매우 끼다로운 대표적인 케이스 중 하나입니다.

> 왜냐하면, 일반적으로 이메일과 문자는 외부 서비스를 이용하는 경우가 많아서 테스트 실행 시 마다 불필요한 과금 발생할 수 있고, 해당 외부 서비스에 장애가 발생하면 관련 테스트가 모두 깨지는 불상사가 발생할 수 있기 때문입니다. 

[참고](https://www.daleseo.com/jest-mock-modules/)

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
  /* DB에 회원 추가하고 SMS와 Email로 회원가입 환영 메세지를 보낸다. */
  const message = '회원 가입을 환영합니다!';
  sendEmail(user.email, message);
  sendSMS(user.phone, message);
}
```
```js
// 테스트 코드
import { register } from './userService';
import * as messageService from './messageService';

// 여기서 우리는 messageService 모듈의 sendEmail 함수와 sendSMS 함수를 목(mock) 함수로 대체를 해야합니다. 왜냐하면 실제로 이메일이나 문자를 보낼 의도가 없고 
// 단순히 userService가 제대로 호출을 하는지 여부만 알면 되기 때문입니다.
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
     // register 안에서 sendEmail, sendSMS 함수를 호출하고 이 두 함수는 위에서 Mocking이 가능하게 했으므로 추적한 값을 테스트한다.
     register(user);

     expect(sendEmail).toBeCalledTimes(1);
     expect(sendEmail).toBeCalledWith(user.email, '회원 가입을 환영합니다!');

     expect(sendSMS).toBeCalledTimes(1);
     expect(sendSMS).toBeCalledWith(user.phone, '회원 가입을 환영합니다!');
   });
});
```
추가로 함수를 mocking하는 대표적인 4가지 함수를 알아보겠습니다.
1. ```jest.fn()```
함수를 mocking합니다. 또한 어떤 인자와 결과를 반환하는 가짜함수를 만들어 완전히 대채시킬수도 있습니다.
    ```js
         const stub = jest.fn(x => { return 1 });
        stub();
         expect(stub).toBeCalled();
     ```
     
     
2. ```jest.spyOn()```
오브젝트 안의 함수를 mocking합니다. 
```js
    const myObj = {
        doSomething() {
        console.log('does something');
         }
    };
   
   //myObj의 doSomething 함수를 mocking 합니다.
     const somethingSpy = jest.spyOn(myObj, 'doSomething');
     myObj.doSomething();
     expect(somethingSpy).toBeCalled();
     
      // 하지만 jest.spyOn을 안쓰고 아래의 방식으로도 할 수 있다. 
     // myObj.doSomething = jest.fn();
```


3. ```jest.mock()```
모듈 안의 모든 함수를 mocking 합니다.
```js
// https://jestjs.io/docs/en/es6-class-mocks#spying-on-the-constructor
import SoundPlayer from './sound-player';
/** SoundPlayer 모듈이 반환하는 객체가
 * {
 *   f1: () => {...}
 *   f2: (n) => {...}
 *   f3: (n, n1) => void
 * }
 * 이 와 같은 구조라고 할 때 아래의 함수를 사용하면 한번에 모든 함수를 Mocking할 수 있다.
 * 
 // **주의!** module을 mocking할 때 꼭 해당 모듈을 import를 해야합니다.
jest.mock('./sound-player');
```


4. ```jest.mockImplementation()```
이미 mock 한 함수를 대채하는 가짜함수를 만들수 있습니다.
```js
import SoundPlayer from './sound-player';
jest.mock('./sound-player');
// f1함수에 인자가 없고 123을 반환하는 가짜 함수를 만든다.
SoundPlayer.f1.mockImplementation(() => 123);
// 비동기 함수와 123을 반환하는 가짜 함수를 만든다.
SoundPlayer.f1.mockImplementation(() => Promise.resolve(123));
```

**장점**
1. 고립성을 유지합니다. 
함수에 사용한다면 항상 원하는 값을 반환하도록 할 수 있으며 API call에 사용된다면 함수와 동일하게 특정한 URL에 대해서 항상 동일한 결과물을 반환하도록 할 수 있습니다.

2. 어떤 일들이 발생했는지를 기억할 수 있기 때문에 내부적으로 어떻게 사용되는지 검증할 수 있습니다. [참고](https://www.daleseo.com/jest-fn-spy-on/)

3. 실제 DB, API 호출을 하지 않으므로 비용을 절약할 수 있습니다.

**단점**
1. 러닝커브(?)


### 인기있는 테스트 프레임워크/라이브러리
#### 1. Mocha
⭐19.1k(20-03-05 기준)

과거 수년간 가장 인기 많았던 테스트 프레임워크 모카는 사용자가 원하는 Assertion, Snapshot, Mocking, Spy library를 선택할 수 있다는 유연함이 있다는 반면 

초심자에게는 까다로울 수 있는 환경 설정, 다양한 라이브러리의 사용으로 인해 유저 마다 다른 라이브러리 선택으로 인한 파편화의 단점이 있습니다.

각각의 테스트 케이스는 동기적으로 작동합니다.
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
(?)
#### 2. Jest
⭐ 29.9k

기본적으로 Out of box이며 Mocha와 다르게 각 테스트 케이스는 병렬적으로 작동하므로 어느정도 속도의 향상을 가져올 수 있습니다.


그러나 각 테스트 케이스를 고립적인 상황을 만들기 위해 Virtual machine을 사용하므로 처음으로 각각의 테스트 케이스 호출시 새로 module을 import해 Mocha보다 느린 경우가 있을 수 있습니다.(but 다음 실행시에는 cache된 데이터 사용)
```js
describe('Testing 1', () => {
  it('Test case title: HelloWorld', () => {
    expect(str).toBe('Hello World');
  });
});
```

**장점**
1. 각 테스트 케이스는 고립적 (VM 사용)
2. 각 테스트 케이스는 병렬적으로 작동해 어느정도 속도 향상이 있을 수 있습니다.
3. 현재 가장 인기 많은 테스트 프레임워크
4. 기본적으로 Out of Box이므로 따로 환경설정이 필요하지 않습니다.
5. Facebook에서 유지보수

**단점**
1. 각 테스트 케이스가 고립적이므로 매번 모듈을 새로 가져와서 속도가 느릴수 있습니다.

#### 3. Enzyme
⭐ 18.5k

가상의 환경 JDOM에서 컴포넌트를 렌더링할 수 있는 기능을 제공하며 DOM과 상호작용이 정상적인지, props, state, instance의 함수들은 원하는 값이 나오는지 테스트 가능합니다.

```js
// https://velog.io/@velopert/react-testing-with-enzyme
import React from 'react';
import { mount } from 'enzyme';
import Profile from './Profile';

describe('<Profile />', () => {
  it('matches snapshot', () => {
    const wrapper = mount(<Profile username="velopert" name="김민준" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders username and name', () => {
    const wrapper = mount(<Profile username="velopert" name="김민준" />);

    expect(wrapper.props().username).toBe('velopert');
    expect(wrapper.props().name).toBe('김민준');

    const boldElement = wrapper.find('b');
    expect(boldElement.contains('velopert')).toBe(true);
    const spanElement = wrapper.find('span');
    expect(spanElement.text()).toBe('(김민준)');
  });
});
```

**장점** 
1. 컴포넌트를 테스트하는데 가장 많은 기능을 지원하는 라이브러리
2. 그 중 인기가 가장 많습니다.
3. AirBnB에서 지원
   
**단점**
1. 기능이 많은 만큼 RTL에 비해 러닝커브가 있습니다.

#### 4. RTL
⭐ 10.9k

Ezyme의 하위 호환(상호작용, 가상환경에서 렌더링), Shallow rendering가 지원되지 않으며, 컴포넌트에서 props, state, instance 값을 가져올 수 없습니다.

유저 관점의 보여지는 결과에 초점을 맞췄습니다.

예를들어 ```props.isShow```가 true가 될 때 특정한 DOM이 보여지는 컴포넌트가 있을 때 업데이트 계속하다가 여러 사이드 이펙트로 ```props.isShow```값이 true여도 안보여지는 경우가 발생할 수 있습니다. (state의 값보다는 실제로 DOM이 보여지는지 결과로 판별합니다.)

일반적으로 Enzyme보다 쉽다고 여겨집니다.

> RTL 에서는 Enzyme 과 달리 모든 테스트를 DOM 위주로 진행합니다. 그리고, 컴포넌트의 props 나 state 를 조회하는 일은 없습니다. 컴포넌트를 리팩토링하게 될 때에는, 주로 내부 구조 및 네이밍은 많이 바뀔 수 있어도 실제 작동 방식은 크게 바뀌지 않습니다. 

> RTL는 이 점을 중요시 여겨서, 컴포넌트의 기능이 똑같이 작동한다면 컴포넌트의 내부 구현 방식이 많이 바뀌어도 테스트가 실패하지 않도록 설계되었습니다.

> 추가적으로, Enzyme 은 엄청나게 다양한 기능을 제공하는 반면, RTL 에는 정말 필요한 기능들만 지원을 해줘서 매우 가볍고, 개발자들이 일관성 있고 좋은 관습을 따르는 테스트 코드를 작성 할 수 있도록 유도해줍니다. 

[참고](https://velog.io/@velopert/react-testing-library)
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
1. 컴포넌트의 props, state 값을 조회하지 못 하기 때문에 간단하게 작성될 코드가 어렵게 작성될 수 있습니다.
변수값이 어떤지만 확인해보고 끝날 일을 DOM 안의 text를 찾고 판별하는 방식으로 하게 됩니다..
#### 5. Cypress

⭐ 18.8k

기본적으로 RTL과 비슷하며 이것 또한 사용자의 입장에서 테스트 진행합니다.


가장 좋은 점은 각각의 테스트 케이스가 어떻게 진행됐는지 눈으로 확인이 가능합니다.


한 파일 안의 테스트 케이스들은 동기적으로 실행되지만 각 페이지 별로 실행함으로써 병렬적으로 실행 가능합니다.


DOM을 get할 때 4초간 기다림 및 자동적으로 Retry 하며 Mocha를 사용합니다.

```js
describe('Post Resource', function() {
  it('Creating a New Post', function() {
    cy.visit('/posts/new')     // 1.

    cy.get('input.post-title') // 2.
      .type('My First Post')   // 3.

    cy.get('input.post-body')  // 4.
      .type('Hello, world!')   // 5.

    cy.contains('Submit')      // 6.
      .click()                 // 7.

    cy.url()                   // 8.
      .should('include', '/posts/my-first-post')

    cy.get('h1')               // 9.
      .should('contain', 'My First Post')
  })
})
```

Cypress를 설치하면 자동적으로 폴더가 생성되는데 각각의 폴더는 다음의 목적을 가지고 있습니다.
```
cypress
  ㄴfixtures // Asset을 저장하는 공간. 여기에 저장할 경우 cy.fixture(filePath)와 같은 형식으로 불러올수 있음
    ㄴexample.json
  ㄴintegration // 실제 테스트 코드가 위치하는 공간
  ㄴplugins 
  ㄴsupport // 각 테스트 코드가 실행되기전 거치는 공간. global단으로 무언가를 실행 시키고 싶을때 사용.
```

**장점**
1. 읽기 쉬운 테스트 코드
```cy.get(...).should(...).and(...).should(...)``` 와 같이 체이닝 패턴으로 쉽게 이해가 가능하며 각각의 코드는 동기적으로 실행되 쉽게 이해가 가능합니다.

2. 어렵지 않은 난이도
기본적으로 DOM을 가져올 때 자동적으로 4초간 기다림, 마지막 줄이 실패시 자동적으로 4초간 Retry합니다.

3. 문서가 잘 작성되어 있습니다.
4. 유저의 관점에서 작성된 라이브러리 

**단점**
1. 완벽하지 않은 Typescript 지원
2. Typescript, React, Test coverage를 지원시 환경 설정의 까다로움이 존재합니다.

## 트렌드:rocket:
![trand1](./trand%20horizontal.png)
![trand2](./trand%20quadrant.png)
## 테스트 툴 조합
1. **Cypress**
2. **Jest + RTL**

여러 툴 중에 다음의 목적에 맞게 정했습니다.
1. 쓰기 쉬워야 한다.
테스트 코드만 작성하면 일은 언제 끝내고 집은 언제가나~?:innocent:
2. 어느정도 트렌드를 따라가야 한다.
시대에 뒤쳐지지 않으면서 Stackoverflow, github에 질문 올리면 잘 답변해주는 툴을 사용하고 싶어요ㅠ:cry:

### 조합 1. Cypress
#### 실사용 예제
**예제 위치** /cypress
**실행**: ```yarn cypress 또는 yarn cypress:runCli```

### 조합 2. Jest + RTL
#### 실사용 예제
**예제 위치**: src/component
**실행**: ```yarn test```


## :tada:결론:tada:
어떤 조합이 가장 자신에게 알맞다고 생각하셨나요?


저는 **Cypress** 입니다. 환경 설정이 까다롭다는 단점이 있지만 메소드 체이닝 패턴으로 이어가는 형식으로 코드가 간결했고 비동기 코드도 동기적으로 실행되어 순차적으로 코드를 읽으며 이해하기 어렵지 않았습니다.


사용하면서 맞딱뜨린 문제의 대부분은 잘 정리된 문서에서 해결책을 찾을 수 있었고, 그래도 부족한 부분은 1일 이내에 github에서 답변을 얻을 수 있었습니다.
