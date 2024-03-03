const logoSvg = new URL('../images/logo.svg', import.meta.url);
const headerLogo = document.querySelector('.header__logo');
headerLogo.src = logoSvg;

const avatar = new URL('../images/avatar.jpg', import.meta.url);
const profileImage = document.querySelector('.profile__image');
profileImage.style = `background-image: url('${avatar}');`;

const popups = document.querySelectorAll('.popup');
const popupOpenButtonEdit = document.querySelector('.profile__edit-button'); // Кнопка открытия попапа профиля
const popupOpenButtonAddCard = document.querySelector('.profile__add-button'); // Кнопка открытия попапа добавления карточки
const popupCloseButton = document.querySelectorAll('.popup__close');
const formNewCard = document.forms.new_place; // Форма добавления карточки 
const formCardName = formNewCard.elements.place_name; // Название новой карточки
const formCardLink = formNewCard.elements.link; // Ссылка на новую карточку

// Форма профиля
const formEditProfile = document.forms.edit_profile;
const nameInput = formEditProfile.elements.name; // Имя
const jobInput = formEditProfile.elements.description; // Занятие

const profileName = document.querySelector('.profile__title'); // Имя на странице
const profileDescription = document.querySelector('.profile__description'); // Занятия на странице
import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, onDelete, likeBtn, openImg, addCard } from './card.js';
import { cardsContainer, popupImage, popupCaption } from './card.js';
import { profilePopup, cardPopup, imagePopup} from './modal.js';
import { openPopup, handleOpenEditButton, handleOpenAddButton, closePopup, closePopupButton, handleClosePopupButton, handleRemoveEscape, handleCloseOverlay } from './modal.js';
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

    closePopup(cardPopup);
};

nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    const a = nameInput.value;
    const b = jobInput.value;

    profileName.textContent = a;
    profileDescription.textContent = b;
    closePopup(profilePopup);
}

initialCards.forEach(addCard);

popupOpenButtonEdit.addEventListener('click', handleOpenEditButton); // Открывыем попап профиля
popupOpenButtonAddCard.addEventListener('click', handleOpenAddButton); // Открываем попап добавдения карточки

popupCloseButton.forEach((popup) => {
    popup.addEventListener('click', handleClosePopupButton);// Закрываем попап через крестик
})

popups.forEach((popup) => {
    popup.addEventListener('keydown', handleRemoveEscape);// Закрываем через Escape
});

popups.forEach((popup) => {
    popup.addEventListener('click', handleCloseOverlay);// Закрываем попап через Overlay
});

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formNewCard.addEventListener('submit', addNewCard);