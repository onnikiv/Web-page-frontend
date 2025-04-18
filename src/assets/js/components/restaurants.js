import {fetchData} from '../utils/fetchData.js';
import {infoModal} from '../utils/infoModal.js';
import {url} from '../utils/variables.js';
import {sortByName} from '../utils/sortByName.js';

let restaurants = [];

const getRestaurants = async () => {
  try {
    restaurants = await fetchData(url + '/restaurants');
  } catch (error) {
    console.log(error);
    const info = 'Failed to fetch restaurants. \n Be sure to be Connected to the schools network ';
    infoModal(info);
  }
};

const getRestaurantDailyMenu = async (id, lang) => {
  try {
    return await fetchData(`${url}/restaurants/daily/${id}/${lang}`);
  } catch (error) {
    console.log(error);
    const info = 'Failed to fetch menu. \n Be sure to be Connected to the schools network ';
    infoModal(info);
  }
};

const getRestaurantWeeklyMenu = async (id, lang) => {
  try {
    return await fetchData(`${url}/restaurants/weekly/${id}/${lang}`);
  } catch (error) {
    console.log(error);
    const info = 'Failed to fetch weeks menu. \n Be sure to be Connected to the schools network ';
    infoModal(info);
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
