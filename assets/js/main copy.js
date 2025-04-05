import {fetchData, sortByName} from './utils.js';
import {restaurantRow, restaurantModal} from './components.js';
import {url} from './variables.js';

const table = document.querySelector('table');
const modal = document.querySelector('dialog');
const errorBox = document.querySelector('#error');
let restaurants = [];

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

const filterRestaurants = (type) => {
  return type === 'All'
    ? restaurants
    : restaurants.filter((restaurant) => restaurant.company === type);
};

const companySelect = () => {
  const companySelect = document.querySelector('#company-select');
  companySelect.addEventListener('change', (event) => {
    const option = event.target.value;
    console.log(filterRestaurants(option));
    const filteredRestaurants = filterRestaurants(option);
    fillTable(filteredRestaurants);
  });
};

const main = async () => {
  try {
    await getRestaurants();
    sortRestaurants();
    fillTable(restaurants);
    companySelect();
  } catch (error) {
    console.log(error);
  }
};

main();
