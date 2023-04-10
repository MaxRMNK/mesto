import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.popup__form');
    this._buttonSubmit = this._form.querySelector('.popup__button');
    this._buttonSubmitDefaultText = this._buttonSubmit.textContent;
  }

  confirmDeletion(idCard, thisCard, deleteThisCard) {
    this._idCard = idCard;
    this._thisCard = thisCard;
    this._deleteThisCardFn = deleteThisCard;
  }

  renderSending(isSending) {
    if (isSending) {
      this._buttonSubmit.textContent = 'Удаление...';
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitDefaultText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault(); // Отменяет стандартную отправку формы

      this._deleteThisCardFn(this._idCard, this._thisCard);
    });

  }

}
