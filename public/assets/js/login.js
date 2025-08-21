document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        alert("Login successful!");
        // You can redirect to the main page or dashboard after login
        window.location.href = 'profile.html'; // Adjust the path as needed
    } else {
        alert("Please enter both username and password.");
    }
});