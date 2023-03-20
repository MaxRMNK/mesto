/*class Card {
  constructor(data, cardConfig) {
    this._image = data.link;
    this._name = data.name;
    this._cardsContainer = cardConfig.cardsContainerSelector;
    this._template = cardConfig.templateSelector;
    this._popupSelector = cardConfig.popupImageSelector;
  }

  _getTemplate() {
    return document.querySelector(this._template)
        .content
        .children[0] // по вебинарам
        .cloneNode(true);
    // По учебнику:
    // const cardElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
    // return cardElement;
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _closePopupWithEsc = (event) => { // Стрелочная, чтобы не терялся контекст
    if (event.key === 'Escape') {
      const _popup = document.querySelector('.popup_opened');
      this._closePopupImage(_popup);
    }
  }

  _closePopupWithClickOverlay = (event) => {
    if (event.target.classList.contains('popup')) {
      this._closePopupImage();
    }
  }

  _closePopupImage() {
    //console.log(this._popup);
    this._popup.classList.remove('popup_opened');

    window.removeEventListener('keydown', this._closePopupWithEsc);
    this._popup.removeEventListener('click', this._closePopupWithClickOverlay);

    // Отключил возврат к дефолтным значениям т.к. popup убирается с задержкой,
    // а картинка меняется моментально, в результате видны "флэшбэки"
    // this._popupImage.src = './images/default.jpg';
    // this._popupImage.alt = 'Название';
    // this._popupCaption.textContent = 'Описание';
  }

  _openPopupImage() {
    this._popup = document.querySelector(this._popupSelector);
    this._popupImage = this._popup.querySelector('.popup__large-image');
    this._popupCaption = this._popup.querySelector('.popup__caption-image');
    this._popupButtonClose = this._popup.querySelectorAll('.popup__close-button');

    this._popupImage.src = this._image;
    this._popupImage.alt = this._name;
    this._popupCaption.textContent = this._name;

    this._popup.classList.add('popup_opened');

    this._popup.addEventListener('click', this._closePopupWithClickOverlay);
    window.addEventListener('keydown', this._closePopupWithEsc);
    // Не придумал варианта лучше "once: true", чтобы удалять слушатель с buttonClose
    this._popupButtonClose[0].addEventListener('click', () => { this._closePopupImage() }, { once: true });
    //console.log(this._popup);
  }

  _addEventListeners() {
    // Стрелочная функция не лучший вариант
    this._element.querySelector('.element__delete').addEventListener('click', () => { this._deleteCard(); });
    this._element.querySelector('.element__like').addEventListener('click', () => { this._likeCard(); });
    this._element.querySelector('.element__image').addEventListener('click', () => { this._openPopupImage() });
  }

  generateCard() { // Раньше называлось createCard()
    this._element = this._getTemplate();
    this._addEventListeners();
    //this._addEventListeners(_popupImage);

	  this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._name;
	  this._element.querySelector('.element__header').textContent = this._name;

  	return this._element;
  }

  addCard() { // Можно назвать: render()
    this._card = this.generateCard();

    //this._cardsContainer.prepend(this._card);

    return this._card;
  }
}

export default Card;
*/
