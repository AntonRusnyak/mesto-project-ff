const logoSvg = new URL('../images/logo.svg', import.meta.url);
const headerLogo = document.querySelector('.header__logo');
function addHeaderLogo() { // добавляем логотип
    headerLogo.src = logoSvg;
}
addHeaderLogo();

const avatar = new URL('../images/avatar.jpg', import.meta.url);
const profileImage = document.querySelector('.profile__image');
function addProfileImage() { // добавляем аватар
    profileImage.style = `background-image: url('${avatar}');`;
}
addProfileImage();

const popupOpenButtonEdit = document.querySelector('.profile__edit-button'); // Кнопка открытия попапа профиля
const popupOpenButtonAddCard = document.querySelector('.profile__add-button'); // Кнопка открытия попапа добавления карточки

const popupTypeEditProfile = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const cardsContainer = document.querySelector('.places__list'); // Контейнер карточек 

const formNewCard = document.forms.new_place; // Форма добавления карточки 
const formCardName = formNewCard.elements.place_name; // Название новой карточки
const formCardLink = formNewCard.elements.link; // Ссылка на новую карточку

const popupImage = document.querySelector('.popup__image'); // Изображение попапа
const popupCaption = document.querySelector('.popup__caption');

// Форма профиля
const formEditProfile = document.forms.edit_profile;
const nameInput = formEditProfile.elements.name; // Имя
const jobInput = formEditProfile.elements.description; // Занятие

const profileName = document.querySelector('.profile__title'); // Имя на странице
const profileDescription = document.querySelector('.profile__description'); // Занятия на странице
import '../pages/index.css';
import { initialCards } from './cards.js';
import { openEditButton, openAddButton, closePopup, closePopupButton,  removeEscape, closeOverlay, popupCloseButton } from './modal.js';
import { createCard, onDelete, likeBtn, openImg, addCard, deleteElement, addNewCard, handleFormSubmit } from './card.js';
////////

initialCards.forEach(addCard);

popupOpenButtonEdit.addEventListener('click', openEditButton); // Открывыем попап профиля
popupOpenButtonAddCard.addEventListener('click', openAddButton); // Открываем попап добавдения карточки
window.addEventListener('click', closePopupButton); // Закрываем попап через крестик

window.addEventListener('click', removeEscape); // Закрываем попап через Escape

popupTypeEditProfile.addEventListener('click', closeOverlay);
popupTypeNewCard.addEventListener('click', closeOverlay); // Закрываем попап через Overlay
popupTypeImage.addEventListener('click', closeOverlay);

formEditProfile.addEventListener('submit', handleFormSubmit);
formNewCard.addEventListener('submit',  addNewCard);

export { cardsContainer, formCardName, formCardLink, popupImage, nameInput, jobInput, profileName, profileDescription, popupCaption };