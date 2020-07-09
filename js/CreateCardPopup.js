'use strict';

class CreateCardPopup extends Popup {
  constructor(element, cardList, validator, api) {
    super(element);
    this.cardList = cardList;
    this.validator = validator;
    this.api = api;
    this.form = this.element.querySelector('.popup__form');
    this.button = this.element.querySelector('.popup__button');
  }

  open = () => {
    super.open();
    this.element.querySelector('input').focus();
    this.form.reset();
    this._setEventListeners();
    this.validator.makeButtonDisable();
    this.validator.setEventListeners();
    this.validator.setSubmitButtonState(event);
  }

  _resetErrors = () => {
    this.element.querySelectorAll('.popup__error').forEach((item) => {
      item.textContent = '';
    });
  }

  _close = () => {
    super._close();
    this._resetErrors();
    this._removeEventListeners();
  }

  _loadingFunction = (isLoading) => {
    if (isLoading) {
      this.button.classList.add('popup__button_type_profile');
      this.button.textContent = 'Загрузка...'
    } else {
      this.button.classList.remove('popup__button_type_profile');
      this.button.textContent = '+';
    }
  }

  _closeByEsc = (event) => {
    super._closeByEsc(event);
  }

  _createNewCard = (event) => {
    event.preventDefault();
    this._loadingFunction(true);
    this.api.addNewCard({
        name: this.form.elements.placename.value,
        link: this.form.elements.link.value
      })
      .then((result) => {
        this.cardList.addCard(result);
        this._close();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        this._loadingFunction(false);
      });
  }

  _setEventListeners = () => {
    super._setEventListeners();
    this.form.addEventListener('submit', this._createNewCard);
    this.element.addEventListener('input', this.validator.setSubmitButtonState);
  }

  _removeEventListeners = () => {
    super._removeEventListeners();
    this.form.removeEventListener('submit', this._createNewCard);
    this.element.removeEventListener('input', this.validator.setSubmitButtonState);
  }
}