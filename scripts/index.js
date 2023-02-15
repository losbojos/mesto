const cardTemplate = document.getElementById("card-template");
const cards = document.querySelector(".cards");

/***********************************************************************************************************************/

function addCard(aName, aLink, atTheTop) {
  const newArticle = cardTemplate.content.cloneNode(true);

  const img = newArticle.querySelector('.cards__foto');
  img.setAttribute('src', aLink);

  const caption = newArticle.querySelector('.cards__caption');
  caption.textContent = aName;

  if (atTheTop)
    cards.prepend(newArticle);
  else
    cards.append(newArticle);
}

/***********************************************************************************************************************/

function initCards() {

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

  cards.innerHTML = "";

  initialCards.forEach((value) => {
    addCard(value.name, value.link, false);
  });
}

/***********************************************************************************************************************/

function initEditProfilePopup() {

  const profileName = document.querySelector(".profile__name");
  const profileAbout = document.querySelector(".profile__about");
  const editProfilePopup = document.querySelector("#popup-edit-profile");

  const inputName = editProfilePopup.querySelector("#form-edit-profile__input-name-id");
  const inputAbout = editProfilePopup.querySelector("#form-edit-profile__input-about-id");
  const closeButton = editProfilePopup.querySelector(".form-edit-profile__button-close");
  const formElement = editProfilePopup.querySelector(".form-edit-profile");

  const toggleOpenPopup = () => {
    let isOpened = editProfilePopup.classList.toggle("popup_opened");
    if (isOpened) {
      inputName.value = profileName.textContent;
      inputAbout.value = profileAbout.textContent;
    }
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  

    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    toggleOpenPopup();
  }

  document.querySelector(".profile__edit-button").addEventListener("click", toggleOpenPopup);
  closeButton.addEventListener("click", toggleOpenPopup);
  formElement.addEventListener("submit", handleFormSubmit);
}

/***********************************************************************************************************************/

function initAddCardPopup() {

  const popup = document.querySelector("#popup-add-card"); // by id

  const inputImageTitle = popup.querySelector("#form-edit-profile__input-name-id");
  const inputImageLink = popup.querySelector("#form-edit-profile__input-about-id");
  const closeButton = popup.querySelector(".form-edit-profile__button-close");
  const formElement = popup.querySelector(".form-edit-profile");

  const toggleOpenAddCardPopup = () => {
    popup.classList.toggle("popup_opened");
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  

    const newImageName = inputImageTitle.value;
    const newImageLink = inputImageLink.value;
    addCard(newImageName, newImageLink, true);
    toggleOpenAddCardPopup();
  }

  document.querySelector(".profile__add-button").addEventListener("click", toggleOpenAddCardPopup);
  closeButton.addEventListener("click", toggleOpenAddCardPopup);
  formElement.addEventListener("submit", handleFormSubmit);
}

/***********************************************************************************************************************/
/* Main script */

initCards();
initEditProfilePopup();
initAddCardPopup();