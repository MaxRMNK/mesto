class FormValidator {
  constructor(data, form) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    //this._errorClass = data.errorClass;
    this._form = form; // В validate.js называлась formElement

    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector)); // this._form <= formElement
    this._buttonElement = this._form.querySelector(this._submitButtonSelector); // this._form <= formElement
    // ПР8, коммент ревьюера:
    // Правильнее будет вынести поиск элементов формы в конструктор.
    // Почему?
    // У вас есть методы в классе, которые являются публичными и их вызов никак
    // не зависит от выполнения _setEventListeners(), например, resetValidateEror().
    // Т.е. они могут быть вызваны до установки слушателей, соответственно,
    // чтобы их вызов не привел к ошибке нужно чтобы поля класса с массивом инпутов
    // и кнопкой уже были определены. Лучше сделать это в конструкторе, тогда вы уходите
    // от зависимости всегда отслеживать запуск установки слушателей раньше выполнения других методов.
    // Старайтесь при проектировании класса всегда обращать внимание на такие детали. Это повысит качество кода.
  }

  // Функция, которая добавляет классы с ошибкой
  _showInputError(inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`); // this._form <= formElement
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
  };

  // Функция, которая удаляет классы с ошибкой
  _hideInputError(inputElement) {
    // Находим элемент ошибки
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`); // this._form <= formElement
    inputElement.classList.remove(this._inputErrorClass);
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
    // Если есть хотя бы один невалидный инпут.
    // БЫЛО: if (this._hasInvalidInput(this._inputList)) { ...
      // Передавать в параметрах поля класса не нужно. Они доступны во всех методах класса - ПР8
    // СТАЛО:
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }

    // // Можно упростить. Соверты Ревьюера, ПР8:
    // // Вариант 1:
    // // Можно совсем удалить метод _hasInvalidInput, т.к. у формы есть метод checkValidity()
    // // который возвращает true, если вся форма валидна и false если наоборот.
    // if (this._form.checkValidity()) {
    //   // сделай кнопку активной
    //   this._buttonElement.classList.remove(this._inactiveButtonClass);
    //   this._buttonElement.removeAttribute('disabled');
    // } else {
    //   // иначе сделай кнопку неактивной
    //   this._buttonElement.classList.add(this._inactiveButtonClass);
    //   this._buttonElement.setAttribute('disabled', true);
    // }

    // // Вариант 2:
    // // СЕЙЧАС НЕ РАБОТАЕТ!
    // // Можно еще больше упростить код. (Только сначала нужно в нем разобраться!)
    // const isFormInvalid = this._form.checkValidity();
    // this._buttonElement.classList.toggle(this._inactiveButtonClass, isFormInvalid);
    // this._buttonElement.disabled = isFormInvalid;

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
