import { getData } from './data-loader.js';
import { renderPictures } from './drawMiniature.js';
import { showFilter, setFilterClick} from './filter.js';
import { debounce } from './utils.js';
import { ERROR_DISPLAY_TIME } from './data.js';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ERROR_DISPLAY_TIME);
};

const setDataFromServer = () => {
  getData()
    .then((pictures) => {
      showFilter();
      renderPictures(pictures);
      setFilterClick(debounce(
        () => renderPictures(pictures),
        500,
      ));
    })
    .catch(() => {
      const message = 'Ошибка загрузки данных с сервера';
      showAlert(message);
    });
};

export {setDataFromServer};
