      // Fetch user details from localStorage (or API)
      const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {
        username: "John Doe",
        email: "john@example.com",
        profilePic: "path-to-default-profile-picture.jpg" // Default profile picture
    };

    // Display user details
    document.getElementById("usernameDisplay").innerText = userDetails.username;
    document.getElementById("emailDisplay").innerText = userDetails.email;
    document.getElementById("profilePic").src = userDetails.profilePic;

    // Show the edit form when "Edit Profile" button is clicked
    document.getElementById("editProfileButton").addEventListener("click", function () {
        const editForm = document.getElementById("editProfileForm");
        editForm.style.display = (editForm.style.display === "none" || !editForm.style.display) ? "block" : "none";
    });

    // Handle form submission to update the profile
    document.getElementById("editProfileForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const newUsername = document.getElementById("newUsername").value.trim();
        const newEmail = document.getElementById("newEmail").value.trim();
        const newProfilePic = document.getElementById("newProfilePic").files[0]; // Get uploaded file

        // Update user details in localStorage
        if (newUsername) {
            userDetails.username = newUsername;
            document.getElementById("usernameDisplay").innerText = userDetails.username; // Update display
        }
        if (newEmail) {
            userDetails.email = newEmail;
            document.getElementById("emailDisplay").innerText = userDetails.email; // Update display
        }

        // If a new profile picture is uploaded, display it
        if (newProfilePic) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("profilePic").src = e.target.result; // Display new profile picture
                userDetails.profilePic = e.target.result; // Update user details
            };
            reader.readAsDataURL(newProfilePic); // Convert file to base64 string
        }

        // Save updated user details to localStorage
        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        // Hide the edit form after submission
        document.getElementById("editProfileForm").style.display = "none";
    });

    // Logout functionality
    document.getElementById("logoutButton").addEventListener("click", function () {
        localStorage.removeItem("userDetails"); // Clear user details
        alert("You have been logged out.");
        window.location.href = "login.html"; // Redirect to homepage or login page
    });