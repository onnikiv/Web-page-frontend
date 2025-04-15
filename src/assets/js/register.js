document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('register-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const passwordRepeat = document.getElementById('password-repeat').value;
      const email = document.getElementById('email').value;

      if (password !== passwordRepeat) {
        console.log(password + ' & ' + passwordRepeat + " don't match!");
        return;
      }

      console.log('name: ', name);
      console.log('username: ', username);
      console.log('password: ', password);
      console.log('email: ', email);

      try {
        const response = await fetch('https://10.120.32.69/web-page/api/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            name: name.trim(),
            username: username.trim(),
            password: password.trim(),
            email: email.trim(),
          }),
        });

        if (response.ok) {
          // eslint-disable-next-line no-unused-vars
          const data = await response.json();

          alert('Login successful!');
          // Redirect or handle successful login
          // window.location.href = '/dashboard';
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
