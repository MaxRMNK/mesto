import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  // constructor(popupSelector) {
  //   super(popupSelector);
  // }

  open({link, name}) { // достаем ключи объекта data сразу
    const ImageToView = this._popupElement.querySelector('.popup__large-image');
    const imageCaption = this._popupElement.querySelector('.popup__caption-image');

    ImageToView.src = link;
    ImageToView.alt = name;
    imageCaption.textContent = name;

    super.open();
  }

  // Без использования деструктуризации параметров
  // open(data) {
  //   ...
  //   ImageToView.src = data.link;
  //   ImageToView.alt = data.name;
  //   imageCaption.textContent = data.name;
  //   ...
  // }

}

