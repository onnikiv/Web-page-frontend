import {distance} from '../utils/euclidean.js';
import {restaurants} from '../components/restaurants.js';
import getLanguage from '../utils/language.js';
import {openRestaurantByClick} from '../map.js';
import {infoModal} from '../utils/infoModal.js';

const success = (position) => {
  const coordsObject = position.coords;
  const userLocation = [coordsObject.longitude, coordsObject.latitude];

  let closestRestaurant = null;
  let shortestDistance = Infinity;

  restaurants.forEach((restaurant) => {
    const dist = distance(userLocation, restaurant.location.coordinates);
    if (dist < shortestDistance) {
      shortestDistance = dist;
      closestRestaurant = restaurant;
    }
  });

  if (closestRestaurant) {
    openRestaurantByClick(closestRestaurant);
  } else {
    const info = getLanguage() === 'fi' ? 'Ravintoloita ei löytynyt.' : 'No restaurants found.';
    infoModal(info);
  }
};

const options = {
  maximumAge: 0,
  timeout: 5000,
  enableHighAccuracy: true,
};

const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  const info =
    getLanguage() === 'fi'
      ? `Selaimen sijainti on estetty. Salli sijainti selaimen asetuksista.`
      : `Location access is blocked. Please enable location access in your browser settings.`;
  infoModal(info);
};

export const createNearestButton = () => {
  const nearestButton = document.getElementById('nearest-restaurant');

  nearestButton.innerText = getLanguage() === 'fi' ? `Lähin Ravintola` : `Closest Restaurant`;

  nearestButton.addEventListener('click', (event) => {
    event.preventDefault();
    findClosestRestaurant();
  });
};

const findClosestRestaurant = () => {
  navigator.geolocation.getCurrentPosition(success, error, options);
};
