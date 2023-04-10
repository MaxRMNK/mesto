
import './index.css';

import Api from '../components/Api.js';

// import initialCards from '../utils/cards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
//import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';

const page = document.querySelector('.page');

// Кнопки Редактирования профиля и Добавления Картинки
const buttonEditAvatar = page.querySelector('.profile__avatar-button');
const buttonEditProfile = page.querySelector('.profile__edit-button');
const buttonAddCard = page.querySelector('.profile__add-button');

// Popup и Форма редактирования профиля
const formEditProfile = page.querySelector('.popup__form_edit-profile');
const inputNameProfile = formEditProfile.querySelector('.popup__input_type_name');
const inputJobProfile = formEditProfile.querySelector('.popup__input_type_job');

// Popup и Форма редактирования профиля
const formEditAvatar = page.querySelector('.popup__form_edit-avatar');
const inputUrlAvatar = formEditAvatar.querySelector('.popup__input_type_avatar');

// Popup и Форма добавления картинки
const formAddCard = page.querySelector('.popup__form-add-card');

// FormValidator
const formValidationConfig = {
  //formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  //errorClass: 'popup__error_visible',
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'fe0e2550-7db8-46d0-ad13-df530dd3ed8c',
    'Content-Type': 'application/json'
  }
});

let currentUserId = '';

// api.getInitialCards()
//   .then((result) =>{
//     console.log(result);
//     section.renderItems(result);
//   })
// api.getUser()
//   .then((user) => {
//     // обрабатываем результат
//     // console.log(user);
//     userInfo.setUserInfo(user);
//     userInfo.setUserAvatar(user.avatar);
//   })
//   .catch((err) => {
//     console.log(err); // выведем ошибку в консоль
//   });


// Спринт 9 => Тема 2/7: Продвинутый JS... => Урок 6/8: Promise
// + Доп.видео: Скринкаст Haz Baikulov
api.getAllPageData()
  .then((result) => {
    const [ apiUser, apiCards ] = result;
    // console.log(getUser);
    // console.log(getInitialCards);
    userInfo.setUserInfo(apiUser);
    userInfo.setUserAvatar(apiUser);

    currentUserId = apiUser._id;

    // Рисует карточки на странице
    section.renderItems(apiCards);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
//






// --------------------------------------------------------------------------------------
// Форма Редактирование профиля ---
const userInfo = new UserInfo({name: '.profile__name', info: '.profile__job', avatar: '.profile__avatar'});

const popupFormEditProfile = new PopupWithForm('.popup_edit-profile', handleFormSubmitProfile);
// Добавляет валидацию
const formValidationEditProfile = new FormValidator(formValidationConfig, formEditProfile);
formValidationEditProfile.enableValidation();

// Ф. отправки/сохранения формы Редактирование профиля
function handleFormSubmitProfile(inputData) {
  popupFormEditProfile.renderSending(true);
  // Сначала обновляется информация на сервере
  api.setUserInfo(inputData.editName, inputData.editJob)
    // Затем, если предыдущая операция была успешной, обновляется информация на странице
    .then((result) => {
      userInfo.setUserInfo({name: result.name, about: result.about});
      // console.log({name: inputData.editName, about: inputData.editJob});
      // userInfo.setUserInfo({name: inputData.editName, about: inputData.editJob});
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupFormEditAvatar.renderSending(false);
    });
}

// Открывает попап редактирования профиля
buttonEditProfile.addEventListener('click', function () {
  // Подставляет в поля формы текущие значения из текста страницы
  // Можно то же самое через "data = userInfo.getUserInfo()", и вывод через data.name и name.info
  const {name, about} = userInfo.getUserInfo(); // Деструктуризация ПР8
  inputNameProfile.value = name;
  inputJobProfile.value = about;

  // Сброс ошибок при открытии popup
  // Важно запускать валидацию именно при открытии popup, чтобы
  // кнопка сохранения была всегда в корректном состоянии.
  formValidationEditProfile.resetValidateEror();

  popupFormEditProfile.open();
});

// Добавляет слушатели событий формы
popupFormEditProfile.setEventListeners();


// --------------------------------------------------------------------------------------
// Форма Редактирование Аватара ---
const popupFormEditAvatar = new PopupWithForm('.popup_edit-avatar', handleFormSubmitAvatar);
// Добавляет слушатели событий формы
popupFormEditAvatar.setEventListeners();

// Добавляет валидацию
const formValidationEditAvatar = new FormValidator(formValidationConfig, formEditAvatar);
formValidationEditAvatar.enableValidation();

// Ф. отправки/сохранения формы Редактирование профиля
function handleFormSubmitAvatar(inputData) {
  popupFormEditAvatar.renderSending(true);
  // Сначала обновляется информация на сервере
  api.setAvatar(inputData.editAvatar)
    // Затем, если предыдущая операция была успешной, обновляется информация на странице
    .then((result) => {
      userInfo.setUserAvatar({ avatar: result.avatar });
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupFormEditAvatar.renderSending(false);
    });
}

buttonEditAvatar.addEventListener('click', function () {
  // Подставляет в поля формы текущие значения из текста страницы
  const data = userInfo.getUserAvatar();
  inputUrlAvatar.value = data.avatar;

  formValidationEditAvatar.resetValidateEror();

  popupFormEditAvatar.open();
});






// --------------------------------------------------------------------------------------
// Popup картинок ---
const popupImage = new PopupWithImage('.popup_image');

// Добавляет слушатели событий карточкам
popupImage.setEventListeners();

// Заменяет Картинку и Описание в popup картинки, открытвает popup.
function handleCardClick(data) {
  popupImage.open(data);
}


// --------------------------------------------------------------------------------------
// Popup подтверждения удаления карточки

// Popup подтверждения удаления ---
const popupConfirm = new PopupWithConfirm('.popup_confirm');
// Добавляет слушатели событий карточкам
popupConfirm.setEventListeners();

// Заменяет Картинку и Описание в popup картинки, открытвает popup.
function handleDeleteCard(idCard, thisCard) {
  popupConfirm.confirmDeletion(idCard, thisCard, deleteThisCard);

  popupConfirm.open();
}

function deleteThisCard(idCard, thisCard) {
  // console.log(idCard);
  // console.log(thisCard);

  popupConfirm.renderSending(true);

  api.deleteCard(idCard)
    .then(result => {
      console.log('Удалено: ', result);
      thisCard.remove();
      popupConfirm.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupConfirm.renderSending(false);
    });
}




// --------------------------------------------------------------------------------------
// Ф. добавляет и удаляет лайки у карточки
function likeCard(data, idCard, isLiked) { // data (= this карточки) - нужен для возможности обращения к методу togleLikeCard
  api.setLikeCard(idCard, isLiked)
    .then(result => {
      data.togleLikeCard(result);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}


// Ф. Создает карточку
function createCard(cardData) { // cardData приходит из section.renderItems
  // console.log(cardData);
  const card = new Card(cardData, currentUserId, {handleCardClick, likeCard, handleDeleteCard}, '#element');
  return card.generateCard();
}

// Ф. Добавляет карточку на страницу
function addCard(cardData) { // cardData приходит из section.renderItems
  // console.log(cardData);
  section.addItem( createCard(cardData) );
}

const section = new Section (addCard, '.elements');

// --------------------------------------------------------------------------------------
// Форма Добавление карточек ---
const popupFormAddCard = new PopupWithForm('.popup_add-card', handleFormSubmitCard);
// Добавляет слушатели событий формы
popupFormAddCard.setEventListeners();

// Добавляет валидацию
const formValidationAddCard = new FormValidator(formValidationConfig, formAddCard);
formValidationAddCard.enableValidation();

// Ф. отправки/сохранения формы Добавления карточки
function handleFormSubmitCard(inputData) {
  // console.log(inputData);
  const data = {name: inputData.addCardTitle, link: inputData.addCardLink};
  // console.log(data);
  popupFormAddCard.renderSending(true);
  // Сначала обновляется информация на сервере
  api.addCardDb(data)
    // Затем, если предыдущая операция была успешной, обновляется информация на странице
    .then((result) => {
      // console.log(result);
      // В result объект полной информации карточки. addCard использует только то что нужно - name и link
      addCard(result);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupFormAddCard.renderSending(false);
    });
}

// Открывает попап добавления картинки
buttonAddCard.addEventListener('click', () => {
  // Сброс ошибок при открытии popup
  // Важно запускать валидацию именно при открытии popup, чтобы
  // кнопка сохранения была всегда в корректном состоянии.
  formValidationAddCard.resetValidateEror();

  popupFormAddCard.open()
});







// // --------------------------------------------------------------------------------------
// // Popup картинок ---
// const popupImage = new PopupWithImage('.popup_image');
// // Добавляет слушатели событий карточкам
// popupImage.setEventListeners();

// // Заменяет Картинку и Описание в popup картинки, открытвает popup.
// function handleCardClick(data) {
//   popupImage.open(data);
// }

// // // Ф. Создает и добавляет карточку на страницу
// // function createCard(cardData) { // cardData приходит из section.renderItems
// //   const card = new Card({cardData, handleCardClick}, '#element');
// //   const cardElement = card.generateCard();
// //   section.addItem(cardElement);
// // }

// // Ф. Создает карточку
// function createCard(cardData) { // cardData приходит из section.renderItems
//   const card = new Card({cardData, handleCardClick}, '#element');
//   return card.generateCard();
// }

// // Ф. Добавляет карточку на страницу
// function addCard(cardData) { // cardData приходит из section.renderItems
//   section.addItem( createCard(cardData) );
// }

// // По ПР8
// // const section = new Section ({ data: initialCards, renderer: createCard }, '.elements');
// // section.renderItems();
// // По рекомендации ревьюера ПР8:
// const section = new Section (addCard, '.elements');
// section.renderItems(initialCards);




// // --------------------------------------------------------------------------------------
// // Форма Редактирование профиля ---
// const userInfo = new UserInfo({name: '.profile__name', info: '.profile__job'});
// const popupFormEditProfile = new PopupWithForm('.popup_edit-profile', handleFormSubmitProfile);
// // Добавляет валидацию
// const formValidationEditProfile = new FormValidator(formValidationConfig, formEditProfile);
// formValidationEditProfile.enableValidation();

// // Ф. отправки/сохранения формы Редактирование профиля
// function handleFormSubmitProfile(inputData) {
//   userInfo.setUserInfo(inputData);
// }

// // Открывает попап редактирования профиля
// buttonEditProfile.addEventListener('click', function () {
//   // Подставляет в поля формы текущие значения из текста страницы
//   // Можно то же самое через "data = userInfo.getUserInfo()", и вывод через data.name и name.info
//   const {name, info} = userInfo.getUserInfo(); // Деструктуризация ПР8
//   inputNameProfile.value = name;
//   inputJobProfile.value = info;

//   // Сброс ошибок при открытии popup
//   // Важно запускать валидацию именно при открытии popup, чтобы
//   // кнопка сохранения была всегда в корректном состоянии.
//   formValidationEditProfile.resetValidateEror();

//   popupFormEditProfile.open();
// });

// // Добавляет слушатели событий формы
// popupFormEditProfile.setEventListeners();




// // --------------------------------------------------------------------------------------
// // Форма Добавление карточек ---
// const popupFormAddCard = new PopupWithForm('.popup_add-card', handleFormSubmitCard);
// // Добавляет валидацию
// const formValidationAddCard = new FormValidator(formValidationConfig, formAddCard);
// formValidationAddCard.enableValidation();

// // Ф. отправки/сохранения формы Добавления карточки
// function handleFormSubmitCard(inputData) {
//   const itemData = {
//     name: inputData.addCardTitle,
//     link: inputData.addCardLink
//   };
//   // createCard(itemData);
//   addCard(itemData);
// }

// // Открывает попап добавления картинки
// buttonAddCard.addEventListener('click', () => {
//   // Сброс ошибок при открытии popup
//   // Важно запускать валидацию именно при открытии popup, чтобы
//   // кнопка сохранения была всегда в корректном состоянии.
//   formValidationAddCard.resetValidateEror();

//   popupFormAddCard.open()
// });
// // Добавляет слушатели событий формы
// popupFormAddCard.setEventListeners();




