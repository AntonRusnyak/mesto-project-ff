import { cardsContainer, formCardName, formCardLink, popupImage, nameInput, jobInput, profileName, profileDescription, popupCaption } from './index.js';
import { initialCards } from './cards.js';
import { removeEscape } from './modal.js';
// Функция создания карточки
function createCard(item, onDelete, likeBtn, openImg) {
    const cardTemplate = document.querySelector('#card-template').content; // Темплейт карточки
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = item.link; 
    cardImage.alt = item.name;
    cardTitle.textContent = item.name; 

    const resetCard = cardElement.querySelector('.card__delete-button');
    resetCard.addEventListener('click', onDelete);

    cardsContainer.addEventListener('click', likeBtn);
    cardImage.addEventListener('click', openImg); // Открываем попап изображения
    return cardElement;
};

// Функция удаления карточки
function onDelete(card) {
    const item = card.target.closest('.card');
    item.remove();
};

// Функция лайка карточки
function likeBtn(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    };
};

function openImg(evt) {
    if (evt.target.classList.contains('card__image')) {
        popupImage.src = evt.target.src;
        popupImage.alt = evt.target.alt;
        popupCaption.textContent = evt.target.alt;
        document.querySelector('.popup_type_image').classList.add('popup_is-opened');
        window.addEventListener('keydown', removeEscape);
    }
}
// Функция вывода карточки на страницу 
function addCard(item) {
    const card = createCard(item, onDelete, likeBtn, openImg);
    cardsContainer.append(card);
};

// Функция удаления карточек из контейнера
function deleteElement() {
    cardsContainer.innerHTML = '';
};

// Функция добавления новой карточки 
function addNewCard(evt) {
    evt.preventDefault(); 

    let nameCard = formCardName.value; // Получаем имя карточки из формы
    let urlCard = formCardLink.value; // Получаем ссылку на карточку из формы

    let newObject = {};
    newObject['name'] = nameCard;
    newObject['link'] = urlCard;

    deleteElement(); // Удаляем карточки из контейнера

    initialCards.unshift(newObject); // Добавляем карточку в массив
    initialCards.forEach(addCard); // Выводим карточки на страницу 

    formCardName.value = '';  //Очищаем поля
    formCardLink.value = '';

    document.querySelector('.popup_type_new-card').classList.remove('popup_is-opened'); // Закртытие попапа
};

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    let a = nameInput.value;
    let b = jobInput.value;

    profileName.textContent = a;
    profileDescription.textContent = b;
    document.querySelector('.popup_type_edit').classList.remove('popup_is-opened');
}

export { createCard, onDelete, likeBtn, openImg, addCard, deleteElement, addNewCard, handleFormSubmit };