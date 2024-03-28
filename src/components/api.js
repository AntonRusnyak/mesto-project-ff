const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-9',
    headers: {
      authorization: '53de3d9d-9103-4afe-8b4b-24575d7fe42d',
      'Content-Type': 'application/json'
    }
};

function getResponseData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
} 

// Получение информации о пользователе
function getUserInformation() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(getResponseData);
}

// Загрузка карточек
function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(getResponseData);
}

// Редактирование профиля
function editProfile(user) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(user)
      })
      .then(getResponseData);
};

// Добавление новой карточки
function createNewCard(card) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(card)
  })
  .then(getResponseData);
}

// Удаление карточки
function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponseData);
}

// Постановка лайка
function cardIsLiked(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(getResponseData);
}

// Сняли лайк
function deleteCardIsLiked(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponseData);
}

// Смена аватара
function changeAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(getResponseData);
}

export { config, getInitialCards, getUserInformation, editProfile, createNewCard, deleteCard, cardIsLiked, deleteCardIsLiked, changeAvatar };