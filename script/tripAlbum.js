(function () {
    const albums = Array.from(document.querySelectorAll(".trip-album"));

    albums.forEach(function (album) {
        album.addEventListener("toggle", function () {
            if (!album.open) return;

            albums.forEach(function (otherAlbum) {
                if (otherAlbum !== album) otherAlbum.open = false;
            });
        });
    });
})();
