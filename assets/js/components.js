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

  const html = `
    <article class="restaurantInfo">
      <h3>${name}</h3>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Postal Code:</strong> ${postalCode}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <h4>${'-'.repeat(40)} Menu ${'-'.repeat(40)}</h4>
    </article>
    ${menu}
  `;

  return html;
};

export {restaurantRow, restaurantModal};
