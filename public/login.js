// Handles login in JS
const loginFormHandler = async (event) => {
    event.preventDefault();
    hideLoginAlert();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        loginAlert();
      }
    }
  };
  
  const loginAlert = () => {
    const loginAlert = document.querySelector('#loginAlert');
    loginAlert.style.display = 'block';
  }
  
  const hideLoginAlert = () => {
    const loginAlert = document.querySelector('#loginAlert');
    loginAlert.style.display = 'none';
  }
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('#loginBtn')
    .addEventListener('click', loginFormHandler);
  