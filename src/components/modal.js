import { clearValidation } from './validation.js';
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_change-avatar');

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    window.addEventListener('keydown', handleEscape);
}

// Открытие попапа профиля
const formEditProfile = document.forms.edit_profile;
const nameInput = formEditProfile.elements.name; // Имя
const jobInput = formEditProfile.elements.description; // Занятие

const profileName = document.querySelector('.profile__title'); // Имя на странице
const profileDescription = document.querySelector('.profile__description'); // Занятия на странице

function handleOpenEditButton() { 
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(formEditProfile);
    openPopup(profilePopup);
}

// Открытие попапа добавления карточки   
const formNewCard = document.forms.new_place; // Форма добавления карточки 
function handleOpenAddButton() { 
    clearValidation(formNewCard);
    openPopup(cardPopup);
}

// Открытие попапа аватара
const formChangeAvatar = document.forms.avatar;
const avatarLink = formChangeAvatar.elements.avatarName;


function openPopupAvatar() {
    clearValidation(formChangeAvatar);
    openPopup(avatarPopup);
}


// Закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    window.removeEventListener('keydown', handleEscape);  // не забываем про удаление обработчика
}

function handlePopupClose() {
    const openedPopup = document.querySelector('.popup_is-opened')
    closePopup(openedPopup);
};

function handleClosePopupButton(evt) {
    if (evt.target.classList.contains('popup__close')) {
        handlePopupClose();
    };
}
// Закрытие попапа через Escape
function handleEscape(evt) {
    if (evt.key === 'Escape') {
        handlePopupClose();
    };
}

// Закрытие попапа через оверлэй
function handleCloseOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        closePopup(evt.currentTarget);
    }
} 
export { profilePopup, cardPopup, imagePopup, formEditProfile, nameInput, jobInput, profileName, profileDescription, formChangeAvatar, avatarLink };
export { openPopup, handleOpenEditButton, handleOpenAddButton, closePopup, handlePopupClose, handleClosePopupButton, handleEscape, handleCloseOverlay,  openPopupAvatar };
