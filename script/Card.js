import {showImage} from './index.js';
// Вместо экспорта-импорта функции showImage можно передать ее параметром
// к "new Card(...)" или "card.generateCard()" в index.js. См.сохранения ПР7.

class Card {
  constructor(data, templateSelector) {
    this._imageLink = data.link;
    this._imageName = data.name;
    this._template = templateSelector;
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
    // Стрелочная функция не лучший вариант
    this._element.querySelector('.element__delete').addEventListener('click', () => { this._deleteCard(); });
    this._element.querySelector('.element__like').addEventListener('click', () => { this._likeCard(); });
    this._elementImage.addEventListener('click', () => { showImage(this._imageLink, this._imageName); });
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
