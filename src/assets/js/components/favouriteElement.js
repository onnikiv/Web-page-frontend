import getLanguage from '../utils/language.js';
import {isLoggedIn} from '../utils/logged.js';
import {postFavouriteRestaurant} from './postFavourite.js';
const createFavouriteSection = () => {
  return `<div class="favourite-section">
            <p><strong>${
              getLanguage() === 'fi' ? 'Aseta suosikiksi' : 'Set as Favourite'
            }</strong></p><button id="favourite-btn">❤️</button>
          </div>`;
};

const favouriteButtonEvent = (restaurant) => {
  const favouriteSection = document.querySelector('.favourite-section');
  const favouriteBtnElement = document.getElementById('favourite-btn');
  favouriteBtnElement.addEventListener('click', (event) => {
    event.preventDefault();
    postFavouriteRestaurant(restaurant._id);
  });

  isLoggedIn()
    ? (favouriteSection.style.display = 'grid')
    : (favouriteSection.style.display = 'none');
};

export {createFavouriteSection, favouriteButtonEvent};
