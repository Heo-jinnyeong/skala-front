(function () {
    const form = document.querySelector("#login-form");
    const message = document.querySelector("#login-message");
    const forgotButton = document.querySelector("#forgot-password");
    const params = new URLSearchParams(window.location.search);

    if (params.get("created") === "true") {
        message.textContent = "회원가입이 완료되었습니다. 새 계정으로 로그인해 주세요.";
        message.classList.add("is-success");
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const id = document.querySelector("#login-id").value.trim();
        const password = document.querySelector("#login-password").value;
        const savedId = localStorage.getItem("skalaUserId");
        const savedPassword = localStorage.getItem("skalaUserPw");

        if (!savedId) {
            showError("등록된 계정이 없습니다. 먼저 회원가입을 진행해 주세요.");
            return;
        }

        if (id !== savedId || password !== savedPassword) {
            showError("아이디 또는 비밀번호가 올바르지 않습니다.");
            return;
        }

        sessionStorage.setItem("skalaLoggedIn", "true");
        window.location.replace("loading.html");
    });

    forgotButton.addEventListener("click", function () {
        const savedEmail = localStorage.getItem("skalaUserEmail");
        message.classList.remove("is-error", "is-success");

        if (savedEmail) {
            message.textContent = `비밀번호 재설정 안내를 ${maskEmail(savedEmail)}로 전송했습니다.`;
            message.classList.add("is-success");
        } else {
            showError("가입된 계정이 없습니다. 먼저 회원가입을 진행해 주세요.");
        }
    });

    function showError(text) {
        message.textContent = text;
        message.classList.remove("is-success");
        message.classList.add("is-error");
    }

    function maskEmail(email) {
        const [name, domain] = email.split("@");
        if (!domain) return email;
        return `${name.slice(0, 2)}***@${domain}`;
    }
})();
