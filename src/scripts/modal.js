// Все попапы
const popup = document.querySelector('.popup');
/// Попап редактирования профиля
const popupButtonEdit= document.querySelector('.profile__edit-button'); //Кнопка редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit'); //Попап редактирования профиля

/// Попап добавления карточки
const popupAddButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const popupTypeNewCard = document.querySelector('.popup_type_new-card'); // Попап добавления карточки

// Открытие попапа
function openPopupEdit() {
    popupTypeEdit.classList.add('popup_is-opened'); // Открытие попапа редактирования профиля
    document.addEventListener('keydown', closePopupEsc); // Закрытие попапа через Esc
}

function openPopupAddNewCard() {
    popupTypeNewCard.classList.add('popup_is-opened'); // Открытие попапа добавления карточки
    document.addEventListener('keydown', closePopupEsc); // Закрытие попапа через Esc
} 

// Закрытие попапа
const closePopupButton = document.querySelector('.popup__close'); // Кнопка закрытия попапа

function closePopup() {
    popupTypeEdit.classList.remove('popup_is-opened');
    popupTypeNewCard.classList.remove('popup_is-opened');
    popupTypeImage.classList.remove('popup_is-opened');
}

// Закрытие клавишей Esc
function closePopupEsc(e) {
    if (e.key === 'Escape') {
        closePopup();   
    };

    document.removeEventListener('keydown', closePopupEsc);
}

// Закрытие через оверлей 
function closePopupOverlay(e) {
    if (e.target === popup) {
        closePopup();
    };
}

export { openPopupEdit, openPopupAddNewCard, closePopup, closePopupEsc, closePopupOverlay };
export { popupButtonEdit, popupAddButton, closePopupButton, popup };