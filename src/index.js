
import './pages/index.css';

import initialCards from './script/cards.js';
import Card from './script/Card.js';
import FormValidator from './script/FormValidator.js';

import UserInfo from './script/UserInfo.js';
import Section from './script/Section.js';
//import Popup from './script/Popup.js';
import PopupWithImage from './script/PopupWithImage.js';
import PopupWithForm from './script/PopupWithForm.js';

const page = document.querySelector('.page');

// Кнопки Редактирования профиля и Добавления Картинки
const buttonEditProfile = page.querySelector('.profile__edit-button');
const buttonAddCard = page.querySelector('.profile__add-button');

// Popup и Форма редактирования профиля
const formEditProfile = page.querySelector('.popup__form_edit-profile');
const inputNameProfile = formEditProfile.querySelector('.popup__input_type_name');
const inputJobProfile = formEditProfile.querySelector('.popup__input_type_job');

// Popup и Форма добавления картинки
const formAddCard = page.querySelector('.popup__form-add-card');

// FormValidator
const formValidationConfig = {
  //formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};




// --------------------------------------------------------------------------------------
// Popup картинок ---
const popupImage = new PopupWithImage('.popup_image');
// Добавляет слушатели событий карточкам
popupImage.setEventListeners();

// Заменяет Картинку и Описание в popup картинки, открытвает popup.
function handleCardClick(data) {
  popupImage.open(data);
}

// Ф. Создает и добавляет карточку на страницу
function createCard(cardData) { // cardData приходит из section.renderItems
  const card = new Card({cardData, handleCardClick}, '#element');
  const cardElement = card.generateCard();
  section.addItem(cardElement);
}

const section = new Section ({ data: initialCards, renderer: createCard }, '.elements');
section.renderItems();




// --------------------------------------------------------------------------------------
// Форма Редактирование профиля ---
const userInfo = new UserInfo({name: '.profile__name', info: '.profile__job'});
const popupFormEditProfile = new PopupWithForm('.popup_edit-profile', handleFormSubmitProfile);

// Ф. отправки/сохранения формы Редактирование профиля
function handleFormSubmitProfile(inputData) {
  userInfo.setUserInfo(inputData);
}

// Открывает попап редактирования профиля
buttonEditProfile.addEventListener('click', function () {
  // Подставляет в поля формы текущие значения из текста страницы
  // Можно то же самое через "data = userInfo.getUserInfo()", и вывод через data.name и name.info
  const {name, info} = userInfo.getUserInfo(); // Деструктуризация ПР8
  inputNameProfile.value = name;
  inputJobProfile.value = info;

  popupFormEditProfile.open();
});

// Добавляет слушатели событий формы
popupFormEditProfile.setEventListeners();

// Добавляет валидацию при открытии popup
const formValidationEditProfile = new FormValidator(formValidationConfig, formEditProfile);
formValidationEditProfile.enableValidation();
// Сброс ошибок при открытии popup
formValidationEditProfile.resetValidateEror();



// --------------------------------------------------------------------------------------
// Форма Добавление карточек ---
const popupFormAddCard = new PopupWithForm('.popup_add-card', handleFormSubmitCard);

// Ф. отправки/сохранения формы Добавления карточки
function handleFormSubmitCard(inputData) {
  const itemData = {
    name: inputData.addCardTitle,
    link: inputData.addCardLink
  };
  createCard(itemData);
}

// Открывает попап добавления картинки
buttonAddCard.addEventListener('click', () => { popupFormAddCard.open() });
// Добавляет слушатели событий формы
popupFormAddCard.setEventListeners();

// Добавляет валидацию при открытии popup
const formValidationAddCard = new FormValidator(formValidationConfig, formAddCard);
formValidationAddCard.enableValidation();
// Сброс ошибок при открытии popup
formValidationAddCard.resetValidateEror();


