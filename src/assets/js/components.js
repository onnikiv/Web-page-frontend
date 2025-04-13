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

const getRestaurantInfo = (restaurant, LANGUAGE) => {
  const {name, address, postalCode, city, phone, company} = restaurant;

  return LANGUAGE === 'en'
    ? `<article class="restaurantInfo">
          <h3>${name}</h3>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Postal Code:</strong> ${postalCode}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company:</strong> ${company}</p>
       </article>`
    : `<article class="restaurantInfo">
          <h3>${name}</h3>
          <p><strong>Osoite:</strong> ${address}</p>
          <p><strong>Postinumero:</strong> ${postalCode}</p>
          <p><strong>Kaupunki:</strong> ${city}</p>
          <p><strong>Puh:</strong> ${phone}</p>
          <p><strong>Yritys:</strong> ${company}</p>
       </article>`;
};

const createMenuHtml = (index) => {
  const selectedDay = index.courses;

  return (
    selectedDay
      .map(
        ({name, price, diets}) => `
      <article class="course">
        <p><strong>${name}</strong></p>
        <p>${price || ''}</p>
        <p style="color: red;">${diets || ''}</p>
      </article>`
      )
      .join('') ||
    `<article class="course">
      <p><strong>Menu unavailable for selected day</strong></p>
    </article>`
  );
};

const tableHeads = (LANGUAGE) => {
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

export {restaurantRow, getRestaurantInfo, createMenuHtml, tableHeads, loginElement};
