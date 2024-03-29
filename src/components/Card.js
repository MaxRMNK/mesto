class Card {
  constructor(cardData, currentUserId, functions, templateSelector) {
    // this._imageLink = cardData.link;
    // this._imageName = cardData.name;
    this._cardData = cardData;

    this._dataLikes = cardData.likes; // Массив с Лайками
    // this._likeCount = cardData.likes.length; // Количество лайков
    this._idCard = cardData._id;
    this._idUserCard = cardData.owner._id;

    this._currentUserId = currentUserId;
    this._template = templateSelector;

    this._handleCardClickFn = functions.handleCardClick;
    this._likeCardFn = functions.likeCard;
    this._handleDeleteCardFn = functions.handleDeleteCard;
  }

  _getTemplate() {
    return document.querySelector(this._template)
        .content
        .children[0] // по вебинарам "ООП на практике", ПР7
        .cloneNode(true);
  }

  // _deleteCard() {
  //   // this._element.remove();
  //   // // ПР8
  //   // // При удалении экземпляра класса его дополнительно (после удаления) нужно занулять - "this._element = null".
  //   // // Метод remove удаляет только разметку из html, но объект карточки остается в памяти приложения и потребляет ресурсы.
  //   // this._element = null;
  //   this._handleDeleteCardFn(this._idCard, this._element)
  // }

  deleteCardCompletely() { // Переименовал метод после сдачи ПР9
    // console.log('this ???', this);
    this._element.remove();
    this._element = null;
  }

  _isUserCard() {
    return this._idUserCard === this._currentUserId;
  }

  _isLikedCard() {
    // return this._dataLikes.some(like => like._id === this._currentUserId);
    return this._dataLikes.some((like) => {
      return like._id === this._currentUserId
    });
  }

  // // Вариант 2. _setLikes и togleLikeCard доработал по рекомендации ревьюера.
  // // Исходную версию смотри в конце файла
  _setLikes(evt) {
    // let isLiked = evt.target.classList.contains('element__like_active');
    let isLiked = this._isLikedCard(); // Заработало после доработки по подсказке от ревьюера, см. "Вариант 1" ниже.
    this._likeCardFn(this, this._idCard, isLiked);
  }

  togleLikeCard(data) {
    this._dataLikes = data.likes;
    this._elementLikeButton.classList.toggle('element__like_active');
    this._elementLikeCounter.textContent = data.likes.length;
  }

  _addEventListeners() {
    this._elementLikeButton.addEventListener('click', (evt) => { this._setLikes(evt) });

    // if (this._isUserCard()) { // Слушатель устанавливается ТОЛЬКО для моих карточек
    //   this._elementDeleteButton.addEventListener('click', () => { this._deleteCard(); });
    // }

    if (this._isUserCard()) { // Слушатель устанавливается ТОЛЬКО для моих карточек
      this._elementDeleteButton.addEventListener('click', () => { this._handleDeleteCardFn(this._idCard, this) });
    }

    // Вариант 1. вызов функции полученной в конструктор - Просмотр картинки
    this._elementImage.addEventListener('click', () => { this._handleCardClickFn(this._cardData); });
  }

  generateCard() { // Раньше называлось createCard()
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementHeader = this._element.querySelector('.element__header');
    this._elementDeleteButton = this._element.querySelector('.element__delete');
    this._elementLikeButton = this._element.querySelector('.element__like');
    this._elementLikeCounter = this._element.querySelector('.element__like-counter');

    this._addEventListeners();

	  this._elementImage.src = this._cardData.link;
    this._elementImage.alt = this._cardData.name;
	  this._elementHeader.textContent = this._cardData.name;
    this._elementLikeCounter.textContent = this._cardData.likes.length;

    if (!this._isUserCard()) { // Кнопка удаляется со всех карточек КРОМЕ моих
      this._elementDeleteButton.remove();
    }

    if (this._isLikedCard()) {
      this._elementLikeButton.classList.add('element__like_active');
    }

  	return this._element;
  }
}

export default Card;


  // // Вариант 1. Его приняли в ПР9. Доработал по рекомендации ревьюера.
  // // Исправленную версию _setLikes и togleLikeCard смотри выше.
  // // ------------------
  // _setLikes(evt) {
  //   let isLiked = evt.target.classList.contains('element__like_active'); // Работает
  //   // let isLiked2 = this._isLikedCard(); // Не работает при повторном переключении лайка
  //   // ПР9. Коммент ревьюера:
  //   // Потому что при любом изменении лайка вы вызываете метод togleLikeCard
  //   // в который передаете измененный массив, вот только в классе его не сохраняете,
  //   // поэтому и перестают работать методы.
  //   // А вот если в togleLikeCard еще дописать:
  //   // this._dataLikes = data;
  //   // Тогда массив обновится и все остальное будет работать
  //   // ------------------
  //   // Ревьюер чуть-чуть ошибся, надо: this._dataLikes = data.likes;
  //   this._likeCardFn(this, this._idCard, isLiked);
  // }
  // togleLikeCard(data) {
  //   this._elementLikeButton.classList.toggle('element__like_active');
  //   this._elementLikeCounter.textContent = data.likes.length;
  // }
