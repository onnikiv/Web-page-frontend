import {createHeaderElements} from '../components/htmlComponents.js';
import getLanguage from '../utils/language.js';

const createRegisterContainer = () => {
  const registerContainer = document.querySelector('.register-container');

  let inputs = {
    1: 'Register',
    2: 'Please fill in this form to create an account.',
    3: 'DO NOT USE YOUR REAL PASSWORDS WHEN REGISTERING THIS IS A SCHOOL PROJECT',
    4: 'Enter',
    5: 'Email',
    6: 'Name',
    7: 'Username',
    8: 'Password',
    9: 'Repeat',
    10: 'Already have an account?',
    11: 'Login here',
  };

  let finnishInputs = {
    1: 'Rekisteröidy',
    2: 'Täytä tämä lomake luodaksesi tilin.',
    3: 'ÄLÄ KÄYTÄ OIKEITA SALASANOJASI REKISTERÖITYESSÄSI TÄMÄ ON KOULUPROJEKTI',
    4: 'Syötä',
    5: 'Sähköposti',
    6: 'Nimi',
    7: 'Käyttäjänimi',
    8: 'Salasana',
    9: 'Toista',
    10: 'Onko sinulla jo tili?',
    11: 'Kirjaudu tästä',
  };

  getLanguage() === 'fi' ? (inputs = finnishInputs) : inputs;

  registerContainer.innerHTML = `<form id="register-form">
        <h1>${inputs[1]}</h1>
        <p>${inputs[2]}</p>
        <strong>${inputs[3]}</strong>
        <label for="email"><b>${inputs[5]}</b></label>
        <input type="text" placeholder="${inputs[4]} ${inputs[5]}" name="email" id="email" autocomplete="email" required />
        <label for="name"><b>${inputs[6]}</b></label>
        <input type="name" placeholder="${inputs[4]} ${inputs[6]}" name="name" id="name" autocomplete="name" required />
        <label for="username"><b>Username</b></label>
        <input
          type="username"
          placeholder="${inputs[4]} ${inputs[7]}"
          name="username"
          id="username"
          autocomplete="username"
          required
        />
        <label for="password"><b>Password</b></label>
        <input
          type="password"
          placeholder="${inputs[4]} ${inputs[8]}"
          name="password"
          id="password"
          autocomplete="new-password"
          required
        />
        <label for="password-repeat"><b>${inputs[9]} ${inputs[8]}</b></label>
        <input
          type="password"
          placeholder="${inputs[9]} ${inputs[8]}"
          name="password-repeat"
          id="password-repeat"
          autocomplete="new-password"
          required
        />
        <button type="submit">${inputs[1]}</button>
      </form>
      <p class="register-link">${inputs[10]} <a href="./login.html">${inputs[11]}</a>.</p>`;
};

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const passwordRepeat = document.getElementById('password-repeat').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!name || !username || !password || !passwordRepeat || !email) {
        alert(
          getLanguage() === 'fi' ? 'Kaikki kentät ovat pakollisia.' : 'All fields are required.'
        );
        return;
      }

      if (password !== passwordRepeat) {
        alert(getLanguage() === 'fi' ? 'Salasanat eivät täsmää!' : "Passwords don't match!");
        return;
      }

      try {
        const response = await fetch('https://10.120.32.69/web-page/api/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            username,
            password,
            email,
          }),
        });

        if (response.ok) {
          // eslint-disable-next-line no-unused-vars
          const data = await response.json();
          alert(
            getLanguage() === 'fi'
              ? 'Rekisteröinti onnistui! Käyttäjä lisätty!'
              : 'Registration successful! User added!'
          );
          window.location.href = './login.html';
        } else {
          const errorData = await response.json();
          alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred. Please try again later.');
      }
    });
  } else {
    console.error('Register form element not found.');
  }
});

getLanguage();
createHeaderElements();
createRegisterContainer();
