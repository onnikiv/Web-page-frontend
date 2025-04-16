import {getRestaurantInfo} from './components.js';
import getLanguage from './language.js';
import {fillWeekTable} from './main.js';
import {getRestaurantWeeklyMenu} from './restaurants.js';

/* eslint-disable no-undef */
const markers = new Map();

const map = L.map('map').setView([60.2144768, 25.0281984], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const addRestaurantsToMap = (restaurants) => {
  restaurants.forEach((restaurant) => {
    const coords = restaurant.location.coordinates;
    const latitude = coords[1];
    const longitude = coords[0];
    const marker = L.marker([latitude, longitude])
      .addTo(map)
      .on('click', () => openRestaurantInfo(restaurant))
      .bindPopup(getRestaurantInfo(restaurant));
    markers.set(restaurant._id, marker);
  });
};

const changeMapView = async (restaurant) => {
  const coords = restaurant.location.coordinates;
  const id = restaurant._id;
  const latitude = coords[1];
  const longitude = coords[0];
  map.setView([latitude, longitude], 13);

  const marker = markers.get(id);
  if (marker) {
    marker.openPopup();
  }
};

const openRestaurantInfo = async (restaurant) => {
  if (restaurant) {
    console.log(restaurant.name);
    fillWeekTable(await getRestaurantWeeklyMenu(restaurant._id, getLanguage()));
  } else {
    console.error('Restaurant not found');
  }
};

export {addRestaurantsToMap, changeMapView};
