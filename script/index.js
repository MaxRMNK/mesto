let page = document.querySelector('.page');
let nameProfile = page.querySelector('.profile__name');
let jobProfile = page.querySelector('.profile__job');
let editButton = page.querySelector('.profile__edit-button');

let closeButton = page.querySelector('.popup__close-button');

let popup = page.querySelector('.popup');

// Находим форму и поля формы в DOM
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');

// Функция открытия Popup
function showPopup() {
  popup.classList.add('popup_opened'); // Показываю попап: Добавляю класс с display flex к оверлею

  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

// Функция закрытия Popup
function closePopup() {
  popup.classList.remove('popup_opened'); // Скрываю попап: Убираю класс с display flex к оверлею - остается display none
}

// Шаблон функции из Задания
function handleFormSubmit(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener('click', showPopup); // Отслеживаем событие 'клик по кнопке правка'
closeButton.addEventListener('click', closePopup); // Отслеживаем событие 'клик по кнопке попапа закрыть'
formElement.addEventListener('submit', handleFormSubmit); // Прикрепляем обработчик к форме: он будет следить за событием 'submit'
