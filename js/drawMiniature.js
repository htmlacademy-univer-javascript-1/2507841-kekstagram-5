import {openPicture} from './bigPhotoModal.js';
import { shuffle } from './utils.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();
const picturesHeader = picturesContainer.querySelector('.pictures__title');
const picturesUpload = document.querySelector('.img-upload');
const comparePosts = (postA, postB) => postB.likes - postA.likes;

function clearPicturesContainer() {
  picturesContainer.innerHTML = '';
  picturesContainer.append(picturesHeader);
  picturesContainer.append(picturesUpload);
}

const renderPictures = (postsInp) => {
  let posts = postsInp.slice();
  const filter = document.querySelector('.img-filters__button--active').id;
  if (filter.endsWith('random')) {
    posts = shuffle(posts).slice(0, 10);
  } else if (filter.endsWith('discussed')) {
    posts.sort(comparePosts);
  }

  clearPicturesContainer();
  posts.forEach(({url, description, likes, comments}) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('img').src = url;
    picture.querySelector('img').alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.addEventListener('click', () => {
      openPicture(url, description, likes, comments);
    });
    picturesFragment.append(picture);
  });
  picturesContainer.append(picturesFragment);
};

export {renderPictures};
