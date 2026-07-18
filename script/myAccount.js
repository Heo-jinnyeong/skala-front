(function () {
    const form = document.querySelector("#account-form");
    const nameInput = document.querySelector("#account-name");
    const emailInput = document.querySelector("#account-email");
    const idInput = document.querySelector("#account-id");
    const passwordInput = document.querySelector("#account-password");
    const message = document.querySelector("#account-message");
    const resetButton = document.querySelector("#account-reset");
    const logoutButton = document.querySelector("#account-logout");

    loadAccount();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        localStorage.setItem("skalaUserName", nameInput.value.trim());
        localStorage.setItem("skalaUserEmail", emailInput.value.trim());
        localStorage.setItem("skalaUserId", idInput.value.trim());

        if (passwordInput.value) {
            localStorage.setItem("skalaUserPw", passwordInput.value);
        }

        passwordInput.value = "";
        updateProfile(nameInput.value);
        showMessage("계정 정보가 저장되었습니다.", "success");
    });

    resetButton.addEventListener("click", function () {
        loadAccount();
        showMessage("저장하지 않은 변경사항을 되돌렸습니다.", "neutral");
    });

    logoutButton.addEventListener("click", function () {
        sessionStorage.removeItem("skalaLoggedIn");
        window.location.replace("login.html");
    });

    function loadAccount() {
        nameInput.value = localStorage.getItem("skalaUserName") || "";
        emailInput.value = localStorage.getItem("skalaUserEmail") || "";
        idInput.value = localStorage.getItem("skalaUserId") || "";
        passwordInput.value = "";
        updateProfile(nameInput.value);
    }

    function updateProfile(name) {
        const displayName = name.trim() || "사용자";
        const initial = Array.from(displayName)[0].toUpperCase();

        document.querySelector("#account-sidebar-name").textContent = displayName;
        document.querySelector("#account-sidebar-avatar").textContent = initial;
        document.querySelector("#account-avatar").textContent = initial;
    }

    function showMessage(text, type) {
        message.textContent = text;
        message.className = `account-message is-${type}`;
    }
})();
