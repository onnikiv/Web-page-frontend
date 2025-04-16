import {fetchRestaurantWeekMenu} from './index.js';
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
      .on('click', () => openRestaurantByClick(restaurant, coords))
      .bindPopup(`<h3>${restaurant.name}</h3>`);
    markers.set(restaurant._id, marker);
  });
};

const changeMapView = async (restaurant) => {
  const coords = restaurant.location.coordinates;
  const id = restaurant._id;
  const latitude = coords[1];
  const longitude = coords[0];
  const marker = markers.get(id);

  map.setView([latitude, longitude], 13);
  marker.openPopup();
  highlightMarker(coords);
};

const highlightMarker = (coords) => {
  map.eachLayer((layer) => {
    if (layer instanceof L.Circle) {
      map.removeLayer(layer);
    }
  });
  // eslint-disable-next-line no-unused-vars
  const circle = L.circle([coords[1], coords[0]], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 250,
  }).addTo(map);
};

const openRestaurantByClick = (restaurant, coords) => {
  if (restaurant) {
    fetchRestaurantWeekMenu(restaurant);
    highlightMarker(coords);
  }
};

export {addRestaurantsToMap, changeMapView};
