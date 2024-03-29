const logoSvg = new URL('../images/logo.svg', import.meta.url);
const headerLogo = document.querySelector('.header__logo'); // Логотип
headerLogo.src = logoSvg;


const profileImage = document.querySelector('.profile__image');

const popups = document.querySelectorAll('.popup');
const popupOpenButtonEdit = document.querySelector('.profile__edit-button'); // Кнопка открытия попапа профиля
const popupOpenButtonAddCard = document.querySelector('.profile__add-button'); // Кнопка открытия попапа добавления карточки
const popupCloseButtons = document.querySelectorAll('.popup__close'); // Кнопка закрытия попапа


const formNewCard = document.forms.new_place; // Форма добавления карточки 
const inputCardName = formNewCard.elements.place_name; // Название новой карточки
const inputCardLink = formNewCard.elements.link; // Ссылка на новую карточку

const cardsContainer = document.querySelector('.places__list'); // Контейнер карточек 
const popupImage = document.querySelector('.popup__image'); // Изображение попапа
const popupCaption = document.querySelector('.popup__caption');

// Попапы
const profilePopup = document.querySelector('.popup_type_edit'); // Информация
const cardPopup = document.querySelector('.popup_type_new-card'); // Новая карточка
const imagePopup = document.querySelector('.popup_type_image'); // Фотография
const avatarPopup = document.querySelector('.popup_type_change-avatar'); // Аватар

// Открытие попапа профиля
const formEditProfile = document.forms.edit_profile; // Форма профиля
const nameInput = formEditProfile.elements.name; // Имя
const jobInput = formEditProfile.elements.description; // Занятие

const profileName = document.querySelector('.profile__title'); // Имя на странице
const profileDescription = document.querySelector('.profile__description'); // Занятия на странице

// Открытие попапа аватара
const formChangeAvatar = document.forms.avatar; // Форма аватара
const avatarLink = formChangeAvatar.elements.avatarName;



import '../pages/index.css';
import { createCard, removeCard, likeBtn } from './card.js';
import { openPopup, closePopup, handleEscape, handleCloseOverlay} from './modal.js';
import { clearValidation, enableValidation, setEventListeners} from './validation.js';
import { config, getInitialCards, getUserInformation, editProfile, createNewCard, deleteCard,  changeAvatar } from './api.js';

////////
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}
/////

// Открытие попапов
function handleOpenPopupAvatar() { // Попап изменения аватара
  formChangeAvatar.reset();
  clearValidation(formChangeAvatar, validationConfig);
  openPopup(avatarPopup);
}

function handleOpenAddButton() { // Попап добавления карточки
  formNewCard.reset();
  clearValidation(formNewCard, validationConfig);
  openPopup(cardPopup);
}

function handleOpenEditButton() { // Попап изменения информации
  clearValidation(formEditProfile, validationConfig);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profilePopup);
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
      const newCard = createCard(card, userId, removeCard, likeBtn, openImg);
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

    createNewCard({name: inputCardName.value, link: inputCardLink.value})
      .then((card) => {
        const ownerId = card.owner._id;
        const newCard = createCard(card, ownerId, removeCard, likeBtn, openImg);
        cardsContainer.prepend(newCard);
        closePopup(cardPopup);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, cardPopup);
      });
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
        closePopup(profilePopup);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, profilePopup);
      });
}

// Изменение аватара
function handleAvatarSubmit(evt) {
    evt.preventDefault();
    const newAvatarLink = avatarLink.value
    renderLoading(true, avatarPopup);

    changeAvatar(newAvatarLink)
      .then((newAvatar) => {
        profileImage.style.backgroundImage = `url(${newAvatar.avatar})`;
        closePopup(avatarPopup);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, avatarPopup);
      });
}

// Включили валидацию
enableValidation(validationConfig);

/////

popupOpenButtonEdit.addEventListener('click', handleOpenEditButton); // Открывыем попап профиля
popupOpenButtonAddCard.addEventListener('click', handleOpenAddButton); // Открываем попап добавления карточки
profileImage.addEventListener('click', handleOpenPopupAvatar); // Открываем попап аватара
popupCloseButtons.forEach((btn) => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup) ); // Закрываем попап через крестик
})

popups.forEach((popup) => {
    popup.addEventListener('mousedown', handleCloseOverlay);// Закрываем попап через Overlay
})

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formNewCard.addEventListener('submit', addNewCard);
formChangeAvatar.addEventListener('submit', handleAvatarSubmit);