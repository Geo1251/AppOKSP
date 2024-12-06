document.addEventListener('DOMContentLoaded', async () => {
  const autosList = document.querySelector('.autos__list');
  const modal = document.getElementById('modal');
  const closeBtn = document.querySelector('.close-btn');
  const createBtn = document.querySelector('.create_btn');
  const logoutBtn = document.querySelector('.logout_btn');
  const postForm = document.getElementById('postForm');
  const postIdInput = document.getElementById('postId');
  const titleInput = document.getElementById('title');
  const odoInput = document.getElementById('odo');
  const yearInput = document.getElementById('year');
  const descriptionInput = document.getElementById('description');
  const priceInput = document.getElementById('price');
  const pictureInput = document.getElementById('picture');

  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/verify-token', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Token verification failed');
    }
  } catch (error) {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
    return;
  }

  createBtn.addEventListener('click', () => {
    openModal();
  });

  closeBtn.addEventListener('click', () => {
    closeModal();
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      closeModal();
    }
  });

  postForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(postForm);
    const postId = postIdInput.value;

    if (postId) {
      await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } else {
      await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    closeModal();
    loadPosts();
  });

  logoutBtn.addEventListener('click', async () => {
    try {
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST'
      });
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  });

  async function loadPosts() {
    autosList.innerHTML = '';
    try {
      const response = await fetch('http://localhost:5000/api/posts/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const posts = await response.json();

      posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.classList.add('autos__list-item');

        let imageContainer = '';
        if (post.picture) {
          imageContainer = `
            <div class="image__container">
              <img src="../backend/static/${post.picture}" alt="Auto's photo">
            </div>
          `;
        }

        listItem.innerHTML = `
          ${imageContainer}
          <h2 class="auto__title">${post.title}</h2>
          <p class="auto__odo">${post.odo} km</p>
          <p class="auto__year">${post.year}</p>
          <p class="auto__description">${post.description}</p>
          <p class="auto__price">${post.price} rub</p>
          <div class="buttons__container">
            <button class="edit_btn" data-id="${post.id}">Редактировать</button>
            <button class="delete_btn" data-id="${post.id}">Удалить</button>
          </div>
        `;

        autosList.appendChild(listItem);
      });

      document.querySelectorAll('.edit_btn').forEach(button => {
        button.addEventListener('click', async (event) => {
          const postId = event.target.dataset.id;
          const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const post = await response.json();

          postIdInput.value = post.id;
          titleInput.value = post.title;
          odoInput.value = post.odo;
          yearInput.value = post.year;
          descriptionInput.value = post.description;
          priceInput.value = post.price;

          openModal();
        });
      });

      document.querySelectorAll('.delete_btn').forEach(button => {
        button.addEventListener('click', async (event) => {
          const postId = event.target.dataset.id;
          await fetch(`http://localhost:5000/api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          loadPosts();
        });
      });

    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  function openModal() {
    modal.style.display = 'block';
  }

  function closeModal() {
    modal.style.display = 'none';
    postForm.reset();
    postIdInput.value = '';
  }

  loadPosts();
});