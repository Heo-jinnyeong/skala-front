(function () {
    if (sessionStorage.getItem("skalaLoggedIn") === "true") {
        window.location.replace("myAccount.html");
        return;
    }

    const form = document.querySelector("#signup-form");

    if (!form) return;

    const passwordInput = document.querySelector("#userPw");
    const passwordConfirmInput = document.querySelector("#userPwConfirm");
    const passwordConfirmHelp = document.querySelector("#password-confirm-help");

    function validatePasswordConfirmation() {
        const isMismatch = passwordConfirmInput.value !== ""
            && passwordInput.value !== passwordConfirmInput.value;

        passwordConfirmInput.setCustomValidity(
            isMismatch ? "비밀번호가 일치하지 않습니다." : ""
        );
        passwordConfirmHelp.textContent = isMismatch
            ? "비밀번호가 일치하지 않습니다. 다시 확인해 주세요."
            : "위에서 입력한 비밀번호를 한 번 더 입력해 주세요.";
        passwordConfirmHelp.classList.toggle("is-error", isMismatch);

        return !isMismatch;
    }

    passwordInput.addEventListener("input", validatePasswordConfirmation);
    passwordConfirmInput.addEventListener("input", validatePasswordConfirmation);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validatePasswordConfirmation()) {
            passwordConfirmInput.reportValidity();
            passwordConfirmInput.focus();
            return;
        }

        localStorage.setItem("skalaUserId", document.querySelector("#userId").value);
        localStorage.setItem("skalaUserPw", document.querySelector("#userPw").value);
        localStorage.setItem("skalaUserEmail", document.querySelector("#userEmail").value);
        localStorage.setItem("skalaUserName", document.querySelector("#userName").value);
        localStorage.setItem("skalaSignUpCompleted", "true");
        sessionStorage.removeItem("skalaLoggedIn");
        window.location.replace("login.html?created=true");
    });
})();
