(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,n){for(var r=0;r<n.length;r++){var o=n[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}var n=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._urlApi=e.baseUrl,this._headers=e.headers,this._token=e.headers.authorization}var n,r;return n=t,(r=[{key:"getInitialCards",value:function(){return fetch("".concat(this._urlApi,"/cards"),{headers:{authorization:this._token}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}},{key:"getUser",value:function(){return fetch(this._urlApi+"/users/me",{headers:{authorization:this._token}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}},{key:"getAllPageData",value:function(){return Promise.all([this.getUser(),this.getInitialCards()])}},{key:"setUserInfo",value:function(t,e){return fetch(this._urlApi+"/users/me",{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:e})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}},{key:"setAvatar",value:function(t){return fetch(this._urlApi+"/users/me/avatar",{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:t})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}},{key:"addCardDb",value:function(t){return fetch(this._urlApi+"/cards",{method:"POST",headers:this._headers,body:JSON.stringify(t)}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}},{key:"deleteCard",value:function(t){return fetch("".concat(this._urlApi,"/cards/").concat(t),{method:"DELETE",headers:this._headers}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}},{key:"setLikeCard",value:function(t,e){return e?fetch("".concat(this._urlApi,"/cards/").concat(t,"/likes"),{method:"DELETE",headers:this._headers}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})):fetch("".concat(this._urlApi,"/cards/").concat(t,"/likes"),{method:"PUT",headers:this._headers}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,i=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===r(i)?i:String(i)),o)}var i}var i=function(){function t(e,n,r,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._cardData=e,this._dataLikes=e.likes,this._idCard=e._id,this._idUserCard=e.owner._id,this._currentUserId=n,this._template=o,this._handleCardClickFn=r.handleCardClick,this._likeCardFn=r.likeCard,this._handleDeleteCardFn=r.handleDeleteCard}var e,n;return e=t,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._template).content.children[0].cloneNode(!0)}},{key:"_deleteCard",value:function(){this._handleDeleteCardFn(this._idCard,this._element)}},{key:"_isUserCard",value:function(){return this._idUserCard===this._currentUserId}},{key:"_isLikedCard",value:function(){var t=this;return this._dataLikes.some((function(e){return e._id===t._currentUserId}))}},{key:"_setLikes",value:function(t){var e=t.target.classList.contains("element__like_active");this._likeCardFn(this,this._idCard,e)}},{key:"togleLikeCard",value:function(t){this._elementLikeButton.classList.toggle("element__like_active"),this._elementLikeCounter.textContent=t.likes.length}},{key:"_addEventListeners",value:function(){var t=this;this._elementLikeButton.addEventListener("click",(function(e){t._setLikes(e)})),this._isUserCard()&&this._elementDeleteButton.addEventListener("click",(function(){t._deleteCard()})),this._elementImage.addEventListener("click",(function(){t._handleCardClickFn(t._cardData)}))}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._elementImage=this._element.querySelector(".element__image"),this._elementHeader=this._element.querySelector(".element__header"),this._elementDeleteButton=this._element.querySelector(".element__delete"),this._elementLikeButton=this._element.querySelector(".element__like"),this._elementLikeCounter=this._element.querySelector(".element__like-counter"),this._addEventListeners(),this._elementImage.src=this._cardData.link,this._elementImage.alt=this._cardData.name,this._elementHeader.textContent=this._cardData.name,this._elementLikeCounter.textContent=this._cardData.likes.length,this._isUserCard()||this._elementDeleteButton.remove(),this._isLikedCard()&&this._elementLikeButton.classList.add("element__like_active"),this._element}}])&&o(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();const a=i;function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==u(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==u(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===u(o)?o:String(o)),r)}var o}const c=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._form=n,this._inputList=Array.from(this._form.querySelectorAll(this._inputSelector)),this._buttonElement=this._form.querySelector(this._submitButtonSelector)}var e,n;return e=t,(n=[{key:"_showInputError",value:function(t,e){this._errorElement=this._form.querySelector(".".concat(t.id,"-error")),t.classList.add(this._inputErrorClass),this._errorElement.textContent=e}},{key:"_hideInputError",value:function(t){this._errorElement=this._form.querySelector(".".concat(t.id,"-error")),t.classList.remove(this._inputErrorClass),this._errorElement.textContent=""}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)):(this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.removeAttribute("disabled"))}},{key:"_checkInputValidity",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t,t.validationMessage)}},{key:"_setEventListeners",value:function(){var t=this;this._toggleButtonState(),this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e),t._toggleButtonState()}))}))}},{key:"resetValidateEror",value:function(){var t=this;this._toggleButtonState(),this._inputList.forEach((function(e){t._hideInputError(e)}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&l(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==s(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==s(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===s(o)?o:String(o)),r)}var o}var p=function(){function t(e){var n=e.name,r=e.info,o=e.avatar;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._nameSelector=n,this._infoSelector=r,this._avatarSelector=o,this._name=document.querySelector(this._nameSelector),this._info=document.querySelector(this._infoSelector),this._avatar=document.querySelector(this._avatarSelector)}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return this._nameProfile=this._name.textContent,this._infoProfile=this._info.textContent,{name:this._nameProfile,about:this._infoProfile}}},{key:"getUserAvatar",value:function(){return this._avatarProfile=this._avatar.src,console.log(this._avatarProfile),{avatar:this._avatarProfile}}},{key:"setUserInfo",value:function(t){var e=t.name,n=t.about;this._name.textContent=e,this._info.textContent=n}},{key:"setUserAvatar",value:function(t){var e=t.avatar;this._avatar.src=e}}])&&f(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function h(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==y(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==y(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===y(o)?o:String(o)),r)}var o}var d=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._rendererFn=e,this._section=document.querySelector(n)}var e,n;return e=t,(n=[{key:"renderItems",value:function(t){var e=this;t.forEach((function(t){return e._rendererFn(t)}))}},{key:"addItem",value:function(t){this._section.append(t)}}])&&h(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function m(t){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}function v(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,_(r.key),r)}}function _(t){var e=function(t,e){if("object"!==m(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==m(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===m(e)?e:String(e)}var b=function(){function t(e){var n,r,o,i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,o=function(t){"Escape"===t.key&&i.close()},(r=_(r="_handleEscClose"))in n?Object.defineProperty(n,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[r]=o,this._popupElement=document.querySelector(e)}var e,n;return e=t,(n=[{key:"setEventListeners",value:function(){var t=this;this._popupButtonClose=this._popupElement.querySelector(".popup__close-button"),this._popupButtonClose.addEventListener("click",(function(){return t.close()})),this._popupElement.addEventListener("mousedown",(function(e){e.target.classList.contains("popup")&&t.close()}))}},{key:"open",value:function(){this._popupElement.classList.add("popup_opened"),window.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popupElement.classList.remove("popup_opened"),window.removeEventListener("keydown",this._handleEscClose)}}])&&v(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function S(t){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},S(t)}function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==S(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==S(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===S(o)?o:String(o)),r)}var o}function w(){return w="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=E(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},w.apply(this,arguments)}function k(t,e){return k=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},k(t,e)}function E(t){return E=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},E(t)}var C=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&k(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=E(r);if(o){var n=E(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===S(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function a(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,t))._imageToView=e._popupElement.querySelector(".popup__large-image"),e._imageCaption=e._popupElement.querySelector(".popup__caption-image"),e}return e=a,(n=[{key:"open",value:function(t){var e=t.link,n=t.name;this._imageToView.src=e,this._imageToView.alt=n,this._imageCaption.textContent=n,w(E(a.prototype),"open",this).call(this)}}])&&g(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(b);function j(t){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},j(t)}function P(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==j(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==j(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===j(o)?o:String(o)),r)}var o}function O(){return O="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=T(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},O.apply(this,arguments)}function L(t,e){return L=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},L(t,e)}function T(t){return T=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},T(t)}var I=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&L(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=T(r);if(o){var n=T(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===j(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function a(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,t))._handleFormSubmitFn=e,n._form=n._popupElement.querySelector(".popup__form"),n._buttonSubmit=n._form.querySelector(".popup__button"),n._buttonSubmitDefaultText=n._buttonSubmit.textContent,n._inputList=Array.from(n._form.querySelectorAll(".popup__input")),n}return e=a,(n=[{key:"_getInputValues",value:function(){var t={};return this._inputList.forEach((function(e){t[e.name]=e.value})),t}},{key:"renderSending",value:function(t){this._buttonSubmit.textContent=t?"Сохранение...":this._buttonSubmitDefaultText}},{key:"setEventListeners",value:function(){var t=this;O(T(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){e.preventDefault(),t._handleFormSubmitFn(t._getInputValues()),t.close()}))}},{key:"close",value:function(){O(T(a.prototype),"close",this).call(this),this._form.reset()}}])&&P(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(b);function q(t){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},q(t)}function A(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==q(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==q(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===q(o)?o:String(o)),r)}var o}function D(){return D="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=R(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},D.apply(this,arguments)}function B(t,e){return B=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},B(t,e)}function R(t){return R=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},R(t)}var U=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&B(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=R(r);if(o){var n=R(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===q(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function a(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,t))._form=e._popupElement.querySelector(".popup__form"),e._buttonSubmit=e._form.querySelector(".popup__button"),e._buttonSubmitDefaultText=e._buttonSubmit.textContent,e}return e=a,n=[{key:"confirmDeletion",value:function(t,e,n){this._idCard=t,this._thisCard=e,this._deleteThisCardFn=n}},{key:"renderSending",value:function(t){this._buttonSubmit.textContent=t?"Удаление...":this._buttonSubmitDefaultText}},{key:"setEventListeners",value:function(){var t=this;D(R(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){e.preventDefault(),t._deleteThisCardFn(t._idCard,t._thisCard)}))}}],n&&A(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(b);function x(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var V=document.querySelector(".page"),F=V.querySelector(".profile__avatar-button"),N=V.querySelector(".profile__edit-button"),z=V.querySelector(".profile__add-button"),H=V.querySelector(".popup__form_edit-profile"),J=H.querySelector(".popup__input_type_name"),M=H.querySelector(".popup__input_type_job"),$=V.querySelector(".popup__form_edit-avatar"),G=$.querySelector(".popup__input_type_avatar"),K=V.querySelector(".popup__form-add-card"),Q={inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error"},W=new n({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-62",headers:{authorization:"fe0e2550-7db8-46d0-ad13-df530dd3ed8c","Content-Type":"application/json"}}),X="";W.getAllPageData().then((function(t){var e,n,r=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i,a,u=[],l=!0,c=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;l=!1}else for(;!(l=(r=i.call(n)).done)&&(u.push(r.value),u.length!==e);l=!0);}catch(t){c=!0,o=t}finally{try{if(!l&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(c)throw o}}return u}}(e,n)||function(t,e){if(t){if("string"==typeof t)return x(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?x(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];Y.setUserInfo(o),Y.setUserAvatar(o),X=o._id,st.renderItems(i)})).catch((function(t){console.log(t)}));var Y=new p({name:".profile__name",info:".profile__job",avatar:".profile__avatar"}),Z=new I(".popup_edit-profile",(function(t){Z.renderSending(!0),W.setUserInfo(t.editName,t.editJob).then((function(t){Y.setUserInfo({name:t.name,about:t.about})})).catch((function(t){console.log(t)})).finally((function(){et.renderSending(!1)}))})),tt=new c(Q,H);tt.enableValidation(),N.addEventListener("click",(function(){var t=Y.getUserInfo(),e=t.name,n=t.about;J.value=e,M.value=n,tt.resetValidateEror(),Z.open()})),Z.setEventListeners();var et=new I(".popup_edit-avatar",(function(t){et.renderSending(!0),W.setAvatar(t.editAvatar).then((function(t){Y.setUserAvatar({avatar:t.avatar})})).catch((function(t){console.log(t)})).finally((function(){et.renderSending(!1)}))}));et.setEventListeners();var nt=new c(Q,$);nt.enableValidation(),F.addEventListener("click",(function(){var t=Y.getUserAvatar();G.value=t.avatar,nt.resetValidateEror(),et.open()}));var rt=new C(".popup_image");function ot(t){rt.open(t)}rt.setEventListeners();var it=new U(".popup_confirm");function at(t,e){it.confirmDeletion(t,e,ut),it.open()}function ut(t,e){it.renderSending(!0),W.deleteCard(t).then((function(t){console.log("Удалено: ",t),e.remove(),it.close()})).catch((function(t){console.log(t)})).finally((function(){it.renderSending(!1)}))}function lt(t,e,n){W.setLikeCard(e,n).then((function(e){t.togleLikeCard(e)})).catch((function(t){console.log(t)}))}function ct(t){st.addItem(function(t){return new a(t,X,{handleCardClick:ot,likeCard:lt,handleDeleteCard:at},"#element").generateCard()}(t))}it.setEventListeners();var st=new d(ct,".elements"),ft=new I(".popup_add-card",(function(t){var e={name:t.addCardTitle,link:t.addCardLink};ft.renderSending(!0),W.addCardDb(e).then((function(t){ct(t)})).catch((function(t){console.log(t)})).finally((function(){ft.renderSending(!1)}))}));ft.setEventListeners();var pt=new c(Q,K);pt.enableValidation(),z.addEventListener("click",(function(){pt.resetValidateEror(),ft.open()}))})();