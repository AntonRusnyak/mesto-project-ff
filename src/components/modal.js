const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    window.addEventListener('keydown', handleRemoveEscape);
}

// Открытие попапа профиля
function handleOpenEditButton() { 
    openPopup(profilePopup);
}

// Открытие попапа добавления карточки   
function handleOpenAddButton() { 
    openPopup(cardPopup);
}

// Закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    window.removeEventListener('keydown', handleRemoveEscape);  // не забываем про удаление обработчика
}

function closePopupButton() {
    closePopup(profilePopup);
    closePopup(cardPopup);
    closePopup(imagePopup);
};

function handleClosePopupButton(evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopupButton();
    };
}
// Закрытие попапа через Escape
function handleRemoveEscape(evt) {
    if (evt.key === 'Escape') {
        closePopupButton();
    };
}

// Закрытие попапа через оверлэй
function handleCloseOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        closePopupButton();
    }
} 
export { profilePopup, cardPopup, imagePopup };
export { openPopup, handleOpenEditButton, handleOpenAddButton, closePopup, closePopupButton, handleClosePopupButton, handleRemoveEscape, handleCloseOverlay };
