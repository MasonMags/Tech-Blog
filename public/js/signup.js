const signUp = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log('Successful sign up')
        document.location.replace('/profile');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

  document
  .querySelector('#sign-up')
  .addEventListener('click', signUp);