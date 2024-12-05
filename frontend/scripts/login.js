document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login__form');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      localStorage.setItem('token', data.token);

      window.location.href = 'main.html';
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed: ' + error.message);
    }
  });
});