(function () {
    const subjects = document.querySelectorAll("td[data-description]");

    if (!subjects.length) return;

    const tooltip = document.createElement("div");
    tooltip.className = "schedule-tooltip";
    tooltip.id = "schedule-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.setAttribute("aria-hidden", "true");
    document.body.appendChild(tooltip);

    let activeCell = null;
    let focusMode = false;

    subjects.forEach(function (cell) {
        cell.setAttribute("aria-describedby", tooltip.id);

        cell.addEventListener("mouseenter", function (event) {
            focusMode = false;
            showTooltip(cell);
            positionByPointer(event);
        });

        cell.addEventListener("mousemove", positionByPointer);

        cell.addEventListener("mouseleave", function () {
            if (document.activeElement !== cell) hideTooltip();
        });

        cell.addEventListener("focus", function () {
            focusMode = true;
            showTooltip(cell);
            positionByCell(cell);
        });

        cell.addEventListener("blur", hideTooltip);

        cell.addEventListener("keydown", function (event) {
            if (event.key === "Escape") cell.blur();
        });
    });

    window.addEventListener("scroll", function () {
        if (!activeCell) return;
        if (focusMode) positionByCell(activeCell);
        else hideTooltip();
    }, true);

    window.addEventListener("resize", function () {
        if (activeCell && focusMode) positionByCell(activeCell);
    });

    function showTooltip(cell) {
        activeCell = cell;
        tooltip.textContent = cell.dataset.description;
        tooltip.classList.add("is-visible");
        tooltip.setAttribute("aria-hidden", "false");
    }

    function hideTooltip() {
        activeCell = null;
        tooltip.classList.remove("is-visible");
        tooltip.setAttribute("aria-hidden", "true");
    }

    function positionByPointer(event) {
        if (!activeCell || focusMode) return;
        placeTooltip(event.clientX + 14, event.clientY + 16);
    }

    function positionByCell(cell) {
        const rect = cell.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const preferredLeft = rect.left + rect.width / 2 - tooltipRect.width / 2;
        const preferredTop = rect.top - tooltipRect.height - 12;
        const fallbackTop = rect.bottom + 12;

        placeTooltip(preferredLeft, preferredTop < 8 ? fallbackTop : preferredTop);
    }

    function placeTooltip(left, top) {
        const rect = tooltip.getBoundingClientRect();
        const safeLeft = Math.max(8, Math.min(left, window.innerWidth - rect.width - 8));
        const safeTop = Math.max(8, Math.min(top, window.innerHeight - rect.height - 8));

        tooltip.style.left = `${safeLeft}px`;
        tooltip.style.top = `${safeTop}px`;
    }
})();
