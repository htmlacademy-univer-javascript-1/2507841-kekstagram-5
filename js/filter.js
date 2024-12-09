const imgFilters = document.querySelector('.img-filters');
const filtersForm = imgFilters.querySelector('.img-filters__form');
const imgFiltersButtons = filtersForm.querySelectorAll('button');

function deactivateAllFiltersButtons() {
  for (let i = 0; i < imgFiltersButtons.length; i++) {
    imgFiltersButtons[i].classList.remove('img-filters__button--active');
  }
}

function showFilter() {
  imgFilters.classList.remove('img-filters--inactive');
}

function setFilterClick(cb) {
  filtersForm.addEventListener('click', (evt) => {
    deactivateAllFiltersButtons();
    evt.target.classList.add('img-filters__button--active');
    cb();
  });
}


export {showFilter, setFilterClick};
