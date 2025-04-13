import {addRestaurantsToMap, changeMapView} from './map.js';
import {restaurantRow, getRestaurantInfo, createMenuHtml, tableHeads} from './components.js';
import {
  restaurants,
  getRestaurants,
  sortRestaurants,
  getRestaurantWeeklyMenu,
} from './restaurants.js';

const table = document.getElementById('restaurant-box');
const tableBody = document.querySelector('.selected-day-menu');
const weekClass = document.querySelector('.week-day-names');
export const errorBox = document.getElementById('error');
export let LANGUAGE = document.documentElement.lang;

const changeLanguage = () => {
  const languageButton = document.querySelector('#language-button');
  languageButton.textContent = LANGUAGE.toUpperCase();
  languageButton.addEventListener('click', () => {
    if (LANGUAGE === 'en') {
      LANGUAGE = 'fi';
      document.documentElement.lang = 'fi';
      languageButton.innerText = 'FI';
    } else if (LANGUAGE === 'fi') {
      LANGUAGE = 'en';
      document.documentElement.lang = 'en';
      languageButton.innerText = 'EN';
    }
    console.log('Language changed to:', LANGUAGE);
    fillTable(restaurants, LANGUAGE);
  });
};

const fillWeekTable = (weekObject) => {
  const {days} = weekObject;

  let index = 0;
  days.forEach((day) => {
    const th = document.createElement('th');
    const dayElement = document.createElement('a');
    console.log(day);

    const dayDisplayText = day.date.split(' ');
    let d = dayDisplayText[0].substring(0, 2);
    let dd = dayDisplayText[1];
    const mm = new Date().getMonth() + 1;

    LANGUAGE === 'fi'
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

const fillTable = (filteredRestaurants, LANGUAGE) => {
  table.innerHTML = tableHeads(LANGUAGE);
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

      const weekObject = await getRestaurantWeeklyMenu(restaurant._id, LANGUAGE);
      const restaurantInfo = document.getElementById('restaurant-info');
      restaurantInfo.innerHTML = getRestaurantInfo(restaurant, LANGUAGE);
      console.log(weekObject);
      console.log(weekObject.days.length);
      weekClass.innerHTML = '';
      if (!weekObject || !weekObject?.days?.length) {
        weekClass.innerHTML =
          '<p><strong>Menu unavailable for the selected restaurant.</strong></p>';
      } else {
        fillWeekTable(weekObject);
      }
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
    loginElement();
    await getRestaurants();
    sortRestaurants();

    fillTable(restaurants, LANGUAGE);
    changeLanguage();
    companySelect();
  } catch (error) {
    console.log(error);
  }
};

main();
