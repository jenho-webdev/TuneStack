const signup = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();
    const errorMessage = document.querySelector('#error-message');

    if (username && password) {
        // Invalid password length
        if (password.length < 8) {
            errorMessage.textContent = 'Password must be at least 8 characters long.';
            errorMessage.style.display = 'block';
            return;
        }

        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/'); // Redirect user to home page
        } else {
            alert('Failed to sign up.');    // Alert user that sign-up failed
        }
    }
};

document.querySelector('#signup-form').addEventListener('submit', signup);
