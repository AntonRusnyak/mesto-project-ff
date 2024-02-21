// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
const createCard = (item, onDelete, likeBtn, openImg) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = item.link; 
    cardImage.alt = item.name;
    cardTitle.textContent = item.name; 

    cardsContainer.addEventListener('click', likeBtn);
    cardImage.addEventListener('click', openImg);

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
    const card = createCard(item, onDelete, likeBtn, openImg);
    cardsContainer.append(card);
};

// like

function likeBtn(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    };
};

//img
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');

function openPopupImg() {
    popupTypeImage.classList.add('popup_is-opened'); // Открытие попапа редактирования профиля
    document.addEventListener('keydown', closePopupEsc); // Закрытие попапа через Esc
}

function openImg(evt) {
    popupImage.alt = evt.name;
    popupImage.src = evt.link;
    openPopupImg();
};

// FORM

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const formEditProfile = document.forms.edit__profile;

const nameInputEditProfile = formEditProfile.elements.name;
const jobInputEditProfile = formEditProfile.elements.description;

function handleFormSubmit(evt) {
    evt.preventDefault(); 

   let name = nameInput.value;
   let job =  jobInput.value; 

   nameInputEditProfile.textContent = name;
   jobInputEditProfile.textContent = job;

}


// Удаление элементов
function deleteElement() {
    cardsContainer.innerHTML = '';
};

// Добавление карточки
const nameNewCard = document.querySelector('.popup__input_type_card-name');
const linkNewCard = document.querySelector('.popup__input_type_url');

const formNewCard = document.forms.new__place;

function addNewCard(evt) {
    evt.preventDefault(); 
    let nameCard = nameNewCard.value;
    let urlCard = linkNewCard.value;
    console.log(nameCard);

    let newObject = {};
    newObject['name'] = nameCard;
    newObject['link'] = urlCard;
    
    const newMas = initialCards.unshift(newObject);
    deleteElement();
    newMas.forEach(addCard);
};

export { createCard, addCard, onDelete, likeBtn, openImg,  addNewCard, handleFormSubmit }; // function
export { formEditProfile, formNewCard }; // const