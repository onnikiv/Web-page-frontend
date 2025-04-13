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

const restaurantMenuItems = (menu) => {
  const html = menu;
  return html;
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

export {restaurantRow, restaurantMenuItems, getRestaurantInfo};
