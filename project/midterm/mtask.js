let generatedOTP = "";

// Toggle password visibility
function togglePassword(inputId, element){
    const input = document.getElementById(inputId);
    if(input.type === "password"){
        input.type = "text";
        element.innerText = "Hide";
    } else {
        input.type = "password";
        element.innerText = "Show";
    }
}

// Show message
function showMessage(msg, type="info"){
    const box = document.getElementById("messageBox");
    box.style.display = "block";
    box.innerText = msg;

    if(type==="error"){
        box.style.background="#F8D7DA";
        box.style.color="#721C24";
        box.style.border="1px solid #F5C6CB";
    } else if(type==="success"){
        box.style.background="#D4EDDA";
        box.style.color="#155724";
        box.style.border="1px solid #C3E6CB";
    } else {
        box.style.background="#D1ECF1";
        box.style.color="#0C5460";
        box.style.border="1px solid #BEE5EB";
    }
}

// Register
function registerUser(){
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const username = document.getElementById("registerUsername").value.trim();
    const password = document.getElementById("registerPassword").value.trim();

    if(!name || !email || !username || !password){
        showMessage("Please fill all fields.", "error");
        return;
    }

    const user = {name,email,username,password};
    localStorage.setItem("user", JSON.stringify(user));

    showMessage("Account Created! Redirecting to login...", "success");
    
setTimeout(() => {
    console.log("Redirecting to:", window.location.origin + window.location.pathname);
    window.location.href = "mtasklog.html";
}, 1500);
}

// Login
function loginUser(){
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const savedUser = JSON.parse(localStorage.getItem("user"));
    if(!savedUser){
        showMessage("No account found. Please register first!", "error");
        return;
    }

    if(username===savedUser.username && password===savedUser.password){
        generatedOTP = Math.floor(100000 + Math.random()*900000).toString();
        showMessage("Your OTP is: "+generatedOTP,"info");
        document.getElementById("otpSection").style.display="block";
    } else {
        showMessage("Invalid Username or Password!","error");
    }
}

function verifyOTP(){
    const enteredOTP = document.getElementById("otpInput").value.trim();
    if(!enteredOTP){
        showMessage("Please enter OTP!", "error");
        return;
    }

    if(enteredOTP === generatedOTP){
        showMessage("Login Successful!","success");
    } else {
        showMessage("Incorrect OTP!","error");
    }
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
    setupDarkMode();
});