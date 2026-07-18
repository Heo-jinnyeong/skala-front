(function () {
    const form = document.querySelector("#collaboration-form");

    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const subject = document.querySelector("#collaboration-subject").value.trim();
        const message = document.querySelector("#collaboration-message").value.trim();

        if (!subject || !message) return;

        const emailUrl = "mailto:wlssud132@gmail.com"
            + `?subject=${encodeURIComponent(`[협업 문의] ${subject}`)}`
            + `&body=${encodeURIComponent(message)}`;

        window.location.href = emailUrl;
    });
})();
