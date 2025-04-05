import {restaurantRow, restaurantModal} from './components.js';
import {
  restaurants,
  getRestaurants,
  sortRestaurants,
  getRestaurantDailyMenu,
  getRestaurantWeeklyMenu,
} from './restaurants.js';

let LANGUAGE = 'en';

const changeLanguage = () => {
  const languageButton = document.querySelector('#language-button');
  languageButton.innerText = 'EN';
  languageButton.addEventListener('click', () => {
    console.log(languageButton, ' ADSADDSA');

    if (languageButton.innerText === 'EN') {
      languageButton.innerText = 'FI';
      LANGUAGE = 'fi';
    } else if (languageButton.innerText === 'FI') {
      languageButton.innerText = 'EN';
      LANGUAGE = 'en';
    }
  });
};

const table = document.getElementById('restaurant-box');
const tableBodyTr = document.createElement('tr');
const tableBody = document.querySelector('#menu tbody');
const errorBox = document.getElementById('error');
let dayIndex = 0;
/* eslint-disable no-undef */
const map = L.map('map').setView([60.2144768, 25.0281984], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const fillWeekTable = (weekDays) => {
  const dateObject = new Date();
  console.log(weekDays);

  const weekClass = document.querySelector('.week-day-names');
  weekClass.innerHTML = '';
  weekDays.forEach((day) => {
    weekClass.innerHTML += `<th><a id="${day.date}" href="#">${day.date}</a></th>`;
  });

  // tungetaan weekClass elementit

  // lisätään jokaiseen a elementtiin clickki
  document.querySelectorAll('.week-day-names a').forEach((elem) => {
    //alustetaan nykyinen päivä
    if (elem.id === 'Today') {
      elem.classList.add('highlight');
    }
    elem.addEventListener('click', () => {
      const selectedDay = weekDays.find((day) => day.name === elem.id);

      weekDays.forEach((day) => {
        const dayElement = document.getElementById(day.name);
        if (day.name === selectedDay.name) {
          day.selected = true;
          console.log(day, ' TÄÄ');
          dayElement.classList.add('highlight');
        } else {
          day.selected = false;
          dayElement.classList.remove('highlight');
        }
      });

      console.log(selectedDay.id);
      dayIndex = selectedDay.id;
      console.log('Päivä nyt: ', dayIndex);

      weekDays.forEach((day) => console.log(day.name, day.selected));
    });
  });
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

const openMenuForDay = (selectedDay) => {
  tableBodyTr.innerText = ``;
  tableBodyTr.innerText = `TEST ${selectedDay}`;
  tableBody.append();
};

const createMenuHtml = (courses) => {
  return (
    courses
      .map(
        ({name, price, diets}) => `
        <article class="course">
          <p><strong>${name}</strong></p>
          <p>Hinta: ${price || ''}</p>
          <p>Allergeenit: ${diets}</p>
        </article>
    `
      )
      .join('') ||
    `<article class="course">
    <p><strong>Menu unavailable.</strong></p></article>`
  );
};

const tableHeads = () => {
  return `<tr>
        <th>Name</th>
        <th>Address</th>
        <th>Company</th>
      </tr>`;
};

const fillTable = (filteredRestaurants, dayIndex) => {
  table.innerHTML = tableHeads();
  filteredRestaurants.forEach((restaurant) => {
    const row = restaurantRow(restaurant);
    row.addEventListener('click', async () => {
      document
        .querySelectorAll('#restaurant-box tr.highlight')
        .forEach((elem) => elem.classList.remove('highlight'));
      row.classList.add('highlight');

      const menu = await getRestaurantDailyMenu(restaurant._id, LANGUAGE);
      const weektest = await getRestaurantWeeklyMenu(restaurant._id, LANGUAGE);

      fillWeekTable(weektest.days);

      tableBody.innerHTML = restaurantModal(restaurant, createMenuHtml(menu.courses));
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
