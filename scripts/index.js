const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const popupEditProfile = document.querySelector(".popup-edit-profile");
const closeButton = popupEditProfile.querySelector(".form-edit-profile__button-close");
const inputName = document.getElementById("form-edit-profile__input-name-id");
const inputAbout = document.getElementById("form-edit-profile__input-about-id");
const formElement = popupEditProfile.querySelector(".form-edit-profile");

const initialCards = [
  {
    name: 'Архыз',
    link: './images/cards/01-Arhiz.jpg'
  },
  {
    name: 'Кузбасс',
    link: './images/cards/02-Kuzbass.JPG'
  },
  {
    name: 'Новосибирск',
    link: './images/cards/03-Novosibirsk.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/cards/04-Sankt-Peterburg.jpg'
  },
  {
    name: 'Новороссийск',
    link: './images/cards/05-Novorossiysk.jpg'
  },
  {
    name: 'Алтай',
    link: './images/cards/06-Altay.JPG'
  }
];

const toggleOpenPopup = () => {
  let isOpened = popupEditProfile.classList.toggle("popup-edit-profile_opened");
  if (isOpened) {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
  }
};

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  

  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  toggleOpenPopup();
}

function loadInitialCards() {
  const cards = document.querySelector(".cards");
  cards.innerHTML = "";

  const cardTemplate = document.getElementById("card-template");
  console.log(cardTemplate);

  initialCards.forEach((value) => {
    const newArticle = cardTemplate.content.cloneNode(true);

    const img = newArticle.querySelector('.cards__foto');
    img.setAttribute('src', value.link);

    const caption = newArticle.querySelector('.cards__caption');
    caption.textContent = value.name;

    cards.appendChild(newArticle);
  });

}

editButton.addEventListener("click", toggleOpenPopup);
closeButton.addEventListener("click", toggleOpenPopup);
formElement.addEventListener("submit", handleFormSubmit);

loadInitialCards();