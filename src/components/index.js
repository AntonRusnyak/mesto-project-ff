const popupOpenButtonEdit = document.querySelector('.profile__edit-button'); // Кнопка открытия попапа профиля
const popupOpenButtonAddCard = document.querySelector('.profile__add-button'); // Кнопка открытия попапа добавления карточки
const popupCloseButton = document.querySelector('.popup__close');

const cardsContainer = document.querySelector('.places__list'); // Контейнер карточек 

const formNewCard = document.forms.new_place; // Форма добавления карточки 
const formCardName = formNewCard.elements.place_name; // Название новой карточки
const formCardLink = formNewCard.elements.link; // Ссылка на новую карточку

const popupImage = document.querySelector('.popup__image'); // Изображение попапа

// Форма профиля
const formEditProfile = document.forms.edit_profile;
const nameInput = formEditProfile.elements.name; // Имя
const jobInput = formEditProfile.elements.description; // Занятие

const profileName = document.querySelector('.profile__title'); // Имя на странице
const profileDescription = document.querySelector('.profile__description'); // Занятия на странице

import '../pages/index.css';
import { initialCards } from './cards.js';
import { openEditButton, openAddButton, closePopup, removeEscape, closeOverlay } from './modal.js';
import { createCard, onDelete, likeBtn, openImg, addCard, deleteElement, addNewCard, handleFormSubmit } from './card.js';
const popup = document.querySelector('.popup');
////////

initialCards.forEach(addCard);

popupOpenButtonEdit.addEventListener('click', openEditButton); // Открывыем попап профиля
popupOpenButtonAddCard.addEventListener('click', openAddButton); // Открываем попап добавдения карточки
popupCloseButton.addEventListener('click', closePopup); // Закрываем попап через крестик
window.addEventListener('click', removeEscape); // Закрываем попап через Escape
popup.addEventListener('click', closeOverlay); // Закрываем попап через Overlay
formEditProfile.addEventListener('submit', handleFormSubmit);
formNewCard.addEventListener('submit',  addNewCard);

export { cardsContainer, formCardName, formCardLink, popupImage, nameInput, jobInput, profileName, profileDescription };