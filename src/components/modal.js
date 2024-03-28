// Открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    window.addEventListener('keydown', handleEscape);
}

// Закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    window.removeEventListener('keydown', handleEscape);  // не забываем про удаление обработчика
}

// Закрытие попапа через Escape
function handleEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened')
        closePopup(openedPopup);
    };
}

// Закрытие попапа через оверлэй
function handleCloseOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        closePopup(evt.currentTarget);
    }
} 
export { openPopup, closePopup, handleEscape, handleCloseOverlay};
