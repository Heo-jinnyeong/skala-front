(function () {
    const toggle = document.querySelector("#trip-music-toggle");
    const player = document.querySelector("#trip-music-player");
    const label = toggle?.querySelector(".trip-music-label");
    const icon = toggle?.querySelector("[aria-hidden='true']");
    const video = document.querySelector("#trip-video");

    if (!toggle || !player || !label || !icon) return;

    function stopMusic() {
        player.replaceChildren();
        toggle.setAttribute("aria-pressed", "false");
        label.textContent = "재생";
        icon.textContent = "▶";
    }

    toggle.addEventListener("click", function () {
        const isPlaying = toggle.getAttribute("aria-pressed") === "true";

        if (isPlaying) {
            stopMusic();
            return;
        }

        const frame = document.createElement("iframe");
        frame.src = "https://www.youtube-nocookie.com/embed/MsAKdvYHg8Y?autoplay=1&loop=1&playlist=MsAKdvYHg8Y&controls=0";
        frame.title = "나의 여행지 배경음악";
        frame.allow = "autoplay; encrypted-media";
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        player.replaceChildren(frame);
        toggle.setAttribute("aria-pressed", "true");
        label.textContent = "정지";
        icon.textContent = "■";
    });

    video?.addEventListener("play", function () {
        if (toggle.getAttribute("aria-pressed") === "true") stopMusic();
    });
})();
