const cardTemplate = document.getElementById("card-template");
const cards = document.querySelector(".cards");

/***********************************************************************************************************************/

function createCard(aName, aLink) {
  const newArticle = cardTemplate.content.cloneNode(true);

  const img = newArticle.querySelector('.cards__foto');
  img.src = aLink;
  img.alt = `фотография ${aName}`;

  img.addEventListener("click", (evt) => {
    displayImagePopup(aLink, aName);
  });

  const caption = newArticle.querySelector('.cards__caption');
  caption.textContent = aName;

  const buttonLike = newArticle.querySelector('.cards__like');
  buttonLike.addEventListener("click", (evt) => {
    buttonLike.classList.toggle('cards__like_liked');
  });

  const buttonDelete = newArticle.querySelector('.cards__delete');
  buttonDelete.addEventListener("click", (evt) => {
    const card = buttonDelete.closest('.cards__card');
    card.remove();
  });

  return newArticle;
}

function addCard(newCard, atTheTop) {
  if (atTheTop)
    cards.prepend(newCard);
  else
    cards.append(newCard);
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

  initialCards.forEach((value) => {
    addCard(createCard(value.name, value.link), false);
  });

  /*
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
  */
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

  const openEditProfilePopup = () => {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
    openPopup(editProfilePopup);
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  

    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closePopup(editProfilePopup);
  }

  document.querySelector(".profile__edit-button").addEventListener("click", openEditProfilePopup);
  closeButton.addEventListener("click", () => { closePopup(editProfilePopup); });
  formElement.addEventListener("submit", handleFormSubmit);
}

/***********************************************************************************************************************/

function initAddCardPopup() {

  const popupAddCard = document.querySelector("#popup-add-card"); // by id

  const inputImageCaption = popupAddCard.querySelector("#image-caption-id");
  const inputImageLink = popupAddCard.querySelector("#image-link-id");
  const closeButton = popupAddCard.querySelector(".button-close");
  const formElement = popupAddCard.querySelector(".form-edit");

  const handleFormSubmit = (evt) => {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  

    const newImageName = inputImageCaption.value;
    const newImageLink = inputImageLink.value;
    addCard(createCard(newImageName, newImageLink), true);

    inputImageCaption.value = "";
    inputImageLink.value = "";

    closePopup(popupAddCard);
  }

  document.querySelector(".profile__add-button").addEventListener("click", () => { openPopup(popupAddCard); });
  closeButton.addEventListener("click", () => { closePopup(popupAddCard); });
  formElement.addEventListener("submit", handleFormSubmit);
}

/***********************************************************************************************************************/
function displayImagePopup(src, caption) {
  const popupDisplayImage = document.querySelector("#popup-display-image"); // by id

  const imgElement = popupDisplayImage.querySelector('.fullimage__image');
  imgElement.src = src;
  imgElement.alt = `фотография ${caption}`;

  const captionElement = popupDisplayImage.querySelector('.fullimage__caption');
  captionElement.textContent = caption;

  openPopup(popupDisplayImage);
}

/***********************************************************************************************************************/

function initDisplayImagePopup() {
  const popupDisplayImage = document.querySelector("#popup-display-image"); // by id
  const closeButton = popupDisplayImage.querySelector('.button-close');
  closeButton.addEventListener("click", () => {
    closePopup(popupDisplayImage);
  });
}

/***********************************************************************************************************************/

function openPopup(popupWindow) {
  popupWindow.classList.add("popup_opened");
  const form = popupWindow.querySelector('.form-edit');
  validate(form, validationOptions); // Начальная валидация необходима на открытии формы, когда события изменения текста инпутов еще не сработали
}

function closePopup(popupWindow) {
  popupWindow.classList.remove("popup_opened");
}


/***********************************************************************************************************************/
/* Main script */

initCards();
initEditProfilePopup();
initAddCardPopup();
initDisplayImagePopup();
enableValidation(validationOptions);
