import {createRestaurantRows} from '../pages/index.js';
import {restaurants} from './restaurants.js';
import getLanguage from '../utils/language.js';

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

const populateSelectElements = () => {
  // tää on vähä turha nojoo
  const allCitiesOption = document.getElementById('all-cities');
  const allCompaniesOption = document.getElementById('all-companies');
  allCompaniesOption.innerText = getLanguage() === 'fi' ? `Yritys` : `Company`;
  allCitiesOption.innerText = getLanguage() === 'fi' ? `Kaupunki` : `City`;
};

export {
  filterRestaurantsByCompany,
  filterRestaurantsByCity,
  companySelect,
  citySelect,
  populateSelectElements,
};
