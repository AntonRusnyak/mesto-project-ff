// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placeList = document.querySelector('.places__list');
// @todo: Функция создания карточки
const addCard = (item) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const resetCard = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = item.link; 
    cardImage.alt = item.name;
    cardTitle.textContent = item.name; 

    resetCard.addEventListener('click', (evt) => {
        let item = evt.target.closest('.card');
        item.remove();
    });

    return cardElement;
};

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const addInBlock = (item) => {
    const card = addCard(item);
    placeList.append(card);
};

initialCards.forEach(addInBlock);