class Api {
    constructor(options) {
        this._headers = options.headers; //Передаем заголовок
        this._baseUrl = options.baseUrl; //Передаем базовый URL
    }

    _getResponseData(url, param) {
        return fetch(url, param).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(
                `Произошла шибка ${res.status} - ${res.statusText}`
            );
        });
    }

    //редактирование профиля
    editProfileInfo(data) {
        return this._getResponseData(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        });
    }

    //запрос данных профиля
    getProfileInfo() {
        return this._getResponseData(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        });
    }

    //редактирование аватара
    editAvatar(avatar) {
        return this._getResponseData(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar.avatar,
            }),
        });
    }

    //отправка данных о новой карточке
    createNewCard(cardInfo) {
        return this._getResponseData(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: cardInfo.name,
                link: cardInfo.link,
            }),
        });
    }

    //удаление карточки
    deleteCard(cardId) {
        return this._getResponseData(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    //ставим лайк
    setLike(cardId) {
        return this._getResponseData(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        });
    }

    //удаляем лайк
    removeLike(cardId) {
        return this._getResponseData(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    //запрос массива карточек
    getInitialCards() {
        return this._getResponseData(`${this._baseUrl}/cards`, {
            headers: this._headers,
        });
    }
}

export const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-16",
    headers: {
        authorization: "27419946-4fff-4784-a16e-1161591c67a2",
        "Content-Type": "application/json",
    },
});
