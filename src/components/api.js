const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-9',
    headers: {
      authorization: '53de3d9d-9103-4afe-8b4b-24575d7fe42d',
      'Content-Type': 'application/json'
    }
};

// Получение информации о пользователе
function getUserInformation() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

// Загрузка карточек
function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

// Редактирование профиля
function editProfile(user) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(user)
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      }); 
};

// Добавление новой карточки
const formNewCard = document.forms.new_place; // Форма добавления карточки 
const formCardName = formNewCard.elements.place_name; // Название новой карточки
const formCardLink = formNewCard.elements.link; // Ссылка на новую карточку
const nameCard = formCardName.value; // Получаем имя карточки из формы
const urlCard = formCardLink.value; // Получаем ссылку на карточку из формы

function createNewCard(card) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(card)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// Удаление карточки
function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }); 
}

// Постановка лайка
function cardIsLiked(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }); 
}

// Сняли лайк
function deleteCardIsLiked(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }); 
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export { formNewCard, formCardName, formCardLink, nameCard, urlCard };
export { config, getInitialCards, getUserInformation, editProfile, createNewCard, deleteCard, cardIsLiked, deleteCardIsLiked, changeAvatar };