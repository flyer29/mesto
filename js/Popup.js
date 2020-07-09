'use strict';

class Popup {
  constructor(element) {
    this.element = element;
    this.closeButton = this.element.querySelector('.popup__close');
  }

  open() {
    this.element.classList.add('popup_is-opened');
    this._setEventListeners();
  }

  _close() {
    this.element.classList.remove('popup_is-opened');
    this._removeEventListeners();
  }

  _closeByEsc(event) {
    if (event.keyCode === 27) {
      this._close();
    }
  }

  _setEventListeners() {
    this.closeButton.addEventListener('click', this._close);
    window.addEventListener('keydown', this._closeByEsc);
  }

  _removeEventListeners() {
    this.closeButton.removeEventListener('click', this._close);
    window.removeEventListener('keydown', this._closeByEsc);
  }
}