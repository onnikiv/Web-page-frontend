/* eslint-disable no-undef */
const markers = new Map();

const map = L.map('map').setView([60.2144768, 25.0281984], 11);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const addRestaurantsToMap = (restaurant) => {
  const {name, address, postalCode, city, phone, company} = restaurant;
  const coords = restaurant.location.coordinates;
  const latitude = coords[1];
  const longitude = coords[0];

  console.log(coords[1], coords[0]);
  const marker = L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup(
      `<h3>${name}</h3>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Postal Code:</strong> ${postalCode}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>`
    );
  markers.set(restaurant._id, marker);
};

const changeMapView = (restaurant) => {
  const coords = restaurant.location.coordinates;
  const id = restaurant._id;
  const latitude = coords[1];
  const longitude = coords[0];
  map.setView([latitude, longitude], 12);

  const marker = markers.get(id);
  if (marker) {
    marker.openPopup();
  }
};

export {addRestaurantsToMap, changeMapView};
