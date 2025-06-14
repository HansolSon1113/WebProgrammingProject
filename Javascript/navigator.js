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

        #nav.nav-hide {
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

        document.body.style.paddingTop = `${height}px`;
    document.body.insertBefore(navigator, document.body.firstChild);

    let lastY = window.scrollY;
    window.addEventListener("scroll", () => {
        const currentY = window.scrollY;

        if (currentY < lastY || currentY < 80) { //화면을 올렸을때
            navigator.classList.remove("nav-hide");
        } else {
            navigator.classList.add("nav-hide");
        }

        lastY = currentY;
    });
});