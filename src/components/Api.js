export default class Api {
  constructor(options) {
    this._urlApi = options.baseUrl;
    this._headers = options.headers;
    this._token = options.headers['authorization'];
    // this._contentType = options.headers['Content-Type'];
  }

  // получить список всех карточек в виде массива (GET)
  getInitialCards() {
    return fetch(`${this._urlApi}/cards`, {
      //method: 'GET',
      headers: {authorization: this._token},
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // получить данные пользователя (GET)
  getUser() {
    return fetch(this._urlApi + '/users/me', {
      //method: 'GET',
      headers: {authorization: this._token},
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
      });
  }

  // Выводим информацию на страницу только если исполнились оба промиса - загрузка профиля пользователя и загрузка карточек
  getAllPageData() {
    return Promise.all([ this.getUser(), this.getInitialCards() ]);
  }

  // заменить данные пользователя (PATCH)
  setUserInfo(name, about){ //changeUserInfo
    return fetch(this._urlApi + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      // headers: {authorization: this._token},
      body: JSON.stringify({
        // name: 'Marie Skłodowska Curie',
        // about: 'Physicist and Chemist'
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
      });
  }

  // заменить аватар (PATCH)
  setAvatar(avatar){
    return fetch(this._urlApi + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: avatar })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
      });
  }

  // добавить карточку (POST)
  addCardDb(data){
    return fetch(this._urlApi + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
      });
  }

  // удалить карточку (DELETE)
  deleteCard(id){
    return fetch(`${this._urlApi}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
    });
  }

  // “залайкать” карточку (PUT)
  // удалить лайк карточки (DELETE)
  setLikeCard(id, isLiked) {
    // console.log('Api id: ', id);
    // console.log('Api isLiked: ', isLiked);
    if (!isLiked) {
      return fetch(`${this._urlApi}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
      })
    } else {
      return fetch(`${this._urlApi}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
      })
    }
  }

}
