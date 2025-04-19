import getLanguage from '../utils/language.js';
import {isLoggedIn} from '../utils/logged.js';
import {
  checkIfFavourite,
  deleteFavouriteRestaurant,
  postFavouriteRestaurant,
} from './postFavourite.js';
const createFavouriteSection = () => {
  return `<div class="favourite-section">
            <div id="add">
              <p><strong>${
                getLanguage() === 'fi' ? 'Aseta suosikiksi' : 'Set as Favourite'
              }</strong></p><button id="favourite-btn">❤️</button>
            </div>
            <div id="remove" style="display: none;">
            <p><strong>${
              getLanguage() === 'fi' ? 'Poista Suosikki' : 'Remove Favourite'
            }</strong></p><button id="remove-favourite-btn">❌</button>
            </div>
          </div>`;
};

const favouriteButtonEvent = async (restaurant) => {
  const addBtn = document.getElementById('favourite-btn');
  const removeBtn = document.getElementById('remove-favourite-btn');

  // lisääminen
  const addDiv = document.getElementById('add');
  addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    postFavouriteRestaurant(restaurant._id);
    addDiv.style.display = 'none';
    removeDiv.style.display = 'block';
  });

  // poistaminen
  const removeDiv = document.getElementById('remove');
  removeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    deleteFavouriteRestaurant(restaurant._id);
    removeDiv.style.display = 'none';
    addDiv.style.display = 'block';
  });

  const favourite = await checkIfFavourite(restaurant._id);

  if (isLoggedIn() && !favourite) {
    removeDiv.style.display = 'none';
  } else {
    removeDiv.style.display = 'block';
    addDiv.style.display = 'none';
  }
};

export {createFavouriteSection, favouriteButtonEvent};
