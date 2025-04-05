import {restaurantRow, restaurantMenuItems, getRestaurantInfo} from './components.js';
import {
  restaurants,
  getRestaurants,
  sortRestaurants,
  getRestaurantWeeklyMenu,
} from './restaurants.js';

import {addRestaurantsToMap, changeMapView} from './map.js';
let LANGUAGE = 'en';

const changeLanguage = () => {
  const languageButton = document.querySelector('#language-button');
  languageButton.textContent = LANGUAGE.toUpperCase();
  languageButton.addEventListener('click', () => {
    if (LANGUAGE === 'en') {
      LANGUAGE = 'fi';
      languageButton.innerText = 'FI';
    } else if (LANGUAGE === 'fi') {
      LANGUAGE = 'en';
      languageButton.innerText = 'EN';
    }
    console.log('Language changed to:', LANGUAGE);
  });
};

const table = document.getElementById('restaurant-box');
const tableBody = document.querySelector('.selected-day-menu');
export const errorBox = document.getElementById('error');

let MEMORYNUMBER = null;

const fillWeekTable = (weekDays) => {
  const weekClass = document.querySelector('.week-day-names');
  weekClass.innerHTML = '';

  if (weekDays.length === 0) {
    weekClass.innerHTML = `<article class="course">
      <p><strong>Menu unavailable.</strong></p>
    </article>`;
    return;
  }

  let dayIndex = 0;
  weekDays.forEach((day) => {
    weekClass.innerHTML += `<th><a id="${dayIndex}" href="#">${day.date}</a></th>`;
    dayIndex++;
  });

  document.querySelectorAll('.week-day-names a').forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();

      document.querySelectorAll('.week-day-names a.highlight').forEach((link) => {
        link.classList.remove('highlight');
      });

      MEMORYNUMBER = elem.id;
      elem.classList.add('highlight');

      tableBody.innerHTML = restaurantMenuItems(createMenuHtml(weekDays[elem.id]));
    });
  });

  if (MEMORYNUMBER !== null) {
    const previousDay = document.getElementById(MEMORYNUMBER);
    console.log(previousDay, 'perivus');
    if (previousDay) {
      previousDay.classList.add('highlight');
      tableBody.innerHTML = restaurantMenuItems(createMenuHtml(weekDays[MEMORYNUMBER]));
    }
  }
};

const loginElement = () => {
  const loginButton = document.querySelector('#login');
  const loginWindow = document.querySelector('#login-modal');
  let open = false;
  loginWindow.innerHTML = `
    <form id="login-form">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <button type="submit">Login</button>
    </form>
  `;

  loginButton.addEventListener('click', () => {
    open
      ? ((loginWindow.style.display = 'none'), (open = false))
      : ((loginWindow.style.display = 'block'), (open = true));
  });
};

const createMenuHtml = (index) => {
  const selectedDay = index.courses;
  console.log(selectedDay, 'ASASDADSADSAS');

  return (
    selectedDay
      .map(
        ({name, price, diets}) => `
      <article class="course">
        <p><strong>${name}</strong></p>
        <p>${price || ''}</p>
        <p>${diets || ''}</p>
      </article>`
      )
      .join('') ||
    `<article class="course">
      <p><strong>Menu unavailable for selected day</strong></p>
    </article>`
  );
};

const tableHeads = () => {
  return LANGUAGE === 'fi'
    ? `<thead>
        <tr>
          <th>Nimi</th>
          <th>Osoite</th>
          <th>Yritys</th>
        </tr>
      </thead>`
    : `<thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Company</th>
        </tr>
      </thead>`;
};

const fillTable = (filteredRestaurants) => {
  table.innerHTML = tableHeads();
  filteredRestaurants.forEach((restaurant) => {
    const row = restaurantRow(restaurant);
    addRestaurantsToMap(restaurant);
    row.addEventListener('click', async () => {
      document
        .querySelectorAll('#restaurant-box tr.highlight')
        .forEach((elem) => elem.classList.remove('highlight'));
      row.classList.add('highlight');

      changeMapView(restaurant);

      tableBody.innerHTML = '';

      const weekMenu = await getRestaurantWeeklyMenu(restaurant._id, LANGUAGE);
      console.log(weekMenu.days, 'VIIKON MENU KYSEISELTÄ RAVINTOLALTA');
      fillWeekTable(weekMenu.days);
      const restaurantInfo = document.getElementById('restaurant-info');
      restaurantInfo.innerHTML = getRestaurantInfo(restaurant);
    });
    table.appendChild(row);
  });
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
    fillTable(filteredRestaurants);
  });
};

const main = async () => {
  try {
    changeLanguage();
    loginElement();
    await getRestaurants();
    sortRestaurants();
    fillTable(restaurants);
    companySelect();
  } catch (error) {
    console.log(error);
  }
};

main();
