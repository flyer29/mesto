'use strict';

class Api {
  constructor(options) {
    this.options = options;
    this.url = this.options.baseUrl;
    this.headers = this.options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так... Код ошибки: ${res.status}`);
  }

  getUserData = () => {
    return fetch(`${this.url}/users/me`, {
        headers: this.headers
      })
      /*              +
        Можно лучше: можно написать чуть короче:
        .then(this._getResponseData);
      */
     .then(this._getResponseData);
  }

  editUserProfile = (data) => {
    return fetch(`${this.url}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(this._getResponseData);
  }

  editUserAvatar = (data) => {
    return fetch(`${this.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then(this._getResponseData);
  }

  getInitialCards = () => {
    return fetch(`${this.url}/cards`, {
        headers: this.headers
      })
      .then(this._getResponseData);
  }

  addNewCard = (data) => {
    return fetch(`${this.url}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        })
      })
      .then(this._getResponseData);
  }

  deleteCard = (id) => {
    return fetch(`${this.url}/cards/${id}`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(this._getResponseData);
  }

  setLike = (id) => {
    return fetch(`${this.url}/cards/like/${id}`, {
        method: 'PUT',
        headers: this.headers
      })
      .then(this._getResponseData);
  }

  removeLike = (id) => {
    return fetch(`${this.url}/cards/like/${id}`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(this._getResponseData);
  }
}