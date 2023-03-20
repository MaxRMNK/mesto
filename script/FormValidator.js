/*class FormValidator {
  constructor(data, formSelector) {
    //this._popup = popupSelector;
    this._formSelector = formSelector;
    this._fieldNameSelector = data.nameProfileSelector;
    this._fieldJobSelector = data.jobProfileSelector;
  }


  _openPopupForm() {
    this._popupButtonClose = this._popup.querySelectorAll('.popup__close-button');

    this._popup.classList.add('popup_opened');

    this._popupButtonClose[0].addEventListener('click', () => { this._closePopupForm() }, { once: true });
  }

  _closePopupForm() {
    // console.log(this._popup.classList);
    this._popup.classList.remove('popup_opened');
  }

  enableValidation() {
    this._form = document.querySelector(this._formSelector); // Находит форму
    this._popup = this._form.closest('.popup'); // По форме находит родительский popup

    //console.log(this._popup);
    this._openPopupForm();


    this._fieldName = document.querySelector(this._fieldNameSelector);
    this._fieldJob = document.querySelector(this._fieldJobSelector);
    console.log(this._fieldName.textContent);
    console.log(this._fieldJob.textContent);

    // console.log(this._formSelector);
    // console.log(this._form);
    // console.log(this._popup);

  }
}
*/

export default FormValidator;

