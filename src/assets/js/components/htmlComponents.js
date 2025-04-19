import getLanguage from '../utils/language.js';
import {createFavouriteSection} from './setFavourite.js';

const createHeaderElements = () => {
  const headerTitle = document.getElementById('page-title');
  const loginBtnText = document.getElementById('login');

  if (getLanguage() === 'fi') {
    headerTitle.innerText = 'Opiskelija Ravintolat';
    loginBtnText.innerText = 'Kirjaudu sisään';
  } else {
    headerTitle.innerText = 'Student Restaurants';
    loginBtnText.innerText = 'Log in';
  }
};

const createRestaurantRowHtml = (restaurant) => {
  const tr = document.createElement('tr');
  const {name, city, company} = restaurant;
  tr.innerHTML = `
    <td>${name}</td>
    <td>${company}</td>
    <td>${city}</td>
  `;
  return tr;
};

const getRestaurantInfo = (restaurant) => {
  const {name, address, postalCode, city, phone, company} = restaurant;

  return getLanguage() === 'fi'
    ? `<article class="restaurant-info">
          <h3>${name}</h3>
          <p><strong>Osoite:</strong> ${address}</p>
          <p><strong>Postinumero:</strong> ${postalCode}</p>
          <p><strong>Kaupunki:</strong> ${city}</p>
          <p><strong>Puh:</strong> ${phone}</p>
          <p><strong>Yritys:</strong> ${company}</p>
          ${createFavouriteSection()}
       </article>`
    : `<article class="restaurant-info">
          <h3>${name}</h3>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Postal Code:</strong> ${postalCode}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company:</strong> ${company}</p>
          ${createFavouriteSection()}
       </article>`;
};

const createMenuHtml = (day) => {
  const selectedDay = day.courses;

  if (!selectedDay || selectedDay.length === 0) {
    return getLanguage() === 'fi'
      ? `<tr class="course">
           <td><strong>Päivän menu ei ole saatavilla.</strong></td>
         </tr>`
      : `<tr class="course">
           <td><strong>Menu unavailable for selected day</strong></td>
         </tr>`;
  }

  return selectedDay
    .map(
      ({name, price, diets}) => `
      <tr class="course">
        <td><strong>${name}</strong></td>
        <td>${price || ''}</td>
        <td style="color: red;">${diets || ''}</td>
      </tr>`
    )
    .join('');
};

const tableHeads = () => {
  return getLanguage() === 'fi'
    ? `<thead>
        <tr>
          <th>Nimi</th>
          <th>Yritys</th>
          <th>Kaupunki</th>
        </tr>
      </thead>`
    : `<thead>
        <tr>
          <th>Name</th>
          <th>Company</th>
          <th>City</th>
        </tr>
      </thead>`;
};

export {
  createRestaurantRowHtml,
  getRestaurantInfo,
  createMenuHtml,
  tableHeads,
  createHeaderElements,
};
