/// <reference types="cypress" />

/** cypress는 기본적으로 text, label, component 등으로는 못 찾고 class, id, tag 등으로만 찾을 수 있음 기본적으로 jQuery와 닮음
 * 아래와 같이 이미 추가 라이브러리를 설치해 컴포넌트 테스트도 가능하지만 실제 문서대로 세팅해봐도 안되는 것으로 보아 완벽하지 않은 것으로 판별됨
 * (https://github.com/bahmutov/cypress-react-unit-test)
 *
 * cy.mount(<TodoItem todo={todoItemData} />);
 **/

describe("<TodoItem/>", function() {
  beforeEach("visit the app", () => {
    cy.visit("http://localhost:3000");
  });

  it("adds todo", function() {
    cy.get("form input")
      .type("Cypress 배우기")
      .get("form button")
      .click()
      .get("[data-testid=TodoList] li")
      .then(lis => {
        return lis[lis.length - 1].childNodes[0];
      })
      .should("have.text", "Cypress 배우기");
  });

  it("deletes todo", function() {
    cy.get("form input")
      .type("삭제하기")
      .get("form button")
      .click()
      .get("[data-testid=todoItem-span]")
      .then(spans => {
        return spans[spans.length - 1];
      })
      .next()
      .click()
      .get("[data-testid=TodoList] li")
      .then(lis => {
        return lis[lis.length - 1].childNodes[0];
      })
      .should("not.have.text", "삭제하기");
  });

  it("excutes toggle", function() {
    cy.get("[data-testid=todoItem-span]").each((span, index) => {
      cy.wrap(span).then(span => {
        cy.wrap(span)
          .click()
          .should("not.have.css", "text-decoration: line-through");

        cy.wrap(span)
          .click()
          .should("not.have.css", "text-decoration: line-through");
      });
    });
  });
});
