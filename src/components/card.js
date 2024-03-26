import { profilePopup, cardPopup, imagePopup, formEditProfile, nameInput, jobInput, profileName, profileDescription  } from './modal.js';
import { openPopup, handleOpenEditButton, handleOpenAddButton, closePopup, handlePopupClose, handleClosePopupButton, handleEscape, handleCloseOverlay } from './modal.js';
import { deleteCard, cardIsLiked, deleteCardIsLiked } from './api.js';
const cardsContainer = document.querySelector('.places__list'); // Контейнер карточек 
const popupImage = document.querySelector('.popup__image'); // Изображение попапа
const popupCaption = document.querySelector('.popup__caption');
// Функция создания карточки
function createCard(item, userId, { onDelete, likeBtn, openImg }) {
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

    const likeButton = cardElement.querySelector('.card__like-button')
    likeButton.addEventListener('click', likeBtn);

    cardImage.addEventListener('click', openImg); // Открываем попап изображения

    const likes = item.likes;
    const likeCounter = document.querySelector('.card__like-counter');

    return cardElement;
};

function userCard(userInfo, userOwnerInfo) {
    if (userInfo === userOwnerInfo) {
        return true;
    }
}

// Функция удаления карточки
function onDelete(card) {
    const item = card.target.closest('.card');
    item.remove();
};

// Функция лайка карточки
function likeBtn(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    };
};

function openImg(evt) {
    if (evt.target.classList.contains('card__image')) {
        popupImage.src = evt.target.src;
        popupImage.alt = evt.target.alt;
        popupCaption.textContent = evt.target.alt;
        openPopup(imagePopup);
    }
}
// Функция вывода карточки на страницу 


export { cardsContainer, popupImage, popupCaption };
export { createCard, onDelete, likeBtn, openImg};