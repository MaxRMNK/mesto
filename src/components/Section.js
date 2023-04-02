// По рекомендации ревьюера ПР8, перенес data в renderItems:
export default class Section {
  constructor(renderer, sectionSelector) {
    this._rendererFn = renderer;
    this._section = document.querySelector(sectionSelector);
  }

  renderItems(data) { // отвечает за отрисовку всех элементов в Section
    // Сделал const потому что "data" кроме как здесь больше ни где не используется, см. замечания к PopupWithForm.js в ПР8
    const dataItems = data;
    // console.log(dataItems);
    dataItems.forEach (item => this._rendererFn(item));
  }

  addItem(element) { // Добавляет карточку на страницу
    this._section.prepend(element);
  }
}

// По ПР8
// export default class Section {
//   constructor({data, renderer}, sectionSelector) {
//     this._data = data;
//     this._rendererFn = renderer;
//     this._section = document.querySelector(sectionSelector);
//   }

//   renderItems() { // отвечает за отрисовку всех элементов в Section
//     this._data.forEach (item => this._rendererFn(item));
//   }

//   addItem(element) { // Добавляет карточку на страницу
//     this._section.prepend(element);
//   }
// }
