(function () {
    const loadingDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? 500
        : 1800;
    const homeUrl = new URL("../index.html", document.currentScript.src);

    window.setTimeout(function () {
        window.location.replace(homeUrl.href);
    }, loadingDuration);
})();
