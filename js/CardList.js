'use strict';

class CardList {
  constructor(container, createCardFunction) {
    this.container = container;
    this.createCardFunction = createCardFunction;
  }

  addCard(data) {
    this.container.appendChild(this.createCardFunction(data));
  }

  render(array) {
    for (let element of array) {
      this.addCard(element);
    }
  }
}