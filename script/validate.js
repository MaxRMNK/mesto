/**********************************************************************************
 * Валидация форм
 */

// Функция, которая добавляет классы с ошибкой
function showInputError(formElement, inputElement, errorMessage) {
  // Находим элемент ошибки внутри самой функции
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	// Остальной код такой же

  // Не понял в чем тут проблема. Вроде у меня все так, как ты описал.
  // Возможно, я что-то не так понимаю. Объясни чуть подробнее.
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

  //console.log(buttonElement);
	if (hasInvalidInput(inputList)) {
	  // сделай кнопку неактивной
    buttonElement.classList.add('popup__save-button_disabled');
    buttonElement.setAttribute('disabled', true);
  } else {
	  // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__save-button_disabled');
    buttonElement.removeAttribute('disabled');
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
