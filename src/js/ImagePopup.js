import Popup from "./Popup.js";
export default class ImagePopup extends Popup {
  constructor(element) {
    super(element);
    this.content = this.element.querySelector('.popup__content_type_image');
  }

  open = (background) => {
    super.open();
    this.content.setAttribute('style', background);
  }
  _close = () => {
    super._close();
  }

  _closeByEsc = (event) => {
    super._closeByEsc(event);
  }
}