const login = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();
    const errorMessage = document.querySelector('#error-message');

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/'); // Redirect user to home page
        } else {
            const data = await response.json();
            errorMessage.textContent = data.message;
            errorMessage.style.display = 'block';
        }
    }
};

document
    .querySelector('#login-form')
    .addEventListener('submit', login);