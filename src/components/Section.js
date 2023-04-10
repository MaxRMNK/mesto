// По рекомендации ревьюера ПР8, перенес data в renderItems:
export default class Section {
  constructor(renderer, sectionSelector) {
    this._rendererFn = renderer;
    this._section = document.querySelector(sectionSelector);
  }

  renderItems(data) { // отвечает за отрисовку всех элементов в Section
    // В коротких строках можно убрать создание лишних переменных: коммент ревьюера, ПР8
    data.reverse().forEach( item => this._rendererFn(item) );
    // Добавил .reverse(), т.к. forEach перебирает карточки по одной и при загрузке страницы самые новые оказываются в самом низу

    // // Это то же самое, что выше:
    // // Сделал const потому что "data" кроме как здесь больше ни где не используется,
    // // см. замечания к PopupWithForm.js в ПР8
    // const dataItems = data;
    // dataItems.forEach (item => this._rendererFn(item));
  }

  addItem(element) { // Добавляет карточку на страницу
    this._section.prepend(element);
    // this._section.append(element); // !!! ВЕРНУТЬ СТРОКУ ВЫШЕ !!!
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
