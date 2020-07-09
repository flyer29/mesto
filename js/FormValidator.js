'use strict';

class FormValidator {
  constructor(element) {
    this.element = element;
    this.button = this.element.querySelector('.popup__button');
    this.form = this.element.querySelector('.popup__form');
    this.inputs = Array.from(this.form.querySelectorAll('input'));
  }

  _checkInputValidity = (input) => {
    if (input.validity.tooShort || input.validity.tooLong) {
      return 'Должно быть от 2 до 30 символов';
    }
    if (input.validity.valueMissing) {
      return 'Это обязательное поле';
    }
    if (input.type === 'url' && input.validity.typeMismatch) {
      return 'Здесь должна быть ссылка';
    }
    return '';
  }

  makeButtonEnable = () => {
    this.button.removeAttribute('disabled');
  }

  makeButtonDisable = () => {
    this.button.setAttribute('disabled', true);
  }

  setSubmitButtonState = () => {
    let isValidForm = true;
    this.inputs.forEach((item) => {
      if (this._checkInputValidity(item) !== '') {
        isValidForm = false;
      }
    });
    if (isValidForm) {
      this.makeButtonEnable();
    } else {
      this.makeButtonDisable();
    }
  }

  _showMessage = (event) => {
    const errorElement = event.target.nextElementSibling;
    errorElement.textContent = this._checkInputValidity(event.target);
  }

  setEventListeners() {
    this.inputs.forEach((item) => {
      item.addEventListener('input', this._showMessage);
    });
  }
}