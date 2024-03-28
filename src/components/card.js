import { profilePopup, cardPopup, imagePopup, formEditProfile, nameInput, jobInput, profileName, profileDescription  } from './modal.js';
import { openPopup, handleOpenEditButton, handleOpenAddButton, closePopup, handlePopupClose, handleClosePopupButton, handleEscape, handleCloseOverlay } from './modal.js';
import { deleteCard, cardIsLiked, deleteCardIsLiked } from './api.js';
const cardsContainer = document.querySelector('.places__list'); // Контейнер карточек 
const popupImage = document.querySelector('.popup__image'); // Изображение попапа
const popupCaption = document.querySelector('.popup__caption');
const likeCounter = cardsContainer.querySelector('.card__like-counter');
// Функция создания карточки
function createCard(item, userId, onDelete, likeBtn, openImg ) {
    const cardTemplate = document.querySelector('#card-template').content; // Темплейт карточки
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = item.link; 
    cardImage.alt = item.name;
    cardTitle.textContent = item.name; 

    const userInfo = userId;
    const userOwnerInfo = item.owner._id;
    const cardId = item._id;

    const resetCard = cardElement.querySelector('.card__delete-button');
    resetCard.addEventListener('click', (evt) => {
        deleteCard(cardId)
        .then(onDelete(evt))
        .catch((err) => {
            console.log(err);
        })
    });

    if (!userCard(userInfo, userOwnerInfo)) {
        resetCard.remove();
    }

    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');
    const likes = item.likes;
    likeCounter.textContent = likes.length;

    if (likedCardInfo(likes, userInfo)) {
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
function userCard(userInfo, userOwnerInfo) {
    if (userInfo === userOwnerInfo) {
        return true;
    }
}

// Функция удаления карточки
function onDelete(card) {
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
function likedCardInfo(likes, userInfo) {
    return likes.some((userCardInfo) => userCardInfo._id === userInfo);
}

// Обновление лайков
function updateLike(likeCounter, card) {
    likeCounter.textContent = card.likes.length;
}

// Открытие попапа изображения
function openImg(evt) {
    if (evt.target.classList.contains('card__image')) {
        popupImage.src = evt.target.src;
        popupImage.alt = evt.target.alt;
        popupCaption.textContent = evt.target.alt;
        openPopup(imagePopup);
    }
}

export { cardsContainer, popupImage, popupCaption, cardPopup };
export { createCard, onDelete, likeBtn, openImg};