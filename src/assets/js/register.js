document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('register-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const passwordRepeat = document.getElementById('password-repeat').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!name || !username || !password || !passwordRepeat || !email) {
        alert('All fields are required.');
        return;
      }

      if (password !== passwordRepeat) {
        alert("Passwords don't match!");
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
          const data = await response.json();
          alert('Registration successful!');
          // window.location.href = '/index.html';
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
