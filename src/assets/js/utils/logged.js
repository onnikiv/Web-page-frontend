const isLoggedIn = () => {
  return localStorage.getItem('token') !== null;
};

const profileIcon = async () => {
  if (isLoggedIn()) {
    const profileElement = document.getElementById('user-profile');
    const iconUrl = await getProfileIcon();
    console.log(iconUrl, ' icon urls');
    profileElement.innerHTML = `<a href="./profile.html">
            <img src="${iconUrl}" alt="Profile" id="profile-icon" />
          </a>`;
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
  console.log(userId);
  if (!userId) {
    return defaultIcon;
  }

  try {
    const response = await fetch(`http://127.0.0.1:3000/api/v1/thumbnails/${userId}`);
    if (!response.ok) {
      console.error('Failed to fetch thumbnail:', response.statusText);
      return defaultIcon;
    }

    const data = await response.json(); // Parse the JSON response
    console.log(data); // Log the response object for debugging

    // Assuming the filename is stored in a property called 'filename'
    return data.filename ? `http://127.0.0.1:3000/public/${data.filename}.jpg` : defaultIcon;
  } catch (error) {
    console.error('Error fetching thumbnail:', error);
    return defaultIcon;
  }
};

export {isLoggedIn, profileIcon};
