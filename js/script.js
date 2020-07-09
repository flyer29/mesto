(function () {
  'use strict';

  const placePopupTemplate = document.querySelector('.popup_type_place');
  const profilePopupTemplate = document.querySelector('.popup_type_profile');
  const imagePopupTemplate = document.querySelector('.popup_type_image');
  const avatatPopupTemplate = document.querySelector('.popup_type_avatar');
  const picture = document.querySelector('.user-info__photo');
  const config = {
    baseUrl: 'https://praktikum.tk/cohort11',
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








/*
  Здравствуйте
  Отличная работа, реализовано в том числе и дополнительное задание, есть обработка ошибок,
  класс Api только посылает запросы и не взаимодействет со страницей
  По коду есть замечания: 

  Надо исправить: 
  - в методе _like в классе Card отправляется сразу два запроса  +
  - использовать setTimeout не требуется, попап закрывать если сервер ответил 
  подтверждением - в блоке then, а менять текст кнопки обратно нужно в блоке finally   +
  - использовать Promise.all для загрузки начальных данных   +

  Можно лучше: 
  - проверка ответа сервера и преобразование из json       +
  дублируется во всех методах класса Api, лучше вынести в отдельный метод

*/

/*
  Все замечания исправлены

  Можно лучше: не разбивать на несколько then, если можно написать в одном     +

  Если у Вас будет свободное время попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/

















/*
	Хорошая работа, рефакторинг выполнен, отлично, что Вы передаете все необходимое классам
	как параметры, а не используете глобальные переменные. 
	Но есть несколько замечаний:

	Надо исправить:
	- у метода _create класса Card не должно быть нижнего подчеркивания в начале   +
	- вызывать навешивание обработчиков при создании карточки в классе Card, а не в классе CardList  +
	- при удалении карточки нужно также удалить обработчики событий с её элементов   +
	- класс Card не должен знать ничего о том в каком именно попапе открывается изображение  +
	- класс Popup должен содержать только функции общие для всех попапов, и не содержать методы разных
	попапов и проверки в каком попапе произошло событие   +
	- в метод setUserInfo передавать данные, а не брать напрямую из формы  +
	- в методе updateUserInfo не искать каждый раз элементы, а найти их один раз в конструкторе класса  +
	- когда код расположен в разных файлах, его нужно             +
	заключать в модули, т.к. если файлов будет много, то в разных 
	файлах могут появится функции или переменные с одинаковыми именами,
	они будут переопределять друг друга. Модуль должен предоставлять
	наружу только минимально необходимый api
	Для создании модулей можно воспользоваться IIFE, подробнее:
	https://learn.javascript.ru/closures-module
	https://habr.com/ru/company/ruvds/blog/419997/ 
	Нужно обернуть в модули как минимум содержимое файла script.js
	Оборачивание кода в IIFE не позволит глобально использовать переменные объявленные в нем и
	и заставит явно передавать их туда, где они необходимы, как например в конструкторы классов

	Можно лучше: 
	- создавать экземпляр класса для каждой карточки, а не один экземпляр на все карточки   +
	- массив array лучше передавать не в конструктор, а в метод render  +
*/


/*
  Вы отлично поработали над проектом, все замечания исправлены

  Если захотите углубиться в тему ООП и рефакторинга оставлю пару ссылок:
  https://ota-solid.now.sh/ - принципы проектирования SOLID применяемые для проектирования ООП программ  
  https://refactoring.guru/ru/design-patterns - паттерны проектирования
  https://refactoring.guru/ru/refactoring - рефакторинг

  Успехов в дальнейшем обучении!
*/






















/*
    Хорошая работа. Валидация работает верно. Отлично, что код хорошо организован и разбит на файлы
    Но есть замечание к организации кода:


    Надо исправить: 
    - проверки валидации дублируются в showMessage  и в checkInputValidity  +
    
    - в функции showMessage если переменные не перезаписываются их нужно объявлять как const  +

    Замечание по прошлой проектной работе:
    Надо исправить: 
    - при создании карточки функцией createCard есть уязвимость xss   +

    Можно лучше: 
    - для валидации можно использовать только нативные средства браузера  +

    - в js нужно оперировать классами элементов, а не задавать   +
      стили напрямую. Стили лучше оставить в css файле

*/

/*
  Отлично, все замечания исправлены.
  Но осталось ещё несколько:
  Надо исправить:
  - вместо element.name === 'link' нужно написать element.type === 'url'    +
  
  - приношу извинения, пропустил это на прошлом ревью - не нужно навешивать
   обработчики при каждом открытии попапа, достаточно повесить обработчики на форму один раз   +
   
  - давайте еще немного поработаем в функцией createCard, иначе с текущей организацией кода
  у Вас могут возникнуть сложности в следующей проектной работе: каждая функция должна 
  решать только одну задачу и функция createCard должна только создавать и возвращать
  DOM элемент карточки.                     +

  Можно лучше:
  - последний return не принято оборачивать в else   +

*/

/*
  Все отлично, но появился баг при добавлении карточек они создаются пустыми
  
  Надо исправить: объект cardsData создается один раз при запуске, когда поля пустые
  и при вызове createNewCard в нем нет введенных данных. 
  Объект нужно создавать при каждом вызове createNewCard:

    addCard({
      name: form.elements.name.value,
      link: form.elements.link.value
    });
  
  Учитывая, что Вы отлично работали над всеми замечаниями в прошлых ревью, принимаю работу.
  Уверен исправить такую небольшую ошибку Вам под силу
  
  Успехов в дальнейшем обучении!
*/