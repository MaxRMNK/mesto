import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmitFn = handleFormSubmit;  // + принимает в конструктор колбэк сабмита формы

    this._form = this._popupElement.querySelector('.popup__form');
    this._buttonSubmit = this._form.querySelector('.popup__button');
    this._buttonSubmitDefaultText = this._buttonSubmit.textContent;

    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const inputData = {};
    // собирает данные всех полей формы
    this._inputList.forEach((inputElement) => {
      // console.log(inputElement);
      inputData[inputElement.name] = inputElement.value;
    });
    // console.log(inputData);
    return inputData;
  }

  renderSending(isSending) {
    if (isSending) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitDefaultText;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (event) => {
      event.preventDefault(); // Отменяет стандартную отправку формы
      // console.log('this._getInputValues()', this._getInputValues());
      this._handleFormSubmitFn( this._getInputValues() );
      this.close();
      //this._form.reset(); // Очистка полей формы при отправке. См.примечание внизу
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}


// !!! "this._form.reset()" вернул в метод close() и убрал из setEventListeners()

    // Так не правильно:
    // Считаю, что сброс формы при любом закрытии popup это плохо, т.к. введенные данные
    // сбрасываются/удаляются даже если форма была закрыта случайно (клик по оверлею).
    // Сделал очистку полей только при отправке - в функции setEventListeners()

// Об этом можно говорить только тогда, когда вы реализуете анализ разных вариантов закрытия попапа.
// Например нажатие Esc говорит об отказе от ввода данных, при этом форма должна быть очищена.
// В вашем же решении сейчас, данные в форме остаются.
// Кроме того, уже в следующем спринте такое решение повлечет за собой или усложнение кода,
// если выполнять все корректно, или не совсем корректную реализацию, так как очищать форму
// и закрывать попап в обработчике сабмита здесь будет нельзя, нужно будет сперва дождаться ответа сервера.
// При этом закрытие попапа вы вынесете в index.js а вот очистку вынести нельзя,
// вам придется создавать отдельный метод для этого.
// Желательно все-же выполнять задание так, как оно написано.
