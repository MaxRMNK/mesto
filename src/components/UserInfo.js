export default class UserInfo {
  constructor({name, info, avatar}) {
    this._nameSelector = name;
    this._infoSelector = info;
    this._avatarSelector = avatar;

    this._name = document.querySelector(this._nameSelector);
    this._info = document.querySelector(this._infoSelector);
    this._avatar = document.querySelector(this._avatarSelector);
  }

  getUserInfo() {
    this._nameProfile = this._name.textContent;
    this._infoProfile = this._info.textContent;
    // console.log(this._nameProfile);
    // console.log(this._infoProfile);

    return {name: this._nameProfile, about: this._infoProfile}
  }

  getUserAvatar() {
    this._avatarProfile = this._avatar.src;
    // console.log(this._avatarProfile);

    return {avatar: this._avatarProfile}
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._info.textContent = about;
  }

  setUserAvatar({avatar}) {
    this._avatar.src = avatar;
    // console.log(srcAvatar);
  }

}
