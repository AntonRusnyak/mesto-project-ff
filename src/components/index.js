const logoSvg = new URL('../images/logo.svg', import.meta.url);
const headerLogo = document.querySelector('.header__logo'); // Логотип
headerLogo.src = logoSvg;

const profileImage = document.querySelector('.profile__image');

const popups = document.querySelectorAll('.popup');
const popupOpenButtonEdit = document.querySelector('.profile__edit-button'); // Кнопка открытия попапа профиля
const popupOpenButtonAddCard = document.querySelector('.profile__add-button'); // Кнопка открытия попапа добавления карточки
const popupCloseButtons = document.querySelectorAll('.popup__close'); // Кнопка закрытия попапа

import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, onDelete, likeBtn, openImg } from './card.js';
import { cardsContainer, popupImage, popupCaption } from './card.js';
import { profilePopup, cardPopup, imagePopup, formEditProfile, nameInput, jobInput, profileName, profileDescription, formChangeAvatar, avatarLink, avatarPopup} from './modal.js';
import { openPopup, handleOpenEditButton, handleOpenAddButton, closePopup, handlePopupClose, handleClosePopupButton, handleEscape, handleCloseOverlay,  handleOpenPopupAvatar } from './modal.js';
import { clearValidation, enableValidation, validationConfig } from './validation.js';
import { formNewCard, formCardName, formCardLink, nameCard, urlCard } from './api.js';
import { config, getInitialCards, getUserInformation, editProfile, createNewCard, deleteCard,  changeAvatar } from './api.js';

////////

// Открытие попапов
function openEditPopup() { // Попап изменения информации
  clearValidation(formEditProfile, validationConfig);
  handleOpenEditButton();
}

function openNewCardPopup() { // Попап добавления карточки
  clearValidation(formNewCard, validationConfig);
  handleOpenAddButton();
}

function openAvatarPopup() { // Попап изменения аватара
  clearValidation(formChangeAvatar, validationConfig);
  handleOpenPopupAvatar();
}

// Изменение кнопки во время обработки запроса
function renderLoading(loading, popup) {
  const popupButton = popup.querySelector('.popup__button');

  if (loading) {
    popupButton.textContent = 'Сохранение...';
  } else {
    popupButton.textContent = 'Сохранить';
  }
}

// Обработка информации пользователя и добавление на страницу
function renderUserInfo(user) {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;
    profileImage.alt = user.name;
}

// Полкчили информацию о пользователе и массиве карт 
Promise.all([getUserInformation(), getInitialCards()])
  .then(([user, cards]) => {
    renderUserInfo(user);
    const userId = user._id;

    cards.forEach((card) => {
      const newCard = createCard(card, userId, onDelete, likeBtn, openImg);
      cardsContainer.append(newCard);
    })
  })
  .catch((err) => {
    console.log(err);
  })

// Добавление новой карточки
function addNewCard(evt) {
  evt.preventDefault(); 
    renderLoading(true, cardPopup);

    createNewCard({name: formCardName.value, link: formCardLink.value})
      .then((card) => {
        const newCard = createCard(card);
        cardsContainer.prepend(newCard);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, cardPopup);
      });

    formCardName.value = '';  //Очищаем поля
    formCardLink.value = '';
    
    handlePopupClose();
}

// Изменение данных пользователя
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    const name = nameInput.value;
    const job = jobInput.value;
    renderLoading(true, profilePopup);

    editProfile({name: name, about: job})
      .then((user) => {
        renderUserInfo(user);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, profilePopup);
      });

    profileName.textContent = name;
    profileDescription.textContent = job;
    handlePopupClose();
}

// Изменение аватара
function handleAvatarSubmit(evt) {
    evt.preventDefault();
    const newAvatarLink = avatarLink.value
    renderLoading(true, avatarPopup);

    changeAvatar(newAvatarLink)
      .then((newAvatar) => {
        profileImage.style.backgroundImage = `url(${newAvatar.avatar})`;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, avatarPopup);
      });
    handlePopupClose();
}

// Включили валидацию
enableValidation(validationConfig);

/////

popupOpenButtonEdit.addEventListener('click', openEditPopup); // Открывыем попап профиля
popupOpenButtonAddCard.addEventListener('click', openNewCardPopup); // Открываем попап добавления карточки
profileImage.addEventListener('click', openAvatarPopup); // Открываем попап аватара
popupCloseButtons.forEach((popup) => {
    popup.addEventListener('click', handleClosePopupButton);// Закрываем попап через крестик
})

popups.forEach((popup) => {
    popup.addEventListener('mousedown', handleCloseOverlay);// Закрываем попап через Overlay
});

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formNewCard.addEventListener('submit', addNewCard);
formChangeAvatar.addEventListener('submit', handleAvatarSubmit);