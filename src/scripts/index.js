import '../pages/index.css';
import { createCard, addCard, onDelete, likeBtn, openImg,  addNewCard, handleFormSubmit } from './card.js';
import { formEditProfile, formNewCard } from './card.js';
import { openPopupEdit, openPopupAddNewCard, closePopup, closePopupEsc, closePopupOverlay } from './modal.js';
import { popupButtonEdit, popupAddButton, closePopupButton, popup } from './modal.js';
import { initCard } from './cards.js';
initCard.forEach(addCard);
formEditProfile.addEventListener('submit', handleFormSubmit); 
formNewCard.addEventListener('submit', addNewCard); 

popupButtonEdit.addEventListener('click', openPopupEdit); // Открытие попапа редактирования профиля
popupAddButton.addEventListener('click', openPopupAddNewCard) // Открытие попапа добавления карточки
closePopupButton.addEventListener('click', closePopup); // Закрытие попапа по кнопке
popup.addEventListener('click', closePopupOverlay); // Закрытие попапа по оверлэю
