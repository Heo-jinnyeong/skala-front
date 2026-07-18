(function () {
    const tabs = Array.from(document.querySelectorAll("[data-meal-week]"));

    if (!tabs.length) return;

    function selectTab(selectedTab) {
        tabs.forEach(function (tab) {
            const isSelected = tab === selectedTab;
            const panel = document.querySelector(`#${tab.dataset.mealWeek}`);

            tab.setAttribute("aria-selected", String(isSelected));
            tab.tabIndex = isSelected ? 0 : -1;
            if (panel) panel.hidden = !isSelected;
        });
    }

    tabs.forEach(function (tab, index) {
        tab.addEventListener("click", function () {
            selectTab(tab);
        });

        tab.addEventListener("keydown", function (event) {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            const direction = event.key === "ArrowRight" ? 1 : -1;
            const nextTab = tabs[(index + direction + tabs.length) % tabs.length];
            selectTab(nextTab);
            nextTab.focus();
        });
    });
})();
