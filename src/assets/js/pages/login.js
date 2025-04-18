import {createHeaderElements} from '../components/htmlComponents.js';
import getLanguage from '../utils/language.js';

const createLoginContainer = () => {
  const loginContainer = document.querySelector('.login-container');

  let initialInputs = {
    1: 'Username',
    2: 'Enter your username',
    3: 'Password',
    4: 'Enter your password',
    5: 'Login',
    6: "Don't have an account?",
    7: 'Register here',
  };

  let finnishInputs = {
    1: 'Käyttäjänimi',
    2: 'Syötä käyttäjänimi',
    3: 'Salasana',
    4: 'Syötä salasana',
    5: 'Kirjaudu',
    6: 'Eikö sinulla ole tiliä?',
    7: 'Rekisteröidy tästä',
  };

  getLanguage() === 'fi' ? (initialInputs = finnishInputs) : initialInputs;

  loginContainer.innerHTML = `
    <h1>${initialInputs[5]}</h1>
    <form id="login-form">
      <label for="username"><b>${initialInputs[1]}</b></label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="${initialInputs[2]}"
        required
      />
      <label for="password"><b>${initialInputs[3]}</b></label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="${initialInputs[4]}"
        required
      />

      <button type="submit">${initialInputs[5]}</button>
    </form>
    <p class="register-link">
      ${initialInputs[6]} <a href="./register.html">${initialInputs[7]}</a>.
    </p>
  `;
};

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('https://10.120.32.69/web-page/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username.trim(),
            password: password.trim(),
          }),
        });

        if (response.ok) {
          const data = await response.json();

          localStorage.setItem('token', data.token);
          localStorage.setItem('username', username);
          localStorage.setItem('id', data.user.user_id);

          window.location.href = './index.html';
        } else {
          alert('Login failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
      }
    });
  } else {
    console.error('Login form element not found.');
  }
});

createHeaderElements();
createLoginContainer();
getLanguage();
