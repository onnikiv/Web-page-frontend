import {fillWeekTable} from './main.js';
import {getRestaurantWeeklyMenu, restaurants} from './restaurants.js';

/* eslint-disable no-undef */
const markers = new Map();

const map = L.map('map').setView([60.2144768, 25.0281984], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const addRestaurantsToMap = (restaurant) => {
  const restaurantObject = restaurant;
  const {name, address, postalCode, city, phone, company} = restaurantObject;
  const coords = restaurantObject.location.coordinates;
  const latitude = coords[1];
  const longitude = coords[0];
  const marker = L.marker([latitude, longitude])
    .addTo(map)
    .on('click', () => changeMapView(restaurant))
    .bindPopup(
      `<h3>${name}</h3>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Postal Code:</strong> ${postalCode}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>`
    );
  markers.set(restaurant._id, marker);
};

const changeMapView = async (restaurant) => {
  const coords = restaurant.location.coordinates;
  const id = restaurant._id;
  const latitude = coords[1];
  const longitude = coords[0];
  map.setView([latitude, longitude], 13);
  console.log('changeMapView', restaurant);

  const LANGUAGE = 'fi';

  const marker = markers.get(id);

  if (marker) {
    marker.openPopup();

    const restaurantData = restaurants.find((r) => r._id === id);
    if (restaurantData) {
      fillWeekTable(await getRestaurantWeeklyMenu(restaurant._id, LANGUAGE));
      console.log('TÄÄ');
    } else {
      console.error('Restaurant not found');
    }
  }
};

export {addRestaurantsToMap, changeMapView};
