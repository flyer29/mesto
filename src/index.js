import "./style.css";
import Api from "./js/Api.js";
import Card from "./js/Card.js";
import CardList from "./js/CardList.js";
import UserInfo from "./js/UserInfo.js";
import ImagePopup from "./js/ImagePopup.js";
import EditProfilePopup from "./js/EditProfilePopup.js";
import CreateCardPopup from "./js/CreateCardPopup.js";
import CreateAvatarPopup from "./js/CreateAvatarPopup.js";
import FormValidator from "./js/FormValidator.js";

(function () {

  const placePopupTemplate = document.querySelector('.popup_type_place');
  const profilePopupTemplate = document.querySelector('.popup_type_profile');
  const imagePopupTemplate = document.querySelector('.popup_type_image');
  const avatatPopupTemplate = document.querySelector('.popup_type_avatar');
  const picture = document.querySelector('.user-info__photo');
  const reference = process.env.NODE_ENV === 'development' ? 'http://praktikum.tk' : 'https://praktikum.tk';
  const config = {
    baseUrl: `${reference}/cohort11`,
    headers: {
      authorization: "6282d211-b1bd-4fad-af58-e65f4129d6a3",
      "Content-Type": "application/json"
    }
  }

  const api = new Api(config);
  const defaultImagePopup = new ImagePopup(imagePopupTemplate);
  const userInfo = new UserInfo(document.querySelector('.user-info'), api);
  const createNewCard = (...arg) => new Card(defaultImagePopup, userInfo, api).create(...arg);
  const cardList = new CardList(document.querySelector('.places-list'), createNewCard);
  const placeListValidator = new FormValidator(placePopupTemplate);
  const profileValidator = new FormValidator(profilePopupTemplate);
  const avatarValidator = new FormValidator(avatatPopupTemplate);
  const profilePopup = new EditProfilePopup(profilePopupTemplate, profileValidator, userInfo, api);
  const placePopup = new CreateCardPopup(placePopupTemplate, cardList, placeListValidator, api);
  const avatarPopup = new CreateAvatarPopup(avatatPopupTemplate, picture, avatarValidator, userInfo, api);

  Promise.all([
      api.getUserData(),
      api.getInitialCards()
    ])
    .then((values) => {
      const [userData, initialCards] = values;
      userInfo.setUserInfo(userData);
      cardList.render(initialCards);
    })
    .catch((err) => {
      alert(err);
    })

  document.querySelector('.user-info__button').addEventListener('click', placePopup.open);
  document.querySelector('.user-info__edit-button').addEventListener('click', profilePopup.open);
  document.querySelector('.user-info__photo').addEventListener('click', avatarPopup.open);
}());