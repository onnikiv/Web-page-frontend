import getLanguage from './language.js';

const headerElements = () => {
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
headerElements();
const restaurantRow = (restaurant) => {
  const tr = document.createElement('tr');
  const {name, address, company} = restaurant;
  tr.innerHTML = `
    <td>${name}</td>
    <td>${address}</td>
    <td>${company}</td>
  `;
  return tr;
};

const getRestaurantInfo = (restaurant) => {
  const {name, address, postalCode, city, phone, company} = restaurant;

  return getLanguage() === 'fi'
    ? `<article class="restaurantInfo">
          <h3>${name}</h3>
          <p><strong>Osoite:</strong> ${address}</p>
          <p><strong>Postinumero:</strong> ${postalCode}</p>
          <p><strong>Kaupunki:</strong> ${city}</p>
          <p><strong>Puh:</strong> ${phone}</p>
          <p><strong>Yritys:</strong> ${company}</p>
       </article>`
    : `<article class="restaurantInfo">
          <h3>${name}</h3>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Postal Code:</strong> ${postalCode}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company:</strong> ${company}</p>
       </article>`;
};

const createMenuHtml = (index) => {
  const selectedDay = index.courses;

  if (!selectedDay || selectedDay.length === 0) {
    return getLanguage() === 'fi'
      ? `<article class="course">
           <p><strong>Päivän menu ei saatavilla</strong></p>
         </article>`
      : `<article class="course">
           <p><strong>Menu unavailable for selected day</strong></p>
         </article>`;
  }

  return selectedDay
    .map(
      ({name, price, diets}) => `
      <article class="course">
        <p><strong>${name}</strong></p>
        <p>${price || ''}</p>
        <p style="color: red;">${diets || ''}</p>
      </article>`
    )
    .join('');
};

const tableHeads = () => {
  return getLanguage() === 'fi'
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

export {restaurantRow, getRestaurantInfo, createMenuHtml, tableHeads};
