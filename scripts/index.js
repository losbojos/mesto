const editButton = document.querySelector(".profile__edit-button");
const profileNameText = document.getElementById("profile__name-text_id");
const profileAbout = document.querySelector(".profile__about");

const popupEditProfile = document.querySelector(".popup-edit-profile");
const closeButton = popupEditProfile.querySelector(".form-edit-profile__button-close");
const inputName = document.getElementById("form-edit-profile__input-name-id");
const inputAbout = document.getElementById("form-edit-profile__input-about-id");
const formElement = popupEditProfile.querySelector(".form-edit-profile");

const toggleOpenPopup = () => {
  let isOpened = popupEditProfile.classList.toggle("popup-edit-profile_opened");
  if (isOpened) {
    // console.log('isOpened');
    inputName.value = profileNameText.textContent;
    inputAbout.value = profileAbout.textContent;
  }
  else {
    // console.log('is not Opened');
  }
};

const handleEditButtonClick = () => {
  toggleOpenPopup();
};

const handleCloseButtonClick = () => {
  // console.log('handleCloseButtonClick');
  toggleOpenPopup();
};

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  

  // console.log('handleFormSubmit');

  profileNameText.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  toggleOpenPopup();
}

editButton.addEventListener("click", handleEditButtonClick);
closeButton.addEventListener("click", handleCloseButtonClick);
formElement.addEventListener("submit", handleFormSubmit);

