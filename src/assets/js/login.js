document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('login-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
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
