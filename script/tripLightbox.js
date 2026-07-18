(function () {
    const albums = Array.from(document.querySelectorAll(".trip-album"));

    if (!albums.length) return;

    const dialog = document.createElement("dialog");
    dialog.className = "trip-lightbox";
    dialog.innerHTML = `
        <div class="trip-lightbox-content">
            <button type="button" class="trip-lightbox-close" aria-label="큰 사진 닫기">×</button>
            <button type="button" class="trip-lightbox-nav trip-lightbox-prev" aria-label="이전 사진">‹</button>
            <figure>
                <div class="trip-lightbox-image-stage">
                    <img src="" alt="">
                </div>
                <figcaption></figcaption>
            </figure>
            <button type="button" class="trip-lightbox-nav trip-lightbox-next" aria-label="다음 사진">›</button>
        </div>`;
    document.body.appendChild(dialog);

    const lightboxImage = dialog.querySelector("img");
    const caption = dialog.querySelector("figcaption");
    const previousButton = dialog.querySelector(".trip-lightbox-prev");
    const nextButton = dialog.querySelector(".trip-lightbox-next");
    let currentImages = [];
    let currentIndex = 0;

    function showImage(index) {
        currentIndex = (index + currentImages.length) % currentImages.length;
        const selectedImage = currentImages[currentIndex];
        const imageCaption = selectedImage.closest("figure")?.querySelector("figcaption")?.textContent
            || selectedImage.alt;

        lightboxImage.src = selectedImage.src;
        lightboxImage.alt = selectedImage.alt;
        caption.textContent = imageCaption;
        const hasMultipleImages = currentImages.length > 1;
        previousButton.hidden = !hasMultipleImages;
        nextButton.hidden = !hasMultipleImages;
    }

    function openLightbox(selectedImage, album) {
        currentImages = Array.from(album.querySelectorAll("summary img, .trip-sub-gallery img"));
        showImage(currentImages.indexOf(selectedImage));
        dialog.showModal();
    }

    albums.forEach(function (album) {
        album.querySelectorAll("summary img, .trip-sub-gallery img").forEach(function (image) {
            if (!image.closest("summary")) {
                image.tabIndex = 0;
                image.setAttribute("role", "button");
                image.setAttribute("aria-label", `${image.alt} 크게 보기`);
            }

            image.addEventListener("click", function (event) {
                const isRepresentative = image.closest("summary") !== null;
                if (isRepresentative && !album.open) return;

                event.preventDefault();
                event.stopPropagation();
                openLightbox(image, album);
            });

            image.addEventListener("keydown", function (event) {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                openLightbox(image, album);
            });
        });
    });

    dialog.querySelector(".trip-lightbox-close").addEventListener("click", function () {
        dialog.close();
    });
    previousButton.addEventListener("click", function () { showImage(currentIndex - 1); });
    nextButton.addEventListener("click", function () { showImage(currentIndex + 1); });

    dialog.addEventListener("click", function (event) {
        if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") showImage(currentIndex - 1);
        if (event.key === "ArrowRight") showImage(currentIndex + 1);
    });
})();
