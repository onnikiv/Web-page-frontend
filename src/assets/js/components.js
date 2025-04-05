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

const restaurantModal = (restaurant, menu) => {
  const {name, address, postalCode, city, phone, company} = restaurant;

  const html = menu;
  return html;
};

export {restaurantRow, restaurantModal};
