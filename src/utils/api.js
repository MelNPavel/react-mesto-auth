import {configApi} from "./constants.js"

class Api{
    constructor ({url, headers}) {
        this.url = url;
        this.headers = headers
};

getUserInfo() {
    return fetch (`${this.url}users/me`, {
            headers: this.headers
    })
    .then(this._checkResponse)
};

getTasksCards() {
    return fetch (`${this.url}cards`, {
            headers: this.headers
    })
    .then(this._checkResponse)
};

addUser(inputsUserHandle) {
    const body = {about: inputsUserHandle.about, name: inputsUserHandle.name}
    return fetch (`${this.url}users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(body)
            }
    )
    .then(this._checkResponse)
};

addCard(inputsValue) {
    const body = {name: inputsValue.name, link: inputsValue.link}
    return fetch (`${this.url}cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
            }
    )
    .then(this._checkResponse)
};

deleteCard(cardId) {
    return fetch (`${this.url}cards/${cardId}`,{
        method: 'DELETE',
        headers: this.headers,
    })
    .then(this._checkResponse)
};

likePut(cardId) {
    return fetch (`${this.url}cards/${cardId}/likes`,{
        method: 'PUT',
        headers: this.headers,
    })
    .then(this._checkResponse)
};

likeUnPut(cardId) {
    return fetch (`${this.url}cards/${cardId}/likes`,{
        method: 'DELETE',
        headers: this.headers,
    })
    .then(this._checkResponse)
};

avatar(data) {
    return fetch (`${this.url}users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(data)
        })
        .then(this._checkResponse)
};

_checkResponse(res) {
    if (res.ok) {
        return res.json();
     }
     return Promise.reject(`Ошибка: ${res.status}`);
}

};

const api = new Api ({
    url: configApi.baseUrl,
    headers: configApi.headers
  }
);

export default api;