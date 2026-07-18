(function () {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const publicPages = ["login.html", "signUp.html"];
    const loginUrl = new URL("../html/login.html", document.currentScript.src);

    if (!publicPages.includes(currentPage) && sessionStorage.getItem("skalaLoggedIn") !== "true") {
        window.location.replace(loginUrl.href);
    }
})();
