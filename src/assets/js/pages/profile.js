import {createHeaderElements} from '../components/htmlComponents.js';
import getLanguage from '../utils/language.js';
import {isLoggedIn, profileIcon} from '../utils/logged.js';

const createProfileContainer = () => {
  const profileContainer = document.querySelector('.profile-container');

  let initialInputs = {
    1: 'Profile',
    2: 'Username',
    3: 'Email',
    4: 'Update Profile',
    5: 'Change Password',
    6: 'Logout',
    7: 'Change Profile Picture',
  };

  let finnishInputs = {
    1: 'Profiili',
    2: 'Käyttäjänimi',
    3: 'Sähköposti',
    4: 'Päivitä profiili',
    5: 'Vaihda salasana',
    6: 'Kirjaudu ulos',
    7: 'Vaihda profiilikuva',
  };

  getLanguage() === 'fi' ? (initialInputs = finnishInputs) : initialInputs;

  profileContainer.innerHTML = `
    <h1>${localStorage.getItem('username')}</h1>
    <div id="upload-thumbnail">
      <label for="thumbnail"><b>${initialInputs[7]}</b></label>
      <input type="file" id="thumbnail" name="thumbnail" accept="image/*" />
      <button id="upload-thumbnail-btn">${initialInputs[7]}</button>
    </div>
    <button id="change-password">${initialInputs[5]}</button>
    <button id="logout">${initialInputs[6]}</button>
  `;

  const uploadButton = document.getElementById('upload-thumbnail-btn');
  const thumbnailInput = document.getElementById('thumbnail');

  uploadButton.addEventListener('click', async (event) => {
    event.preventDefault();

    // poistetaan vanha jos sellanen on
    deleteOldThumbnail();

    const file = thumbnailInput.files[0];

    if (!file) {
      alert(
        getLanguage() === 'fi'
          ? 'Valitse tiedosto ladattavaksi.'
          : 'Please select a file to upload.'
      );
      return;
    }

    const formData = new FormData();
    formData.append('user_id', localStorage.getItem('id'));
    formData.append('file', file);

    try {
      const response = await fetch(`http://localhost:3000/api/v1/thumbnails/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload thumbnail');
      }

      // eslint-disable-next-line no-unused-vars
      const result = await response.json();

      alert(
        getLanguage() === 'fi'
          ? 'Profiilikuva ladattu onnistuneesti!'
          : 'Thumbnail uploaded successfully!'
      );
      window.location = './profile.html';
    } catch (error) {
      alert(
        getLanguage() === 'fi'
          ? 'Virhe ladattaessa profiilikuvaa: ' + error.message
          : 'Error uploading thumbnail: ' + error.message
      );
    }
  });
};

const deleteOldThumbnail = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/thumbnails/${localStorage.getItem('id')}`
    );

    if (response.status === 404) {
      return;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch old thumbnail');
    }

    const data = await response.json();
    const deleteResponse = await fetch(`http://localhost:3000/api/v1/thumbnails/${data.img_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json();
      throw new Error(errorData.error || 'Failed to delete old thumbnail');
    }
  } catch (error) {
    console.log('Error deleting old thumbnail:', error.message);
    throw error;
  }
};

const logOut = () => {
  const logOutButton = document.getElementById('logout');

  logOutButton.addEventListener('click', (event) => {
    event.preventDefault();

    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');

    window.location = './index.html';
  });
};

const main = () => {
  if (!isLoggedIn()) {
    window.location = './index.html';
  } else {
    profileIcon();
    createHeaderElements();
    createProfileContainer();
    logOut();
  }
};

main();
