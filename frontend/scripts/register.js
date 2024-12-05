document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('.signup__form');

  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful:', data);

      window.location.href = 'login.html';
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed: ' + error.message);
    }
  });
});