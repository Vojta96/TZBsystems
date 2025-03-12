document.addEventListener("DOMContentLoaded", function () {
    const page = window.location.pathname.split('/').pop().replace('.html', '');
    const stylesheet = document.getElementById("page-style");

    if (page && page !== "index") {
        stylesheet.href = `css/${page}.css`;
    } else {
        stylesheet.href = ""; // Necháme jen global.css
    }
});
