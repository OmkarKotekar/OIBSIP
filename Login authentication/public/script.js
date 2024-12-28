// Function to register a new user
async function registerUser() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const payload = { username, password };

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.error || "Registration failed.");
        }
    } catch (err) {
        console.error("Registration Error:", err);
        alert("An error occurred while registering.");
    }
}

// Function to log in a user
async function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const payload = { username, password };

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            // Store the logged-in user's username in localStorage
            localStorage.setItem("loggedInUser", username);
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            alert(data.error || "Login failed.");
        }
    } catch (err) {
        console.error("Login Error:", err);
        alert("An error occurred while logging in.");
    }
}


// Function to toggle between login and register forms
function showTab(tab) {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const loginTab = document.getElementById("login-tab");
    const registerTab = document.getElementById("register-tab");

    if (tab === "login") {
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
        loginTab.classList.add("active");
        registerTab.classList.remove("active");
    } else {
        registerForm.classList.add("active");
        loginForm.classList.remove("active");
        registerTab.classList.add("active");
        loginTab.classList.remove("active");
    }
}
