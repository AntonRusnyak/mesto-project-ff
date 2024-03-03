const popupCloseButton = document.querySelector('.popup__close');
// Открытие попапа профиля
function openEditButton() { 
    document.querySelector('.popup_type_edit').classList.add('popup_is-opened');
    popupCloseButton.addEventListener('click', closePopup);
    window.addEventListener('keydown', removeEscape);
}

// Открытие попапа добавления карточки   
function openAddButton() { 
    document.querySelector('.popup_type_new-card').classList.add('popup_is-opened');
    popupCloseButton.addEventListener('click', closePopup);
    window.addEventListener('keydown', removeEscape);
}

// Закрытие попапа
function closePopup() {
    document.querySelector('.popup_type_edit').classList.remove('popup_is-opened');
    document.querySelector('.popup_type_new-card').classList.remove('popup_is-opened');
    document.querySelector('.popup_type_image').classList.remove('popup_is-opened');
};

function closePopupButton(evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopup();
    };
}
// Закрытие попапа через Escape
function removeEscape(evt) {
    if (evt.key === 'Escape') {
        closePopup();
        window.removeEventListener('keydown', removeEscape);
    };
}

// Закрытие попапа через оверлэй
function closeOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        closePopup();
    }
}

export { openEditButton, openAddButton, closePopup, closePopupButton, removeEscape, closeOverlay, popupCloseButton }; 
