document.addEventListener("DOMContentLoaded", () => {
    const height = 60;
    const navigator = document.createElement("section");
    navigator.id = "nav";
    navigator.style = `height: ${height}px`;
    navigator.innerHTML = `
        <iframe
            id="nav-frame"
            src="navigator.html"
            style="width: 100%; height: ${height}px; border: none; padding: 0;"
            onload="resizeIframe(this)"
        ></iframe>
    `;

    document.body.insertBefore(navigator, document.body.firstChild);
});