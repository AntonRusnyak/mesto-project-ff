const logoSvg = new URL('../images/logo.svg', import.meta.url);
const headerLogo = document.querySelector('.header__logo');
headerLogo.src = logoSvg;

const avatar = new URL('../images/avatar.jpg', import.meta.url);
const profileImage = document.querySelector('.profile__image');
profileImage.style = `background-image: url('${avatar}');`;

const popups = document.querySelectorAll('.popup');
const popupOpenButtonEdit = document.querySelector('.profile__edit-button'); // Кнопка открытия попапа профиля
const popupOpenButtonAddCard = document.querySelector('.profile__add-button'); // Кнопка открытия попапа добавления карточки
const popupCloseButtons = document.querySelectorAll('.popup__close');
const formNewCard = document.forms.new_place; // Форма добавления карточки 
const formCardName = formNewCard.elements.place_name; // Название новой карточки
const formCardLink = formNewCard.elements.link; // Ссылка на новую карточку

import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, onDelete, likeBtn, openImg, addCard } from './card.js';
import { cardsContainer, popupImage, popupCaption } from './card.js';
import { profilePopup, cardPopup, imagePopup, formEditProfile, nameInput, jobInput, profileName, profileDescription } from './modal.js';
import { openPopup, handleOpenEditButton, handleOpenAddButton, closePopup, handlePopupClose, handleClosePopupButton, handleEscape, handleCloseOverlay } from './modal.js';
////////
function addNewCard(evt) {
    evt.preventDefault(); 

    const nameCard = formCardName.value; // Получаем имя карточки из формы
    const urlCard = formCardLink.value; // Получаем ссылку на карточку из формы

    const newObject = {};
    newObject['name'] = nameCard;
    newObject['link'] = urlCard;

    addCard(newObject);
    
    formCardName.value = '';  //Очищаем поля
    formCardLink.value = '';

    handlePopupClose();
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    const name = nameInput.value;
    const job = jobInput.value;

    profileName.textContent = name;
    profileDescription.textContent = job;
    handlePopupClose();
}

initialCards.forEach(addCard);

popupOpenButtonEdit.addEventListener('click', handleOpenEditButton); // Открывыем попап профиля
popupOpenButtonAddCard.addEventListener('click', handleOpenAddButton); // Открываем попап добавдения карточки

popupCloseButtons.forEach((popup) => {
    popup.addEventListener('click', handleClosePopupButton);// Закрываем попап через крестик
})

popups.forEach((popup) => {
    popup.addEventListener('mousedown', handleCloseOverlay);// Закрываем попап через Overlay
});

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formNewCard.addEventListener('submit', addNewCard);