export default class Popup {
  constructor(popupSelector) {
    //this._popup = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose = (event) => { // см.заметки-сохраненки к ПР7
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupButtonClose = this._popupElement.querySelector('.popup__close-button');
    this._popupButtonClose.addEventListener('click', () => this.close() );

    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) { this.close() }
    });
  }

  open() {
    this._popupElement.classList.add('popup_opened'); // Показываю попап
    window.addEventListener('keydown', this._handleEscClose);
    // !!! Нельзя включать слушатели при открытии popup !!!
    // При каждом открытии добавляются новые, а старые не исчезают
    // this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose);
  }
}


// // Ф. Закрывает popup при нажатии кнопки Escape на клавиатуре
// // Вариант 4?
// // Слушает окно браузера и закрывает popup если нажат Esc
// // Другие варианты см. в конце файла
// function closePopupWithEsc(event) {
//   if (event.key === 'Escape') {
//     const popup = page.querySelector('.popup_opened');
//     closePopup(popup);
//   }
// }

// // Ф. Закрывает popup
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   window.removeEventListener('keydown', closePopupWithEsc);
// }

// // Вешает слушатели на кнопки закрытия popup (крестики)
// // Совет ревьюера, как лучше сделать кнопки 'Закрыть popup', Спринт 5
// // Более подробно изучали forEach и этот подход в Спринте 6
// buttonCloseList.forEach(btn => {
//   const popup = btn.closest('.popup');
//   btn.addEventListener('click', () => closePopup(popup));
// })

// // Ф. Закрывает popup при клике на оверлей
// // Вариант 2. Работает на блоке popup.
// popupList.forEach(overlay => {
//   overlay.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('popup')) {
//       closePopup(overlay);
//     }
//   });
// })

// // Открывает popup
// function openPopup(popupElement) {
//   popupElement.classList.add('popup_opened'); // Показываю попап
//   window.addEventListener('keydown', closePopupWithEsc);
// }
