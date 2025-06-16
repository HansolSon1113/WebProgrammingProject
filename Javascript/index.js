const fades = {
    In: "fade-in",
    Left: "fade-left",
    Right: "fade-right",
    Bottom: "fade-bottom"
};
Object.freeze(fades);

document.addEventListener("DOMContentLoaded", () => {
    const fadeClasses = Object.values(fades);
    const selector = fadeClasses.map(c => `.${c}`).join(",");
    document.querySelectorAll(selector).forEach(element => {
        observer.observe(element);
    });
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle("fade-in", entry.isIntersecting);
        })
    },
    { threshold: 0.1 }
);

