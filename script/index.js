/**********************************************************************************
 * Работа с классами
 */


import initialCards from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';












/**********************************************************************************
 * Старый код
 */


const page = document.querySelector('.page');
const nameProfile = page.querySelector('.profile__name');
const jobProfile = page.querySelector('.profile__job');
const buttonEditProfile = page.querySelector('.profile__edit-button'); // Кнопка Редактирования профиля
const buttonAddCard = page.querySelector('.profile__add-button'); // Кнопка Добавления Картинки

// Выбирает template для createCard()
const elementTemplate = page.querySelector('#element').content;
// Выбирает элемент, в который нужно добавлять карточки addCards()
const cardsContainer = page.querySelector('.elements');

// Совет ревьюера, как лучше сделать кнопки 'Закрыть popup', Спринт 5
const buttonCloseList = page.querySelectorAll('.popup__close-button');
// Вариант 2. Работает на блоке popup
const popupList = page.querySelectorAll('.popup');

// Popup редактирования профиля
const popupEditProfile = page.querySelector('.popup_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const inputNameProfile = formEditProfile.querySelector('.popup__input_type_name');
const inputJobProfile = formEditProfile.querySelector('.popup__input_type_job');

// Popup добавления карточки
const popupAddCard = page.querySelector('.popup_add-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const inputImageTitle = formAddCard.querySelector('.popup__input_type_add-title');
const inputImageLink = formAddCard.querySelector('.popup__input_type_add-link');

// Popup картинки
const popupLargeImage = page.querySelector('.popup_image');
const ImageToView = popupLargeImage.querySelector('.popup__large-image');
const imageCaption = popupLargeImage.querySelector('.popup__caption-image');


// Общие функции ----------------------------------------


// Ф. Закрывает popup при нажатии кнопки Escape на клавиатуре
// Вариант 4?
// Слушает окно браузера и закрывает popup если нажат Esc
// Другие варианты см. в конце файла
function closePopupWithEsc(event) {
  if (event.key === 'Escape') {
    const popup = page.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// Ф. Закрывает popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closePopupWithEsc);
}

// Вешает слушатели на кнопки закрытия popup (крестики)
// Совет ревьюера, как лучше сделать кнопки 'Закрыть popup', Спринт 5
// Более подробно изучали forEach и этот подход в Спринте 6
buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
})

// Ф. Закрывает popup при клике на оверлей
// Вариант 2. Работает на блоке popup.
popupList.forEach(overlay => {
  overlay.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(overlay);
    }
  });
})

// Открывает popup
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened'); // Показываю попап
  window.addEventListener('keydown', closePopupWithEsc);
}


// Popup картинок -------------------------------------------

// Заменяет Картинку и Описание в popup картинки и открывает его.
// Вместо экспорта функции можно передать ее параметром
// к "new Card(...)" или "card.generateCard()". См.сохранения ПР7.
export function showImage(ImageLink, imageName) {
  ImageToView.src = ImageLink;
  ImageToView.alt = imageName;
  imageCaption.textContent = imageName;

  openPopup(popupLargeImage);
}

// // Ф. добавления и удаления popup картинки
// // Вариант 2
// // При клике по картинке берется заготовка popup и в ней меняются ссылка и описание картинки
// function showImage(event) {
//   // Заменяет значения ссылки и описания
//   ImageToView.src = event.target.src;
//   ImageToView.alt = event.target.alt;
//   imageCaption.textContent = event.target.alt;

//   // Открывает попап с картинкой
//   openPopup(popupLargeImage);
// }


// Форма Редактирование профиля ------------------------------------

// Ф. отправки/сохранения формы Редактирование профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  nameProfile.textContent = inputNameProfile.value;
  jobProfile.textContent = inputJobProfile.value;
  closePopup(popupEditProfile);
  //console.log(evt.target.name);
}

// Открывает попап редактирования профиля
buttonEditProfile.addEventListener('click', function () {
  // Подставляет в поля формы текущие значения из текста страницы
  inputNameProfile.value = nameProfile.textContent;
  inputJobProfile.value = jobProfile.textContent;

  // Подрядок важен! Сначала заполняем поля, потом открываем popup
  // До того как поменял их местами не сбрасывались ошибки заполнения формы - resetValidateEror
  // Сброс ошибок при открытии popup
  resetValidateEror(formEditProfile);
  // Убрал из вызова второй параметр и добавил его в саму функцию resetValidateEror.
  // resetValidateEror(formEditProfile, formValidationConfig);
  openPopup(popupEditProfile);
});

// Обработчик формы, следит за событием 'submit'
formEditProfile.addEventListener('submit', handleFormSubmitProfile);


// Форма Добавление карточек -------------------------------------

// Ф. отправки/сохранения формы Добавления карточки
function handleFormSubmitCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  const item = [
    {
      name: inputImageTitle.value,
      link: inputImageLink.value
    }
  ];
  addCards(item);
  // Строка reset() очищает поля при отправке формы.
  // При закрытии popup (нажанием на крестик) введенные данные сохранятся.
  evt.target.reset();
  closePopup(popupAddCard);
}

// Открывает попап добавления картинки
buttonAddCard.addEventListener('click', function () {
  // Сброс ошибок при открытии popup
  resetValidateEror(formAddCard);
  // Убрал из вызова второй параметр и добавил его в саму функцию resetValidateEror.
  // resetValidateEror(formEditProfile, formValidationConfig);
  openPopup(popupAddCard)
});

// Обработчик формы, следит за событием 'submit'
formAddCard.addEventListener('submit', handleFormSubmitCard);



// FormValidator ---------------------------------




// Добавление карточек и реакций к ним ---------------------------------

// Обходит массив с данными и создает карточки
function addCards(items) {
  items.forEach (item => {
    const card = new Card(item, '#element');
    cardsContainer.prepend(card.generateCard());
  });
}

addCards(initialCards);
