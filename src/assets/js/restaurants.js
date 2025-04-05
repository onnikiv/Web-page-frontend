import {url} from './variables.js';
import {fetchData, sortByName} from './utils.js';
export let restaurants = [];

export const getRestaurants = async () => {
  try {
    restaurants = await fetchData(url + '/restaurants');
  } catch (error) {
    console.log(error);
    errorBox.textContent =
      'Failed to fetch restaurants. Please try again later. \n Be sure to be Connected to the schools network ';
    errorBox.showModal();
  }
};

export const getRestaurantMenu = async (id, lang) => {
  try {
    return await fetchData(`${url}/restaurants/daily/${id}/${lang}`);
  } catch (error) {
    console.log(error);
    errorBox.textContent = 'Failed to fetch menu. Please try again later.';
    errorBox.showModal();
  }
};

export const sortRestaurants = () => {
  restaurants.sort(sortByName);
};
