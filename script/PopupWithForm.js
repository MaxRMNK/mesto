import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmitFn = handleFormSubmit;  // + принимает в конструктор колбэк сабмита формы

    this._form = this._popupElement.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._inputData = {};
  }

  _getInputValues() {
    // собирает данные всех полей формы
    this._inputList.forEach((inputElement) => {
      // console.log(inputElement);
      this._inputData[inputElement.name] = inputElement.value;
    });
    // console.log(this._inputData);
    return this._inputData;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (event) => {
      event.preventDefault(); // Отменяет стандартную отправку формы
      // console.log('this._getInputValues()', this._getInputValues());
      this._handleFormSubmitFn( this._getInputValues() );
      this.close();
      this._form.reset(); // Очистка полей формы при отправке
    });
  }

  close() {
    super.close();
    // Считаю, что сброс формы при любом закрытии popup это плохо, т.к. введенные данные
    // сбрасываются/удаляются даже если форма была закрыта случайно (клик по оверлею).
    // Сделал очистку полей только при отправке - в функции setEventListeners()
    // this._form.reset();
  }
}
