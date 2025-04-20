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
    8: 'Current Password',
    9: 'New Password',
    10: 'Confirm Password',
    11: 'Submit',
  };

  let finnishInputs = {
    1: 'Profiili',
    2: 'Käyttäjänimi',
    3: 'Sähköposti',
    4: 'Päivitä profiili',
    5: 'Vaihda salasana',
    6: 'Kirjaudu ulos',
    7: 'Vaihda profiilikuva',
    8: 'Nykyinen salasana',
    9: 'Uusi salasana',
    10: 'Vahvista salasana',
    11: 'Lähetä',
  };

  getLanguage() === 'fi' ? (initialInputs = finnishInputs) : initialInputs;

  profileContainer.innerHTML = `
  <div>
    <h1>${localStorage.getItem('username')}</h1>
    <div id="upload-thumbnail">
      <label for="thumbnail"><b>${initialInputs[7]}</b></label>
      <input type="file" id="thumbnail" name="thumbnail" accept="image/*" />
      <button id="upload-thumbnail-btn">${initialInputs[7]}</button>
    </div>
    <form id="change-password-container" style="display: none;">
      <input type="text" id="username" name="username" value="${localStorage.getItem(
        'username'
      )}" autocomplete="username" hidden />
      <label for="current-password"><b>${initialInputs[8]}</b></label>
      <input type="password" id="current-password" placeholder="${
        initialInputs[8]
      }" autocomplete="current-password" />
      <label for="new-password"><b>${initialInputs[9]}</b></label>
      <input type="password" id="new-password" placeholder="${
        initialInputs[9]
      }" autocomplete="new-password" />
      <label for="confirm-password"><b>${initialInputs[10]}</b></label>
      <input type="password" id="confirm-password" placeholder="${
        initialInputs[10]
      }" autocomplete="new-password" />
      <button id="submit-password-change" type="submit">${initialInputs[11]}</button>
    </form>

    <button id="change-password">${initialInputs[5]}</button>
    <button id="logout">${initialInputs[6]}</button>
  </div>
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
      const response = await fetch(`https://10.120.32.69/web-page/api/v1/thumbnails/`, {
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
      `https://10.120.32.69/web-page/api/v1/thumbnails/${localStorage.getItem('id')}`
    );

    if (response.status === 404) {
      return;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch old thumbnail');
    }

    const data = await response.json();
    const deleteResponse = await fetch(
      `https://10.120.32.69/web-page/api/v1/thumbnails/${data.img_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json();
      throw new Error(errorData.error || 'Failed to delete old thumbnail');
    }
  } catch (error) {
    console.log('Error deleting old thumbnail:', error.message);
    throw error;
  }
};

const changePasswordElement = () => {
  const uploadThumbnailDiv = document.getElementById('upload-thumbnail');
  const changePasswordDiv = document.getElementById('change-password-container');
  const changePasswordBtn = document.getElementById('change-password');
  changePasswordBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('nappia painenttu');
    if (changePasswordDiv.style.display === 'grid') {
      changePasswordDiv.style.display = 'none';
      uploadThumbnailDiv.style.display = 'grid';
    } else {
      changePasswordDiv.style.display = 'grid';
      uploadThumbnailDiv.style.display = 'none';
    }
  });
};

const putNewPassword = () => {
  const changePasswordForm = document.getElementById('change-password-container');
  if (changePasswordForm) {
    changePasswordForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const currentPassword = document.getElementById('current-password').value.trim();
      const newPassword = document.getElementById('new-password').value.trim();
      const confirmPassword = document.getElementById('confirm-password').value.trim();

      if (!currentPassword || !newPassword || !confirmPassword) {
        alert(
          getLanguage() === 'fi' ? 'Kaikki kentät ovat pakollisia.' : 'All fields are required.'
        );
        return;
      }

      if (newPassword !== confirmPassword) {
        alert(
          getLanguage() === 'fi' ? 'Uudet salasanat eivät täsmää!' : "New passwords don't match!"
        );
        return;
      }

      try {
        const response = await fetch(
          `https://10.120.32.69/web-page/api/v1/users/${localStorage.getItem('id')}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              currentPassword,
              newPassword,
            }),
          }
        );

        if (response.ok) {
          alert(
            getLanguage() === 'fi'
              ? 'Salasana vaihdettu onnistuneesti!'
              : 'Password changed successfully!'
          );
          window.location.reload();
        } else {
          const errorData = await response.json();
          alert(
            getLanguage() === 'fi'
              ? `Salasanan vaihto epäonnistui: ${errorData.message || 'Tuntematon virhe'}`
              : `Password change failed: ${errorData.message || 'Unknown error'}`
          );
        }
      } catch (error) {
        console.error('Error changing password:', error);
        alert(
          getLanguage() === 'fi'
            ? 'Tapahtui virhe. Yritä myöhemmin uudelleen.'
            : 'An error occurred. Please try again later.'
        );
      }
    });
  } else {
    console.error('Change password form element not found.');
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
    changePasswordElement();
    logOut();
    putNewPassword();
  }
};

main();
