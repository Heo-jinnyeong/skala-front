(function () {
    const viewport = document.querySelector("#assignment-viewport");
    const carousel = document.querySelector(".assignment-carousel");
    const list = viewport?.querySelector(".main-checklist");
    const cards = list ? Array.from(list.children) : [];
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");
    const position = document.querySelector("#assignment-position");

    if (!carousel || !viewport || !list || !cards.length || !prevButton || !nextButton || !position) return;

    let scrollFrame;
    let scrollEndTimer;
    let slideFrame;

    prevButton.addEventListener("click", function () {
        moveByPage(-1);
    });

    nextButton.addEventListener("click", function () {
        moveByPage(1);
    });

    viewport.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            moveByPage(event.key === "ArrowLeft" ? -1 : 1);
        }
    });

    viewport.addEventListener("scroll", function () {
        carousel.classList.add("is-scrolling");
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(function () {
            carousel.classList.remove("is-scrolling");
            updateStatus();
        }, 140);

        cancelAnimationFrame(scrollFrame);
        scrollFrame = requestAnimationFrame(updateStatus);
    }, { passive: true });

    window.addEventListener("resize", updateStatus);
    updateStatus();

    function moveByPage(direction) {
        const visibleCount = getVisibleCount();
        const currentIndex = getStartIndex();
        const moveCount = Math.max(1, visibleCount - 1);
        const targetIndex = Math.max(0, Math.min(cards.length - 1, currentIndex + direction * moveCount));
        const targetLeft = cards[targetIndex].offsetLeft - cards[0].offsetLeft;

        animateTo(targetLeft);
    }

    function animateTo(targetLeft) {
        const startLeft = viewport.scrollLeft;
        const maxLeft = viewport.scrollWidth - viewport.clientWidth;
        const endLeft = Math.max(0, Math.min(targetLeft, maxLeft));
        const distance = endLeft - startLeft;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        cancelAnimationFrame(slideFrame);

        if (reduceMotion || Math.abs(distance) < 2) {
            viewport.scrollLeft = endLeft;
            return;
        }

        const duration = 680;
        const startTime = performance.now();
        viewport.classList.add("is-programmatic");
        carousel.classList.add("is-animating");

        function slide(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);

            viewport.scrollLeft = startLeft + distance * eased;

            if (progress < 1) {
                slideFrame = requestAnimationFrame(slide);
                return;
            }

            viewport.scrollLeft = endLeft;
            viewport.classList.remove("is-programmatic");
            carousel.classList.remove("is-animating");
            updateStatus();
        }

        slideFrame = requestAnimationFrame(slide);
    }

    function getVisibleCount() {
        const cardWidth = cards[0].getBoundingClientRect().width;
        return Math.max(1, Math.round(viewport.clientWidth / cardWidth));
    }

    function getStartIndex() {
        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach(function (card, index) {
            const cardLeft = card.offsetLeft - cards[0].offsetLeft;
            const distance = Math.abs(cardLeft - viewport.scrollLeft);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        return closestIndex;
    }

    function updateStatus() {
        const visibleCount = getVisibleCount();
        let startIndex = getStartIndex();

        if (viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth - 2) {
            startIndex = Math.max(0, cards.length - visibleCount);
        }

        position.textContent = `${startIndex + 1} / ${cards.length}`;
        prevButton.disabled = viewport.scrollLeft <= 2;
        nextButton.disabled = viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth - 2;
    }
})();
