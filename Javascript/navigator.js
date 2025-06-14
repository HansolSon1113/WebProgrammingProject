const pages = {
    main: "main",
    shop: "shop",
    mypage: "mypage",
    contact: "contact"
}
Object.freeze(pages);

document.addEventListener("DOMContentLoaded", () => {
    document.head.innerHTML += `
    <style>
        #nav {
            position: fixed;
            top: 0;
            width: 100%;
            height: 80px;
            transform: translateY(0);
            transition: transform 0.3s ease-in-out;
        }

        .nav-hide {
            transform: translateY(-100%);
        }
    </style>
    `

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

    let lastY = window.scrollY;
    window.addEventListener("scroll", () => {
        const currentY = window.scrollY;
        const nav = document.getElementById("nav");
        const top = nav.offsetTop;
        if (currentY > lastY) {
            nav.classList.remove("nav-hide");
            document.body.style.paddingTop = "0";
        } else {
            nav.classList.add("nav-hide");
            document.body.style.paddingTop = "80px";
        }

        lastY = currentY;
    });
});