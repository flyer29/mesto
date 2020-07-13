export default class Card {
  constructor(popup, userInfo, api) {
    this.popup = popup;
    this.userInfo = userInfo;
    this.api = api;
  }

  create = (data) => {
    this.name = data.name;
    this.link = data.link;
    this.likes = data.likes;
    this.cardId = data._id;
    this.ownerId = data.owner._id;

    const template = document.createElement('div');
    template.insertAdjacentHTML('beforeend', `
     <div class="place-card">
     <div class="place-card__image">
       <button class="place-card__delete-icon"></button>
     </div>
     <div class="place-card__description">
       <h3 class="place-card__name"></h3>
       <div class="place-card__like-container">
          <button class="place-card__like-icon"></button>
          <p class="place-card__likes-number">0</p>
       </div>
     </div>
     </div>`);
    const card = template.firstElementChild;
    card.querySelector(".place-card__name").textContent = this.name;
    card.querySelector(".place-card__image").style.backgroundImage = `url(${this.link})`;
    this.cardElement = card;
    this.parentElement = card.parentElement;
    this.likeButton = this.cardElement.querySelector('.place-card__like-icon');

    this.likes.forEach(element => {
      if (element._id === this.userInfo.getUserId()) {
        this.likeButton.classList.add('place-card__like-icon_liked');
      }
    });


    this.cardImage = this.cardElement.querySelector('.place-card__image');
    this.deleteButton = this.cardImage.querySelector('.place-card__delete-icon');
    if (this.ownerId === this.userInfo.getUserId()) {
      this.deleteButton.style.display = 'block';
    }
    this.likesNumber = this.cardElement.querySelector('.place-card__likes-number');
    this.likesNumber.textContent = this.likes.length;
    this._setEventListeners();

    return card;
  }

  _addLike = (data) => {
    this.likesNumber.textContent = data.likes.length;
    data.likes.forEach(element => {
      if (element._id === this.userInfo.getUserId()) {
        this.likeButton.classList.add('place-card__like-icon_liked');
      }
    });
  }

  _deleteLike = (data) => {
    this.likesNumber.textContent = data.likes.length;
    this.likeButton.classList.remove('place-card__like-icon_liked');
  }

  _like = () => {
    if (this.likeButton.classList.contains('place-card__like-icon_liked')) {
      this.api.removeLike(this.cardId)
        .then((result) => {
          this._deleteLike(result);
        })
        .catch((err) => {
          alert(err);
        });
    }
    else {
      this.api.setLike(this.cardId)
        .then((result) => {
          this._addLike(result);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  _deleteCard = () => {
    if (confirm('Вы действительно хотите удалить эту карточку?')) {
      this.api.deleteCard(this.cardId)
        .then(() => {
          this._cardRemove();
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  _cardRemove = () => {
    this.cardElement.querySelector('.place-card__like-icon').removeEventListener('click', this._like);
    this.cardElement.querySelector('.place-card__like-icon').removeEventListener('click', this._deleteCard);
    this.cardElement.querySelector('.place-card__image').removeEventListener('click', this._createImagePopup);
    this.cardElement.remove();
  }

  _createImagePopup = (event) => {
    if (event.target.classList.contains('place-card__image')) {
      const picture = event.target.getAttribute('style');
      this.popup.open(picture);
    }
  }

  _setEventListeners = () => {
    this.likeButton.addEventListener('click', this._like);
    this.deleteButton.addEventListener('click', this._deleteCard);
    this.cardImage.addEventListener('click', this._createImagePopup);
  }
}