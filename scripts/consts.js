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


const validationOptions = {
    formSelector: '.form-edit',
    inputSectionSelector: '.form-edit__input-section',
    inputSelector: '.form-edit__input',
    errorSelector: '.form-edit__error',
    submitSelector: '.form-edit__button-save',

    inputInvalidClass: 'form-edit__input_invalid',
    disabledButtonClass: 'form-edit__button-save_disabled',
    inputErrorClass: 'form-edit__error_active'
}
