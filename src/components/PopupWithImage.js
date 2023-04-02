import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageToView = this._popupElement.querySelector('.popup__large-image');
    this._imageCaption = this._popupElement.querySelector('.popup__caption-image');
  }

  open({link, name}) { // достаем ключи объекта data сразу
    this._imageToView.src = link;
    this._imageToView.alt = name;
    this._imageCaption.textContent = name;

    super.open();
  }

  // Без использования деструктуризации параметров
  // open(data) {
  //   ...
  //   this._imageToView.src = data.link;
  //   this._imageToView.alt = data.name;
  //   this._imageCaption.textContent = data.name;
  //   ...
  // }

}

