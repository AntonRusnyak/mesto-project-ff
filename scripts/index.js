// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
const createCard = (item, onDelete) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = item.link; 
    cardImage.alt = item.name;
    cardTitle.textContent = item.name; 

    const resetCard = cardElement.querySelector('.card__delete-button');
    resetCard.addEventListener('click', onDelete);

    return cardElement;
};

// @todo: Функция удаления карточки
const onDelete = (card) => {
    const item = card.target.closest('.card');
    item.remove();
};
// @todo: Вывести карточки на страницу
const addCard = (item) => {
    const card = createCard(item, onDelete);
    cardsContainer.append(card);
};

initialCards.forEach(addCard);