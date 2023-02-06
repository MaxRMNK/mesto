const page = document.querySelector('.page');
const nameProfile = page.querySelector('.profile__name');
const jobProfile = page.querySelector('.profile__job');
const buttonEditProfile = page.querySelector('.profile__edit-button'); // Кнопка Редактирования профиля
const buttonAddCard = page.querySelector('.profile__add-button'); // Кнопка Добавления Картинки

// Выбирает template для createCard()
const elementTemplate = page.querySelector('#element').content;
// Выбирает элемент, в который нужно добавлять карточки addCards()
const cardsContainer = page.querySelector('.elements');

// Находим все крестики - кнопки 'Закрыть popup'
// Удалил классы с модификаторами у этих кнопок на странице
//const buttonCloseEditProfile = page.querySelector('.popup__close-button_edit-profile');
//const buttonCloseAddCard = page.querySelector('.popup__close-button_add-card');
//const buttonCloseLargeImage = page.querySelector('.popup__close-button_image');

// Совет ревьюера, как лучше сделать кнопки 'Закрыть popup'
const buttonCloseList = page.querySelectorAll('.popup__close-button');

const popupEditProfile = page.querySelector('.popup_edit-profile');
const popupAddCard = page.querySelector('.popup_add-card');
const popupLargeImage = page.querySelector('.popup_image'); // Выбирает popup, в который нужно добавлять картинки

// Находим форму и поля формы в DOM
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const inputNameProfile = formEditProfile.querySelector('.popup__input_type_name');
const inputJobProfile = formEditProfile.querySelector('.popup__input_type_job');

const formAddCard = popupAddCard.querySelector('.popup__form');
const inputImageTitle = formAddCard.querySelector('.popup__input_type_add-title');
const inputImageLink = formAddCard.querySelector('.popup__input_type_add-link');

// Заменяет значения ссылки и описания
const ImageToView = popupLargeImage.querySelector('.popup__large-image');
const imageCaption = popupLargeImage.querySelector('.popup__caption-image');


/**********************************************************************************
 * Общие функции
 */

// Открывает popup
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened'); // Показываю попап
}

// Ф. Закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Совет ревьюера. Как
buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
})

/**********************************************************************************
 * Форма Редактирование профиля
 */

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
  openPopup(popupEditProfile);
  // Подставляет в поля формы текущие значения из текста страницы
  inputNameProfile.value = nameProfile.textContent;
  inputJobProfile.value = jobProfile.textContent;
});

// Отслеживает событие 'клик по кнопке закрыть' у формы Редактирование профиля
//buttonCloseEditProfile.addEventListener('click', () => closePopup(popupEditProfile));

// Обработчик формы, следит за событием 'submit'
formEditProfile.addEventListener('submit', handleFormSubmitProfile);

/**********************************************************************************
 * Форма Добавление карточек
 */

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
  // Строка reset() очищает поля при отправке формы. При закрытии popup (нажанием на крестик) введенные данные сохранятся.
  evt.target.reset();
  closePopup(popupAddCard);
}

// Открывает попап добавления картинки
buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));

// Отслеживает событие 'клик по кнопке закрыть' у формы Добавить карточку
/*buttonCloseAddCard.addEventListener('click', () => {
  // Строка reset() очищает поля при закрытии формы (нажанием на крестик)
  // см. handleFormSubmitCard(), там есть похожий вызов при сохранении формы
  formAddCard.reset();
  closePopup(popupAddCard);
});*/

// Обработчик формы, следит за событием 'submit'
formAddCard.addEventListener('submit', handleFormSubmitCard);


/**********************************************************************************
 * Popup картинок
 */

/**
 * Функция для добавления и удаления popup картинки
 * Вариант 2
 * При клике по картинке берется уже имеющаяся заготовка popup и в ней меняются ссылка и описание картинки.
 * Все работает, но мне кажется это не лучшее решение.
 */
function showImage(event) {
  // Заменяет значения ссылки и описания
  ImageToView.src = event.target.src;
  ImageToView.alt = event.target.alt;
  imageCaption.textContent = event.target.alt;

  // Открывает попап с картинкой
  openPopup(popupLargeImage);
}

// Отслеживает событие 'клик по кнопке закрыть' у popup картинки
//buttonCloseLargeImage.addEventListener('click', () => closePopup(popupLargeImage));


/**********************************************************************************
 * Добавление карточек и реакций к ним
 */
// Ф. удаления карточки
function deleteCard(event) {
	event.target.closest('.element').remove();
}
// Ф. добавления лайка карточке
function likeCard(event) {
  event.target.classList.toggle('element__like_active');
}

// Ф. добавления карточкам реакций
function addCardEventListeners (сard) {
	const deleteButton = сard.querySelector('.element__delete');
	deleteButton.addEventListener('click', deleteCard);

	const likeButton = сard.querySelector('.element__like');
	likeButton.addEventListener('click', likeCard);

  const openImage = сard.querySelector('.element__image');
  openImage.addEventListener('click', showImage);
}

//Ф. превращает исодный массив значений (БД) в контент страницы
function createCard(cardData) {
  // Делает копию  template для дальнейшего наполнения
  const сard = elementTemplate.querySelector('.element').cloneNode(true);
  // Наполняет контентом скопированный ранее template
  сard.querySelector('.element__image').src = cardData.link;
  сard.querySelector('.element__image').alt = cardData.name;
  сard.querySelector('.element__header').textContent = cardData.name;

  addCardEventListeners(сard);
  return сard;
}

//Функция обходит массив (БД) и выводит карточки на страницу
function addCards(items) {
  // Аргумент функции - массив (БД), в котором содержатся другие массивы с Названиями карточек и Ссылками на картинки
  // Функция forEach обходит массив с данными карточек
  items.forEach (el => {
    // Вызывает createCard() для создания карточки
    cardsContainer.prepend(createCard(el));
  });
}

addCards(initialCards);
