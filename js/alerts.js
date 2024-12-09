import { showOverlay } from './downloadNewPost.js';

const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successButton = successMessage.querySelector('.success__button');
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

function onEscapeKeydown(evt, action) {
  if (evt.key === 'Escape'){
    action();
  }
}

function openFormSuccessMessage() {
  document.body.append(successMessage);
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onSuccessKeydown);
  successMessage.addEventListener('click', onSuccessClick);
}

function closeSuccessMessage() {
  successMessage.remove();
  successButton.removeEventListener('click', onSuccessButtonClick);
  document.removeEventListener('keydown', onSuccessKeydown);
  successMessage.removeEventListener('click', onSuccessClick);
}

function openFormErrorMessage() {
  document.body.append(errorMessage);
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onErrorKeydown);
  errorMessage.addEventListener('click', onErrorClick);
}

function closeErrorMessage() {
  errorMessage.remove();
  errorButton.removeEventListener('click', onErrorButtonClick);
  document.removeEventListener('keydown', onErrorKeydown);
  errorMessage.removeEventListener('click', onErrorClick);
  showOverlay();
}

function onSuccessButtonClick() {
  closeSuccessMessage();
}

function onSuccessKeydown(evt) {
  onEscapeKeydown(evt, closeSuccessMessage);
}

function onSuccessClick(evt) {
  if (evt.target !== successMessage.querySelector('.success__inner') && evt.target !== successMessage.querySelector('.success__title')) {
    closeSuccessMessage();
  }
}

function onErrorButtonClick() {
  closeErrorMessage();
}

function onErrorKeydown(evt) {
  onEscapeKeydown(evt, closeErrorMessage);
}

function onErrorClick(evt) {
  if (evt.target !== errorMessage.querySelector('.error__inner') && evt.target !== errorMessage.querySelector('.error__title')) {
    closeErrorMessage();
  }
}

export {openFormSuccessMessage, openFormErrorMessage};
