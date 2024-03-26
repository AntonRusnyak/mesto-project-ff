const logoSvg = new URL('../images/logo.svg', import.meta.url);
const headerLogo = document.querySelector('.header__logo');
headerLogo.src = logoSvg;

const avatar = new URL('../images/avatar.jpg', import.meta.url);
const profileImage = document.querySelector('.profile__image');
profileImage.src = avatar;


const popups = document.querySelectorAll('.popup');
const popupOpenButtonEdit = document.querySelector('.profile__edit-button'); // Кнопка открытия попапа профиля
const popupOpenButtonAddCard = document.querySelector('.profile__add-button'); // Кнопка открытия попапа добавления карточки
const popupCloseButtons = document.querySelectorAll('.popup__close');

import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, onDelete, likeBtn, openImg } from './card.js';
import { cardsContainer, popupImage, popupCaption } from './card.js';
import { profilePopup, cardPopup, imagePopup, formEditProfile, nameInput, jobInput, profileName, profileDescription, formChangeAvatar, avatarLink  } from './modal.js';
import { openPopup, handleOpenEditButton, handleOpenAddButton, closePopup, handlePopupClose, handleClosePopupButton, handleEscape, handleCloseOverlay,  openPopupAvatar } from './modal.js';
import { clearValidation } from './validation.js';
import { formNewCard, formCardName, formCardLink, nameCard, urlCard } from './api.js';
import { getInitialCards, getUserInformation, editProfile, createNewCard, deleteCard } from './api.js';

////////
function renderUserInfo(user) {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.src = user.avatar;
    profileImage.alt = user.name;
}

Promise.all([getUserInformation(), getInitialCards()])
.then(([user, cards]) => {
renderUserInfo(user);
const userId = user._id;

cards.forEach((card) => {
  const newCard = createCard(card, userId, { onDelete, likeBtn, openImg });
  cardsContainer.prepend(newCard);
})

})
.catch((err) => {
  console.log(err);
})

function addNewCard(evt) {
    evt.preventDefault(); 

    createNewCard({name: formCardName.value, link: formCardLink.value})
    .then((card) => {
      const newObject = {};
      newObject['name'] = card.name;
      newObject['link'] = card.link;
      const newCard = createCard(newObject);
      cardsContainer.prepend(newCard);
    })
    .catch((err) => {
      console.log(err);
    });

    formCardName.value = '';  //Очищаем поля
    formCardLink.value = '';
    
    handlePopupClose();
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    const name = nameInput.value;
    const job = jobInput.value;
 
    editProfile({name: name, about: job})
    .then((user) => {
      renderUserInfo(user);
    })
    .catch((err) => {
      console.log(err);
    })

    profileName.textContent = name;
    profileDescription.textContent = job;
    handlePopupClose();
}

function handleAvatarSubmit(evt) {

}


popupOpenButtonEdit.addEventListener('click', handleOpenEditButton); // Открывыем попап профиля
popupOpenButtonAddCard.addEventListener('click', handleOpenAddButton); // Открываем попап добавдения карточки
profileImage.addEventListener('click', openPopupAvatar);

popupCloseButtons.forEach((popup) => {
    popup.addEventListener('click', handleClosePopupButton);// Закрываем попап через крестик
})

popups.forEach((popup) => {
    popup.addEventListener('mousedown', handleCloseOverlay);// Закрываем попап через Overlay
});

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formNewCard.addEventListener('submit', addNewCard);