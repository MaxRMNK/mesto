let page = document.querySelector('.page');
let nameProfile = page.querySelector('.profile__name');
let jobProfile = page.querySelector('.profile__job');
let editButton = page.querySelector('.profile__edit-button');

let closeButton = page.querySelector('.popup__close-button');

let popup = page.querySelector('.popup');


// Находим форму в DOM
let formElement = popup.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__job'); // Воспользуйтесь инструментом .querySelector()



// Функция открытия Popup
function showPopup() {
  // console.log(popup.classList);
  popup.classList.add('popup_opened'); // Показываю попап: Добавляю класс с display flex к оверлею
  page.classList.add('noscroll'); // Убираю скролл у окна

  //console.log(nameProfile.textContent);
  //console.log(jobProfile.innerHTML);

  //console.log(nameInput.value);

  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}
editButton.addEventListener('click', showPopup); // Отслеживаем событие "клик по кнопке правка"

// Функция закрытия Popup
function closePopup() {
  if (popup.classList.contains('popup_opened')){
    popup.classList.remove('popup_opened'); // Скрываю попап: Убираю класс с display flex к оверлею - остается display none
  }
  if (page.classList.contains('noscroll')){
    page.classList.remove('noscroll'); // Возвращаю скролл у окна
  }
}

closeButton.addEventListener('click', closePopup); // Отслеживаем событие "клик по кнопке попапа закрыть"

// Закрываем попап без сохранения при нажатии Esc
// https://stackoverflow.com/questions/1481626/how-to-handle-esc-keydown-on-javascript-popup-window)
window.onkeydown = function( event ) {
  if ( event.keyCode == 27 ) {
    //console.log( 'escape pressed' );
    closePopup();
  }
};

function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

