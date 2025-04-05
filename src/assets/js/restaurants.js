import {url} from './variables.js';
import {fetchData, sortByName} from './utils.js';
export let restaurants = [];

const getRestaurants = async () => {
  try {
    restaurants = await fetchData(url + '/restaurants');
  } catch (error) {
    console.log(error);
    errorBox.textContent =
      'Failed to fetch restaurants. Please try again later. \n Be sure to be Connected to the schools network ';
    errorBox.showModal();
  }
};

const getRestaurantDailyMenu = async (id, lang) => {
  try {
    return await fetchData(`${url}/restaurants/daily/${id}/${lang}`);
  } catch (error) {
    console.log(error);
    errorBox.textContent = 'Failed to fetch menu. Please try again later.';
    errorBox.showModal();
  }
};

const getRestaurantWeeklyMenu = async (id, lang) => {
  try {
    return await fetchData(`${url}/restaurants/weekly/${id}/${lang}`);
  } catch (error) {
    console.log(error);
    errorBox.textContent = 'Failed to fetch weeks menu. Please try again later.';
    errorBox.showModal();
  }
};

const sortRestaurants = () => {
  restaurants.sort(sortByName);
};

export {getRestaurants, getRestaurantDailyMenu, getRestaurantWeeklyMenu, sortRestaurants};
