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

// Открытие попапа добавления карточки   
const formNewCard = document.forms.new_place; // Форма добавления карточки 

// Открытие попапа аватара
const formChangeAvatar = document.forms.avatar; // Форма аватара
const avatarLink = formChangeAvatar.elements.avatarName;



