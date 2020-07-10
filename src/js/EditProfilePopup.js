import Popup from "./Popup.js";
export default class EditProfilePopup extends Popup {
  constructor(element, validator, user, api) {
    super(element);
    this.validator = validator;
    this.user = user;
    this.api = api;
    this.form = this.element.querySelector('.popup__form');
    this.button = this.element.querySelector('.popup__button');
  }

  open = () => {
    super.open();
    this.element.querySelector('input').focus();
    this.form.reset();
    this._setEventListeners();
    this._setUserData();
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

  _closeByEsc = (event) => {
    super._closeByEsc(event);
  }

  _setUserData = () => {
    this.form.elements.username.value = this.user.name;
    this.form.elements.about.value = this.user.job;
  }

  _loadingFunction = (isLoading) => {
    if (isLoading) {
      this.button.textContent = 'Загрузка...'
    } else {
      this.button.textContent = 'Сохранить';
    }
  }

  _editProfile = (event) => {
    event.preventDefault();
    this._loadingFunction(true);
    this.api.editUserProfile({
        name: this.form.elements.username.value,
        about: this.form.elements.about.value
      })
      .then((result) => {
        this.user.setUserInfo(result);
        this.user.updateUserInfo();
        this._close();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        this._loadingFunction(false)
      });
  }

  _setEventListeners = () => {
    super._setEventListeners();
    this.form.addEventListener('submit', this._editProfile);
    this.element.addEventListener('input', this.validator.setSubmitButtonState);
  }

  _removeEventListeners = () => {
    super._removeEventListeners();
    this.form.removeEventListener('submit', this._editProfile);
    this.element.removeEventListener('input', this.validator.setSubmitButtonState);
  }
}