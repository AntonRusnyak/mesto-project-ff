// Открытие попапа профиля
function openEditButton() { 
    document.querySelector('.popup_type_edit').classList.add('popup_is-opened');
    window.addEventListener('keydown', removeEscape);
}

// Открытие попапа добавления карточки   
function openAddButton() { 
    document.querySelector('.popup_type_new-card').classList.add('popup_is-opened');
    window.addEventListener('keydown', removeEscape);
}

// Закрытие попапа
function closePopup() {
    document.querySelector('.popup_type_edit').classList.remove('popup_is-opened');
    document.querySelector('.popup_type_new-card').classList.remove('popup_is-opened');
    document.querySelector('.popup_type_image').classList.remove('popup_is-opened');
};

// Закрытие попапа через Escape
function removeEscape(evt) {
    if (evt.key === 'Escape') {
        closePopup();
    };

    window.removeEventListener('keydown', removeEscape);
}

// Закрытие попапа через оверлэй
function closeOverlay() {
    if (evt.target === popup) {
        closePopup();
    };
}

export { openEditButton, openAddButton, closePopup, removeEscape, closeOverlay }; 
