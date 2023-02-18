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

  cards.addEventListener("click", (evt) => {
    if (evt.target.classList.contains('cards__like')) {
      evt.target.classList.toggle('cards__like_liked');
    }
    else if (evt.target.classList.contains('cards__delete')) {
      const card = evt.target.closest('.cards__card');
      card.remove();
    }
    else if (evt.target.classList.contains('cards__foto')) {
      const imgSrc = evt.target.getAttribute('src');

      let sibling = evt.target;
      do {
        sibling = sibling.nextElementSibling;
      }
      while (sibling && !sibling.classList.contains('cards__caption-container'));

      const imgCaption = sibling.querySelector('.cards__caption').textContent;

      displayImagePopup(imgSrc, imgCaption);
    }
  });
}

/***********************************************************************************************************************/

function initEditProfilePopup() {

  const profileName = document.querySelector(".profile__name");
  const profileAbout = document.querySelector(".profile__about");
  const editProfilePopup = document.querySelector("#popup-edit-profile");

  const inputName = editProfilePopup.querySelector("#profile-name-id");
  const inputAbout = editProfilePopup.querySelector("#profile-about-id");
  const closeButton = editProfilePopup.querySelector(".button-close");
  const formElement = editProfilePopup.querySelector(".form-edit");

  const toggleOpenPopup = () => {
    const isOpened = editProfilePopup.classList.toggle("popup_opened");
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

  const inputImageCaption = popup.querySelector("#image-caption-id");
  const inputImageLink = popup.querySelector("#image-link-id");
  const closeButton = popup.querySelector(".button-close");
  const formElement = popup.querySelector(".form-edit");

  const toggleOpenAddCardPopup = () => {
    popup.classList.toggle("popup_opened");
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  

    const newImageName = inputImageCaption.value;
    const newImageLink = inputImageLink.value;
    addCard(newImageName, newImageLink, true);
    toggleOpenAddCardPopup();
  }

  document.querySelector(".profile__add-button").addEventListener("click", toggleOpenAddCardPopup);
  closeButton.addEventListener("click", toggleOpenAddCardPopup);
  formElement.addEventListener("submit", handleFormSubmit);
}

/***********************************************************************************************************************/
function displayImagePopup(src, caption) {
  const popup = document.querySelector("#popup-display-image"); // by id
  const isOpened = popup.classList.toggle("popup_opened");

  if (isOpened) {
    const imgElement = popup.querySelector('.fullimage__image');
    imgElement.setAttribute('src', src);

    const captionElement = popup.querySelector('.fullimage__caption');
    captionElement.textContent = caption;
  }

}

/***********************************************************************************************************************/

function initDisplayImagePopup() {
  const popup = document.querySelector("#popup-display-image"); // by id
  const closeButton = popup.querySelector('.button-close');
  closeButton.addEventListener("click", () => {
    popup.classList.toggle("popup_opened");
  });
}

/***********************************************************************************************************************/
/* Main script */

initCards();
initEditProfilePopup();
initAddCardPopup();
initDisplayImagePopup();