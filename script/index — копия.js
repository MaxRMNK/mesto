const page = document.querySelector('.page');
const nameProfile = page.querySelector('.profile__name');
const jobProfile = page.querySelector('.profile__job');
const editButton = page.querySelector('.profile__edit-button'); // Кнопка Редактирования профиля
const addButton = page.querySelector('.profile__add-button'); // Кнопка Добавления Картинки

//let closeButton = page.querySelector('.popup__close-button'); // Было
const closeButtonEditProfile = page.querySelector('.popup__close-button_edit-profile');
const closeButtonAddCard = page.querySelector('.popup__close-button_add-card');


// let popup = page.querySelector('.popup'); // Было
const popupEditProfile = page.querySelector('.popup__edit-profile');
const popupAddCard = page.querySelector('.popup__add-card');

// Находим форму и поля формы в DOM
// let formElement = popup.querySelector('.popup__form'); // Было
const formElement = popupEditProfile.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

const formCard = popupAddCard.querySelector('.popup__form');
const addTitleInput = formCard.querySelector('.popup__input_type_add-title');
const addLinkInput = formCard.querySelector('.popup__input_type_add-link');




/**
 * Код из уроков
 */
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened'); // Показываю попап
  //console.log(popupElement);
}

// Ф. Закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  //console.log('Закрываем popup');
  //console.log(popup);
}


// Ф. отправки/сохранения формы Редактирование профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
  //console.log(evt.target.name);
}

// Ф. отправки/сохранения формы Добавления карточки
function handleFormSubmitCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  const item = [
    {
      name: addTitleInput.value,
      link: addLinkInput.value
    }
  ];
  addCards(item);
  closePopup(popupAddCard);
}

// Шаблон функции из Задания "Спринт 4"
/*function handleFormSubmit(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  if(evt.target.name === 'editProfileForm'){
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupEditProfile);
    //console.log(evt.target.name);
  }
  else if (evt.target.name === 'addCardForm'){
    const item = [
      {
        name: addTitleInput.value,
        link: addLinkInput.value
      }
    ];
    addCards(item);
    closePopup(popupAddCard);
  }
  else {
    console.log(evt.target.name + ' что-то пошло не так');
  }
}*/



// Открывает попап редактирования профиля
editButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  // Подставляет в поля формы текущие значения из текста страницы
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

// Открывает попап добавления картинки
addButton.addEventListener('click', function() {
  // Стираются значения введенные в форму ранее
  addTitleInput.value = '';
  addLinkInput.value = '';

  openPopup(popupAddCard);
});

// Отслеживают события 'клик по кнопке закрыть' у форм
closeButtonEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
closeButtonAddCard.addEventListener('click', () => closePopup(popupAddCard));

// Обработчики форм, следят за событием 'submit'
formElement.addEventListener('submit', handleFormSubmitProfile);
formCard.addEventListener('submit', handleFormSubmitCard);






/** **************************************************
 * Спринт 5
 */

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Выбирает template для createCard()
const elementTemplate = document.querySelector('#element').content;
// Выбирает элемент, в который нужно добавлять карточки addCards()
const allCards = document.querySelector('.elements');


// Функция удаления карточки
function deleteCard(event) {
	event.target.closest('.element').remove();
}
// Функция добавления лайка карточке
function likeCard(event) {
  // const likeCard = event.target.classList.toggle('element__like_active'); // ХЗ зачем тут назначать переменную
  event.target.classList.toggle('element__like_active');
}
/*******************************************************************
 * Функция для добавления и удаления popup картинки
 * Вариант 1
 * При клике по картинке из template создается popup элемент, а при закрытии popup, он удаляется.
 * Проблема: Не работает плавное открытие и закрытие

function showImage(event) {
  //console.log(event.target.src);
  //console.log(event.target.alt);

  // Выбирает template для popup картинки
  const popupImageTemplate = page.querySelector('#popup_image').content;

  // Делает копию  template для дальнейшего наполнения
  const addPopupImage = popupImageTemplate.querySelector('.popup_image').cloneNode(true);
  // Наполняет контентом скопированный ранее template
  addPopupImage.querySelector('.popup__large-image').src = event.target.src;
  addPopupImage.querySelector('.popup__large-image').alt = event.target.alt;
  addPopupImage.querySelector('.popup__caption-image').textContent = event.target.alt;
  //console.log(addPopupImage);

  // Добавляет блок popup картинки на страницу
  allCards.after(addPopupImage);

  // Ищет на странице и открывает popup картинки
  const popupImage = page.querySelector('.popup_image');
  //console.log(popupImage);

  openPopup(popupImage); // открываем попап с картинкой

  const closeButtonPopupImage = page.querySelector('.popup__close-button_image');
  // Закрывает popup картинки и удаляет ранее добавленный на страницу код popup'а картинки
  closeButtonPopupImage.addEventListener('click', function(){
    closePopup(popupImage)
    popupImage.remove();
  });
}
 */
/*******************************************************************
 * Функция для добавления и удаления popup картинки
 * Вариант 2
 * При клике по картинке берется уже имеющаяся заготовка popup и в ней меняются ссылка и описание картинки.
 * Проблема: Нет проблем, но мне кажется это не лучшее решение.
 */
function showImage(event) {
  // Выбирает элемент popup, в который нужно добавлять картинки
  const popupImage = document.querySelector('.popup_image');

  // Заменяет значения ссылки и описания
  popupImage.querySelector('.popup__large-image').src = event.target.src;
  popupImage.querySelector('.popup__large-image').alt = event.target.alt;
  popupImage.querySelector('.popup__caption-image').textContent = event.target.alt;

  // Открывает попап с картинкой
  openPopup(popupImage);

  // Находит кнопку Закрыть; Отслеживает клик по ней; Закрывает popup картинки
  const closeButtonPopupImage = popupImage.querySelector('.popup__close-button_image');
  closeButtonPopupImage.addEventListener('click', () => closePopup(popupImage));
}


// Функция добавления карточкам реакций
function addCardEventListeners (сard) {
	const deleteButton = сard.querySelector('.element__delete');
	deleteButton.addEventListener('click', deleteCard);

	const likeButton = сard.querySelector('.element__like');
	likeButton.addEventListener('click', likeCard);

  const openImage = сard.querySelector('.element__image');
  openImage.addEventListener('click', showImage);
}


//Функция превращает исодный массив значений (БД) в контент страницы
function createCard(itemName, itemLink) {
  // Делает копию  template для дальнейшего наполнения
  const сard = elementTemplate.querySelector('.element').cloneNode(true);
  // Наполняет контентом скопированный ранее template
  сard.querySelector('.element__image').src = itemLink;
  сard.querySelector('.element__image').alt = itemName;
  сard.querySelector('.element__header').textContent = itemName;

  /*
  // Код из учебника-тренажера. Выбирается элемент "element__like" и на него вешается обработчик событий =>
  // => при клике выполняется функция evt.
  сard.querySelector('.element__like').addEventListener('click', function (evt) {
    // Объекту evt (со свойством target) добавляется/удаляется класс "активен" с помощью метода toggle
    // toggle - переключает класс (добавляет если нет, и удаляет если есть).
    evt.target.classList.toggle('element__like_active');
  });
  */

  addCardEventListeners(сard);

  return сard;
}

//Функция обходит массив (БД) и выводит карточки на страницу
function addCards(items) {
  // Аргумент функции - массив (БД), в котором содержатся другие массивы с Названиями карточек и Ссылками на картинки
  // Функция forEach обходит массив с данными карточек
  items.forEach (el => {
    // Вызывает функцию createCard() для создания карточки
    allCards.prepend(createCard(el.name, el.link));
    //console.log(el.name);
  });
}

// createCard();
addCards(initialCards);



/***********************************************
 *
 */


