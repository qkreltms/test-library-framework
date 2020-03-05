/// <reference types="cypress" />

describe("", function() {
  beforeEach(function() {
    cy.visit("https://www.naver.com/");
  });

  it("search", function() {
    cy.get(".green_window input")
      .type("뉴로핏")
      .should("have.value", "뉴로핏")
      .get("#search_btn")
      .click()
      // .get("#web_layer_0 a")
      // .then(aTags => {
      //   aTags[0].click();
      // });
  });
});
