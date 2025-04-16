import {addRestaurantsToMap, changeMapView} from './map.js';
import {
  createRestaurantRowHtml,
  getRestaurantInfo,
  createMenuHtml,
  tableHeads,
  createHeaderElements,
} from './components.js';
import {
  restaurants,
  getRestaurants,
  sortRestaurants,
  getRestaurantWeeklyMenu,
} from './restaurants.js';

import getLanguage from './language.js';

export const errorBox = document.getElementById('error');

const table = document.getElementById('restaurant-box');
const menuHeadings = document.querySelector('.menu-headings');
const menuItems = document.querySelector('.selected-day-menu');

const createMenu = (weekObject) => {
  menuHeadings.innerHTML = '';

  console.log(weekObject, ' TESTI');

  const amountOfDays = weekObject.days.length;

  const language = getLanguage();
  let weekButtonCreated = false;

  for (let i = 0; i < amountOfDays; i++) {
    // luodaan kokoviikon menunappula
    if (!weekButtonCreated) {
      const weekText = language === 'fi' ? 'Koko viikko' : 'Whole Week';
      const weekA = `<th><a id="${i - 1}" href="">${weekText}</a></th>`;

      menuHeadings.innerHTML += weekA;
      weekButtonCreated = true;
    }
    // heti perään maanantai
    const dayObject = weekObject.days[i];
    const dayText = dayObject.date.split(' ');
    let d = dayText[0].substring(0, 2);
    let dd = dayText[1];
    const mm = new Date().getMonth() + 1;

    language === 'fi'
      ? (d = dayText[0].substring(0, 2))
      : (d = dayText[0].substring(0, 3)) && (dd = dayText[1] + '.');

    const dayA = `<th><a id="${i}" href="">${d} ${dd}${mm}</a></th>`;
    menuHeadings.innerHTML += dayA;
  }
  // täällä luodaan clickit menu napeille
  createMenuEventListeners(weekObject);
};

const createMenuEventListeners = (weekObject) => {
  console.log(weekObject, ' WÄÄ');

  const {days} = weekObject;
  console.log(days, ' DAYs');

  document.querySelectorAll('.menu-headings a').forEach((a) => {
    a.addEventListener('click', (event) => {
      document
        .querySelectorAll('.menu-headings a')
        .forEach((elem) => elem.classList.remove('highlight'));

      event.preventDefault();
      menuItems.innerHTML = '';
      // -1 = kokoviikon menu
      if (a.id === '-1') {
        for (let i = 0; i < days.length; i++) {
          menuItems.innerHTML += `<th>${days[i].date}</th>`;
          menuItems.innerHTML += createMenuHtml(days[i]);
        }
      } else {
        menuItems.innerHTML += `<th>${days[a.id].date}</th>`;
        menuItems.innerHTML += createMenuHtml(days[a.id]);
      }
      a.classList.add('highlight');
    });
  });
};

const createRestaurantRows = (filteredRestaurants) => {
  console.log('CreateRestaurantrows');
  table.innerHTML = tableHeads(getLanguage());
  filteredRestaurants.forEach((restaurant) => {
    const row = createRestaurantRowHtml(restaurant);
    row.addEventListener('click', async () => {
      document
        .querySelectorAll('#restaurant-box tr.highlight')
        .forEach((elem) => elem.classList.remove('highlight'));
      row.classList.add('highlight');

      changeMapView(restaurant);
      fetchRestaurantWeekMenu(restaurant);
    });
    table.appendChild(row);
  });
};

export const fetchRestaurantWeekMenu = async (restaurant) => {
  // putsataan näyttö
  menuHeadings.innerHTML =
    getLanguage() === 'fi'
      ? `<h4>Haetaan Ravintolan Menua...</h4>`
      : `<h4>Fetching Restaurant's Menu...</h4>`;
  menuItems.innerHTML = '';

  console.log(restaurant, ' res');
  const restaurantInfo = document.getElementById('restaurant-info');
  restaurantInfo.innerHTML = getRestaurantInfo(restaurant, getLanguage());
  restaurantInfo.style.display = 'block';

  try {
    const weekObject = await getRestaurantWeeklyMenu(restaurant._id, getLanguage());
    console.log(weekObject, ' weekobjektiiiiiiiiiiiiiii');

    if (
      !weekObject ||
      weekObject === null ||
      weekObject === undefined ||
      weekObject.days.length === 0
    ) {
      menuHeadings.innerHTML =
        getLanguage() === 'fi'
          ? '<p><strong>Viikon menu ei ole saatavilla.</strong></p>'
          : '<p><strong>Menu unavailable for the selected restaurant.</strong></p>';

      return;
    } else {
      createMenu(weekObject);
    }
  } catch (error) {
    console.log('fetchRestaurantWeekMenu: ', error);
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
  createHeaderElements();

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
