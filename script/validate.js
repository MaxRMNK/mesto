/**********************************************************************************
 * Валидация форм
 */

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Функция, которая добавляет классы с ошибкой
function showInputError(formElement, inputElement, errorMessage, config) {
  // Находим элемент ошибки внутри самой функции
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	// Остальной код такой же

	inputElement.classList.add(config.inputErrorClass);
	//errorElement.classList.add('form__input-error_active');
	errorElement.textContent = errorMessage;
};

// Функция, которая удаляет классы с ошибкой
function hideInputError(formElement, inputElement, config) {
	// Находим элемент ошибки
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	// Остальной код такой же
	inputElement.classList.remove(config.inputErrorClass);
	//errorElement.classList.remove('form__input-error_active');
	errorElement.textContent = '';
};

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Функция принимает массив полей
const hasInvalidInput = (inputList) => { // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
function toggleButtonState(inputList, buttonElement, config) {
	// Если есть хотя бы один невалидный инпут
	if (hasInvalidInput(inputList)) {
	  // сделай кнопку неактивной
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
	  // иначе сделай кнопку активной
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

// Ф. валидация
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
		// showInputError теперь получает параметром форму, в которой
		// находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
		// hideInputError теперь получает параметром форму, в которой
		// находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, config);
  }
};

// Сбрасываются ошибки при открытии popup
// !!! Придумать что-то с формой добавления картинок - в ней сохраняется текст при _закрытии_ popup, но ошибки я убираю
function resetValidateEror(formElement, config) {
  // Этот же список инпутов дальше достается другим способом. Не придумал как его можно передать оттуда.
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
	const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
}

// Ф. слушатель событий для полей формы.
// Получает параметром элемент формы и добавляет её полям нужные обработчики
function setEventListeners(formElement, config) {
  // Получаем массив элементов формы - инпуты, и убираем тэг button
  const inputList = Array.from(formElement).filter(function (i) {
    return i.tagName !== 'BUTTON'
  });

  // Получаем кнопку отправки в текущей форме
	const buttonElement = formElement.querySelector(config.submitButtonSelector);
	// Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
	toggleButtonState(inputList, buttonElement, config);

  // Перебирает Инпуты формы и вешает на каждый из них обработчик (слушатель)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      // Валидация полей
      checkInputValidity(formElement, inputElement, config);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
			toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// Ф. Подключает валидацию для форм
function enableValidation(config) {
  // Найдём все формы с указанным классом в DOM,
	// сделаем из них массив методом Array.from
	const formList = Array.from(document.querySelectorAll(config.formSelector));

	// Переберем полученную коллекцию
	formList.forEach((formElement) => {
		// Для каждой формы вызовем функцию setEventListeners,
		// передав ей элемент формы
		setEventListeners(formElement, config);
	});
}

// Вызовем функцию
enableValidation(formValidationConfig);
