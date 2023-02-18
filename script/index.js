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

// Совет ревьюера, как лучше сделать кнопки 'Закрыть popup', Спринт 5
const buttonCloseList = page.querySelectorAll('.popup__close-button');
// Вариант 1. Работает на блоке popup__container
//const popupContainerList = page.querySelectorAll('.popup__container');
// Вариант 2. Работает на блоке popup
const popupList = page.querySelectorAll('.popup');

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

// Ф. Закрывает popup при нажатии кнопки Escape на клавиатуре
// Вариант 4?
// Слушает окно браузера и закрывает popup если нажат Esc
// Другие варианты см. в конце файла
function closePopupWithEsc(event) {
  const popup = page.querySelector('.popup_opened');
  if (event.key === 'Escape') {
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

  const popupForm = popupElement.querySelector('.popup__form');
  if (popupForm) {
    //console.log(popupForm);
    resetValidateEror(popupForm);
  }
}



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
  // Подставляет в поля формы текущие значения из текста страницы
  inputNameProfile.value = nameProfile.textContent;
  inputJobProfile.value = jobProfile.textContent;
  // Подрядок важен! Сначала заполняем поля, потом открываем popup
  // До того как поменял их местами не сбрасывались ошибки заполнения формы - resetValidateEror
  openPopup(popupEditProfile);
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


/**********************************************************************************
 * Валидация форм
 */



// Функция, которая добавляет классы с ошибкой
function showInputError(formElement, inputElement, errorMessage) {
  //element.classList.add('popup__input_invalid');

  // Находим элемент ошибки внутри самой функции
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	// Остальной код такой же
	inputElement.classList.add('popup__input_invalid');
	errorElement.textContent = errorMessage;
	errorElement.classList.add('form__input-error_active');
};

// Функция, которая удаляет классы с ошибкой
function hideInputError(formElement, inputElement) {
	// Находим элемент ошибки
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	// Остальной код такой же
	inputElement.classList.remove('popup__input_invalid');
	errorElement.classList.remove('form__input-error_active');
	errorElement.textContent = '';
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
	// проходим по этому массиву методом some
	return inputList.some((inputElement) => {
		// Если поле не валидно, колбэк вернёт true
		// Обход массива прекратится и вся функция
		// hasInvalidInput вернёт true
		return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
function toggleButtonState(inputList, buttonElement) {
	// Если есть хотя бы один невалидный инпут
	if (hasInvalidInput(inputList)) {
	// сделай кнопку неактивной
    buttonElement.classList.add('popup__save-button_disabled');
  } else {
	// иначе сделай кнопку активной
    buttonElement.classList.remove('popup__save-button_disabled');
  }
};

// Ф. валидация
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
		// showInputError теперь получает параметром форму, в которой
		// находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
		// hideInputError теперь получает параметром форму, в которой
		// находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
};

// Сбрасываются ошибки при открытии popup
// !!! Придумать что-то с формой добавления картинок - в ней сохраняется текст при _закрытии_ popup, но ошибки я убираю
function resetValidateEror(formElement) {
  // Этот же список инпутов дальше достается другим способом. Не придумал как его можно передать оттуда.
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
	const buttonElement = formElement.querySelector('.popup__save-button');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
}

// Ф. слушатель событий для полей формы.
// Получает параметром элемент формы и добавляет её полям нужные обработчики
function setEventListeners(formElement) {
  // Получаем массив элементов формы - инпуты, и убираем тэг button
  const inputList = Array.from(formElement).filter(function (i) {
    return i.tagName !== 'BUTTON'
  });

  // Получаем кнопку отправки в текущей форме
	const buttonElement = formElement.querySelector('.popup__save-button');
	// Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
	toggleButtonState(inputList, buttonElement);

  // Перебирает Инпуты формы и вешает на каждый из них обработчик (слушатель)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      // Валидация полей
      checkInputValidity(formElement, inputElement);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
			toggleButtonState(inputList, buttonElement);
    });
  });
};

// Ф. Подключает валидацию для форм
function enableValidation() {
  // Найдём все формы с указанным классом в DOM,
	// сделаем из них массив методом Array.from
	const formList = Array.from(document.querySelectorAll('.popup__form'));

	// Переберем полученную коллекцию
	formList.forEach((formElement) => {
		// Для каждой формы вызовем функцию setEventListeners,
		// передав ей элемент формы
		setEventListeners(formElement);
	});
}

// Вызовем функцию
enableValidation();



/**********************************************************************************
 * Черновики. Удалить
 */

// Ф. Закрытия popup при клике на оверлей
/* // Вариант 1. Работает на блоке popup__container
popupContainerList.forEach(container => {
  const popup = container.closest('.popup');
  //console.log(overlay);
  popup.addEventListener('click', (evt) => {
    //console.log(evt.target);
    //console.log(evt.currentTarget);
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
})*/


// Ф. Закрытия popup при нажатии кнопки Escape на клавиатуре
// Вариант 1. Работает если Esc нажимается когда активно поле input
/*popupList.forEach(container => {
  container.addEventListener('keydown', function(evt) {
    //console.log(evt);
    //console.log(evt.target);
    //console.log(evt.key);
    //console.log(evt.currentTarget);
    if (evt.key === 'Escape') {
      //console.log(evt.key);
      closePopup(container);
    }
  });
})*/
// Вариант 2. Работает всегда, Esc закрывает оверлей если он есть открыт
// Слушает окно
/*window.addEventListener('keydown', function (evt) {
  // Перебирает все popup страницы
  popupList.forEach(overlay => {
    // Если есть открытый popup по нажатию Esc он закрывается
    if (evt.key === 'Escape' && overlay.classList.contains('popup_opened')) {
      //console.log(evt.key);
      //console.log(overlay.classList.contains('popup_opened'));
      closePopup(overlay);
    }
  });
});*/

// Ф. Закрывает popup при нажатии кнопки Escape на клавиатуре
// Вариант 3. Работает. Вызывается при открытии popup.
// Так объявил функцию просто так, для практики.
// Знаю, что это в требование единообразия кода не вписывается.
/*const addEventListenerForEsc = (popup) => {
  // Слушает окно браузера и закрывает popup если нажат Esc
  // Другие варианты см. в конце файла
  window.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
}*/
