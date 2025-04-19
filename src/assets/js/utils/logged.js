import getLanguage from './language.js';

const isLoggedIn = () => {
  return localStorage.getItem('token') !== null;
};

const profileIcon = async () => {
  if (isLoggedIn()) {
    const profileElement = document.getElementById('user-profile');
    const iconUrl = await getProfileIcon();
    profileElement.innerHTML = `<a href="./profile.html">
            <img src="${iconUrl}" alt="Profile" id="profile-icon" />
          </a><p id="header-username">${localStorage.getItem('username') || ''}</p>`;
  }
  hideLogin();
};

const hideLogin = () => {
  const loginElement = document.getElementById('login');
  if (isLoggedIn()) {
    loginElement.style.display = 'none';
  } else {
    loginElement.style.display = 'flex';
  }
};

const getProfileIcon = async () => {
  const defaultIcon = './assets/images/spoon.jpg';
  const userId = localStorage.getItem('id');

  if (!userId) {
    return defaultIcon;
  }

  try {
    const response = await fetch(`http://127.0.0.1:3000/api/v1/thumbnails/${userId}`);
    if (!response.ok) {
      return defaultIcon;
    }

    const data = await response.json();

    return data.filename ? `http://127.0.0.1:3000/uploads/${data.filename}` : defaultIcon;
  } catch (error) {
    console.error('Error fetching thumbnail:', error);
    return defaultIcon;
  }
};

const setFavouriteButton = () => {
  return isLoggedIn()
    ? `<div class="favourite-section">
            <p><strong>${
              getLanguage() === 'fi' ? 'Aseta suosikiksi' : 'Set as Favourite'
            }</strong></p><button id="favourite-btn">❤️</button>
          </div>`
    : ``;
};

export {isLoggedIn, profileIcon, setFavouriteButton};
