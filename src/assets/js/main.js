import {fetchData, sortByName} from './utils.js';
import {restaurantRow, restaurantModal} from './components.js';
import {url} from './variables.js';

const table = document.getElementById('restaurant-box');
const modal = document.querySelector('dialog');
const errorBox = document.getElementById('error');
let restaurants = [];
/* eslint-disable no-undef */
const map = L.map('map').setView([60.2144768, 25.0281984], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const fillWeekTable = () => {
  const userDate = new Date();
  console.log(userDate);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayNum = userDate.getDate();
  const dayString = weekdays[userDate.getDay()];
  const month = userDate.getMonth() + 1;
  console.log(dayString, month, dayNum);

  const weekdayTableRows = document.querySelectorAll('.weekday');

  weekdayTableRows.forEach((row) => {
    row.querySelectorAll('a').forEach((link) => {
      if (link.id && link.textContent === dayString) {
        link.classList.add('current-day');
        link.innerHTML = `Today`;
      }
    });
  });

  weekdayTableRows.forEach((row) => {
    row.querySelectorAll('a').forEach((link) => {
      const selectedDay = link.textContent;
      console.log(selectedDay);
      link.addEventListener('click', () => {
        if (link.classList.contains('highlight')) {
          link.classList.remove('highlight');
          console.log(link.classList);
        } else {
          document.querySelectorAll('.highlight').forEach((element) => {
            element.classList.remove('highlight');
          });
        }
        link.classList.add('highlight');

        openMenuForDay(selectedDay);
      });
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

const tableBodyTr = document.createElement('tr');

const openMenuForDay = (selectedDay) => {
  const tableBody = document.querySelector('tbody');
  tableBodyTr.innerHTML = ``;
  tableBodyTr.innerHTML = `TEST ${selectedDay}`;
  tableBody.append(tableBodyTr);
};

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

const createMenuHtml = (courses) => {
  return (
    courses
      .map(
        ({name, price, diets}) => `
      <article class="course">
        <p><strong>${name}</strong>,
        Hinta: ${price || ''},
        Allergeenit: ${diets}</p>
      </article>
    `
      )
      .join('') || '<p><strong>Menu unavailable.</strong></p>'
  );
};

const getRestaurantMenu = async (id, lang) => {
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

const tableHeads = () => {
  return `<tr>
        <th>Name</th>
        <th>Address</th>
        <th>Company</th>
      </tr>`;
};

const fillTable = (filteredRestaurants) => {
  table.innerHTML = tableHeads();

  filteredRestaurants.forEach((restaurant) => {
    const row = restaurantRow(restaurant);
    row.addEventListener('click', async () => {
      document
        .querySelectorAll('.highlight')
        .forEach((elem) => elem.classList.remove('highlight'));
      row.classList.add('highlight');

      const menu = await getRestaurantMenu(restaurant._id, 'fi');

      modal.innerHTML = restaurantModal(
        restaurant,
        createMenuHtml(menu.courses)
      );
      modal.showModal();
    });
    table.appendChild(row);
  });
};

const main = async () => {
  try {
    loginElement();
    fillWeekTable();
    await getRestaurants();
    sortRestaurants();
    fillTable(restaurants);
    companySelect();
  } catch (error) {
    console.log(error);
  }
};

main();
