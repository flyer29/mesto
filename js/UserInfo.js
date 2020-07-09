'use strict';

class UserInfo {
  constructor(element, api) {
    this.element = element;
    this.api = api;
    this.userNameElement = this.element.querySelector('.user-info__name');
    this.userJobElement = this.element.querySelector('.user-info__job');
    this.userPhoto = this.element.querySelector('.user-info__photo');
  }

  setUserInfo = (data) => {
    this.name = data.name;
    this.job = data.about;
    this.id = data._id;
    this.avatar = data.avatar;
    this.updateUserInfo();
    this.updateUserAvatar();
  }

  setUserAvatar = (data) => {
    this.avatar = data.avatar;
  }
  
  getUserId = () => {
    return this.id;
  }

  updateUserInfo = () => {
    this.userNameElement.textContent = this.name;
    this.userJobElement.textContent = this.job;
  }

  updateUserAvatar = () => {
    this.userPhoto.style.backgroundImage = `url(${this.avatar})`;
  }
}