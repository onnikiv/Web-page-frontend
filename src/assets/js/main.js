import {addRestaurantsToMap, changeMapView} from './map.js';
import {restaurantRow, getRestaurantInfo, createMenuHtml, tableHeads} from './components.js';
import {
  restaurants,
  getRestaurants,
  sortRestaurants,
  getRestaurantWeeklyMenu,
} from './restaurants.js';

import getLanguage from './language.js';

export const errorBox = document.getElementById('error');

const table = document.getElementById('restaurant-box');
const tableBody = document.querySelector('.selected-day-menu');
const weekClass = document.querySelector('.week-day-names');

export const fillWeekTable = (weekObject) => {
  console.log(weekObject, ' weekobject');
  weekClass.innerHTML = '';
  const {days} = weekObject;

  let index = 0;
  days.forEach((day) => {
    const th = document.createElement('th');
    const dayElement = document.createElement('a');

    const dayDisplayText = day.date.split(' ');
    let d = dayDisplayText[0].substring(0, 2);
    let dd = dayDisplayText[1];
    const mm = new Date().getMonth() + 1;

    getLanguage() === 'fi'
      ? (d = dayDisplayText[0].substring(0, 2))
      : (d = dayDisplayText[0].substring(0, 3)) && (dd = dayDisplayText[1] + '.');

    dayElement.id = `${index}`;
    dayElement.href = '#';
    dayElement.innerText = `${d} ${dd}${mm}`;
    th.appendChild(dayElement);

    dayElement.addEventListener('click', (event) => {
      event.preventDefault();
      document
        .querySelectorAll('.week-day-names a.highlight')
        .forEach((elem) => elem.classList.remove('highlight'));
      dayElement.classList.add('highlight');
      tableBody.innerHTML = createMenuHtml(day);
    });

    weekClass.appendChild(th);
    index++;
  });
};

const createRestaurantRows = (filteredRestaurants) => {
  console.log('CreateRestaurantrows');
  table.innerHTML = tableHeads(getLanguage());
  filteredRestaurants.forEach((restaurant) => {
    const row = restaurantRow(restaurant);
    row.addEventListener('click', async () => {
      document
        .querySelectorAll('#restaurant-box tr.highlight')
        .forEach((elem) => elem.classList.remove('highlight'));
      row.classList.add('highlight');

      changeMapView(restaurant);

      tableBody.innerHTML = '';
      thisRestaurant(restaurant);
    });
    table.appendChild(row);
  });
};

const thisRestaurant = async (restaurant) => {
  // haetaan kyseisen ravintolan viikkomenu + kieli
  const weekObject = await getRestaurantWeeklyMenu(restaurant._id, getLanguage());
  const restaurantInfo = document.getElementById('restaurant-info');
  restaurantInfo.innerHTML = getRestaurantInfo(restaurant, getLanguage());
  restaurantInfo.style.display = 'block';
  weekClass.innerHTML = '';
  if (!weekObject || !weekObject?.days?.length) {
    weekClass.innerHTML =
      getLanguage() === 'fi'
        ? '<p><strong>Viikon menu ei saatavilla.</strong></p>'
        : '<p><strong>Menu unavailable for the selected restaurant.</strong></p>';
  } else {
    fillWeekTable(weekObject);
  }
};

const filterRestaurants = (type) => {
  return type === 'All'
    ? restaurants
    : restaurants.filter((restaurant) => restaurant.company === type);
};

const companySelect = () => {
  const companySelect = document.querySelector('#company-select');
  companySelect.addEventListener('change', (event) => {
    const option = event.target.value;
    const filteredRestaurants = filterRestaurants(option);
    createRestaurantRows(filteredRestaurants);
  });
};

const main = async () => {
  try {
    await getRestaurants();
    addRestaurantsToMap(restaurants);
    sortRestaurants();

    createRestaurantRows(restaurants);
    companySelect();
  } catch (error) {
    console.log(error);
  }
};

main();
