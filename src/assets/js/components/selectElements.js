/* eslint-disable no-unused-vars */
import {createRestaurantRows} from '../pages/index.js';
import {restaurants} from './restaurants.js';
import getLanguage from '../utils/language.js';
import {createNearestButton} from './userLocation.js';
import {getAllFavouriteRestaurants} from './postFavourite.js';

const filterRestaurantsByCompany = (type) => {
  return type === 'All'
    ? restaurants
    : restaurants.filter((restaurant) => restaurant.company === type);
};

const filterRestaurantsByCity = (type) => {
  return type === 'All'
    ? restaurants
    : restaurants.filter((restaurant) => restaurant.city === type);
};

const filterRestaurantsByFavourites = (type) => {
  return type === 'All'
    ? restaurants
    : restaurants.filter((restaurant) => restaurant.city === type);
};

const companySelect = () => {
  const companySelect = document.querySelector('#company-select');
  companySelect.addEventListener('change', (event) => {
    const option = event.target.value;
    const filteredRestaurants = filterRestaurantsByCompany(option);
    createRestaurantRows(filteredRestaurants);
  });
};

const citySelect = () => {
  const citySelect = document.querySelector('#city-select');
  citySelect.addEventListener('change', (event) => {
    const option = event.target.value;
    const filteredRestaurants = filterRestaurantsByCity(option);
    createRestaurantRows(filteredRestaurants);
  });
};
const favouritesSelect = () => {
  const favouritesSelect = document.querySelector('#favourites-select');
  favouritesSelect.addEventListener('change', async (event) => {
    try {
      const favouriteRestaurants = await getAllFavouriteRestaurants();
      const option = event.target.value;

      const filteredRestaurants =
        option === 'All'
          ? restaurants
          : restaurants.filter((restaurant) =>
              favouriteRestaurants.some((fav) => fav === restaurant._id)
            );

      if (filteredRestaurants.length > 0) {
        createRestaurantRows(filteredRestaurants);
      } else {
        console.log('No restaurants found.');
      }
    } catch (error) {
      console.log('No restaurants found.');
    }
  });
};

const populateSelectElements = () => {
  const language = getLanguage();
  const allCitiesOption = document.getElementById('all-cities');
  const allCompaniesOption = document.getElementById('all-companies');
  const allFavouritesOption = document.getElementById('all-restaurants');
  const favouritesOption = document.getElementById('favourites-option');

  allCompaniesOption.innerText = language === 'fi' ? `Yritys` : `Company`;
  allCitiesOption.innerText = language === 'fi' ? `Kaupunki` : `City`;
  allFavouritesOption.innerText = language === 'fi' ? `Kaikki` : `All`;
  favouritesOption.innerText = language === 'fi' ? `Suosikit` : `Favourites`;
};

const createSelectElements = () => {
  companySelect();
  citySelect();
  favouritesSelect();
  populateSelectElements();

  createNearestButton();
};

export {createSelectElements, filterRestaurantsByCompany, filterRestaurantsByCity};
