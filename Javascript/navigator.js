const pages = {
    main: "main",
    shop: "shop",
    mypage: "mypage",
    contact: "contact"
}
Object.freeze(pages);

document.addEventListener("DOMContentLoaded", () => {
    const height = 80;
    const navigator = document.createElement("section");
    navigator.id = "nav";
    navigator.style = `height: ${height}px`;
    navigator.innerHTML = `
        <iframe
            id="nav-frame"
            src="navigator.html"
            style="width: 100%; height: ${height}px; border: none; padding: 0;"
        ></iframe>
    `;

    document.body.insertBefore(navigator, document.body.firstChild);

    window.addEventListener("scroll", () => {
        console.log("scroll");
        const top = navigator.offsetTop;
        if (window.scrollY >= top) {
            navigator.classList.remove("nav-fixed");
        } else {
            navigator.classList.add("nav-fixed");
        }
    });
});