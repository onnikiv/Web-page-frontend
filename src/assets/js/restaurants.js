import {fetchData, sortByName} from './utils.js';
import {errorBox} from './main.js';
import {url} from './variables.js';

let restaurants = [];

const getRestaurants = async () => {
  try {
    restaurants = await fetchData(url + '/restaurants');
  } catch (error) {
    console.log(error);
    errorBox.textContent =
      'Failed to fetch restaurants. \n Be sure to be Connected to the schools network ';
    errorBox.showModal();
  }
};

const getRestaurantDailyMenu = async (id, lang) => {
  try {
    return await fetchData(`${url}/restaurants/daily/${id}/${lang}`);
  } catch (error) {
    console.log(error);
    errorBox.textContent =
      'Failed to fetch menu. \n Be sure to be Connected to the schools network ';
    errorBox.showModal();
  }
};

const getRestaurantWeeklyMenu = async (id, lang) => {
  try {
    return await fetchData(`${url}/restaurants/weekly/${id}/${lang}`);
  } catch (error) {
    console.log(error);
    errorBox.textContent =
      'Failed to fetch weeks menu. \n Be sure to be Connected to the schools network ';
  }
};

const sortRestaurants = () => {
  restaurants.sort(sortByName);
};

export {
  restaurants,
  getRestaurants,
  getRestaurantDailyMenu,
  getRestaurantWeeklyMenu,
  sortRestaurants,
};
