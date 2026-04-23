// controller.js

let generatedOTP = "";

// ================= CHECK LOGIN (GUARD) =================
// Use this ONLY on protected pages (prelim, midterm, finals)
function checkLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "../../login.html"; // adjust path if needed
    }
}

// ================= PASSWORD TOGGLE =================
function togglePassword(inputId, element) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        element.innerText = "Hide";
    } else {
        input.type = "password";
        element.innerText = "Show";
    }
}

// ================= SHOW MESSAGE =================
function showMessage(msg, type = "info") {
    const box = document.getElementById("messageBox");
    if (!box) return;

    box.style.display = "block";
    box.innerText = msg;

    if (type === "error") {
        box.style.backgroundColor = "#F8D7DA";
        box.style.color = "#721C24";
        box.style.border = "1px solid #F5C6CB";
    } else if (type === "success") {
        box.style.backgroundColor = "#D4EDDA";
        box.style.color = "#155724";
        box.style.border = "1px solid #C3E6CB";
    } else {
        box.style.backgroundColor = "#D1ECF1";
        box.style.color = "#0C5460";
        box.style.border = "1px solid #BEE5EB";
    }
}

// ================= REGISTER USER =================
function registerUser() {
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const username = document.getElementById("registerUsername").value.trim();
    const password = document.getElementById("registerPassword").value.trim();

    if (!name || !email || !username || !password) {
        showMessage("Please fill all fields.", "error");
        return;
    }

    const user = { name, email, username, password };
    localStorage.setItem("user", JSON.stringify(user));

    showMessage("Account Created Successfully! Redirecting to login...", "success");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
}

// ================= LOGIN USER =================
function loginUser() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!username || !password) {
        showMessage("Please fill all fields.", "error");
        return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && username === savedUser.username && password === savedUser.password) {
        generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        showMessage("Your OTP is: " + generatedOTP, "info");

        const otpSection = document.getElementById("otpSection");
        if (otpSection) otpSection.style.display = "block";
    } else {
        showMessage("Invalid Username or Password!", "error");
    }
}

// ================= VERIFY OTP =================
function verifyOTP() {
    const enteredOTP = document.getElementById("otpInput").value.trim();

    if (!enteredOTP) {
        showMessage("Please enter OTP!", "error");
        return;
    }

    if (enteredOTP === generatedOTP) {
        localStorage.setItem("loggedIn", "true");
        showMessage("Login Successful!", "success");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    } else {
        showMessage("Incorrect OTP!", "error");
    }
}

// ================= HEADER BUTTONS =================
// On index.html: shows Register if not logged in, shows Logout if logged in
function setupHeaderButtons() {
    const registerBtn = document.getElementById("registerBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (registerBtn) {
        registerBtn.style.display = isLoggedIn ? "none" : "inline-block";
    }

    if (logoutBtn) {
        logoutBtn.style.display = isLoggedIn ? "inline-block" : "none";

        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedIn");
            window.location.href = "index.html"; // back to dashboard, not login
        });
    }
}

// ================= CONTACT FORM =================
function submitContact() {
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
        alert("Please fill all fields!");
        return;
    }

    alert("Message Sent Successfully!");
}

// ================= DARK MODE TOGGLE =================
function setupDarkMode() {
    const toggleBtn = document.getElementById("darkToggle");

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (toggleBtn) toggleBtn.textContent = "☀️";
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
                toggleBtn.textContent = "☀️";
            } else {
                localStorage.setItem("theme", "light");
                toggleBtn.textContent = "🌙";
            }
        });
    }
}

// ================= INIT ON DOM READY =================
document.addEventListener("DOMContentLoaded", function () {
    setupHeaderButtons();
    setupDarkMode();
});