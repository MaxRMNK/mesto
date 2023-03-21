class FormValidator {
  constructor(data, form) {
    this._form = form; // В validate.js называлась formElement
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  // Функция, которая добавляет классы с ошибкой
  _showInputError(inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`); // this._form <= formElement
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.classList.add(this._errorClass); // ХЗ нужен ли. Он ничего не меняет.
    this._errorElement.textContent = errorMessage;
    // console.log(inputElement);
    // console.log(errorMessage);
  };

  // Функция, которая удаляет классы с ошибкой
  _hideInputError(inputElement) {
    // Находим элемент ошибки
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`); // this._form <= formElement
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass); // ХЗ нужен ли. Он ничего не меняет.
    this._errorElement.textContent = '';
  };

  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если хотя бы одно поле массива не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  };

  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(this._inputList)) {
      // сделай кнопку неактивной
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  };

  // Ф. валидация
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector)); // this._form <= formElement
    this._buttonElement = this._form.querySelector(this._submitButtonSelector); // this._form <= formElement

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        // Валидация полей
        this._checkInputValidity(inputElement);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState();
      });
    });
  }

  resetValidateEror() {
    // console.log(this._inputList);
    // console.log(this._buttonElement);

    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    // this._form = document.querySelector(this._formSelector); // Находит форму
    // this._popup = this._form.closest('.popup'); // По форме находит родительский popup

    // //console.log(this._popup);
    // this._openPopupForm();


    // this._fieldName = document.querySelector(this._fieldNameSelector);
    // this._fieldJob = document.querySelector(this._fieldJobSelector);
    // console.log(this._fieldName.textContent);
    // console.log(this._fieldJob.textContent);

    // console.log(this._formSelector);
    // console.log(this._form);
    // console.log(this._popup);

    this._setEventListeners();
  }
}


export default FormValidator;
