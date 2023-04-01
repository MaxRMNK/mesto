class Card {
  constructor({cardData, handleCardClick}, templateSelector) {
    this._imageLink = cardData.link;
    this._imageName = cardData.name;
    this._template = templateSelector;
    this._handleCardClickFn = handleCardClick; // Рекомендация ревьюера. см конспект ПР7.
  }

  _getTemplate() {
    return document.querySelector(this._template)
        .content
        .children[0] // по вебинарам "ООП на практике", ПР7
        .cloneNode(true);
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _addEventListeners() {
    // Стрелочная функция не лучший вариант, см. самую первую (неправильную версию ПР7 + файл "Примеры с this и addEventListener")
    this._elementLike = this._element.querySelector('.element__like');

    this._element.querySelector('.element__delete').addEventListener('click', () => { this._deleteCard(); });
    this._elementLike.addEventListener('click', () => { this._likeCard(); });
    // Вариант 1. вызов функции полученной в конструктор
    this._elementImage.addEventListener('click', () => { this._handleCardClickFn({link: this._imageLink, name: this._imageName}); });
  }

  generateCard() { // Раньше называлось createCard()
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementHeader = this._element.querySelector('.element__header');

    this._addEventListeners();

	  this._elementImage.src = this._imageLink;
    this._elementImage.alt = this._imageName;
	  this._elementHeader.textContent = this._imageName;

  	return this._element;
  }
}

export default Card;
