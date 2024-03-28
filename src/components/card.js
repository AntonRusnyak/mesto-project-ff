import { deleteCard, cardIsLiked, deleteCardIsLiked } from './api.js';
const cardsContainer = document.querySelector('.places__list'); // Контейнер карточек 
const popupImage = document.querySelector('.popup__image'); // Изображение попапа
const popupCaption = document.querySelector('.popup__caption');
const likeCounter = cardsContainer.querySelector('.card__like-counter');
// Функция создания карточки
function createCard(item, userId, eventOnDelete, likeBtn, openImg ) {
    const cardTemplate = document.querySelector('#card-template').content; // Темплейт карточки
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = item.link; 
    cardImage.alt = item.name;
    cardTitle.textContent = item.name; 

    const userOwnerInfo = item.owner._id;
    const cardId = item._id;

    const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
    cardDeleteBtn.addEventListener('click', (evt) => {
        deleteCard(cardId)
        .then((res) => {
            eventOnDelete(evt);
        })
        .catch((err) => {
            console.log(err);
        })
    });

    if (!userCard(userId, userOwnerInfo)) {
        cardDeleteBtn.remove();
    }

    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');
    const likes = item.likes;
    likeCounter.textContent = likes.length;

    if (handleLikeButton(likes, userId)) {
        likeButton.classList.add('card__like-button_is-active');
      }

    likeButton.addEventListener('click', (evt) => {
        if (!likeButton.classList.contains('card__like-button_is-active')) {
            cardIsLiked(cardId)
            .then((card) => {
                updateLike(likeCounter, card);
                likeBtn(evt);
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            deleteCardIsLiked(cardId)
            .then((card) => {
                updateLike(likeCounter, card);
                likeBtn(evt);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    });

    cardImage.addEventListener('click', openImg); // Открываем попап изображения

    return cardElement;
}

// Проверка на хозяина карточки
function userCard(userId, userOwnerInfo) {
    if (userId === userOwnerInfo) {
        return true;
    }
}

// Функция удаления карточки
function eventOnDelete(card) {
    const item = card.target.closest('.card');
    item.remove();
}

// Функция лайка карточки
function likeBtn(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    };
}

//Проверка на наличие лайка
function handleLikeButton(likes, userId) {
    return likes.some((userCardInfo) => userCardInfo._id === userId);
}

// Обновление лайков
function updateLike(likeCounter, card) {
    likeCounter.textContent = card.likes.length;
}

export {cardsContainer, popupImage, popupCaption };
export { createCard, eventOnDelete, likeBtn};