export default class Section {
  constructor({data, renderer}, sectionSelector) {
    this._data = data;
    this._rendererFn = renderer;
    this._section = document.querySelector(sectionSelector);
  }

  renderItems() { // отвечает за отрисовку всех элементов в Section
    this._data.forEach (item => this._rendererFn(item));
  }

  addItem(element) { // Добавляет карточку на страницу
    this._section.prepend(element);
  }
}
