document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // If all validations pass, show a success message
    alert("Registration successful!");

    // Redirect to the login page
    window.location.href = 'login.html'; // Adjust the file path if needed
});
