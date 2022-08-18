const login = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log('Successful log in')
        document.location.replace('/profile');
      } else {
        console.log('Failed to log in. login.js');
      }
    }
  };

  document
  .querySelector('#login')
  .addEventListener('click', login);