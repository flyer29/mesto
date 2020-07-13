import Popup from "./Popup.js";
export default class CreateAvatarPopup extends Popup {
  constructor(element, picture, validator, user, api) {
    super(element);
    this.picture = picture;
    this.form = this.element.querySelector('.popup__form');
    this.validator = validator;
    this.user = user;
    this.api = api;
    this.button = this.element.querySelector('.popup__button');
  }

  open = () => {
    super.open();
    this.element.querySelector('input').focus();
    this.form.reset();
    this.validator.setEventListeners();
    this.validator.setSubmitButtonState(event);
  }

  _resetErrors = () => {
    this.element.querySelector('.popup__error').textContent = '';
  }

  _loadingFunction = (isLoading) => {
    if (isLoading) {
      this.button.textContent = 'Загрузка...'
    } else {
      this.button.textContent = 'Сохранить';
    }
  }

  _close = () => {
    super._close();
    this._resetErrors();
    this._removeEventListeners();
  }

  _closeByEsc = (event) => {
    super._closeByEsc(event);
  }

  _editAvatar = (event) => {
    event.preventDefault();
    this._loadingFunction(true);
    this.api.editUserAvatar({
        avatar: this.form.elements.avatarlikn.value
      })
      .then((result) => {
        this.user.setUserAvatar(result);
        this.user.updateUserAvatar();
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
    this.form.addEventListener('submit', this._editAvatar);
    this.element.addEventListener('input', this.validator.setSubmitButtonState);
  }

  _removeEventListeners = () => {
    super._removeEventListeners();
    this.form.removeEventListener('submit', this._editAvatar);
    this.element.removeEventListener('input', this.validator.setSubmitButtonState);
  }
}