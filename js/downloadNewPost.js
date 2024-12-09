import {getNumberFromString} from './functions.js';
import { sendData } from './data-loader.js';
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const imgOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const uploadButton = uploadForm.querySelector('#upload-submit');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const scaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleBigger = uploadForm.querySelector('.scale__control--bigger');
const scaleValue = uploadForm.querySelector('.scale__control--value');
const previewPicture = uploadForm.querySelector('.img-upload__preview img');
const slider = uploadForm.querySelector('.effect-level__slider');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const effectsPicture = uploadForm.querySelectorAll('.effects__preview');

//---------------------- Validation --------------------------
const regExp = /^#[0-9a-zа-яё]{1,19}$/i;
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});
function validateHashtagsCount(value) {
  return value.trim().split(' ').length <= 5;
}
function validateHashtagsUniqueness(value) {
  return (new Set(value.trim().split(' '))).size === value.trim().split(' ').length;
}
function validateHashtags(value) {
  if (value.length === 0) {
    return true;
  }
  const hashtags = value.trim().split(' ');
  for (let i = 0; i < hashtags.length; ++i) {
    if (!regExp.test(hashtags[i])) {
      return false;
    }
  }
  return true;
}
pristine.addValidator(
  hashtagsField,
  validateHashtagsCount,
  'Максимальное допустимое количество хэштегов - 5'
);
pristine.addValidator(
  hashtagsField,
  validateHashtagsUniqueness,
  'Не должно быть повторяющихся хэштегов'
);
pristine.addValidator(
  hashtagsField,
  validateHashtags,
  'Ошибка в хештеге'
);
function validateDescription(value) {
  return value.trim().length <= 140;
}
pristine.addValidator(
  descriptionField,
  validateDescription,
  'Длина описания не может быть больше 140 символов'
);
//------------------- End validation ------------------------

//----------- Switching keydown event on body based on focusing/unfocusing fiels -------------
hashtagsField.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

hashtagsField.addEventListener('focusout', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

descriptionField.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

descriptionField.addEventListener('focusout', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

//--------- End switching ---------------------------------------------------------------------

//--------- Opening and closing overlay ----------
function hideOverlay() {
  imgOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}
function showOverlay() {
  imgOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}
function openOverlay(evt) {
  setDefaultScale();
  setDefaultFilter();
  imgOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadInput.removeEventListener('click', openOverlay);
  imgOverlay.querySelector('img').src = URL.createObjectURL(evt.target.files[0]);
  const imageURL = imgOverlay.querySelector('img').src;
  effectsPicture.forEach((element) => {
    element.style.backgroundImage = `url('${imageURL}')`;
  });
}

function closeOverlay() {
  imgOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadInput.addEventListener('ckick', openOverlay);
  uploadInput.value = null;
  setDefaultFilter();
  setDefaultScale();
  hashtagsField.textContent = '';
  descriptionField.textContent = '';
}
uploadInput.addEventListener('change', openOverlay);
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    closeOverlay(evt);
  }
}
//----------- End overlay ------------------------
//----------- Scaling image ----------------------
function setDefaultScale() {
  scaleValue.value = '100%';
  previewPicture.style.transform = 'scale(1)';
}

function onScaleBigger() {
  const currentValue = getNumberFromString(scaleValue.value);
  scaleValue.value = currentValue <= 75 ? `${currentValue + 25}%` : `${currentValue}%`;
  previewPicture.style.transform = `scale(${getNumberFromString(scaleValue.value) * 0.01})`;
}

function onScaleSmaller() {
  const currentValue = getNumberFromString(scaleValue.value);
  scaleValue.value = currentValue >= 50 ? `${currentValue - 25}%` : `${currentValue}%`;
  previewPicture.style.transform = `scale(${getNumberFromString(scaleValue.value) * 0.01})`;
}
scaleBigger.addEventListener('click', onScaleBigger);
scaleSmaller.addEventListener('click', onScaleSmaller);
//----------- End scaling ------------------------
//----------- Filtering image --------------------
noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value;
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
function setDefaultFilter() {
  previewPicture.style.filter = 'none';
  sliderContainer.style.display = 'none';
}
function onFilterClick(evt) {
  const effect = evt.target.value;
  setDefaultFilter();
  if (effect !== 'none') {
    sliderContainer.style.display = 'block';
  }
  switch (effect) {
    case 'chrome':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1
      });
      slider.noUiSlider.set(1);
      break;
    case 'sepia':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1
      });
      slider.noUiSlider.set(1);
      break;
    case 'marvin':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1
      });
      slider.noUiSlider.set(100);
      break;
    case 'phobos':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1
      });
      slider.noUiSlider.set(3);
      break;
    case 'heat':
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1
      });
      slider.noUiSlider.set(3);
      break;
  }
}
slider.noUiSlider.on('update', () => {
  effectLevelValue.value = slider.noUiSlider.get();
  const effect = uploadForm.querySelector('.effects__radio:checked').value;
  switch (effect) {
    case 'chrome':
      previewPicture.style.filter = `grayscale(${effectLevelValue.value})`;
      break;
    case 'sepia':
      previewPicture.style.filter = `sepia(${effectLevelValue.value})`;
      break;
    case 'marvin':
      previewPicture.style.filter = `invert(${effectLevelValue.value}%)`;
      break;
    case 'phobos':
      previewPicture.style.filter = `blur(${effectLevelValue.value}px)`;
      break;
    case 'heat':
      previewPicture.style.filter = `brightness(${effectLevelValue.value})`;
      break;
  }
});
document.querySelectorAll('.effects__radio').forEach((li) => {
  li.addEventListener('click', onFilterClick);
});
//----------- End filtering ----------------------
function addPicture() {
  const picture = document.querySelector('#picture').content.querySelector('.picture').cloneNode(false);
  const newImg = previewPicture.cloneNode(true);
  newImg.height = '182';
  newImg.width = '182';
  picture.append(newImg);
  document.querySelector('.pictures.container').append(picture);
}
const blockSubmitButton = () => {
  uploadButton.disabled = true;
  uploadButton.textContent = 'Публикуем...';
};
const unblockSubmitButton = () => {
  uploadButton.disabled = false;
  uploadButton.textContent = 'Опубликовать';
};
const setUserFormSubmit = (onSuccess, onError) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          addPicture();
          closeOverlay();
        })
        .catch(() => {
          onError();
          hideOverlay();
        })
        .finally(() => {
          unblockSubmitButton();
        });
    }
  });
};
export{setUserFormSubmit, showOverlay};
